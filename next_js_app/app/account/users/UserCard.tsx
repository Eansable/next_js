'use client'

import Link from "next/link"
import { User } from "../store/type"
import styles from "./styles.module.css"
import { deleteUser } from "../store/api"

interface PropsType {
    user: User
}

export default ({ user }: PropsType) => {
    return <div className={styles.card}>
        <div className={styles.card_image}>
            <div className={styles.image}></div>
        </div>
        <div className={styles.card_info}>

            <h3>
                <span>
                    {user.firstname}
                    {' '}
                </span>
                {user.secondname}
            </h3>
            <p>{user.name}</p>
            <div
                className={styles.card_manage}
            >
                <button
                    onClick={() => {
                        if (user.id)
                            deleteUser(user.id)
                    }}
                >
                    Delete
                </button>
                <Link href={`/account/users/${user.id}`}>Update</Link>
            </div>
        </div>
    </div>
}