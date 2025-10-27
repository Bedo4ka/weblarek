import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { BaseCard } from "./BaseCard";


export class CardForCatalog extends BaseCard {
  private _image: HTMLImageElement;
  private categoryElement: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
  
    this.container.addEventListener('click', () => {
      this.events.emit('product:select', {id: this._id});
    });
  }

  set image(src: string){
    this.setImage(
      this._image, CDN_URL + `${src.slice(0, -3)+'png'}`,
    )
  }

  set productData(product: IProduct){
    this.product = product,
    this.id = product.id, 
    this.title = product.title,
    this.price = product.price,
    this.image = product.image
  }

  set altText(value: string){
    this._image.alt = value
  }

  set buttonText(value: string){  
    this.buttonText = value;
  }

  set categoryValue(categoryKey: keyof typeof categoryMap) {
    this.categoryElement.textContent = categoryKey;
    Object.values(categoryMap).forEach(className => {
      this.categoryElement.classList.remove(className);
    });

    const categoryClass = categoryMap[categoryKey];
    if (categoryClass) {
      this.categoryElement.classList.add(categoryClass);
    }
    this.categoryElement.title = categoryKey;
    this.categoryElement.dataset.category = categoryKey;
  }
}