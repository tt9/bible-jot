<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import {
  AnchorStrategies,
  PopoverMenuAnchorPoint,
  type MenuState,
} from './PopoverMenu'

import anime from 'animejs'

interface PopoverMenuProps {
  hostElement?: HTMLElement
  anchorPoint?: PopoverMenuAnchorPoint
  nudgeX?: number
  nudgeY?: number
}
const props = withDefaults(defineProps<PopoverMenuProps>(), {
  anchorPoint: PopoverMenuAnchorPoint.TOP_RIGHT,
  nudgeX: 0,
  nudgeY: 0,
})
const model = defineModel<boolean>()

const rootElement = ref<HTMLElement | null>(null)
const backdropElement = ref<HTMLElement | null>(null)
const popoverMenuContentElement = ref<HTMLElement | null>(null)

const menuState = ref<MenuState>({
  windowWidth: 0,
  windowHeight: 0,
  hostWidth: 0,
  hostHeight: 0,
  hostX: 0,
  hostY: 0,
  menuWidth: 0,
  menuHeight: 0,
  menuX: 0,
  menuY: 0,
  nudgeX: 0,
  nudgeY: 0,
})

// const oneAnimationFrame = async () => {
//   return new Promise((res) => requestAnimationFrame(res))
// }

const preCalculateState = async () => {
  return new Promise((res, rej) => {
    const rootEl = rootElement.value
    const backdropEl = backdropElement.value
    const contentEl = popoverMenuContentElement.value

    if (!rootEl || !backdropEl || !contentEl)
      throw new Error(
        `preCalculateState failed because one of the elements is null`,
      )

    backdropEl.style.opacity = '0'
    rootEl.style.opacity = '0'
    contentEl.style.opacity = '1'

    backdropEl.style.display = 'block'
    backdropEl.style.visibility = 'visible'

    rootEl.style.display = 'block'
    rootEl.style.visibility = 'visible'

    requestAnimationFrame(res)
  })
}

const calculateState = () => {
  const host: HTMLElement | null =
    props.hostElement || rootElement.value?.parentElement || null

  console.log(host)
  if (!host) throw new Error('Popover Menu failed to find host element')
  if (!rootElement.value)
    throw new Error('Popover Menu failed to find rootElement')

  const { innerWidth, innerHeight } = window
  const {
    width: hostWidth,
    height: hostHeight,
    left: hostX,
    top: hostY,
  } = host.getBoundingClientRect()
  const {
    width: menuWidth,
    height: menuHeight,
    left: menuX,
    top: menuY,
  } = rootElement.value.getBoundingClientRect()

  menuState.value = {
    windowWidth: innerWidth,
    windowHeight: innerHeight,
    hostWidth,
    hostHeight,
    hostX,
    hostY,
    menuWidth,
    menuHeight,
    menuX,
    menuY,
    nudgeX: props.nudgeX,
    nudgeY: props.nudgeY,
  }
}

const setMenuPositionToHost = () => {
  const anchorStrategy = AnchorStrategies[props.anchorPoint]
  const position = anchorStrategy(menuState.value)

  const rootEl = rootElement.value
  if (!rootEl) throw new Error('Unable to set menu position to host')

  rootEl.style.transform = `translate(${position.x}px, ${position.y}px)`
}

const cssMenuOpacityRange = [0, 1]
const cssBackdropOpacityRange = [0, 0.3]
const animationDuration = 300
const animationEasing = 'cubicBezier(0.4, 0, 0.2, 1)'

const animateShowMenu = async () => {
  const rootEl = rootElement.value
  const backdropEl = backdropElement.value
  const contentEl = popoverMenuContentElement.value

  if (!rootEl || !backdropEl || !contentEl)
    throw new Error(`Failed to animateShowMenu because an element was null`)

  const backdropAnimation = anime({
    targets: backdropEl,
    easing: animationEasing,
    opacity: cssBackdropOpacityRange,
    duration: animationDuration,
  })

  const menuAnimation = anime({
    targets: rootEl,
    easing: animationEasing,
    opacity: cssMenuOpacityRange,
    duration: animationDuration,
  })
}

watch(model, async (value, oldValue) => {
  // Going from not showing to showing
  // then we want to calculate the state
  // and then animate it in
  if (!oldValue && value) {
    // Sets the proper CSS to be able to calculate
    // the bounds without yet displaying the menu
    await preCalculateState()

    // Once the bounds are calculated then
    // we can calculate the state of all the elements
    // involved in showing the menu
    calculateState()

    // Set the base position of the menu to the host
    // this is based off of the calculated menu state
    setMenuPositionToHost()

    // Finally, animate the menu in
    await animateShowMenu()

    // else if we are going from showing
    // to not showing
    // we simply animate out
  } else if (!value && oldValue) {
  }
})
</script>
<template>
  <div class="popover-menu-backdrop" ref="backdropElement"></div>
  <div class="popover-menu" ref="rootElement">
    <div ref="popoverMenuContentElement">
      <slot> Hi its me a sample data </slot>
    </div>
  </div>
</template>
<style lang="scss">
.popover-menu-backdrop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
}
.popover-menu {
  display: none;
  position: fixed;
  z-index: 3;
  visibility: hidden;

  background: white;
  top: 0;
  left: 0;

  // temp
  padding: 1rem;
  border-radius: 0.5rem;

  transform: translate(0, 0);
}
</style>
