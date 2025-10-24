import { BaseForm } from "./BaseForm";
import { EventEmitter } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { IValidationErrors } from "../../../types";

export class FormContactsView extends BaseForm {
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>('[name=email]', container);
    this.phoneInput = ensureElement<HTMLInputElement>('[name=phone]', container);

    this.emailInput.addEventListener('input', () => {
      this.events.emit('form:email:changed', { email: this.emailInput.value });
    });

    this.phoneInput.addEventListener('input', () => {
      this.events.emit('form:phone:changed', { phone: this.phoneInput.value });
    });

    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.events.emit('form:contacts:submit')
    })
  }

  checkIsFormValid(errors: IValidationErrors): boolean {
    this.errorText = errors.email || errors.phone || '';
    return !errors.email && !errors.phone;
  }

  resetFormState(): void {
    this.emailInput.value = '';
    this.phoneInput.value = '';
  }
}