import Head from 'next/head';
import FormikSignup from '../drafts/Signup';

export default function SignUpPage() {
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
