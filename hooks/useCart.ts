import { computed, unref } from 'vue'
import { useStorage } from '@vueuse/core'
import usePrice from './usePrice'

export type Specification = {
    id: number
    name: string
    imagePath?: string
    price: number
}

export type Product = {
    id: number
    slug: string
    label: string
    coverImagePath: string
}

export type CartItem = {
    id: string
    product: Product,
    specification: Specification,
    quantity: number
}

const STORAGE_KEY = 'cart-items'

export default function useCart () {
    const cartItems = useStorage<CartItem[]>(STORAGE_KEY, [])
    const { formatPrice } = usePrice()

    const itemCount = computed(() => {
        return unref(cartItems).reduce((sum, item) => sum + (item.quantity || 0), 0)
    })

    const uniqueItemCount = computed(() => unref(cartItems).length)

    const totalPrice = computed(() => {
        return unref(cartItems).reduce((sum, item) => {
            const unit = item.specification.price ?? 0
            const qty = item.quantity || 0
            return sum + unit * qty
        }, 0)
    })

    const cartIdToQuantityMap = computed(() => {
        return unref(cartItems).reduce((map, item) => {
            map[item.id] = item.quantity
            return map
        }, {} as Record<string, number>)
    })

    const formattedTotalPrice = computed(() => formatPrice(unref(totalPrice)))

    const findIndex = (cardItemId: string) => {
        return unref(cartItems).findIndex((it) => {
            return it.id === cardItemId
        })
    }

    const addItem = (cartItem: Omit<CartItem, 'id'>) => {
        const { specification, product, quantity } = cartItem
        const quantityToAdd = Math.max(1, Math.floor(quantity || 1))

        const newCartItemId = generateId(product.id, specification.id)
        const index = findIndex(newCartItemId)
        if (index >= 0) {
            unref(cartItems)[index].quantity += quantityToAdd
        } else {
            unref(cartItems).push({
                ...cartItem,
                id: newCartItemId
            })
        }
    }

    const generateId = (productId: number, specificationId: number) => {
        return `${productId}:${specificationId}`
    }

    const updateQuantity = (cardItemId: string, quantity: number) => {
        const nextQty = Math.max(1, Math.floor(quantity || 1))
        const index = findIndex(cardItemId)
        if (index >= 0) {
            const next = [...unref(cartItems)]
            next[index] = { ...next[index], quantity: nextQty }
            cartItems.value = next
        }
    }

    const removeItem = (cardItemId: string) => {
        cartItems.value = unref(cartItems).filter((it) => {
            return it.id !== cardItemId
        })
    }

    const clear = () => {
        cartItems.value = []
    }

    return {
        cartItems,
        itemCount,
        uniqueItemCount,
        totalPrice,
        formattedTotalPrice,
        cartIdToQuantityMap,
        formatPrice,
        generateId,
        addItem,
        updateQuantity,
        removeItem,
        clear
    }
}
