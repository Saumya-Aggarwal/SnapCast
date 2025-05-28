import { db } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { schema } from "@/drizzle/schema";
import { nextCookies } from "better-auth/next-js";

// Get the correct base URL for the current environment
const getBaseURL = () => {
  // For production, prioritize custom domain or main Vercel URL
  if (process.env.NODE_ENV === "production") {
    // Use custom domain if available
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    
    // Use Vercel URL (this will be the current deployment URL)
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    
    // Fallback to your main domain
    return "https://snap-cast-amber.vercel.app";
  }
  
  // Development
  return "http://localhost:3000";
};

// Get all possible Vercel URLs for trusted origins
const getTrustedOrigins = () => {
  const origins = ["http://localhost:3000"];
  
  // Add your main domain
  origins.push("https://snap-cast-amber.vercel.app");
  
  // Add current Vercel URL if different
  if (process.env.VERCEL_URL) {
    const currentUrl = `https://${process.env.VERCEL_URL}`;
    if (!origins.includes(currentUrl)) {
      origins.push(currentUrl);
    }
  }
  
  // Add custom domain if set
  if (process.env.NEXT_PUBLIC_BASE_URL && !origins.includes(process.env.NEXT_PUBLIC_BASE_URL)) {
    origins.push(process.env.NEXT_PUBLIC_BASE_URL);
  }
  
  // Add git branch URLs pattern (optional, for preview deployments)
  if (process.env.VERCEL_GIT_COMMIT_REF && process.env.VERCEL_GIT_REPO_SLUG) {
    origins.push(`https://snap-cast-git-${process.env.VERCEL_GIT_COMMIT_REF}-saumya-aggarwals-projects.vercel.app`);
  }
  
  return origins;
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  },
  plugins: [nextCookies()],
  baseURL: getBaseURL(),
  trustedOrigins: getTrustedOrigins(),
});