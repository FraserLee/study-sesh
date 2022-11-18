import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../components/button";
const SignIn = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return (<Button onClick={() => {}}>loading...</Button>);
  if (status === "authenticated") return (<Button onClick={() => { signOut(); }}>sign out</Button>);
  if (status === "unauthenticated") return (<Button onClick={() => { 
    signIn( undefined, { callbackUrl: window.location.origin + "/profile" }); 
  }}>sign in</Button>);
  // should be unreachable
  return (<Button onClick={() => {}}>error</Button>);
};
export default SignIn;
