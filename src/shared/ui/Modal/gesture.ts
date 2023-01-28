let wrapper: HTMLElement
let scroller: HTMLElement

function setGesture(wrapperEl: HTMLElement, scrollerEl: HTMLElement) {
    wrapper = wrapperEl
    scroller = scrollerEl
}

let isTop = true
let initialPositionY: number | null = null

function getTranslateStyle(posY: number, unit = "px") {
    return `transform: translateY(${posY}${unit})`
}
function getTransitionStyle() {
    return `transition: transform ${_options.closeDuration}ms ease`
}

let _options: Options
type Options = {
    closableOffset: number
    closeDuration: number
    onClose: () => void
}

function setup(options: Options) {
    wrapper.addEventListener("touchmove", onTouchMove, { passive: true })
    wrapper.addEventListener("touchstart", onTouchStart)
    wrapper.addEventListener("touchend", onTouchEnd)

    _options = options
}
function setWrapperTranslate(posY: number, unit = "px") {
    if (Number.isNaN(posY)) return
    if (posY < 0) return

    // @ts-ignore
    wrapper.style = `transform: translateY(${posY}${unit})`
}
function setWrapperTransition(posY: number, unit = "px") {
    // @ts-ignore
    wrapper.style = `transform: translateY(${posY}${unit}); transition: transform ${_options.closeDuration}ms ease`
}
function setWrapperClose() {
    setWrapperTransition(100, "%")

    const timeout = setTimeout(() => {
        _options.onClose()
        clearTimeout(timeout)
    }, _options.closeDuration)
}
function setWrapperBackOpen() {
    setWrapperTransition(0)
}

let initialMovablePosition: number
let movableDelta = 0

function onTouchStart(event: any) {
    initialMovablePosition = getTouchMovePosition(event)

    if (initialPositionY === null) return

    const { y: posY } = scroller.getBoundingClientRect()

    isTop = posY >= initialPositionY
}
function onTouchEnd(event: any) {
    // initialMovablePosition = 0
    if (movableDelta > _options.closableOffset) {
        setWrapperClose()
    } else {
        setWrapperBackOpen()
    }
}
function onTouchMove(event: any) {
    const { y: posY } = scroller.getBoundingClientRect()

    if (!initialPositionY) {
        initialPositionY = posY
    }

    if (isTop) {
        movableDelta = getTouchMovePosition(event) - initialMovablePosition
    } else {
        movableDelta = 0
    }

    if (isTop && movableDelta > 0) {
        setWrapperTranslate(movableDelta)
    }

    console.log("event", isTop, movableDelta)
}
function getTouchMovePosition(event: any) {
    const touch = event.touches[0]

    return touch.screenY
}

export { setGesture, setup }
