import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

function Home() {
  return (
    <>
      <Head>
        <meta charSet="uft-8"/>
        <title>Home : Twitter</title>
      </Head>
      <AppLayout>
        <div>Hello, Next!</div>
      </AppLayout>
    </>
  );
}

export default Home;
