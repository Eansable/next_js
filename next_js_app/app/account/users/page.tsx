'use client'

import { useEffect, useState } from "react"
import { fetchUsers } from "../store/api"
import UserCard from "./UserCard"
import styles from "./styles.module.css"
import { User } from "../store/type"
export default () => {
    const [users, setUsers] = useState<User[]>()
    useEffect(() => {
        fetchUsers().then(res => {
            setUsers(res?.rows)
        })

    }, [])
    return <div>
        <h2> List users</h2>
        <div className={styles.card_wrapper}>

            {users?.map(user => <UserCard
                user={user}
                key={user.id}
            />)}
        </div>
    </div>
}