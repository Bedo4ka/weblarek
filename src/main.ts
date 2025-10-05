import "./scss/styles.scss";
import { Products } from "./components/base/Models/Products";
import { Cart } from "./components/base/Models/Cart";
import { Buyer } from "./components/base/Models/Buyer";
import { apiProducts } from "./utils/data";
import { Larek } from "./components/base/Models/Larek";
import { Api } from "./components/base/Api";
import { IProduct } from "./types";

console.log("--- Проверка Products ---");
const productsModel = new Products();
// Сохраняем товары из тестового объекта
productsModel.setProducts(apiProducts.items);
// Проверяем массив всех товаров
console.log("Массив товаров из каталога:", productsModel.getProducts());
// Проверяем получение товара по id
const testProductId = apiProducts.items[0].id;
console.log("Товар по ID:", productsModel.getProductById(testProductId));
// Сохраняем выбранный товар для просмотра
productsModel.setSelectedProduct(apiProducts.items[0]);
console.log("Выбранный товар:", productsModel.getSelectedProduct());

console.log("--- Проверка Cart ---");
const cartModel = new Cart();
// Добавляем товар в корзину
cartModel.addItem(apiProducts.items[0]);
console.log("Товары в корзине после добавления:", cartModel.getItems());
// Проверяем наличие товара в корзине
console.log(
  "Есть ли товар в корзине (по id):",
  cartModel.hasItem(apiProducts.items[0].id)
);
// Добавляем ещё один товар
cartModel.addItem(apiProducts.items[1]);
console.log(
  "Товары в корзине после добавления второго товара:",
  cartModel.getItems()
);
// Получаем общую стоимость и количество товаров
console.log("Общая стоимость товаров:", cartModel.getTotalPrice());
console.log("Количество товаров в корзине:", cartModel.getItemCount());
// Удаляем товар
cartModel.removeItem(apiProducts.items[0].id);
console.log(
  "Товары в корзине после удаления первого товара:",
  cartModel.getItems()
);
// Очищаем корзину
cartModel.clear();
console.log("Товары в корзине после очистки:", cartModel.getItems());

console.log("--- Проверка Buyer ---");
const buyerModel = new Buyer();
// Сохраняем данные покупателя
buyerModel.setPayment("card");
buyerModel.setEmail("test@example.com");
buyerModel.setPhone("123456789");
buyerModel.setAddress("");
console.log("Данные покупателя после установки:", buyerModel.getData());
// Проверяем валидацию (все поля заполнены — ошибок быть не должно)
console.log("Результат валидации:", buyerModel.validate());
// Очищаем данные
buyerModel.clear();
console.log("Данные покупателя после очистки:", buyerModel.getData());
// Проверяем валидацию пустого покупателя
console.log("Валидация после очистки:", buyerModel.validate());

const api = new Api("API_URL");
const larekInstance = new Larek(api);

console.log("--- Получаем каталог товаров с сервера ---");

larekInstance.fetchProducts()
  .then((products: IProduct[]) => {
    // Сохраняем данные в модель
    productsModel.setProducts(products);

    // Проверяем работу модели
    console.log("Каталог товаров, полученный с сервера:", productsModel.getProducts());
  })
  .catch(error => {
    console.error("Ошибка при получении товаров с сервера:", error);
  });