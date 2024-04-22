

import Link from "next/link"
import styles from "./style.module.css"
import { auth, signOut } from "@/auth"

export default async () => {
    const session = await auth()
    return <aside className={styles.aside_wrapper}>
        <section>
            <Link href="./account">Account</Link>
            <Link href="./users">Users</Link>
            <Link href="./matches">Matches</Link>

        </section>
        <footer>
            <div>
                <Link href="/login">Log in</Link>
                {!session?.user ?
                    <Link href="./account/register">Sign in</Link> :
                    <form
                        action={async () => {
                            'use server'
                            await signOut()
                        }}
                    >
                        <button
                            type="submit"
                        >
                            Log out
                        </button>
                    </form>
                }
            </div>
            Table tennis statistics DDC
        </footer>
    </aside>
}