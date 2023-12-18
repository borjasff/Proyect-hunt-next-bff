import React, { useState} from 'react'
import { css } from '@emotion/react'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/userInterface/Form'
import Router from 'next/router'


import firebase from '../firebase'

//VALIDATIONS
import useValidation from '../hooks/useValidation'
import validateCreateAccount from '../validation/validateCreateAccount'

const STATE_INITIAL = {
  name: '',
  email: '',
  password: ''
}

export default function CreateAccount() {
  const [error, setError] = useState(false)

  const {        
          values,
          errors,
          handleSubmit,
          handleChange
        } = useValidation(STATE_INITIAL, validateCreateAccount, createCount)

        const { name, email, password} = values

  async function createCount(){
    
    try {
      await firebase.register(name, email, password)
      Router.push("/")
    } catch (error) {
      console.error('Error found while creating your User', error["message"])
      setError(error.message)
    }
  }
  return (
    <div>
      <Layout>
        <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
                text-transform: uppercase;
              `}
            >create account</h1>

            <Form
                onSubmit={handleSubmit}>
                  {errors.name && <Error>{errors.name}</Error>}
                  {errors.email && <Error>{errors.email}</Error>}
                  {errors.password && <Error>{errors.password}</Error>}
                  {error && <Error>{error}</Error>}
                <Field>
                  <label htmlFor='name' >Name</label>
                  <input type='text' placeholder='Your name' id='name' name='name' value={name} onChange={handleChange}/>
                </Field>

                <Field>
                  <label htmlFor='email' >email</label>
                  <input type='email' placeholder='Your email' id="email" name='email' value={email} onChange={handleChange}/>
                </Field>

                <Field>
                  <label htmlFor='password' >Password</label>
                  <input type='password' placeholder='Your password' id='password' name='password' value={password} onChange={handleChange}/>
                </Field>

                <InputSubmit type='submit' value='Create Account' />
            </Form>
        </>
            
      </Layout>
      
    </div>
  )
}
