import React from 'react'

type Info = {
    name: string
}

const Hello = (info: Info) => {
    return (
        <div>Hello {info.name}</div>
    )
}

export default Hello