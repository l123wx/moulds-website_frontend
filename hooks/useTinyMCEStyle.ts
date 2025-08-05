const useTinyMCEStyle = () => {
    useHead({
        link: [
            {
                rel: 'stylesheet',
                href: '/content.min.css'
            }
        ]
    })
}

export default useTinyMCEStyle
