import { auth, signOut } from "@/auth"

export default async () => {
    const session = await auth()

    return <div>
        <h2>Account page {session?.user?.name}</h2>
        {session?.user &&
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
}