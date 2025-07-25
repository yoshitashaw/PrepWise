import React from 'react'
import AuthForm from '@/components/AuthForm';

const page = () => {
  return ( 
    <div className="min-h-screen flex items-center justify-center bg-background">
      <AuthForm type="sign-in" />
    </div>
  )
}

export default page;
