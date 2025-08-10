<script lang="ts">
    import defaultImage from '~/assets/images/no-img.svg'

    export interface ProductItem {
        id: number;
        title: string;
        image: string;
        href: string;
    }
</script>

<script setup lang="ts">
    defineProps({
        items: {
            type: Array as () => ProductItem[],
            default: () => []
        }
    })
</script>

<template>
    <div class="product-list-container">
        <div class="product-list">
            <div v-for="item in items" :key="item.id" class="product-item">
                <div class="product-card">
                    <div class="product-image">
                        <NuxtImg v-if="item.image" loading="lazy" :src="item.image" :alt="item.title" :title="item.title" />
                        <img v-else :src="defaultImage" alt="default image" />
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">{{ item.title }}</h3>
                    </div>
                    <NuxtLinkLocale :to="item.href" target="_self" class="product-link" :aria-label="item.title"></NuxtLinkLocale>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.product-list-container {
  width: 100%;
  max-width: @page-content-max-width;
  margin: 0 auto;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  margin: -10px; /* 抵消子元素的padding */
}

.product-item {
  flex: 0 0 25%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    flex: 0 0 33.33%;
  }

  @media screen and (max-width: 768px) {
    flex: 0 0 50%;
  }
}

.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #EBEBEB;
  background-color: #fff;
  transition: var(--transition-normal);
  overflow: hidden;

  &:hover {
    border-color: #004DFF;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    .product-image img {
      opacity: 0.9;
      transform: scale(1.05);
    }

    .product-info {
      background-color: #004DFF;

      .product-title {
        color: #fff;
      }
    }
  }
}

.product-image {
  flex: 1;
  overflow: hidden;
  padding: 15px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4/3;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.5s ease, opacity 0.3s ease;
  }
}

.product-info {
  padding: 15px;
  background-color: #fff;
  transition: all 0.3s ease;
  border-top: 1px solid #EBEBEB;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-title {
  font-size: 16px;
  color: #333;
  text-align: center;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  transition: all 0.3s ease;
}

.product-link {
  position: absolute;
  inset: 0; /* 简化top, right, bottom, left */
  z-index: 1;
  cursor: pointer;
}
</style>
