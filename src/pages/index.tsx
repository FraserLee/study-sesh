import { type NextPage } from "next";
import Head from "next/head";
import { Posts, PostMessageBox } from "../components/posts";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>study-sesh</title>
        <meta name="description" content="Study together in person with other McGill students" />
      </Head>
      {/* Sign-in button fixed in the top left corner */}

      <main className="mx-auto min-h-screen flex flex-col items-center p-4 gap-2 w-fit ">
        <h1 className="text-8xl  bg-[#6636305e] px-5 text-center mt-[calc(50vh-7.5rem)]">
          study-sesh.app
        </h1>
        <div className="flex flex-col gap-2 items-start w-full px-5 text-lg">
          <p>
            Study together in person with other McGill students.
          </p>
          <p>
            We haven&#39;t built it yet, so for the time being have fun with this
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
