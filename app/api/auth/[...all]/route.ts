import { user } from "@/drizzle/schema";
import aj from "@/lib/arject";
import { auth } from "@/lib/auth";
import { ArcjetDecision, slidingWindow, validateEmail } from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";
import ip from "@arcjet/ip";
import { error } from "console";
const authHandler = toNextJsHandler(auth.handler);
//Email Validation
const emailValidation = aj.withRule(
  validateEmail({
    mode: "LIVE",
    block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
  })
);

const rateLimit = aj.withRule(
  slidingWindow({
    mode: "LIVE",
    interval: "2m",
    max: 2,
    characteristics: ["fingerprint"],
  })
);

const protectedAuth = async (req: NextRequest): Promise<ArcjetDecision> => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  let userId: string;
  if (!session || !session.user) {
    userId = ip(req) || "127.0.0.1";
  } else {
    userId = session.user.id;
  }
  if (req.nextUrl.pathname.startsWith("/api/auth/sign-in")) {
    const body = await req.clone().json();
    if (typeof body.email == "string") {
      return emailValidation.protect(req, {
        email: body.email,
      });
    }
  }
  return rateLimit.protect(req, {
    fingerprint: userId,
  });
};

// CORS helper function
const corsHandler = (request: NextRequest, response: Response) => {
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'http://localhost:3000',
    'https://snap-cast-amber.vercel.app',
    'https://snap-cast-692t47bhy-saumya-aggarwals-projects.vercel.app'
  ];

  // Allow requests from Vercel preview URLs and main deployment
  const isVercelDomain = origin?.includes('.vercel.app');
  const isAllowedOrigin = allowedOrigins.includes(origin || '') || isVercelDomain;

  if (isAllowedOrigin && origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
};

export const POST = async (req: NextRequest) => {
  const decision = await protectedAuth(req);
  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      throw new Error("Email validation failed");
    }

    if (decision.reason.isRateLimit()) {
      throw new Error("Rate limit exceeded");
    }

    if (decision.reason.isShield()) {
      throw new Error("Shield protection triggered");
    }
  }

  const response = await authHandler.POST(req);
  return corsHandler(req, response);
};

export const GET = async (req: NextRequest) => {
  const response = await authHandler.GET(req);
  return corsHandler(req, response);
};

export const OPTIONS = async (req: NextRequest) => {
  const response = new Response(null, { status: 200 });
  return corsHandler(req, response);
};
