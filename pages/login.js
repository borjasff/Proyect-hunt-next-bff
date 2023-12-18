import React, { useState} from 'react'
import { css } from '@emotion/react'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/userInterface/Form'
import Router from 'next/router'


import firebase from '../firebase'

//VALIDATIONS
import useValidation from '../hooks/useValidation'
import validateLogin from '../validation/validateLogin'

const STATE_INITIAL = {
  email: '',
  password: ''
}

export default function Login() {
  const [error, setError] = useState(false)

  const {        
          values,
          errors,
          handleSubmit,
          handleChange
        } = useValidation(STATE_INITIAL, validateLogin, Login)

        const { email, password} = values

  async function Login(){
      try {
        await firebase.login(email, password)
        

        Router.push("/")
      } catch (error) {
        console.error('Error found while login your User', error["message"])
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
            >Login</h1>

            <Form
                onSubmit={handleSubmit}>
                  {errors.email && <Error>{errors.email}</Error>}
                  {errors.password && <Error>{errors.password}</Error>}
                  {error && <Error>{error}</Error>}


                <Field>
                  <label htmlFor='email' >email</label>
                  <input type='email' placeholder='Your email' id="email" name='email' value={email} onChange={handleChange}/>
                </Field>

                <Field>
                  <label htmlFor='password' >Password</label>
                  <input type='password' placeholder='Your password' id='password' name='password' value={password} onChange={handleChange}/>
                </Field>

                <InputSubmit type='submit' value='Login' />
            </Form>
        </>
            
      </Layout>
      
    </div>
  )
}
