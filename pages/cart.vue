<template>
    <div style="background: #f8fafc;">
        <div class="cart-page">
            <ClientOnly>
                <div class="cart-header">
                    <h1 class="title">{{ $t('ShoppingCart') }}</h1>
                    <div v-if="cartItems.length > 0" class="cart-count">{{ cartItems.length }} {{ $t('Items') }}</div>
                </div>

                <div v-if="cartItems.length === 0" class="empty-state">
                    <div class="empty-icon">🛒</div>
                    <h3>{{ $t('Empty Cart') }}</h3>
                    <p>{{ $t('Empty Cart Description') }}</p>
                    <NuxtLinkLocale to="/" class="continue-shopping">
                        <el-button type="primary">{{ $t('Continue Shopping') }}</el-button>
                    </NuxtLinkLocale>
                </div>

                <div v-else-if="cartItems.length > 0" class="cart-content">
                    <div class="items-list">
                        <div v-for="item in cartItems" :key="item.id" class="cart-item">
                            <div class="item-image">
                                <NuxtImg v-if="item.specification.imagePath || item.product.coverImagePath" :src="item.specification.imagePath || item.product.coverImagePath" class="thumb" />
                                <div v-else class="placeholder-image">📦</div>
                            </div>
                            <div class="item-details">
                                <div>
                                    <NuxtLinkLocale :to="productDetailPath(item.product.slug)" class="item-name">{{ item.product.label }}</NuxtLinkLocale>
                                </div>
                                <div v-if="item.specification.name" class="item-specification">{{ item.specification.name }}</div>
                                <div class="item-price">
                                    <template v-if="item.specification.price != null">{{ formatPrice(item.specification.price) }}</template>
                                    <template v-else><span class="unknown-price">{{ $t('Unknown') }}</span></template>
                                </div>
                            </div>

                            <div class="item-total">
                                <div class="total-price">
                                    {{ formatPrice((item.specification.price ?? 0) * (cartIdToQuantityMap[item.id] ?? item.quantity)) }}
                                </div>
                            </div>

                            <div class="item-quantity">
                                <el-input-number
                                    :model-value="cartIdToQuantityMap[item.id]"
                                    :min="1"
                                    size="small"
                                    style="width: 100px"
                                    @change="val => onQtyChange(item.id, val ?? 0)"
                                />
                            </div>

                            <div class="item-actions">
                                <el-button
                                    type="danger"
                                    circle
                                    plain
                                    :icon="Delete"
                                    @click="handleRemoveConfirm(item.id)"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="cart-summary">
                        <div class="summary-card">
                            <h3 class="summary-title">{{ $t('Order Summary') }}</h3>

                            <div class="summary-row">
                                <span>{{ $t('Total Items') }}:</span>
                                <span class="summary-value">{{ itemCount }}</span>
                            </div>

                            <div class="summary-row total-row">
                                <span>{{ $t('Total Amount') }}:</span>
                                <span class="total-amount">{{ formattedTotalPrice }}</span>
                            </div>

                            <div class="summary-actions">
                                <el-button
                                    class="clear-btn"
                                    type="danger"
                                    text
                                    @click="handleClearConfirm"
                                >
                                    {{ $t('Clear All') }}
                                </el-button>

                                <OrderCheckout />
                            </div>
                        </div>
                    </div>
                </div>

                <template #fallback>
                    <el-skeleton :rows="5" animated></el-skeleton>
                </template>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ElMessageBox } from 'element-plus'
    import { Delete } from '@element-plus/icons-vue'
    import useCart from '~/hooks/useCart'
    import useRoutePath from '~/hooks/useRoutePath'

    const {
        cartItems,
        itemCount,
        cartIdToQuantityMap,
        formattedTotalPrice,
        updateQuantity,
        removeItem,
        clear,
        formatPrice
    } = useCart()

    const { productDetailPath } = useRoutePath()

    const onQtyChange = (cartItemId: string, newQuantity: number) => {
        updateQuantity(cartItemId, newQuantity)
    }

    const remove = (cartId: string) => {
        removeItem(cartId)
    }

    const handleRemoveConfirm = async (cartId: string) => {
        try {
            await ElMessageBox.confirm(
                $t('Remove Cart Item Confirm Message'),
                $t('Remove Cart Item Confirm Title'),
                {
                    confirmButtonText: $t('Confirm'),
                    cancelButtonText: $t('Cancel'),
                    type: 'warning'
                }
            )
            remove(cartId)
        } catch {}
    }

    const handleClearConfirm = async () => {
        try {
            await ElMessageBox.confirm(
                $t('Clear Cart Confirm Message'),
                $t('Clear Cart Confirm Title'),
                {
                    confirmButtonText: $t('Confirm'),
                    cancelButtonText: $t('Cancel'),
                    type: 'warning'
                }
            )
            clear()
        } catch {}
    }
