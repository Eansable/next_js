'use client'

import FormChangePassword from "../../formChangePassword"
import FormRegistration from "../../formRegistration"

interface PropsType {
    params: { id: string }
}

export default ({ params }: PropsType) => {
    return <div>
        Update
        <FormRegistration
            id={params.id}
        ></FormRegistration>
        <FormChangePassword id={params.id}>

        </FormChangePassword>
    </div>
}