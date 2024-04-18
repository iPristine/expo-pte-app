import { makeAutoObservable } from "../mobx/mobx-proxy"

export class Toggle {
  isOpen: boolean

  handleOpen = () => {
    this.isOpen = true
  }

  handleClose = () => {
    this.isOpen = false
  }

  handleToggle = () => {
    if (this.isOpen) {
      this.handleClose()
      return
    }
    this.handleOpen()
  }

  constructor(isOpen = false) {
    this.isOpen = isOpen
    makeAutoObservable(this)
  }
}
