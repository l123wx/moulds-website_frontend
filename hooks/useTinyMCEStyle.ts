const useTinyMCEStyle = () => {
    useHead({
        link: [
            {
                rel: 'stylesheet',
                href: '/content.min.css'
            },
            {
                rel: 'stylesheet',
                href: '/custom-editor-style.css'
            }
        ]
    })
}

export default useTinyMCEStyle
