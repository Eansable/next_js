'use client'

import { useEffect, useState } from "react";
import { fetchOneUser, registration } from "./store/api";
import { User } from "./store/type";
import styles from "./styles.module.css"

interface PropsType {
    id?: string
}

export default ({ id }: PropsType) => {
    const [formFields, setFormFields] = useState<User>({
        id: '',
        name: '',
        password: '',
        firstname: '',
        secondname: ''
    })
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        if (id) {
            fetchOneUser(id).then(res => res ? setFormFields(res) : null)
        }

    }, [id])

    return <form
        className={styles.register_form}
        onSubmit={async (event) => {
            event.preventDefault()
            const res = await registration(formFields.name,
                formFields.password ? formFields.password : 'Qwerty123',
                formFields.firstname,
                formFields.secondname
            )
        }}
    >
        <label htmlFor="login">
            Login:
            <input
                type="text"
                id="login"
                value={formFields.name}
                onChange={(event) => {
                    setFormFields({
                        ...formFields,
                        name: event.target.value
                    })
                }}
            />

        </label>
        {!id ?
            <label htmlFor="password">
                Password:
                <input
                    type="password"
                    id="password"
                    onChange={(event) => {
                        setFormFields({
                            ...formFields,
                            password: event.target.value
                        })
                    }}
                    value={formFields.password}
                />
            </label>
            : null}
        <label htmlFor="firstName">
            First name:
            <input
                type="text"
                id="firstName"
                value={formFields.firstname}
                onChange={(event) => {
                    setFormFields({
                        ...formFields,
                        firstname: event.target.value
                    })
                }}
            />
        </label>
        <label htmlFor="secondName">
            Second name:
            <input
                type="text"
                id="secondName"
                value={formFields.secondname}
                onChange={(event) => {
                    setFormFields({
                        ...formFields,
                        secondname: event.target.value
                    })
                }}
            />
        </label>
        <button
            type='submit'
        >
            {id ? "Save" : "Register"}
        </button>
    </form>
}