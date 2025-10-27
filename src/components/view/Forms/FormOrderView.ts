import { BaseForm } from "./BaseForm";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { TPayment } from "../../../types";
import { IValidationErrors } from "../../../types";


export class FormOrderView extends BaseForm {
  private cardPayButton: HTMLButtonElement
  private cashPayButton: HTMLButtonElement
  private address: HTMLInputElement

  constructor(container: HTMLElement, events: IEvents){
    super(container, events)
    this.cardPayButton = ensureElement<HTMLButtonElement>('[name="card"]', container)
    this.cashPayButton = ensureElement<HTMLButtonElement>('[name="cash"]', container)
    this.address = ensureElement<HTMLInputElement>('[name="address"]', container)

    this.cardPayButton.addEventListener('click', () => {
      this.events.emit('payment:changed', {payment: 'card'})
    })

    this.cashPayButton.addEventListener('click', () => {
      this.events.emit('payment:changed', {payment: 'cash'})
    })

    this.address.addEventListener('input', () => {
      this.events.emit('address:changed', {address: this.address.value})
    })

    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit('form:order:submit')
    });
  }

  checkIsFormValid(errors: IValidationErrors): boolean {
    this.errorText = errors.payment || errors.address || '';
    return !errors.payment && !errors.address;
  }

  resetFormState(): void {
    super.resetFormState()
    this.clear()
    this.cardPayButton.classList.remove('button_alt-active')
    this.cashPayButton.classList.remove('button_alt-active')
  }

  togglePaymentButtonStatus(status: TPayment): void {
    this.cardPayButton.classList.toggle('button_alt-active', status === 'card')
    this.cashPayButton.classList.toggle('button_alt-active', status === 'cash')
  }

  clear(): void {
    this.address.value = ''
  }
}