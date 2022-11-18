import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import SignIn from "../components/signin";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";


// I've separated MyApp into two components, since I don't know any other
// way to access the status of the session. Inner one wraps it in a login
// button, or a name if logged in.
// 
// This is janky. There's definitely a better way to do this, if anyone knows
// enough react to work it out.
const InnerApp = ({ Component, pageProps }: any) => {
  const { data: session, status } = useSession();
  return (<>
    {/* Sign-in button fixed in the top left corner */}
    {status !== "loading" && (
      <div className="fixed top-0 left-0 z-50 m-2">
        <div className="flex flex-col items-start gap-2">
          {session && (
            <p className=" font-mono text-xs bg-[#6636305e] px-2 py-1">
              logged in as {session?.user?.name}
            </p>
          )}
          <SignIn />
        </div>
      </div>
    )}

    {/* Page content */}
    <Component {...pageProps} />
  </>);
};


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <InnerApp Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
