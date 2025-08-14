import { createIPX, createIPXH3Handler, ipxHttpStorage } from 'ipx'

export default lazyEventHandler(() => {
    const config = useRuntimeConfig()
    const PROFILE_URL = config.profileUrl

    const ipx = createIPX({
        maxAge: 3600,
        alias: {
            '/profile/upload': PROFILE_URL
        },
        storage: ipxHttpStorage({
            domains: ['localhost', config.domain]
        })
    })

    return useBase('/ipx', createIPXH3Handler(ipx))
})
