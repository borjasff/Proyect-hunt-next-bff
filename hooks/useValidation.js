import React, { useState, useEffect } from "react";


const useValidation = (stateInitial, validate, fn) => {

    const [values, setValues ] = useState(stateInitial)
    const [errors, setErrors] = useState({})
    const [submitForm, setSubmitForm] = useState(false)

    useEffect(() => {
        if(submitForm){
            const noErrors = Object.keys(errors).length === 0;

            if(noErrors){
                fn(); // same fn that would be executed in the component
            }
            setSubmitForm(false)
        }
    },[errors])

    //fn that is executed when user types in the form
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    //fn that is executed when the user presses submit
    const handleSubmit = e => {
        e.preventDefault();
        const errorValidation = validate(values);
        setErrors(errorValidation)
        setSubmitForm(true)
    }

    return {
        values,
        errors,
        handleSubmit,
        handleChange
    }
}

export default useValidation