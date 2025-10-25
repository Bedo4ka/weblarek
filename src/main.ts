import './scss/styles.scss';
import { API_URL, categoryMap } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Events'; 
import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { IProduct, TOrder, TPayment } from './types';
import { Api} from './components/base/Api';
import { Server } from './components/Models/Server';
import { Gallery } from './components/view/Gallery';
import { Modal } from './components/view/Modal';
import { Header } from './components/view/Header';
import { BasketView } from './components/view/BasketView';
import { Success } from './components/view/Success';
import { FormOrderView } from './components/view/Form/FormOrderView';
import { FormContactsView } from './components/view/Form/FormContactsView';
import { CardForCatalog } from './components/view/CardForCatalog';
import { CardForPreview } from './components/view/CardForPreview';
import { CardForBasket } from './components/view/CardForBasket';

enum Templates {
  CARD_CATALOG = '#card-catalog',
  CARD_PREVIEW = '#card-preview',
  CARD_BASKET = '#card-basket',
  FORM_ORDER = '#order',
  FORM_CONTACTS = '#contacts',
  SUCCESS = '#success',
  BASKET = '#basket',
}

export const events = new EventEmitter();

const baseApi = new Api(API_URL);
const serverService = new Server(baseApi);

const cardForCatalogTemplate = ensureElement<HTMLTemplateElement>(Templates.CARD_CATALOG);
const cardForPreviewTemplate = ensureElement<HTMLTemplateElement>(Templates.CARD_PREVIEW);
const cardForBasketTemplate = ensureElement<HTMLTemplateElement>(Templates.CARD_BASKET);
const formOrderTemplate = ensureElement<HTMLTemplateElement>(Templates.FORM_ORDER);
const formContactsTemplate = ensureElement<HTMLTemplateElement>(Templates.FORM_CONTACTS);
const successTemplate = ensureElement<HTMLTemplateElement>(Templates.SUCCESS);
const basketTemplate = ensureElement<HTMLTemplateElement>(Templates.BASKET);

const galleryElement = ensureElement<HTMLElement>('.gallery');
const headerElement = ensureElement<HTMLElement>('.header');
const modalElement = ensureElement<HTMLElement>('.modal');

const productsModel = new Products();
const basketModel = new Basket(events);
const buyerModel = new Buyer(events);

const galleryView = new Gallery(galleryElement);
const headerView = new Header(headerElement, events);
const modal = new Modal(modalElement, events);
const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const successView = new Success(cloneTemplate(successTemplate), events);
const formOrderView = new FormOrderView(cloneTemplate(formOrderTemplate), events);
const formContactsView = new FormContactsView(cloneTemplate(formContactsTemplate), events);

serverService.fetchProducts()
  .then((products: IProduct[]) => {
    productsModel.setProducts(products);
    console.log(productsModel.getProducts());
  })
  .catch((err: unknown) => console.error('Не удалось загрузить товары: ', err));

events.on('products:change', (products: IProduct[]) => {
  const cards = products.map(product => {
    const card = new CardForCatalog(cloneTemplate(cardForCatalogTemplate), events);
    const container = card.render(product);
    if (product.category) card.categoryValue = product.category as keyof typeof categoryMap;
    return container;
  });
  galleryView.galleryList = cards;
});

events.on('product:select', (data: { id: string }) => {
  const product = productsModel.getProductById(data.id);
  if (product) productsModel.setSelectedProduct(product);
});

events.on('product:selected:set', (product: IProduct) => {
  const card = new CardForPreview(cloneTemplate(cardForPreviewTemplate), events)

  if (product && product.price === null) {
    card.toggleButtonState(false);
  } else if (product && basketModel.hasItem(product.id)) {
    card.buttonText = 'Удалить из корзины';
  } else {
    card.buttonText = 'В корзину';
  }

  if (product.category) {
    card.categoryValue = product.category as keyof typeof categoryMap;
  }

  modal.open(card.render(product))
})

events.on('product:submit', (data: { id: string }) => {
  const product = productsModel.getProductById(data.id);
  if (!product) return;
  if (!basketModel.hasItem(data.id)) basketModel.addItem(product);
  else basketModel.removeItem(data.id);

  modal.close();
});

events.on('basket:open', () => {
  const hasProducts = basketModel.getItemCount() > 0;
  basketView.toggleSubmitButton(hasProducts);
  basketView.setEmptyMessage(hasProducts);
  modal.open(basketView.render());
});

events.on('basket:listChange', (data: { items: IProduct[], totalPrice: number, count: number }) => {
  const cards = data.items.map((product: IProduct, index: number) => {
    const card = new CardForBasket(cloneTemplate(cardForBasketTemplate), events);
    card.index = index + 1;

    return card.render(product);
  });

  basketView.basketList = cards;
  basketView.totalPrice = data.totalPrice;
  basketView.setEmptyMessage(data.count > 0);
  basketView.toggleSubmitButton(data.count > 0);
  headerView.counter = data.count;
});

events.on('product:delete', (data: { id: string }) => {
  const product = productsModel.getProductById(data.id)
  if(product) basketModel.removeItem(product.id);
});

events.on('basket:placeOrder', () => {
  modal.setContent(formOrderView.render());
});


events.on('payment:changed', (data: { payment: TPayment }) => {
  buyerModel.setPayment(data.payment)
});

events.on('address:changed', (data: { address: string }) => {
  buyerModel.setAddress(data.address)
});

events.on('form:email:changed', (data: { email: string }) => {
  buyerModel.setEmail(data.email);
});

events.on('form:phone:changed', (data: { phone: string }) => {
  buyerModel.setPhone(data.phone);
});

events.on('buyer:change', (data: { field: string})  => {
  const payment = buyerModel.getData().payment
  const errors = buyerModel.validate()

  if (data.field === 'payment' || data.field === 'address') {
    const isValid = formOrderView.checkIsFormValid(errors)
    formOrderView.toggleSubmitButton(isValid)
    formOrderView.toggleErrors(!isValid)
    formOrderView.togglePaymentButtonStatus(payment)
  } else if (data.field === 'email' || data.field === 'phone') {
    const isValid = formContactsView.checkIsFormValid(errors)
    formContactsView.toggleSubmitButton(isValid)
    formContactsView.toggleErrors(!isValid)
  }
});

events.on('form:order:submit', () => {
  modal.setContent(formContactsView.render())
});

events.on('form:contacts:submit', () => {
  const buyerData = buyerModel.getData();
  const items = basketModel.getItems();

  const orderData: TOrder = {
    payment: buyerData.payment,
    address: buyerData.address,
    phone: buyerData.phone,
    email: buyerData.email,
    total: basketModel.getTotalPrice(),
    items: items.map((p: IProduct) => p.id),
  };

  serverService.sendOrder(orderData)
    .then((data: { total: any; }) => {
      basketModel.clear();
      buyerModel.clear();
      headerView.counter = basketModel.getItemCount();
      successView.totalPrice = data.total
      modal.setContent(successView.render());
      formOrderView.resetFormState();
      formContactsView.resetFormState();
    })
    .catch((err: unknown) => console.error('Не удалось разместить заказ: ', err));
})

events.on('modal:close', () => {
  productsModel.clearSelectedProduct()
  modal.close();
});

events.on('success:click', () => modal.close())