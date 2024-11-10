const { default: NextAuth } = require("next-auth");
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
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
  ],
});
