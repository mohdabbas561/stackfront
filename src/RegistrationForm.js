import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import './Register.css'

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  dob: yup.string().required("Date of Birth is required").test("You must be at least 18 years old", (value) => {
    const currentDate = new Date();
    const birthDate = new Date(value);
    const ageInMs = currentDate - birthDate;
    const ageInYears = ageInMs / 1000 / 60 / 60 / 24 / 365.25;
    return ageInYears >= 18;
  }),
  number: yup.string().required("Phone number is required").matches(/^[0-9]{10}$/, "Phone number should be 10 digits"),
});

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/users', data);
      window.location.href = "/UserList"
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="dob">Date of Birth</label>
        <input id="dob" type="date" {...register('dob')} />
        {errors.dob && <span>{errors.dob.message}</span>}
      </div>
      <div>
        <label htmlFor="number">Phone Number</label>
        <input id="number" {...register('number')} />
        {errors.number && <span>{errors.number.message}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
