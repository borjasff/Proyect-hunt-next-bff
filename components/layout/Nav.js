import React, {useContext} from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { FirebaseContext } from '../../firebase'

const Nave = styled.nav`
  padding-left: 2rem;

  a{
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: 'PT Sans', sans-serif;

    &:last-of-type{
      margin-right: 0;
    }
  }
`

const Nav = () => {

  const { user} = useContext(FirebaseContext)
  return ( 
    <Nave>
        <Link legacyBehavior passHref href="/">Home</Link>
        <Link legacyBehavior passHref href="/populates">Populate</Link>
        {user && (
          <Link legacyBehavior passHref href="/new-product">New Product</Link>
        )}
        
    </Nave>
  )
}

export default Nav