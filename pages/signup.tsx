import Head from 'next/head';

import FormikSignup from '../components/Signup';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Jawa Merch - Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormikSignup />
    </>
  );
}
