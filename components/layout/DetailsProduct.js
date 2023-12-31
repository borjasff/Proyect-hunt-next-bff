import React from 'react'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';

const Product = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;

const DescriptionProduct = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;
const Title = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: black;
    :hover {
        cursor: pointer;
        color: #888;
    }
`;

const TextDescription = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;
`;

const Coments = styled.div`
margin-top: 2rem;
display: flex;
align-items: center;
   div{
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
   }
   img{
        width: 2rem;
        margin-right: 2rem;
   }
   p{
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type{
        margin: 0;
    }
   }
`;

const Image = styled.img`
    width: 200px;
`;

const Votes = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;
    div{
        font-size: 2rem;
    }
    p{
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`;

const DetailsProduct = ({product}) => {
    console.log(product)
    const {id, company, create, description, coments, name, url, saveUrlImage, vote} = product
  return (
    <Product>
        <DescriptionProduct>
            <div>
                <Image src={saveUrlImage}/>
            </div>
            <div>

                <Link href="/products/[id]" as={`/products/${id}`}>
                    <Title>{name}</Title>
                </Link>

                <TextDescription>{description}</TextDescription>

                <Coments>

                    <div>
                        <img src="/static/img/coment.png"/>
                        <p>{coments.length} Coments</p>
                    </div> 

                </Coments>

                <p>Published ago: {formatDistanceToNow(new Date(create))}</p>
            </div>
        </DescriptionProduct>

        <Votes>
            <div>&#9650;</div>
            <p>{vote}</p>
        </Votes>

    </Product>
  )
}

export default DetailsProduct