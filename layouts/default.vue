<template>
    <div class="layout">
        <!-- <a id="page-top"></a> -->
        <NuxtLoadingIndicator />
        <Header />
        <main>
            <slot />
        </main>
        <FloatingMenu />
        <Footer />
        <LiveChat />
    </div>
</template>

<script setup lang="ts">
    // import gsap from 'gsap'

    import Header from '~/components/Layout/Header.vue'
    import Footer from '~/components/Layout/Footer.vue'
    import FloatingMenu from '~/components/Layout/FloatingMenu.vue'
    import LiveChat from '~/components/LiveChat/index.vue'

    // const route = useRoute()

    // const scrollTo = (id: string) => {
    //     const headerElement = document.querySelector('.header-container')
    //     const targetElement = document.querySelector('#' + id) as HTMLDivElement

    //     const headerHeight = headerElement!.clientHeight
    //     const targetScrollTop = targetElement.offsetTop - headerHeight

    //     gsap.to(document.querySelector('html'), { duration: 0.5, scrollTop: targetScrollTop })
    // }

    // onMounted(() => {
    //     watch(
    //         () => route.fullPath,
    //         () => {
    //             if (route.query?.hash) {
    //                 scrollTo(route.query?.hash as string)
    //             } else {
    //                 scrollTo('page-top')
    //             }
    //         },
    //         {
    //             immediate: true
    //         }
    //     )
    // })
</script>

<style lang="less">
    .layout {
        min-height: 100vh;
    }
</style>
