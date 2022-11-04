import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

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

      <main className="mx-auto min-h-screen flex flex-col justify-center items-center p-4 gap-2 w-fit">
        <h1 className="text-8xl text-white bg-[#6636305e] px-5 text-center">
          study-sesh.app
        </h1>
        <div className="flex flex-col gap-2 items-start w-full px-5">
          <p className="text-lg text-white">
            Study together in person with other McGill students.<br/>
          </p>
        </div>
        <PostMessageBox />
        <Posts />
      </main>
    </>
  );
};

export default Home;

const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-start gap-2">
      {sessionData && (
        <p className="text-white font-mono text-xs bg-[#6636305e] px-2 py-1">
          logged in as {sessionData?.user?.name}
        </p>
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




const PostMessageBox = () => {
  const { data: sessionData } = useSession();
  const [message, setMessage] = useState("");
  const post = trpc.post.post.useMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        post.mutate({
          name: sessionData?.user?.name as string,
          message,
        });
        setMessage("");
      }}
    >
      <input
        className="w-full px-2 py-1"
        value={message}
        minLength={1}
        maxLength={100}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="w-full px-2 py-1" type="submit">
        Post
      </button>
    </form>
  );



}



const Posts = () => {
  const { data: messages, isLoading } = trpc.post.getAllPosts.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4 text-white">
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};

