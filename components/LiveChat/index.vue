<template>
    <div class="live-chat-container">
        <ChatButton @click="isOpen = !isOpen" />
        <ChatBox v-model:is-open="isOpen" />
    </div>
</template>

<script setup lang="ts">
    import ChatButton from './ChatButton.vue'
    import ChatBox from './ChatBox.vue'

    const isOpen = ref(false)
</script>

<style scoped lang="less">
    .live-chat-container {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 1000;
        height: 100vh;
        pointer-events: none;
    }
</style>
