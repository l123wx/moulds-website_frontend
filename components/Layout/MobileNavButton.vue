<script setup lang="ts">
    defineProps<{ expanded?: boolean }>()
</script>

<template>
    <ElButton link :aria-label="$t('navbar.button')" :class="{ expanded }">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10H45" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
            <path d="M3 24H45" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
            <path d="M3 38H45" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
        </svg>
    </ElButton>
</template>

<style lang="less" scoped>
button {
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 15px;
}

svg {
    width: 100%;
    height: 100%;
    color: #004DFF;
}

.motion-no-preference() {
    @media (prefers-reduced-motion: no-preference) {
        svg,
        path {
            transition: transform 300ms var(--ease-in-out);
        }
    }
}
.motion-no-preference();

path {
    &:nth-child(1) {
        transform-origin: 17% 30%;
    }

    &:nth-child(2) {
        transition-property: opacity;
    }

    &:nth-child(3) {
        transform-origin: 17% 70%;
    }
}

button.expanded {
    svg {
        transform: rotate(-180deg);
    }

    path:nth-child(1) {
        transform: rotate(45deg) scaleX(1.1);
    }

    path:nth-child(2) {
        opacity: 0;
    }

    path:nth-child(3) {
        transform: rotate(-45deg) scaleX(1.1);
    }
}
</style>
