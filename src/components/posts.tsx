import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import Button from "./button";

const PostMessageBox = () => {
  const { data: sessionData } = useSession();
  const [message, setMessage] = useState("");
  const post = trpc.post.post.useMutation();

  if (!sessionData) {
    return (<>
      <p className="text-white px-2 py-1 text-right text-sm opacity-50">
        howdy, stranger<br/>
        you&#39;ve gotta sign in to post round these parts<br/>
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
        placeholder="what&#39;s up?"
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




export { PostMessageBox, Posts };
