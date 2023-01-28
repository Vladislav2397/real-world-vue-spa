type Handlers = "onTouchStart" | "onTouchMove" | "onTouchEnd"
const mapHandlers: Record<
    symbol,
    Record<Handlers, (event: TouchEvent) => void>
> = {}

// ===== pure functions =====

function getPositionY(el: HTMLElement) {
    return el.getBoundingClientRect().y
}
function getTouchMovePosition(event: TouchEvent) {
    const touch = event.touches?.[0]

    return touch?.screenY ?? 0
}

type Unit = "px" | "%"
function getTransformStyle(posY: number, unit: Unit = "px") {
    return `translateY(${posY}${unit})`
}
function getTransitionStyle(duration = 200) {
    return `transform ${duration}ms ease`
}

function setElementTransform(el: HTMLElement, y: number, unit?: Unit) {
    el.style.setProperty("transform", getTransformStyle(y, unit))
}
function setElementTransition(el: HTMLElement, duration?: number) {
    el.style.setProperty("transition", getTransitionStyle(duration))
}
function removeElementProperty(el: HTMLElement, property: string) {
    el.style.removeProperty(property)
}

// ==========================

type Options = {
    closableOffset: number
    closeDuration: number
    onAfterClose?: () => void
    onClose: () => void
}

class MovableManager {
    private readonly wrapper: HTMLElement
    private readonly scroller: HTMLElement
    private readonly options: Options

    private initialTopPosition = 0
    private isTopPosition = true

    private initialMovablePosition = 0
    private movablePosition = 0

    // Key mapHandlers for add and remove touch handlers
    private readonly handlerKey: symbol

    constructor(
        wrapperEl: HTMLElement,
        scrollerEl: HTMLElement,
        options: Options
    ) {
        this.handlerKey = Symbol()

        this.wrapper = wrapperEl
        this.scroller = scrollerEl
        this.options = options

        this.addEvents(this.wrapper)
        this.setInitialPositionY(this.scroller)
    }

    public closeMove() {
        this.setClosableStyle()

        const { onClose, closeDuration } = this.options

        this.options.onAfterClose?.()
        const timeout = setTimeout(() => {
            onClose()
            clearTimeout(timeout)
        }, closeDuration + 50)
    }

    public destroy() {
        this.removeEvents(this.wrapper)
    }

    private setInitialPositionY(el: HTMLElement) {
        const posY = getPositionY(el)

        if (!this.initialTopPosition && !Number.isNaN(posY)) {
            this.initialTopPosition = posY
        }
    }

    private addEvents(el: HTMLElement) {
        const onTouchStart = this.onTouchStart.bind(this)
        const onTouchMove = this.onTouchMove.bind(this)
        const onTouchEnd = this.onTouchEnd.bind(this)

        mapHandlers[this.handlerKey] = { onTouchStart, onTouchMove, onTouchEnd }

        el.addEventListener("touchstart", onTouchStart)
        el.addEventListener("touchmove", onTouchMove, { passive: true })
        el.addEventListener("touchend", onTouchEnd)
    }
    private removeEvents(el: HTMLElement) {
        const { onTouchStart, onTouchMove, onTouchEnd } =
            mapHandlers[this.handlerKey]

        el.removeEventListener("touchstart", onTouchStart)
        el.removeEventListener("touchmove", onTouchMove)
        el.removeEventListener("touchend", onTouchEnd)
    }

    private updateIsTopPosition() {
        const posY = getPositionY(this.scroller)

        this.isTopPosition = posY >= this.initialTopPosition
    }

    private updateInitialMovablePosition(event: TouchEvent) {
        this.initialMovablePosition = getTouchMovePosition(event)
    }

    private onTouchStart(event: TouchEvent) {
        this.updateInitialMovablePosition(event)
        this.updateIsTopPosition()
    }

    private onTouchMove(event: TouchEvent) {
        this.updateMovablePosition(event)

        if (this.isTopPosition && this.movablePosition > 0) {
            this.setMovableStyle()
        }

        console.log("event", this.isTopPosition, this.movablePosition)
    }

    private onTouchEnd() {
        if (this.movablePosition > this.options.closableOffset) {
            this.closeMove()
        } else {
            this.setOpenedStyle()
        }
    }

    // FIXME: Maybe split logic with styles into separated class
    private setTransform(y: number, unit?: Unit) {
        setElementTransform(this.wrapper, y, unit)
    }
    private setTransition(duration?: number) {
        const { closeDuration } = this.options

        setElementTransition(this.wrapper, duration ?? closeDuration)
    }
    private clearTransition() {
        removeElementProperty(this.wrapper, "transition")
    }
    private setClosableStyle() {
        this.setTransform(100, "%")
        this.setTransition()
    }
    private setOpenedStyle() {
        this.setTransform(0)
        this.setTransition()
    }
    private setMovableStyle() {
        this.setTransform(this.movablePosition)
        this.clearTransition()
    }

    private updateMovablePosition(event: TouchEvent) {
        if (this.isTopPosition) {
            this.movablePosition =
                getTouchMovePosition(event) - this.initialMovablePosition
        } else {
            this.movablePosition = 0
        }
    }
}

class GestureMove {
    manager: MovableManager

    constructor(
        wrapperEl: HTMLElement,
        scrollerEl: HTMLElement,
        options: Options
    ) {
        this.manager = new MovableManager(wrapperEl, scrollerEl, options)
    }

    destroy() {
        this.manager.destroy()
    }

    close() {
        this.manager.closeMove()
    }
}

export { GestureMove }
