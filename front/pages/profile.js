import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

function Profile() {
  return (
    <>
      <Head>
        <meta charSet="uft-8"/>
        <title>Profile : Twitter</title>
      </Head>
      <AppLayout>
        <div>계정 프로필</div>
      </AppLayout>
    </>
  );
}

export default Profile;
