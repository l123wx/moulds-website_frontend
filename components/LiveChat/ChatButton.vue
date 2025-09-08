<template>
    <div class="live-chat-button">
        <button aria-label="Open live chat dialog">
            <i
                class="material-icons type1 for-closed active"
                style="color: var(--custom-text-color, #fff);"
            >
                <svg id="ic_bubble" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
            </i>
            <i
                class="material-icons type1 for-opened "
                style="color: var(--custom-text-color, #fff);"
            >
                <svg id="ic_close" fill="#000000" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                        d="M5.275 16L4 14.725L8.725 10L4 5.275L5.275 4L10 8.725L14.725 4L16 5.275L11.275 10L16 14.725L14.725 16L10 11.275L5.275 16Z">
                    </path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
            </i>
        </button>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
  .live-chat-button {
      position: absolute;
      bottom: 52px;
      right: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 1;

      --bubble-size: 56px;
      --custom-background: #0566ff;

      button {
          // reset
          background: none;
          border: 0px;
          color: inherit;
          font-style: inherit;
          font-variant: inherit;
          font-weight: inherit;
          font-stretch: inherit;
          font-size: inherit;
          font-family: inherit;
          font-optical-sizing: inherit;
          font-size-adjust: inherit;
          font-kerning: inherit;
          font-feature-settings: inherit;
          font-variation-settings: inherit;
          line-height: normal;
          overflow: visible;
          padding: 0px;
          user-select: none;
          outline: none;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

          width: var(--bubble-size, 60px);
          height: var(--bubble-size, 60px);
          border-radius: 28px;
          display: inherit;
          align-items: center;
          justify-content: center;
          pointer-events: initial;
          transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          color: rgb(5, 102, 255);
          background: var(--custom-background);

          box-shadow: rgba(0, 77, 255, 0.5) 0px 2px 16px;

          &:hover {
              transform: scale(1.1);
          }

          &:active {
              transform: scale(0.9);
          }

          i {
              height: 26px;
              width: 26px;
              position: absolute;
              opacity: 0;
              transition: 0.2s ease-in-out;
              display: flex;
              align-items: center;
              justify-content: center;

              &.active {
                  opacity: 1;
              }
          }
      }
  }
</style>
