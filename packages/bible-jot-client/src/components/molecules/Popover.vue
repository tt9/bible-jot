<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import {
  AnchorStrategies,
  PopoverMenuAnchorPoint,
  type MenuState,
} from './Popover'

import anime from 'animejs'

interface PopoverProps {
  hostElement?: HTMLElement
  anchorPoint?: PopoverMenuAnchorPoint
  nudgeX?: number
  nudgeY?: number
  maxWidth?: number
}
const props = withDefaults(defineProps<PopoverProps>(), {
  anchorPoint: PopoverMenuAnchorPoint.TOP_RIGHT,
  nudgeX: 0,
  nudgeY: 0,
})

/**
 * Show is the interactable variable for controlling & triggering
 * the animation, render is a variable that actually controls the
 * elements rendered by vue so we can animate out before setting
 * v-if to false in the template
 */
const show = defineModel<boolean>()
const render = ref<boolean>(show.value || false)

const rootElement = ref<HTMLElement | null>(null)
const backdropElement = ref<HTMLElement | null>(null)
const templateAnchorElement = ref<HTMLElement | null>(null)
const bodyElement = computed(() => document.body)

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

const preCalculateState = async () => {
  return new Promise((res) => {
    const rootEl = rootElement.value
    const backdropEl = backdropElement.value

    if (!rootEl || !backdropEl)
      throw new Error(
        `preCalculateState failed because one of the elements is null`,
      )

    backdropEl.style.opacity = '0'
    rootEl.style.opacity = '0'

    backdropEl.style.display = 'block'
    backdropEl.style.visibility = 'visible'

    rootEl.style.display = 'block'
    rootEl.style.visibility = 'visible'

    requestAnimationFrame(res)
  })
}

const calculateState = () => {
  const host: HTMLElement | null =
    props.hostElement || templateAnchorElement.value?.parentElement || null

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

const cssMenuOpacityRange = [0, 1]
const cssTransformYDistance = 16
const cssBackdropOpacityRange = [0, 0.25]
const animationDuration = 250
const animationEasing = 'cubicBezier(0.4, 0, 0.2, 1)'

const animateShowMenu = async () => {
  const rootEl = rootElement.value
  const backdropEl = backdropElement.value

  if (!rootEl || !backdropEl)
    throw new Error(`Failed to animateShowMenu because an element was null`)

  const anchorStrategy = AnchorStrategies[props.anchorPoint]
  const transformTargetPosition = anchorStrategy(menuState.value)

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
    translateX: [transformTargetPosition.x, transformTargetPosition.x],
    translateY: [
      transformTargetPosition.y + cssTransformYDistance,
      transformTargetPosition.y,
    ],
  })

  backdropAnimation.play()
  menuAnimation.play()

  await Promise.all([backdropAnimation.finished, menuAnimation.finished])
  // TODO: emit event?
}

const animateHideMenu = async () => {
  const rootEl = rootElement.value
  const backdropEl = backdropElement.value

  if (!rootEl || !backdropEl)
    throw new Error(`Failed to animateHideMenu because an element was null`)

  const anchorStrategy = AnchorStrategies[props.anchorPoint]
  const transformTargetPosition = anchorStrategy(menuState.value)

  const backdropAnimation = anime({
    targets: backdropEl,
    easing: animationEasing,
    opacity: [...cssBackdropOpacityRange].reverse(),
    duration: animationDuration,
  })

  const menuAnimation = anime({
    targets: rootEl,
    easing: animationEasing,
    opacity: [...cssMenuOpacityRange].reverse(),
    duration: animationDuration,
    translateX: [transformTargetPosition.x, transformTargetPosition.x],
    translateY: [
      transformTargetPosition.y,
      transformTargetPosition.y + cssTransformYDistance,
    ],
  })

  await Promise.all([backdropAnimation.finished, menuAnimation.finished])
}

watch(show, async (value, oldValue) => {
  // Going from not showing to showing
  // then we want to calculate the state
  // and then animate it in
  if (!oldValue && value) {
    // Before we start the animation, we
    // need to allow the elements to render
    // by setting this boolean to true
    render.value = true

    // Wait for a few animation frames
    // this will allow all elements in the menu time to
    // fully render including icons and
    for (let i = 0; i < 2; i++) {
      await new Promise(requestAnimationFrame)
    }

    // Sets the proper CSS to be able to calculate
    // the bounds without yet displaying the menu
    await preCalculateState()

    // Once the bounds are calculated then
    // we can calculate the state of all the elements
    // involved in showing the menu
    calculateState()

    // Finally, animate the menu in
    await animateShowMenu()

    // else if we are going from showing
    // to not showing
    // we simply animate out
  } else if (!value && oldValue) {
    await animateHideMenu()

    render.value = false
  }
})
</script>
<template>
  <div ref="templateAnchorElement"></div>
  <Teleport :to="bodyElement">
    <div
      v-if="render"
      class="popover-menu-backdrop"
      ref="backdropElement"
      @click="show = false"
    ></div>

    <div class="popover-menu" ref="rootElement" v-if="render">
      <div>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
<style lang="scss">
.popover-menu-backdrop {
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
  z-index: 2;
}
.popover-menu {
  position: fixed;
  visibility: hidden;
  z-index: 3;
  top: 0;
  left: 0;

  transform-origin: top center;
}
</style>
