import { useState } from 'react';

const useFormHandler = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    error: '',
    success: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return { formData, setFormData, handleInputChange };
};

export default useFormHandler;
