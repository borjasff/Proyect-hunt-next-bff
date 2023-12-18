import React, {useEffect, useState, useContext} from 'react'
import { useRouter } from 'next/router'
import {collection, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from "firebase/storage"
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {Field, InputSubmit} from '../../components/userInterface/Form'
import Button from '../../components/userInterface/Button';

const ConteinerProduct = styled.div`
@media (min-width: 768px){
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
}   
`;

const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;

`;

const Product = () => {

    //STATE COMPONENT
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [coment, setComent] = useState({})
    const [consultDB, setConsultDB] = useState(true)

    //routing to get actual id
    const router = useRouter();
    const{ query: {id}} = router

    //context of firebase
    const {firebase, user} = useContext(FirebaseContext)

    useEffect(() =>{
        if(id && consultDB){
            const getProduct = async () => {
                const productQuery = doc(collection(firebase.db, "products"), id)
                const productID = await getDoc(productQuery);
                
                if((productID.data()) !== undefined && productID.exists){
                    setProduct(productID.data());  
                    setConsultDB(false)
                  }else{
                    setError(true);
                    setConsultDB(false)
                  }
            }
            getProduct()
        }
    },[id, consultDB])

    if(Object.keys(product).length === 0 && !error) {
        return (
        //style to load page while wait loading content
        <h1>Loading</h1>
    )}
    const { company, create, creator, description, coments, name, url, saveUrlImage, vote, voted} = product

            //admin and validation votes
            const voteProduct = async () => {
                if(!user) {
                    return router.push('/login')
                }
                //verify if actual user has voted
                if(voted.includes(user.uid)){
                    return;
                }

                //get and plus new vote
                const newTotal = product.vote + 1;
                //save ID of user that has voted
                const newVoted = [
                    ...voted,
                    user.uid
                ]
                //update in the db
                const docRef = await doc(collection(firebase.db, "products"), id);
                updateDoc(docRef, {...product, vote: newTotal, voted: newVoted})

                //update in the db
                setProduct({
                    ...product,
                    vote: newTotal
                })
                // we have a vote and we have to consult the db
                setConsultDB(true)
            } 

        //function to create coment
        const comentChange = e => {
            setComent({
                ...coment,
                [e.target.name] : e.target.value
            })
        }
        //identidy if the coment is of product creator
        const isCreator = id => {
            if( creator.id == id){
                return true;
            }
        }

        const addComent = async e => {
            e.preventDefault();
            if(!user) {
                return router.push('/login')
            }
            //extra information
            coment.userId = user.uid;
            coment.userName = user.displayName;

            //take copy of coment and add it to array 
            const newComent = [...coments, coment]

            //update db
            const productoQuery = await doc(collection(firebase.db, "products"), id);
            updateDoc(productoQuery,{ coments: newComent})
            //update state
            setProduct({
                ...product,
                coments: newComent
            })
            // we have a comment and we have to consult the db
            setConsultDB(true)
        }

            //function to delete a product where the user authenticated is the same that the creator
            const deleteProduct = () => {
                if(!user) {
                    return false;
                }
                if( creator.id === user.uid){
                    return true;
                }
            }
            const removeProduct = async () => {
                if(!user) {
                    return router.push('/login')
                    }
                    if( creator.id !== user.uid){
                        return router.push('/')
                    } 
                    try {
                        // Remove Product
                        await deleteDoc(doc(firebase.db, "products", id))
                        // remove image
                        const storage = getStorage()
                        const imgRef = ref(storage, saveUrlImage)
                        deleteObject(imgRef).then(() => {
                            // Image removed successfully
                        }) .catch((error) => {
                            console.log(error)
                        })
                        router.push("/")
                      } catch (error) {
                        console.log(error)
                      }
            }
  return (
    <Layout>
        <>
            {error ? <Error404 /> : (
                <div className='container'>
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}>{name}</h1>
                <ConteinerProduct>
                    <div>
                    <p>Published ago: {formatDistanceToNow(new Date(create))}</p>
                     <p>By {product.creator.name} of {company}</p>
                    
                    <img src={saveUrlImage} />
                    <p>{description}</p>
                    {user && (
                        <>
                        <h2>Add comment</h2>
                            <form onSubmit={addComent}>
                                <Field>
                                    <input type='text' name='message' onChange={comentChange}/>
                                </Field>
                                <InputSubmit type='submit' value='Add coment'/>
                            </form>
                        </>
                    )}
                    <h2 css={css`
                        margin: 2rem 0 ;
                    `}>Comments</h2>
                    {coments.length === 0 ? "No comments": (
                    
                        <ul>
                            {coments.map( (comment, i) => (
                                <li
                                    key={`${coments.userId}-${i}`}
                                    css={css`
                                        padding: 2rem;
                                        border: 1px solid #e1e1e1;
                                    `}
                                >
                                    <p>{comment.message}</p>
                                    <p>Writer by: {' '}<span css={css`font-weight:bold;`}>{comment.userName}</span></p>
                                    {isCreator( comment.userId) && <ProductCreator>Creator</ProductCreator>}
                                </li>
                            ))}

                        </ul>
                    )}
                    
                    
                    </div>
                    <aside>
                        <Button
                            target="_blank"
                            bgColor="true"
                            href={url}

                        >Go to Url</Button>
                        
                        <div css={css`
                                margin-top: 5rem;
                        `}>
                                <p css={css`
                                    text-align: center;
                                `}>{vote} Votes</p>
                                {user && (
                                    <Button
                                        onClick={voteProduct}
                                        >To vote</Button>
                                )}
                                
                        </div>
                        
                    </aside>
                </ConteinerProduct>
                { deleteProduct() && 
                    (<Button
                        onClick={removeProduct}
                    >Delete Product</Button>)}
            </div>
            )}
            
        </>
        
    </Layout>
    
  )
}

export default Product