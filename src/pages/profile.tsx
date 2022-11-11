import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const CreateAccount: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile page</title>
      </Head>
      <main className="mx-auto min-h-screen flex flex-col items-left p-4 gap-2 w-fit ">
        <h1 className="text-6xl  bg-[#6636305e] px-5 text-center mt-[calc(50vh-7.5rem)]">
          Create Account
        </h1>
        <div className="flex flex-col gap-2 items-start w-full px-5 text-lg">
          <p>
            Click <Link href="/">here</Link> to sign in.
          </p>
        </div>
      </main>
    </>
  );
};


export default CreateAccount;


