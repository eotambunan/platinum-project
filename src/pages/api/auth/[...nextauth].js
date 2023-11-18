import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "123",
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = { id: 1, email: email, password: password };
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.id = user.id
      }
      return token;
    },
    async session({ session, token }) {
      if ("email" in token) {
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);



// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions= {
//     session: {
//         strategy: "jwt",
//     },
//     secret: "123",
//     providers: [
//         CredentialsProvider({
//             type: "Credentials",
//             name: "Credentials",    
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 const { email, password } = credentials;
//                 const user = { id: 1, email: email, password: password };
//                 if (user) {
//                     return user;
//                 } else {
//                     return null;
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         jwt({ token, account, profile, user }) {
//             if (account?.provider === "credentials") {
//                 token.email = user.email;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if ("email" in token) {
//                 session.user.email = token.email;
//             }
//             return session;
//         },
//     },
// };

// export default NextAuth(authOptions);
