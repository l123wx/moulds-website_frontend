<template>
    <div ref="detailContentRef" @click="handleContentClick" v-html="addInputToContent(content)"></div>
</template>

<script setup lang="ts">
    defineProps<{
        content: string
    }>()

    const emit = defineEmits(['change'])

    const detailContentRef = ref<HTMLDivElement>()

    const quantities: Record<string, number> = {}
    const addInputToContent = (html: string): string => {
        // 使用正则匹配整个结构，包括em标签和其内容
        const regex = /<td(\s[^>]*)?>\s*<em>([^<]*)<\/em>/gi

        // 执行替换，同时提取em的内容
        const result = html.replace(regex, (_match, tdAttributes, emContent) => {
            // 转义em内容中的引号，避免破坏HTML属性
            const escapedContent = emContent.replace(/"/g, '&quot;')

            quantities[escapedContent] = 0

            const inputHtml = `
                <div class="number-input" data-product-name="${escapedContent}">
                    <button class="minus quantity-button">-</button>
                    <div class="quantity-number">0</div>
                    <button class="plus quantity-button">+</button>
                </div>
            `

            return `<td data-class="product-name-td" ${tdAttributes || ''}>${inputHtml}<em>${emContent}</em>`
        })

        return result
    }

    const handleContentClick = (event: MouseEvent) => {
        const target = event.target as HTMLDivElement
        if (target && target.classList.contains('quantity-button')) {
            const isPlus = target.classList.contains('plus')
            const productName = target.parentElement!.dataset.productName!
            const quantity = quantities[productName]

            const newQuantity = isPlus ? quantity + 1 : quantity === 0 ? 0 : quantity - 1
            changeQuantityByName(productName, newQuantity)

            emit('change', productName, newQuantity)
        }
    }

    const changeQuantityByName = (name: string, value: number) => {
        if (!Object.keys(quantities).includes(name)) { return }

        quantities[name] = value
        document.querySelector(`.number-input[data-product-name=${name}] > .quantity-number`)!.innerHTML = String(value)
    }

    defineExpose({
        changeQuantityByName
    })
</script>

<style scoped lang="less">
    :deep(td[data-class=product-name-td]) {
        .number-input {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-right: 10px;

            > .quantity-button {
                width: 24px;
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #dddddd;
                font-size: 20px;
                border-radius: 4px;
                cursor: pointer;
                user-select: none;
            }
        }

        > em {
            font-style: normal;
        }
    }
</style>
