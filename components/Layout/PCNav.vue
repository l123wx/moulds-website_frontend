<template>
    <nav class="main-navigation">
        <div v-if="error">{{ 'http.error' }}</div>
        <ul v-else class="nav-list">
            <template v-for="menu in menuTreeList" :key="menu.id">
                <li v-if="menu.children && menu.children.length" class="nav-item has-dropdown">
                    <Link
                        v-if="menu.link"
                        :to="menu.link || ''"
                        :link-type="menu.linkType"
                        :open-type="menu.openType"
                        class="nav-link"
                    >
                        {{ menu.label }}
                    </Link>
                    <div v-else class="nav-link" style="cursor: default;">
                        {{ menu.label }}
                    </div>
                    <ul class="dropdown-menu">
                        <li v-for="subMenu in menu.children" :key="subMenu.id">
                            <Link
                                :to="subMenu.link || ''"
                                :link-type="subMenu.linkType"
                                :open-type="subMenu.openType"
                                class="dropdown-link"
                            >
                                {{ subMenu.label }}
                            </Link>
                        </li>
                    </ul>
                </li>
                <li v-else class="nav-item">
                    <Link
                        :to="menu.link || ''"
                        :link-type="menu.linkType"
                        :open-type="menu.openType"
                        class="nav-link"
                    >
                        {{ menu.label }}
                    </Link>
                </li>
            </template>
        </ul>
    </nav>
</template>

<script setup lang="ts">
    import Link from '~/components/Link.vue'

    defineProps<{
        menuTreeList: any[],
        error: any
    }>()
</script>

<style scoped lang="less">
.main-navigation {
    flex: 1;
    .nav-list {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 0;

        .nav-item {
            position: relative;
            padding: 0 2vw;

            &:hover > .nav-link {
                color: #004DFF;

                &::after {
                    width: 100%;
                }
            }

            .nav-link {
                display: flex;
                align-items: center;
                color: #333;
                text-decoration: none;
                font-size: 18px;
                transition: all 0.3s;
                height: 100px;
                font-weight: 600;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 0;
                    margin: 0 auto;
                    transition: all ease .3s;
                    background: #004DFF;
                    height: 4px;
                }
            }

            &.has-dropdown {
                &:hover {
                    .dropdown-menu {
                        opacity: 1;
                        visibility: visible;
                        pointer-events: auto;
                    }
                }
            }

            .dropdown-menu {
                pointer-events: none;
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #ffffff;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                border: 1px solid #e9ecef;
                border-radius: 4px;
                min-width: 200px;
                z-index: 1000;
                padding: 0 15px;
                transition: all ease .3s;
                opacity: 0;
                visibility: hidden;

                li {
                    list-style: none;

                    .dropdown-link {
                        display: block;
                        padding: 15px 0;
                        text-align: center;
                        color: #333;
                        text-decoration: none;
                        font-size: 14px;
                        transition: background 0.3s;
                        border-bottom: 1px solid #eee;

                        &:hover {
                            color: #004DFF;
                            border-bottom: 1px solid #004DFF;
                        }
                    }
                }
            }
        }
    }
}

// 响应式设计
@media screen and (max-width: @viewport-md) {
    .main-navigation {
        display: none;
    }
}
</style>
