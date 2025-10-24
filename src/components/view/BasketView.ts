import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IBasketViewData } from "../../types";

export class BasketView extends Component<IBasketViewData> {
  private events: IEvents;
  private listContainer: HTMLUListElement;
  private totalPriceElement: HTMLElement;
  private submitButton: HTMLButtonElement;
  private emptyMessage: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    this.listContainer = ensureElement<HTMLUListElement>('.basket__list', container);
    this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', container);
    this.submitButton = ensureElement<HTMLButtonElement>('.basket__button', container);
    try {
      this.emptyMessage = ensureElement<HTMLElement>('.basket__empty', container);
    } catch (error) {
      const emptyMessageElement = document.createElement('div');
      emptyMessageElement.className = 'basket__empty';
      container.appendChild(emptyMessageElement);
      this.emptyMessage = emptyMessageElement;
    }

    this.submitButton.addEventListener('click', () => {
      this.events.emit('basket:placeOrder');
    });
  }

  set basketList(cards: HTMLElement[]) {
    this.listContainer.replaceChildren(...cards)
  }

  set totalPrice(value: number) {
  this.totalPriceElement.textContent = `${value} синапсов`;
  }

  setEmptyMessage(hasItems: boolean) {
    if (hasItems) {
      this.emptyMessage.style.display = 'none';
    } else {
      this.emptyMessage.style.display = 'block';
    }
  }

  toggleSubmitButton(enabled: boolean) {
    this.submitButton.disabled = !enabled;
  }

}