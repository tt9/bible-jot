<script lang="ts" setup>
import { computed, onMounted, useTemplateRef, watch } from 'vue'
import anime from 'animejs/lib/anime.es.js'

interface ModalProps {
  hostElement?: HTMLElement
  hostElementSelector?: string
  hasBackdrop?: boolean
  closeOnBackdropClick?: boolean
  closeOnPopstate?: boolean
  width?: string
  zIndex?: number
}
interface ModalEmits {
  (e: 'modal:close'): void
  (e: 'modal:open'): void
}

const props = withDefaults(defineProps<ModalProps>(), {
  closeOnBackdropClick: true,
  closeOnPopstate: true,
  zIndex: 2,
})
const emit = defineEmits<ModalEmits>()
const open = defineModel()
const modalElementRef = useTemplateRef('modalElement')
const modalBackdropRef = useTemplateRef('modalBackdrop')
const modalPopupRef = useTemplateRef('modalPopup')

// range - defined as the animate in values - from, to
const cssModalTopRange = ['30px', '20px']
const cssModalOpacityRange = [0, 1]
const cssBackdropOpacityRange = [...cssModalOpacityRange]

const hostElement = computed(() => {
  if (props.hostElement) {
    return props.hostElement
  }
  if (props.hostElementSelector) {
    return document.querySelector(props.hostElementSelector)
  }
  return document.body
})

const animationDuration = 300
const animationEasing = 'cubicBezier(0.4, 0, 0.2, 1)'

const animateOpen = async () => {
  const modalElement = modalElementRef.value as HTMLDivElement
  const modalBackdrop = modalBackdropRef.value as HTMLDivElement
  const modalPopup = modalPopupRef.value as HTMLDivElement

  modalElement.style.display = 'block'

  const backdropAnimation = anime({
    targets: modalBackdrop,
    easing: animationEasing,
    opacity: cssBackdropOpacityRange,
    duration: animationDuration,
  })

  const popupAnimation = anime({
    targets: modalPopup,
    easing: animationEasing,
    opacity: cssModalOpacityRange,
    top: cssModalTopRange,
    duration: animationDuration,
  })

  await Promise.all([backdropAnimation.finished, popupAnimation.finished])
  emit('modal:open')
}

const animateClose = async () => {
  const modalElement = modalElementRef.value as HTMLDivElement
  const modalBackdrop = modalBackdropRef.value as HTMLDivElement
  const modalPopup = modalPopupRef.value as HTMLDivElement

  const backdropAnimation = anime({
    targets: modalBackdrop,
    easing: animationEasing,
    opacity: [...cssBackdropOpacityRange].reverse(),
    duration: animationDuration,
  })

  const popupAnimation = anime({
    targets: modalPopup,
    easing: animationEasing,
    opacity: [...cssModalOpacityRange].reverse(),
    top: [...cssModalTopRange].reverse(),
    duration: animationDuration,
  })

  await Promise.all([backdropAnimation.finished, popupAnimation.finished])

  modalElement.style.display = 'none'

  emit('modal:close')
}

const onBackdropClick = () => {
  if (props.closeOnBackdropClick) {
    if (props.closeOnPopstate) {
      window.history.back()
    }
    open.value = false
    emit('modal:close')
  }
}

const onBackButton = (e: PopStateEvent) => {
  e.preventDefault()
  open.value = false
  emit('modal:close')
}
watch(
  open,
  async (value, oldValue) => {
    if (value && !oldValue) {
      await animateOpen()
      window.history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', onBackButton)
    } else if (!value && oldValue) {
      await animateClose()
      window.removeEventListener('popstate', onBackButton)
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (!modalElementRef.value) {
    throw new Error('Modal element not found')
  }
  if (props.width && modalPopupRef.value) {
    modalPopupRef.value.style.width = props.width
  }
})
</script>

<template>
  <Teleport :to="hostElement">
    <div class="modal-parent" ref="modalElement">
      <div
        ref="modalBackdrop"
        class="modal-backdrop"
        @click="onBackdropClick()"
      ></div>
      <div ref="modalPopup" class="modal-popup">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-parent {
  display: none;
  transition: all 0.5s ease;

  .modal-backdrop {
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: v-bind('props.zIndex');
  }

  .modal-popup {
    position: fixed;
    opacity: 0;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: v-bind('props.zIndex + 1');
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.16);
    max-width: 100%;
  }
}
</style>
