import React, { useState, useContext} from 'react'
import { css } from '@emotion/react'
import Router, {useRouter} from 'next/router'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/userInterface/Form'



import {FirebaseContext} from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';

//VALIDATIONS
import useValidation from '../hooks/useValidation'
import validateCreateProduct from '../validation/validateCreateProduct'
import Error404 from '../components/layout/404'

const STATE_INITIAL = {
  name: '',
  company: '',
  image: '',
  url: '',
  description: ''
}


export default function NewProduct() {

  //state images

  const [nameImage, setNameImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [ progress, setProgress] = useState(0)
  const [saveUrlImage, setSaveUrlImage] = useState('')

  const [error, setError] = useState(false)

  const {        
          values,
          errors,
          handleSubmit,
          handleChange
        } = useValidation(STATE_INITIAL, validateCreateProduct, createProduct)

  const { name, company, image, url, description} = values;

  //hooks routing
  const router = useRouter()

  //context whit operations crud of firebase
  const { user, firebase} = useContext(FirebaseContext)
  console.log(user)

  async function createProduct(){
    //If the user is not logged, to go to the login
    if(!user) {
      return router.push('/login')
    }
    //create a object of new product
    const product = {
      name,
      company,
      url,
      saveUrlImage,
      description,
      vote: 0,
      coments: [],
      create: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName
      },
      voted: []
    }
    //insert in the db
    const respuesta = await addDoc(collection(firebase.db, 'products'), product)

    return router.push('/')
  }
  const handleImageUpload = e => {
    // get reference of the where to save the image
    const file = e.target.files[0];
    const imageRef = ref(firebase.storage, 'products/' + file.name);

    // start uploading the image
    setUploading(true);
    const uploadTask = uploadBytesResumable(imageRef, file);

    // Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on('state_changed', 
        // Muestra progreso de la subida
        snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Uploading image: ${progress}% finished`);
        },
        // En caso de error
        error => {
            setUploading(false);
            console.error(error);
        },
        // Subida finalizada correctamente
         () => {
            setUploading(false);
             getDownloadURL(uploadTask.snapshot.ref).then( url => {
                console.log('Image available: ', url);
                setSaveUrlImage(url)
            });
        }
    );
};

  
  return (
    <div>
      <Layout>
         {!user ? <Error404/> : (

              <>
              <h1
                css={css`
                  text-align: center;
                  margin-top: 5rem;
                  text-transform: uppercase;
                `}
              >Add new product</h1>

              <Form
                  onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>General information</legend>

                    
                        {errors.name && <Error>{errors.name}</Error>}
                        {errors.company && <Error>{errors.company}</Error>}
                      {errors.image && <Error>{errors.image}</Error>}
                        {errors.url && <Error>{errors.url}</Error>}

                        {error && <Error>{error}</Error>}

                      <Field>
                        <label htmlFor='name' >Name</label>
                        <input type='text' placeholder='Product name' id='name' name='name' value={name} onChange={handleChange}/>
                      </Field>


                      <Field>
                        <label htmlFor='company' >Company</label>
                        <input type='text' placeholder='Company name' id='company' name='company' value={company} onChange={handleChange}/>
                      </Field>

                      <Field>
                        <label htmlFor='image' >Image</label>
                        <input
                              accept="image/*"
                              type="file"
                              id="image"
                              name="image"
                              onChange={handleImageUpload}
                              
                          />
                      </Field>

                      <Field>
                        <label htmlFor='url' >Url</label>
                        <input type='url' id='url' name='url' placeholder='Product url' value={url} onChange={handleChange}/>
                      </Field>
                  </fieldset>
                  <fieldset>
                    <legend>About your product</legend>

                    {errors.description && <Error>{errors.description}</Error>}

                      <Field>
                        <label htmlFor='description' >Description</label>
                        <textarea id='description' name='description' value={description} onChange={handleChange}/>
                      </Field>

                  </fieldset>
                  <InputSubmit type='submit' value='Create Product' />
              </Form>
              </>

         )}
        
            
      </Layout>
      
    </div>
  )
}
