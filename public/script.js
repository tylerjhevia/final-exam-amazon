const inventoryButton = $('.inventory-button');
const inventoryContainer = $('.inventory-container');
const ordersButton = $('.orders-button');
const ordersContainer = $('.orders-container');
const cartContainer = $('.cart-container');
const itemList = $('.item-list');
const checkoutButton = $('.checkout');
const leftArrow = $('.left-arrow-icon');
const rightArrow = $('.right-arrow-icon');
let cart = [];
let totalPrice = 0;

fetchInventory();
fetchOrderHistory();
getCartItems();

function getCartItems() {
  let cartKeys = Object.keys(localStorage);
  cartKeys.map(key => {
    appendCartItem(JSON.parse(localStorage[key]));
  });
}

function fetchInventory() {
  fetch('/api/v1/inventory')
    .then(response => response.json())
    .then(response => appendAllInventoryItems(response));
}

function appendAllInventoryItems(inventory) {
  inventoryContainer.empty();
  inventory.forEach(item => appendInventoryItem(item));
}

function appendInventoryItem(item) {
  inventoryContainer.append(`
    <div class='item' >
        <p class='item-title'>${item.title}</p>
        <img class='item-image' src=${item.url} alt='item image'/>
        <button class='add-to-cart' data-title="${item.title}" data-price=${item.price}>Add to Cart</button>
        <p class='item-description'>${item.description}</p>
        <p class='item-price>$${item.price}</p>
    </div>`);
}

function fetchOrderHistory() {
  fetch('/api/v1/order_history')
    .then(response => response.json())
    .then(response => appendAllOrders(response));
}

function appendAllOrders(orders) {
  $('.order').remove();
  orders.forEach(order => appendOrder(order));
}

function appendOrder(order) {
  ordersContainer.append(`
    <div class='order'>
    <p class='order-label'>Order</p>
         <p class='order-price'>Price: ${order.total_price}</p> 
         <p class='order-date'>Date: ${order.date}</p> 
    </div>`);
}

function addToCart(e) {
  let price = e.target.dataset.price;
  let title = e.target.dataset.title;

  totalPrice += parseFloat(price);
  $('.total-price').text(`${totalPrice.toFixed(2)}`);

  let newCartItem = { price: price, title: title };

  cart.push(newCartItem);
  appendCartItem(newCartItem);

  localStorage.setItem(
    `title${localStorage.length}`,
    JSON.stringify(newCartItem)
  );
}

function appendCartItem(item) {
  itemList.append(`<div class='cart-item'>
        <p class='cart-title'>${item.title}</p>
        <p class='cart-price'>${item.price}</p>
    </div>`);
}

function checkout() {
  let totalPrice = cart.reduce((acc, item) => {
    let price = parseFloat(item.price);
    return (acc += price);
  }, 0);
  totalPrice = totalPrice.toFixed(2);

  let newOrder = {
    total_price: totalPrice,
    date: new Date()
  };

  cart = [];

  localStorage.clear();
  itemList.empty();
  resetPrice();

  postNewOrder(newOrder);
}

function resetPrice() {
  totalPrice = 0;
  $('.total-price').text(totalPrice);
}

function postNewOrder(newOrder) {
  fetch('/api/v1/order_history', {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => console.log(response));
}

function revealCart() {
  $(cartContainer).toggleClass('hidden');
}

function revealOrders() {
  $(ordersContainer).toggleClass('hidden');
}

function flipRightArrow(rightArrow) {
  $(rightArrow).toggleClass('rotate');
}

function flipLeftArrow(leftArrow) {
  $(leftArrow).toggleClass('rotate');
}

inventoryButton.on('click', fetchInventory);
ordersButton.on('click', fetchOrderHistory);
inventoryContainer.on('click', '.add-to-cart', addToCart);
checkoutButton.on('click', checkout);
rightArrow.on('click', revealOrders);
leftArrow.on('click', revealCart);
$('.left-x').on('click', revealOrders);
$('.right-x').on('click', revealCart);
