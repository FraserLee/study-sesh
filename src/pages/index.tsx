import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>study-sesh</title>
        <meta name="description" content="Study together in person with other McGill students" />
      </Head>
      {/* Sign-in button fixed in the top left corner */}
      <div className="fixed top-0 left-0 z-50 m-2">
        <AuthShowcase />
      </div>

      <main className="mx-auto min-h-screen flex flex-col justify-center items-center p-4 gap-2 w-fit">
        <h1 className="text-8xl text-white bg-[#6636305e] px-5 text-center">
          study-sesh.app
        </h1>
        <div className="flex flex-col gap-2 items-start w-full px-5">
          <p className="text-lg text-white">
            Study together in person with other McGill students.<br/>
            Trpc test: {hello.data ? hello.data.greeting : "Loading..."}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-start gap-2">
      {sessionData && (
        <p className="text-white font-mono text-xs bg-[#6636305e] px-2 py-1">
          logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-white font-mono text-xs bg-[#6636305e] px-2 py-1">{secretMessage}</p>
      )}
      <button
        className="text-white font-mono text-xs bg-[#6636305e] px-2 py-1 hover:bg-black hover:text-white"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "sign out" : "sign in"}
      </button>
    </div>
  );
};

