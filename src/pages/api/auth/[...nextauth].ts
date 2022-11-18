import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [

    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "dev-mode credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
      },
      async authorize(credentials) {
        const id = Math.random().toString(36).slice(2);
        const name = credentials?.name || "Dev Mode User";
        const email = name + " < dev mode >";
        const session = await prisma.session.create({
          data: {
            id,
            userId: id,
            sessionToken: id,
            expires: new Date(Date.now() + 60 * 60 * 1000),
          }
        });
        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: { id, name, email, sessions: { connect: { id: session.id } } },
        });

        return user;
      },
    }),

    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
