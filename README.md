# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные

### Классы моделей

### Products
Модель для хранения и управления списком товаров.

**class Products {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  setProducts(products: IProduct[]): void;
  getProducts(): IProduct[];
  getProductById(id: string): IProduct | undefined;
  setSelectedProduct(product: IProduct): void;
  clearSelectedProduct(): void;
}**

### Basket
Модель корзины пользователя. Управляет добавлением, удалением и подсчётом товаров.

**class Basket {
  private items: IProduct[] = [];

  getItems(): IProduct[];
  addItem(product: IProduct): void;
  removeItem(productId: string): void;
  clear(): void;
  getTotalPrice(): number;
  getItemCount(): number;
  hasItem(productId: string): boolean;
}**

### Buyer
Хранит и валидирует данные покупателя. Генерирует события при изменении полей.

**class Buyer {
  private payment: TPayment | null;
  private email: string;
  private phone: string;
  private address: string;

  setPayment(payment: TPayment): void;
  setEmail(email: string): void;
  setPhone(phone: string): void;
  setAddress(address: string): void;
  getData(): IBuyer;
  validate(): Partial<Record<keyof IBuyer, string>>;
  clear(): void;
}**

### Server
Слой взаимодействия с сервером через Api.

```console
class Server {
  constructor(private api: IApi) {}

  fetchProducts(): Promise<IProduct[]>;
  sendOrder(order: TOrder): Promise<{ total: number }>;
}

```
### Представления (Views)

### BaseCard
Базовый класс карточки товара. Используется наследниками для разных контекстов.

class BaseCard {
  render(data: IProduct): HTMLElement;
  setText(element: HTMLElement, text: string): void;
  setImage(element: HTMLImageElement, src: string, alt?: string): void;
}

### CardForCatalog
Карточка в каталоге. Генерирует событие product:select при клике.

### CardForPreview
Карточка в модальном окне предпросмотра. Добавляет описание и кнопку «В корзину» (product:submit).

### CardForBasket
Карточка в корзине. Отображает порядковый номер и кнопку удаления (product:delete).

### Modal
Модальное окно для отображения карточек, корзины и форм.

**class Modal {
  open(content: HTMLElement): void;
  close(): void;
  setContent(content: HTMLElement): void;
}**
Событие: modal:close.

### Gallery
Выводит карточки товаров на главной странице.

**class Gallery {
  set galleryList(cards: HTMLElement[]): void;
  clear(): void;
}**

### BasketView
Отображает содержимое корзины и итоговую сумму.

### События:

basket:open — открыть корзину
basket:listChange — обновление списка
basket:placeOrder — переход к оформлению заказа
FormOrderView
Первый шаг оформления заказа — выбор способа оплаты и адреса.

CSS-модификатор: .button_alt-active — активная кнопка выбора оплаты.

### События:

payment:changed
address:changed
form:order:submit
FormContactsView
Второй шаг — ввод контактных данных.

### События:

form:email:changed
form:phone:changed
form:contacts:submit
Success
Отображает сообщение об успешной покупке и сумму заказа. Событие success:click возвращает пользователя в каталог.


### Событие	Описание
$$
products:change	Загрузка списка товаров
product:select	Выбор товара из каталога
product:selected:set	Открытие карточки предпросмотра
product:submit	Добавление / удаление товара из корзины
basket:open	Открытие корзины
basket:listChange	Обновление содержимого корзины
basket:placeOrder	Переход к оформлению заказа
payment:changed	Изменение способа оплаты
address:changed	Изменение адреса
form:order:submit	Отправка формы оплаты
form:contacts:submit	Отправка контактной формы
modal:close	Закрытие модального окна
success:click	Завершение оформления заказа
$$

### Презентер
Слой презентера описан в основном коде приложения