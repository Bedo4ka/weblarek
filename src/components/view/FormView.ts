import { TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface FormData {
    errors: string,
    submitButtonState: boolean
}

export class FormView<T> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;
    protected thisForm: HTMLFormElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.thisForm = this.container as HTMLFormElement;

        this.thisForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.events.emit(`${this.thisForm.name}:submit`);
        })
    }

    set errors(validationMessage: string) {
        this.errorsElement.textContent = validationMessage;
    }

    set submitButtonState(formIsValid: boolean) {
        this.submitButton.disabled = !formIsValid;
    }

    clear(): void {
        this.thisForm.reset();
    }
}

type OrderFormData = FormData & {
    buttonsState: TPayment
}

export class OrderForm extends FormView<OrderFormData> {
    protected cardPayButton: HTMLButtonElement;
    protected cashPayButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.cardPayButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashPayButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.cardPayButton.addEventListener('click', () => {
            this.events.emit('form:cardChosen');
        })
        this.cashPayButton.addEventListener('click', () => {
            this.events.emit('form:cashChosen');
        })
        this.addressInput.addEventListener('input', () => {
            this.events.emit('order:changed');
        })
    }

    set buttonsState(selectedMethod: TPayment) {
        if(selectedMethod === 'card') {
            this.cardPayButton.classList.add('button_alt-active');
            this.cashPayButton.classList.remove('button_alt-active');
        } else if(selectedMethod === 'cash') {
            this.cashPayButton.classList.add('button_alt-active');
            this.cardPayButton.classList.remove('button_alt-active');
        } else {
            this.cashPayButton.classList.remove('button_alt-active');
            this.cardPayButton.classList.remove('button_alt-active');
        }
    }

    getAddress(): string {
        return this.addressInput.value;
    }
}

export class ContactsForm extends FormView<FormData> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.emailInput.addEventListener('input', () => {
            this.events.emit('contacts:changed');
        })
        this.phoneInput.addEventListener('input', () => {
            this.events.emit('contacts:changed');
        })
    }

    getEmail(): string {
        return this.emailInput.value;
    }

    getPhone(): string {
        return this.phoneInput.value;
    }
}