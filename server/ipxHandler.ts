import { createIPX, createIPXH3Handler, ipxHttpStorage } from 'ipx'

export default lazyEventHandler(() => {
    const ipx = createIPX({
        maxAge: 3600,
        alias: {
            '/profile/upload': 'http://localhost:39254/profile/upload'
        },
        storage: ipxHttpStorage({
            domains: ['localhost']
        })
    })

    return useBase('/ipx', createIPXH3Handler(ipx))
})
