import React, {useEffect, useState, useContext} from 'react'
import { FirebaseContext } from '../firebase'
import {collection, getDocs, orderBy, query, doc } from 'firebase/firestore'

const useProducts = order => {
  

    const [products, setProducts] = useState([])

    const { firebase } = useContext(FirebaseContext)
  
    useEffect(() => {
      const getProducts = async () => {
        
        const productsRef = collection(firebase.db, 'products');
        const q = query(productsRef, orderBy(order, 'desc'));
     
        const querySnapshot = await getDocs(q);
        let products = []
        querySnapshot.forEach((doc) => {
          products.push({
            id: doc.id,
            ...doc.data()
          })
          return products
          
        });
        setProducts(products)
        //console.log(products)
      }
      getProducts()
    }, [])
    return {
        products
    }
}

export default useProducts