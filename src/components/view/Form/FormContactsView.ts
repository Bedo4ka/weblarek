import { BaseForm } from "./BaseForm";
import { EventEmitter } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { IValidationErrors } from "../../../types";

export class FormContactsView extends BaseForm {
  private emailInput!: HTMLInputElement;
  private phoneInput!: HTMLInputElement;
  formElement: any;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.formElement = container.querySelector("#formContacts");
    if (this.formElement === null) {
      console.error("Элемент формы с идентификатором formContacts не найден");
      return;
    }
    this.emailInput = ensureElement<HTMLInputElement>(
      "[name=email]",
      container
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      "[name=phone]",
      container
    );

    this.emailInput.addEventListener("submit", () => {
      this.events.emit("form:email:changed", { email: this.emailInput.value });
    });

    this.phoneInput.addEventListener("submit", () => {
      this.events.emit("form:phone:changed", { phone: this.phoneInput.value });
    });

    this.formElement.addEventListener('submit', (e: SubmitEvent): void => {
      e.preventDefault();
      this.events.emit('form:contacts:submit');
    });
  }

  checkIsFormValid(errors: IValidationErrors): boolean {
    this.errorText = errors.email || errors.phone || "";
    return !errors.email && !errors.phone;
  }

  resetFormState(): void {
    this.emailInput.value = "";
    this.phoneInput.value = "";
  }
}