// src/server/router/context.ts
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { Session } from "next-auth";
// import { getServerAuthSession } from "../common/get-server-auth-session";
import { prisma } from "@dafrica/db";

type CreateContextOptions = {
  session: Session | null;
};

// type CreateContextOptions = Record<string, never>;

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    // session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  // const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  // const session = await getServerAuthSession({ req, res });
  const fakeSession = {
    user: {
      name: "",
      email: "",
      image: "",
    },
    expires: new Date().toString(),
  };

  return await createContextInner({ session: fakeSession });
};

export type Context = inferAsyncReturnType<typeof createContext>;
