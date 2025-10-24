import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


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
        });
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
