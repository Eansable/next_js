'use server'

import { sql } from "@vercel/postgres";
import { User } from "./type";
import { hashPassword } from "@/app/helpers/hashPassword";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
const bcrypt = require('bcrypt')

export const registration = async (
    login: string,
    password: string,
    firstName?: string,
    secondName?: string
) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const res = await sql<User>`
        INSERT INTO users (name, password, firstName, secondName, role)
        VALUES (${login},${hashedPassword},${firstName || ''},${secondName || ''}, 'user')
        `
        return res
    } catch (err) {
        console.error("Error when registration:", err);
    }
}

export const updateUser = async (
    id: string,
    login: string,
    firstName?: string,
    secondName?: string
) => {
    try {
        const res = await sql<User>`
        UPDATE users
        SET name = ${login}, firstName = ${firstName}, secondName = ${secondName}
        WHERE id = ${id}
        `
        return res
    } catch (err) {
        console.error("Error when registration:", err);
    }
}
export const changePassword = async (
    formData: {
        id: string,
        password: string,
        newPassword: string
    }
) => {
    try {
        const hashedPassword = bcrypt.hash(formData.password, 10)
        const newHashedPassword = bcrypt.hash(formData.newPassword, 10)
        const res = await sql<User>`
        UPDATE users
        SET password = ${newHashedPassword}
        WHERE id = ${formData.id} AND password = ${hashedPassword}
        `
        console.log(res);

        return true
    } catch (err) {
        console.error("Error when registration:", err);
    }
}

export const deleteUser = async (
    id: string,
) => {
    try {
        const res = await sql<User>`
        DELETE FROM users 
        WHERE id = ${id} 
        `
        return res
    } catch (err) {
        console.error("Error when registration:", err);
    }
}


export const fetchUsers = async () => {
    try {
        const res = await sql<User>`
        Select id, name, firstname, secondname from users
        `
        return res
    } catch (err) {
        console.error("Error when registration:", err);
    }
}

export const fetchOneUser = async (id: string) => {
    try {
        const res = await sql<User>`
        Select id, name, firstName, secondName, role from users
        WHERE id = ${id}
        `

        return res.rows[0] || undefined
    } catch (err) {
        console.error("Error when registration:", err);
    }
}



export const authenticate = async (
    prevState: string | undefined,
    formData: FormData,
) => {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}