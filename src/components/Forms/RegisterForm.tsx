"use client";
import { handleAuthenticate } from '@/lib/features/authSlice';
import { useAppDispatch } from '@/lib/hooks';
import { RegisterSchema } from '@/schemas/auth.schema';
import { Button, FloatingLabel } from 'flowbite-react'
import { useFormik } from 'formik';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { LuLoader2 } from 'react-icons/lu'

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        toast.error(response.statusText);
        setLoading(false);
        return;
      }
      const body = await response.json();
      if (!body.success) {
        toast.error(body.messages[0]);
        setLoading(false);
        return;
      }
      dispatch(handleAuthenticate(body.data.access_token));
      toast.success("Registered successfully");
      return;
    }
  })

  return (
    <form onSubmit={handleSubmit} className="max-w-[400px] bg-gray-900 p-5 mx-auto rounded-md">
      <h1 className="text-gray-400 text-3xl font-bold text-center mb-4">Register:</h1>
      <div className="my-5">
        <FloatingLabel
          className='bg-gray-900'
          variant="outlined"
          label="Username"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <p className="text-red-500">{errors.name}</p>
      </div>
      <div className="my-5">
        <FloatingLabel
          className='bg-gray-900'
          variant="outlined"
          label="Email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <p className="text-red-500">{errors.email}</p>
      </div>
      <div className="my-5">
        <FloatingLabel
          className='bg-gray-900'
          variant="outlined"
          label="Password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <p className="text-red-500">{errors.password}</p>
      </div>
      <Button type="submit" fullSized disabled={loading}>
        {loading ? <LuLoader2 className='animate-spin' /> : "Register"}
      </Button>
      <p>I already have an account <Link href="/login">Login</Link></p>
    </form>
  )
}

export default RegisterForm