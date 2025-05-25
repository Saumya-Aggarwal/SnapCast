import { createAuthClient } from "better-auth/client";

export const authclient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
});
