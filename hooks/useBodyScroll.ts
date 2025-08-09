const useBodyScroll = () => {
    const isScrollLock = ref(false)

    return {
        lock: () => {
            isScrollLock.value = true
            document.body.style.overflow = 'hidden'
        },
        unlock: () => {
            isScrollLock.value = false
            document.body.style.overflow = ''
        }
    }
}

export default useBodyScroll
