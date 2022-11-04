import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { Posts, PostMessageBox } from "../components/posts";
import Button from "../components/button";




const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-start gap-2">
      {sessionData && (
        <p className="text-white font-mono text-xs bg-[#6636305e] px-2 py-1">
          logged in as {sessionData?.user?.name}
        </p>
      )}
      <Button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? "sign out" : "sign in"}
      </Button>
    </div>
  );
};







const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>study-sesh</title>
        <meta name="description" content="Study together in person with other McGill students" />
      </Head>
      {/* Sign-in button fixed in the top left corner */}
      <div className="fixed top-0 left-0 z-50 m-2">
        <Auth />
      </div>

      <main className="mx-auto min-h-screen flex flex-col items-center p-4 gap-2 w-fit text-white">
        <h1 className="text-8xl text-white bg-[#6636305e] px-5 text-center mt-[calc(50vh-7.5rem)]">
          study-sesh.app
        </h1>
        <div className="flex flex-col gap-2 items-start w-full px-5 text-lg">
          <p>
            Study together in person with other McGill students.
          </p>
          <p>
            We haven't built it yet, so for the time being have fun with this
            textbox.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end w-full px-5 mt-10">
          <PostMessageBox />
          <Posts/>
        </div>
      </main>
    </>
  );
};







export default Home;
