import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Button from "../components/button";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>

      {/* Sign-in button fixed in the top left corner */}

      <div className="fixed top-0 left-0 z-50 m-2">
        <div className="flex flex-col items-start gap-2">
          {session && (
            <p className=" font-mono text-xs bg-[#6636305e] px-2 py-1">
              logged in as {session?.user?.name}
            </p>
          )}
          <Button onClick={session ? () => signOut() : () => signIn(
            undefined,
            { callbackUrl: window.location.origin + "/profile" }
          )}>
            {session ? "sign out" : "sign in"}
          </Button>
        </div>
      </div>

      {/* Page content */}
      <Component {...pageProps} />

    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
