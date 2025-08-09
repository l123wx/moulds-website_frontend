import { useMediaQuery } from '@vueuse/core'

const useScreenMediaQuery = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')

    return {
        isMobile
    }
}

export default useScreenMediaQuery
