import useProducts from '../hooks/useProducts'
import Layout from '../components/layout/Layout'
import DetailsProduct from '../components/layout/DetailsProduct'


export default function Populates() {
  const { products } = useProducts('vote')
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
