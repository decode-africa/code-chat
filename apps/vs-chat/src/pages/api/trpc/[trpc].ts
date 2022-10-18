import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@dafrica/api";
import { createContext } from "@dafrica/api";
import { env } from "@dafrica/utils";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
