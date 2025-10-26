import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { IModalData } from "../../types";

export class Modal extends Component<IModalData> {
  private closeBtn: HTMLElement;
  private contentContainer: HTMLElement;

  private _handleEscape = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  constructor(container: HTMLElement, _events: IEvents) {
    super(container);
    this.closeBtn = ensureElement<HTMLButtonElement>('.modal__close', container);
    this.contentContainer = ensureElement<HTMLElement>('.modal__content', container);

    this.closeBtn.addEventListener('click', () => this.close());
    this.container.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }

  open(content: HTMLElement): void {
    this.setContent(content);
    this.container.classList.add('modal_active');
    document.addEventListener('keydown', this._handleEscape);
  }

  setContent(content: HTMLElement): void {
    this.contentContainer.replaceChildren(content);
  }

  close(): void {
    this.container.classList.remove('modal_active');
    document.removeEventListener('keydown', this._handleEscape);
  }
}