import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { z } from "zod"
import { sql } from "@vercel/postgres";
import { User } from "./app/account/store/type";
const bcrypt = require('bcrypt')


async function getUser(name: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE name=${name}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        credentials({
            async authorize(credentials) {
                const parsedCredentials = z.
                    object({ name: z.string().min(4), password: z.string().min(6) })
                    .safeParse(credentials)
                if (parsedCredentials.success) {
                    const { name, password } = parsedCredentials.data;
                    const user = await getUser(name);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            }
        })]
})
