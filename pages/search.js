import React, {useEffect, useState} from 'react'
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router'
import DetailsProduct from '../components/layout/DetailsProduct'
import useProducts from '../hooks/useProducts'



export default function Search() {

  const router = useRouter()
  const { query: {q}} = router

  //all products
  const { products} = useProducts('create')
  const [result, setResult] = useState([])

  useEffect(() =>{
    const search = q.toLowerCase()
    const filter = products.filter(product => {
      return (
        product.name.toLowerCase().includes(search) || 
        product.description.toLowerCase().includes(search)
      )
    })
    setResult(filter)
  },[q, products])

  return (
    <div>
      <Layout>
            <div className='list-products'>
              <div className='container'>
                <ul className='bg-white'>
                    {result.map(product => (
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
