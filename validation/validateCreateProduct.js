import React from 'react'

export default function validateCreateProduct (values) {
    let errors = {}

    //validate product name
    if(!values.name){
        errors.name = "Product name is required"
    }

    //validate company
    if(!values.company){
        errors.company = "Company name is required"
    }
    //validate url
    if(!values.url){
        errors.url = "Url is required"
    }  else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
        errors.url = "Url not valid"
    }

    //validate description
    if(!values.description){
        errors.description = "Description is required"
    }
    return errors
}