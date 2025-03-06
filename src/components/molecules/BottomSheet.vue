<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

/**
 * Bottom sheet props interface
 */
interface BottomSheetProps {
  overlay?: boolean
  overlayColor?: string
  maxWidth?: number
  maxHeight?: number
  transitionDuration?: number
  overlayClickClose?: boolean
}

interface BottomSheetEmits {
  (e: 'opened'): void
  (e: 'closed'): void
}

const props = withDefaults(defineProps<BottomSheetProps>(), {
  overlay: true,
  overlayColor: 'rgba(0, 0, 0, 0.16)',
  maxWidth: 640,
  transitionDuration: 300,
  overlayClickClose: true,
  canSwipe: true,
})

const emit = defineEmits<BottomSheetEmits>()
const model = defineModel()

const showSheet = ref<boolean>(false)

/**
 * Sheet height value
 */
const sheetHeight = ref<number>(0)

/**
 * Dynamic translate value
 */
const translateValue = ref<number>(100)

/**
 * Refs to all sheet HTML elements
 */
const bottomSheet = ref<HTMLElement | null>(null)
const bottomSheetHeader = ref<HTMLElement | null>(null)
const bottomSheetMain = ref<HTMLElement | null>(null)
const bottomSheetFooter = ref<HTMLElement | null>(null)
const bottomSheetContent = ref<HTMLElement | null>(null)

/**
 * Close bottom sheet when escape key is pressed
 * @param element
 */
const isFocused = (element: HTMLElement) => document.activeElement === element
window.addEventListener('keyup', (event: KeyboardEvent) => {
  const isSheetElementFocused =
    bottomSheet.value!.contains(event.target as HTMLElement) &&
    isFocused(event.target as HTMLElement)

  if (event.key === 'Escape' && !isSheetElementFocused) {
    model.value = false
  }
})

/**
 * Return all classes for bottom sheet content
 */
const sheetContentClasses = computed(() => {
  return ['bottom-sheet__content']
})

/**
 * Return transition duration value with seconds
 */
const transitionDurationString = computed(() => {
  return `${props.transitionDuration}ms`
})

/**
 * Return sheet height string with px
 */
const sheetHeightString = computed(() => {
  return sheetHeight.value && sheetHeight.value > 0
    ? `${sheetHeight.value + 1}px`
    : 'auto'
})

/**
 * Return max height string
 */
const maxHeightString = computed(() => {
  return props.maxHeight ? `${props.maxHeight}px` : 'inherit'
})

/**
 * Return current translate value string with percents
 */
const translateValueString = computed(() => {
  return `${translateValue.value}%`
})

/**
 * Return max width string
 */
const maxWidthString = computed(() => {
  return `${props.maxWidth}px`
})

/**
 * Calculate sheet height
 */
const initHeight = async () => {
  await nextTick()
  sheetHeight.value =
    bottomSheetHeader.value!.offsetHeight +
    bottomSheetMain.value!.clientHeight +
    bottomSheetFooter.value!.offsetHeight
}

nextTick(() => {
  /**
   * Set initial card height
   */
  initHeight()
})

/**
 * Open bottom sheet method
 */
const open = () => {
  translateValue.value = 0
  document.documentElement.style.overflowY = 'hidden'
  document.documentElement.style.overscrollBehavior = 'none'
  showSheet.value = true
  emit('opened')
}

/**
 * Close bottom sheet method
 */
const close = async () => {
  showSheet.value = false
  translateValue.value = 100
  setTimeout(() => {
    document.documentElement.style.overflowY = 'auto'
    document.documentElement.style.overscrollBehavior = ''
    emit('closed')
  }, props.transitionDuration)
}

/**
 * Click on overlay handler
 */
const clickOnOverlayHandler = () => {
  if (props.overlayClickClose) {
    model.value = false
  }
}

/**
 * Convert pixels to vh
 * @param pixel
 */
const pixelToVh = (pixel: number) => {
  const height =
    props.maxHeight && props.maxHeight <= sheetHeight.value
      ? props.maxHeight
      : sheetHeight.value
  return (pixel / height) * 100
}

watch(model, (value, oldValue) => {
  if (value && !oldValue) {
    open()
  } else if (!value && oldValue) {
    close()
  }
})

/**
 * Define public methods
 */
defineExpose({ open, close })
</script>
<template>
  <Teleport to="body">
    <div
      class="bottom-sheet"
      ref="bottomSheet"
      :aria-hidden="!showSheet"
      role="dialog"
    >
      <transition>
        <div
          @click="clickOnOverlayHandler"
          class="bottom-sheet__overlay"
          v-show="overlay && showSheet"
        ></div>
      </transition>
      <div ref="bottomSheetContent" :class="sheetContentClasses">
        <header ref="bottomSheetHeader" class="bottom-sheet__header">
          <slot name="header"></slot>
        </header>
        <main ref="bottomSheetMain" class="bottom-sheet__main">
          <slot></slot>
        </main>
        <footer ref="bottomSheetFooter" class="bottom-sheet__footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.bottom-sheet {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: visibility v-bind('transitionDurationString');

  * {
    box-sizing: border-box;
  }

  &[aria-hidden='false'] {
    visibility: visible;
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    pointer-events: none;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: v-bind('props.overlayColor');
  }

  &__content {
    display: flex;
    flex-direction: column;
    border-radius: 16px 16px 0 0;
    background: #ffffff;
    overflow-y: hidden;
    transform: translate3d(0, v-bind('translateValueString'), 0);
    height: v-bind('sheetHeightString');
    max-width: v-bind('maxWidthString');
    width: 100%;
    max-height: v-bind('maxHeightString');
    box-sizing: border-box;
    pointer-events: all;

    &--fullscreen {
      border-radius: 0;
    }

    &:not(.bottom-sheet__content--dragging) {
      transition: v-bind('transitionDurationString') ease;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    touch-action: auto !important;

    // &::-webkit-scrollbar {
    //   height: 8px;
    //   width: 8px;
    // }
    // &::-webkit-scrollbar-corner {
    //   display: none;
    // }
    // &:hover::-webkit-scrollbar-thumb {
    //   background-color: rgba(0, 0, 0, 0.2);
    //   border-radius: 8px;
    // }
    // &::-webkit-scrollbar-thumb {
    //   background-color: rgba(0, 0, 0, 0);
    // }
  }

  &__footer:empty {
    display: none;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity v-bind('transitionDurationString') ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
