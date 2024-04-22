'use client'

import { useFormState } from "react-dom"
import styles from "./styles.module.css"
import { authenticate } from "../account/store/api"

export default () => {
    const [values, dispatch] = useFormState(authenticate, undefined)

    return <section>
        <form action={dispatch}>

            <label
                htmlFor="name"
            >
                Login:
                <input
                    type="text"
                    id="name"
                    name="name"
                />
            </label>
            <label
                htmlFor="password"
            >
                Password:
                <input
                    type="password"
                    id="password"
                    name="password"
                />
            </label>
            <button
                type="submit"
            >
                Log in
            </button>
        </form>
    </section>
}