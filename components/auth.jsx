import { signIn, signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";
const auth = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session, status } = useSession();
  console.log(process.env.NEXT_PUBLIC_AUTH_URL + "/home");
  // const pathUrl = process.env.NEXT_PUBLIC_AUTH_URL + "/home";
  if (status === "unauthenticated" || status === "loading") {
    return (
      <>
        <button
          className="rounded bg-white text-black py-3 px-5"
          onClick={() =>
            signIn("google", { callbackUrl: (process.env.NEXT_PUBLIC_AUTH_URL + "/"), })
          }
        >
          Sign Up
        </button>
      </>
    )
  }
  if (status === "authenticated") {
    return (
      <div className="flex flex-col">
        <p className="text-xl font-semibold">
          Signed in as {session.user.name}
        </p>
        <button
          className="rounded bg-white text-black py-3 px-5 mt-5 w-32 self-center"
          onClick={() => signOut({
            callbackUrl: process.env.NEXT_PUBLIC_AUTH_URL,
          })}>
          Sign out
        </button>
      </div>
    );
  }
}
export default auth;