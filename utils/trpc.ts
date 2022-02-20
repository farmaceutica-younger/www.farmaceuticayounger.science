import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "src/server/mod";

export const trpc = createReactQueryHooks<AppRouter>();
