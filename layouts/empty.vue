<template>
    <div class="layout">
        <NuxtLoadingIndicator />
        <main>
            <slot />
        </main>
    </div>
</template>

<style lang="less">
    .layout {
        min-height: 100vh;
    }
</style>
