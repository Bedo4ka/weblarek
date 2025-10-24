import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { ISuccessData } from "../../types";
import { IEvents } from "../base/Events";


export class Success extends Component<ISuccessData>{
  private _totalPrice: HTMLElement
  private _button: HTMLButtonElement

  constructor(container: HTMLElement, private _events: IEvents){
    super(container)
    this._totalPrice = ensureElement<HTMLElement>('.order-success__description', container)
    this._button = ensureElement<HTMLButtonElement>('.order-success__close', container)

    this._button.addEventListener('click', () => {
      this._events.emit('success:click')
    })
  }

  set totalPrice(value: number){
    this._totalPrice.textContent = `Списано ${value} синапсов`
  }
}