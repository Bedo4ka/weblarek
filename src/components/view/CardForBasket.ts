import { ensureElement } from "../../utils/utils";
import { BaseCard } from "./BaseCard";
import { IEvents } from "../base/Events";

export class CardForBasket extends BaseCard {
  private deleteBtn: HTMLButtonElement;

  indexCard: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events)
    this.indexCard = ensureElement<HTMLElement>('.basket__item-index', container)
    this.deleteBtn = ensureElement<HTMLButtonElement>('.basket__item-delete', container)

    this.deleteBtn.addEventListener('click', () => {
      this.events.emit('product:delete', {id: this._id})
    })
  }

  set index(index: number){
    this.indexCard.textContent = String(index)
  }
  }