import { IGalleryData } from "../../types";
import { Component } from "../base/Component";

export class Gallery extends Component<IGalleryData> {
  constructor(container: HTMLElement) {
    super(container)
  }
  set galleryList(cards: HTMLElement[]) {
    this.container.replaceChildren(...cards)
  }
}