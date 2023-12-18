import React, { useContext } from 'react'
import Search from '../userInterface/Search'
import Nav from './Nav'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Button from '../userInterface/Button'
import { FirebaseContext } from '../../firebase'

const ConteinerHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px){
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;
const Header = () => {

    const {user, firebase} = useContext(FirebaseContext);
  return (
    <header
        css={css`
            border-bottom: 2px solid var(--gray3);
            padding: 1rem 0;
        `}
    >
        <ConteinerHeader>
            <div
                css={css`
                    display: flex;
                    align-items: center;
                `}
                >
                <Link href="/">
                    <Logo>P</Logo>
                </Link>
                
           
                <Search/>
                
                <Nav/>
            </div>

            <div 
                css={css`
                    display: flex;
                    align-items: center;
                `}
            >
            {user ? (
                <>
                    <p css={css`
                        margin-right: 2rem;
                        `}
                        >
                    Hola: {user.displayName}</p>

                    <Button bgColor="true"
                     onClick={() => firebase.logout()}
                    >Logout</Button>
                </>

            ): (
                <>
                
                <Link href="/login">
                        <Button bgColor="true"
                        >Login</Button>
                </Link>
                <Link href="/create-account">
                    <Button >
                    Create acount</Button>
                </Link>
                </>
            )}
            </div>
        </ConteinerHeader>
    </header>
  )
}

export default Header