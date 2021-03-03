import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

function Register() {
  return (
    <>
      <Head>
        <meta charSet="uft-8"/>
        <title>Register : Node Bird</title>
      </Head>
      <AppLayout>
        <div>계정 등록</div>
      </AppLayout>
    </>
  );
}

export default Register;