</script>

<style scoped lang="less">
.cart-page {
    min-height: calc(100vh - var(--header-height) - 20vh);
    max-width: @page-content-max-width;
    margin: 0 auto;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: @viewport-md) {
        padding: 20px 16px;
    }
}

// Header
.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e5e7eb;

    .title {
        font-size: 32px;
        font-weight: 700;
        color: #1f2937;
        margin: 0;
        letter-spacing: -0.025em;
    }

    .cart-count {
        background: #3b82f6;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
    }

    @media screen and (max-width: @viewport-md) {
        gap: 12px;

        .title {
            font-size: 24px;
        }
    }
}

// Empty State
.empty-state {
    text-align: center;
    padding: 80px 20px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .empty-icon {
        font-size: 64px;
        margin-bottom: 24px;
        opacity: 0.6;
    }

    h3 {
        font-size: 24px;
        color: #374151;
        margin: 0 0 12px 0;
        font-weight: 600;
    }

    p {
        color: #6b7280;
        font-size: 16px;
        margin-bottom: 32px;
        line-height: 1.5;
    }

    .continue-shopping {
        text-decoration: none;
    }
}

// Cart Content
.cart-content {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 32px;
    flex: 1;

    @media screen and (max-width: @viewport-lg) {
        grid-template-columns: 1fr;
        gap: 24px;
    }
}

// Items List
.items-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.cart-item {
    display: grid;
    grid-template-columns: 100px 1fr auto auto auto;
    gap: 20px;
    align-items: center;
    padding: 24px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media screen and (max-width: @viewport-md) {
        grid-template-columns: 80px 1fr;
        gap: 16px;
        padding: 16px;
        align-items: start;
    }
}

.item-image {
    .thumb {
        width: 100px;
        height: 100px;
        object-fit: contain;
        border-radius: 8px;
        border: 1px solid #e5e7eb;

        @media screen and (max-width: @viewport-md) {
            width: 80px;
            height: 80px;
        }
    }

    .placeholder-image {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f3f4f6;
        border-radius: 8px;
        font-size: 32px;
        border: 1px solid #e5e7eb;

        @media screen and (max-width: @viewport-md) {
            width: 80px;
            height: 80px;
            font-size: 24px;
        }
    }
}

.item-details {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media screen and (max-width: @viewport-md) {
        grid-column: 2;
        gap: 5px;
    }

    .item-name {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 8px 0;
        line-height: 1.4;

        @media screen and (max-width: @viewport-md) {
            font-size: 16px;
        }
    }

    .item-specification {
        color: #6b7280;
        font-size: 14px;
        background: #f3f4f6;
        padding: 4px 8px;
        border-radius: 6px;
        display: inline-block;
        width: fit-content;
        justify-self: start;

        @media screen and (max-width: @viewport-md) {
            font-size: 12px;
        }
    }

    .item-price {
        font-size: 16px;
        font-weight: 600;
        color: #dc2626;

        @media screen and (max-width: @viewport-md) {
            font-size: 14px;
        }

        .unknown-price {
            color: #6b7280;
            font-style: italic;
        }
    }
}

.item-quantity {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    @media screen and (max-width: @viewport-md) {
        grid-column: 2 / 3;
        grid-row: 2 / 2;
        flex-direction: row;
        justify-content: end;
        align-self: end;
    }
}

.item-total {
    text-align: center;

    @media screen and (max-width: @viewport-md) {
        display: none;
    }

    .total-price {
        font-size: 16px;
        font-weight: 700;
        color: #059669;
    }
}

.item-actions {
    @media screen and (max-width: @viewport-md) {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        display: flex;
        justify-content: start;
    }
}

// Cart Summary
.cart-summary {
    .summary-card {
        position: sticky;
        top: calc(var(--header-height) + 20px);
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

        .summary-title {
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 20px 0;
            padding-bottom: 16px;
            border-bottom: 1px solid #e5e7eb;
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;

            &:last-of-type {
                border-bottom: none;
            }

            &.total-row {
                font-size: 18px;
                font-weight: 700;
                padding: 16px 0;
                border-top: 2px solid #e5e7eb;
                margin-top: 16px;

                .total-amount {
                    color: #059669;
                    font-size: 24px;
                }
            }

            .summary-value {
                font-weight: 600;
                color: #374151;
            }
        }

        .summary-actions {
            margin-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;

            .clear-btn {
                align-self: flex-end;
                font-size: 14px;
                padding: 0;
            }
        }
    }
}
</style>
