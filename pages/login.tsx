import Head from 'next/head';
import React from 'react';
import FormikLogin from '../drafts/Login';

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>Jawa Merch - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormikLogin />
    </div>
  );
}
