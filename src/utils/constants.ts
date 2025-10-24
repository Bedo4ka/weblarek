/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

export enum AppEvents {
  // Products events
  PRODUCTS_RECEIVED = 'products:received',
  SELECTED_PRODUCT_SET = 'selected:product:set',
  PRODUCT_SELECT = 'product:select',
  PRODUCT_SUBMIT = 'product:submit',
  PRODUCT_DELETE = 'product:delete',

  //Basket events
  BASKET_OPEN = 'basket:open',
  BASKET_LIST_CHANGE = 'basket:list:change',
  BASKET_PLACE_ORDER = 'basket:place:order',

  // OrderForm events
  FORM_PAYMENT_CHANGED = 'payment:changed',
  FORM_ADDRESS_CHANGED = 'address:changed',
  FORM_ORDER_SUBMIT = 'order:submit',

  // ContactsForm events
  FORM_EMAIL_CHANGED = 'email:changed',
  FORM_PHONE_CHANGED = 'phone:changed',
  FORM_CONTACTS_SUBMIT = 'contacts:submit',
  FORM_INPUT_FOCUS = 'form:input:focus',

  //Buyer events
  BUYER_CHANGE = 'buyer:change',

  //Success events
  SUCCESS_CONFIRM = 'success:confirm',

  //Modal events
  MODAL_CLOSE = 'modal:close',
};