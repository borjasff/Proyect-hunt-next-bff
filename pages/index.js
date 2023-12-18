import React from 'react'
import Layout from '../components/layout/Layout'
import DetailsProduct from '../components/layout/DetailsProduct'
import useProducts from '../hooks/useProducts'

export default function Home() {

  const { products} = useProducts('create')
  
  return (
    <div>
      <Layout>
            <div className='list-products'>
              <div className='container'>
                <ul className='bg-white'>
                    {products.map(product => (
                        <DetailsProduct
                          key={product.id}
                          product={product}
                        />
                    ))}
                </ul>
              </div>
            </div>
      </Layout>
      
    </div>
  )
}
