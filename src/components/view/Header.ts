import { IHeaderData } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Header extends Component<IHeaderData> {
  private basketButton: HTMLElement;
  private basketCounter: HTMLElement;
  private events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    this.basketButton = ensureElement<HTMLElement>('.header__basket', container);
    this.basketCounter = ensureElement<HTMLElement>('.header__basket-counter', container);

    this.basketButton.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set counter(value: number) {
    this.basketCounter.textContent = String(value);
  }
}