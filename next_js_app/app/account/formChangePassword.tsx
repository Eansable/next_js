'use client'

import { useEffect, useState } from "react"
import { changePassword } from "./store/api"

export default ({ id }: { id: string }) => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [result, setResult] = useState<boolean>(false)

    const clearForm = () => {
        setPassword('')
        setNewPassword('')
        setRepeatPassword('')
    }

    useEffect(() => {
        if (result) {
            clearForm()
            setResult(false)
        }
    }, [result])

    return <form
        onSubmit={(event) => {
            event.preventDefault()
            if (newPassword === repeatPassword)
                changePassword({
                    id,
                    password,
                    newPassword,
                }).then(res => setResult(!!res))
        }}
    >
        <label>
            <input
                type="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
            />
        </label>
        <label>
            <input
                type="password"
                value={newPassword}
                onChange={(event) => {
                    setNewPassword(event.target.value)
                }}
            />
        </label>
        <label>
            <input
                type="password"
                value={repeatPassword}
                onChange={(event) => {
                    setRepeatPassword(event.target.value)
                }}
            />
        </label>
        <button type="submit">change</button>
    </form>
}