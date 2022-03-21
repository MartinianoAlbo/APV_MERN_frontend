import { useState } from 'react'

export const useForm = (initialState = {}) => {
  const [formValues, setValues] = useState(initialState)

  const resetInput = () => {
    setValues(initialState)
  }

  const handleInputChange = ({ target }) => {
  
    setValues({
      ...formValues,
      [target.name]: target.value,
    })
    
  }

  return [formValues, handleInputChange, resetInput, setValues]
}
