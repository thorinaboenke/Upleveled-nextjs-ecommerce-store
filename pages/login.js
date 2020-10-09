import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
import FormikLogin from '../components/Login';

export default function login() {
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
