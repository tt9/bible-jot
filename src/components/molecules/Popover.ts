export enum PopoverMenuAnchorPoint {
  TOP_LEFT = 'TOP_LEFT',
  TOP_CENTER = 'TOP_CENTER',
  TOP_RIGHT = 'TOP_RIGHT',
  MIDDLE_LEFT = 'MIDDLE_LEFT',
  MIDDLE_CENTER = 'MIDDLE_CENTER',
  MIDDLE_RIGHT = 'MIDDLE_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_CENTER = 'BOTTOM_CENTER',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export interface MenuState {
  windowWidth: number
  windowHeight: number
  hostWidth: number
  hostHeight: number
  hostX: number
  hostY: number
  menuWidth: number
  menuHeight: number
  menuX: number
  menuY: number
  nudgeX: number
  nudgeY: number
}

// Take in the calcualted menu state, and return
// the initial position of the popover menu
export type AnchorStrategy = (menuState: MenuState) => { x: number; y: number }

export const clamp = (low: number, val: number, high: number) => {
  return Math.max(low, Math.min(val, high))
}

export const viewportBoundaries = (menuState: MenuState) => {
  const xLow = 0
  const xHigh = menuState.windowWidth - menuState.menuWidth
  const yLow = 0
  const yHigh = menuState.windowHeight - menuState.menuHeight
  return {
    xLow,
    xHigh,
    yLow,
    yHigh,
  }
}

export const AnchorStrategies: {
  [key in PopoverMenuAnchorPoint]: AnchorStrategy
} = {
  [PopoverMenuAnchorPoint.TOP_LEFT]: (menuState: MenuState) => {
    const { xLow, xHigh, yLow, yHigh } = viewportBoundaries(menuState)

    return {
      x: clamp(xLow, menuState.hostX + menuState.nudgeX, xHigh),
      y: clamp(yLow, menuState.hostY + menuState.nudgeY, yHigh),
    }
  },

  [PopoverMenuAnchorPoint.TOP_CENTER]: (menuState: MenuState) => {
    const { xLow, xHigh, yLow, yHigh } = viewportBoundaries(menuState)
    return {
      x: clamp(
        xLow,
        (menuState.hostX - menuState.menuWidth) / 2 + menuState.nudgeX,
        xHigh,
      ),
      y: clamp(yLow, menuState.hostY + menuState.nudgeY, yHigh),
    }
  },

  [PopoverMenuAnchorPoint.TOP_RIGHT]: (menuState: MenuState) => {
    const { xLow, xHigh, yLow, yHigh } = viewportBoundaries(menuState)

    return {
      x: clamp(
        xLow,
        menuState.hostX +
          menuState.hostWidth -
          menuState.menuWidth +
          menuState.nudgeX,
        xHigh,
      ),
      y: clamp(yLow, menuState.hostY + menuState.nudgeY, yHigh),
    }
  },

  // TODO: implement the rest of the strategies
  [PopoverMenuAnchorPoint.MIDDLE_LEFT]: () => {
    return { x: 0, y: 0 }
  },
  [PopoverMenuAnchorPoint.MIDDLE_CENTER]: () => {
    return { x: 0, y: 0 }
  },
  [PopoverMenuAnchorPoint.MIDDLE_RIGHT]: () => {
    return { x: 0, y: 0 }
  },
  [PopoverMenuAnchorPoint.BOTTOM_LEFT]: () => {
    return { x: 0, y: 0 }
  },
  [PopoverMenuAnchorPoint.BOTTOM_CENTER]: () => {
    return { x: 0, y: 0 }
  },
  [PopoverMenuAnchorPoint.BOTTOM_RIGHT]: () => {
    return { x: 0, y: 0 }
  },
}

export class PopoverManager {}
