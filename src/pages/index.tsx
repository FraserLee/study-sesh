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






const Button = (props: { 
                onClick?: () => void, 
                type?: "button" | "submit" | "reset", 
                children: React.ReactNode
}) => (
  <button
    className="text-white font-mono text-xs bg-[#6636305e] px-2 py-1 hover:bg-black hover:text-white"
    type={props.type ?? "button"}
    onClick={props.onClick}
  >{props.children}</button>
);


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




const PostMessageBox = () => {
  const { data: sessionData } = useSession();
  const [message, setMessage] = useState("");
  const post = trpc.post.post.useMutation();

  if (!sessionData) {
    return (<>
      <p className="text-white px-2 py-1 text-right text-sm opacity-50">
        howdy, stranger<br/>
        you've gotta sign in to post round these parts<br/>
        -🤠
      </p>
      <Button onClick={() => signIn()}>sign in</Button>
    </>);
  }

  return (
    <form
      className="flex flex-col gap-2 items-end w-full"
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
        className="px-2 py-1 text-white bg-[#6636305e] text-sm outline-none w-96"
        value={message}
        placeholder="what's up?"
        minLength={1}
        maxLength={100}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">post</Button>
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
          <div key={index} className="bg-[#66363030] px-2 py-1 font-mono text-xs w-80">
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};

