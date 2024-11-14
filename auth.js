import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./model/user";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });
    const response = await fetch(url, {
      headers: {
        Content_Type: "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      refreshToken: refreshedTokens?.refresh_token,
      accessTokenExpires: (new Date() + refreshedTokens?.expires_in) * 1000,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        console.log(credentials);

        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const match = await bcrypt.compare(
              credentials?.password,
              user.password
            );
            if (match) {
              return user;
            } else {
              console.log("Password doesn't match");
              throw new Error("Plesse check your password!");
            }
          } else {
            console.log("User not found!");
            throw new Error("User not found!");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     if (account && user) {
  //       return {
  //         accessToken: account?.access_token,
  //         refreshToken: account?.refresh_token,
  //         accessTokenExpires: (new Date() + account?.expires_in) * 1000,
  //         user,
  //       };
  //     }

  //     if (new Date() < token.accessTokenExpires) {
  //       return token;
  //     }

  //     return refreshAccessToken(token);
  //   },
  //   async session({ session, token }) {
  //     session.user = token?.user;
  //     session.accessToken = token?.access_token;
  //     session.error = token?.error;
  //     return session;
  //   },
  // },
});
