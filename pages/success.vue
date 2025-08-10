<template>
    <div class="e_container-1">
        <div class=" p_item">
            <h1 class="e_h1-9">
                {{ $t('Information submitted successfully') }}
            </h1>
            <div class="e_richText-10">
                <p style="font-size: 14px; line-height: 24px; text-align: center;">{{ $t('Submitted successfully tips') }}</p>
            </div>
            <NuxtLinkLocale to="/" class="e_button-12">
                {{ $t('Back to home button text') }}
            </NuxtLinkLocale>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
    .e_container-1 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: row;
        width: 94%;
        max-width: @page-content-max-width;
        margin: 0 auto;
        min-height: calc(100vh - var(--header-height) - 100vh/5);
    }

    .e_container-1 > .p_item {
        flex: 1;
        max-width: 100%;
        max-height: 100%;
    }

    .e_h1-9 {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        color: rgba(0,0,0,1);
    }

    .e_richText-10 blockquote {
        font-style: italic;
        font-family: Georgia,Times,"Times New Roman",serif;
        padding: 2px 0;
        border-style: solid;
        border-color: #ccc;
        border-width: 0;
        padding-left: 20px;
        padding-right: 8px;
        border-left-width: 5px;
    }

    .e_richText-10 ol {
        display: block;
        list-style-type: decimal;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }

    .e_richText-10 li {
        display: list-item;
        text-align: -webkit-match-parent;
        list-style: inherit;
    }

    .e_richText-10 ul {
        display: block;
        list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }

    .e_button-12 {
        display: block;
        position: relative;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        width: 140px;
        padding: 8px;
        border-radius: 30px;
        color: #fff;
        font-size: 14px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        margin-bottom: 0px;
        background-color: rgba(0,77,255,1);
    }

    .e_button-12 span {
        display: block;
        width: 100%;
        position: relative;
        z-index: 1;
        outline: 0;
        margin: 0px;
        overflow: hidden;
    }

    .e_button-12::after {
        content: "";
        position: absolute;
        width: 0;
        height: 100%;
        transition: all .3s;
        z-index: 0;
        opacity: 0;
        top: 0;
        left: 0px;
    }

    .e_button-12:hover::after {
        opacity: 1;
    }

    .e_button-12:hover {
        color: #fff;
        background-color: rgba(0,77,255,1);
    }
</style>
