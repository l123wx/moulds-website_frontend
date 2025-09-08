import { createIPX, createIPXH3Handler, ipxFSStorage, ipxHttpStorage } from 'ipx'
import { resolve } from 'pathe'

export default lazyEventHandler(() => {
    const config = useRuntimeConfig()
    const PROFILE_URL = config.profileUrl

    // 获取项目根目录路径
    const rootDir = process.cwd()

    // 创建IPX实例
    const ipx = createIPX({
        maxAge: 3600,
        alias: {
            '/profile/upload': PROFILE_URL
        },
        storage: ipxFSStorage({
            dir: [resolve(rootDir, 'public/images')]
        }),
        httpStorage: ipxHttpStorage({
            domains: ['localhost', config.domain]
        })
    })

    return useBase('/ipx', createIPXH3Handler(ipx))
})
