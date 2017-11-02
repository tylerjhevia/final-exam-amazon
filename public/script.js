const inventoryButton = $('.inventory-button');
const inventoryContainer = $('.inventory-container');

const ordersButton = $('.orders-button');
const ordersContainer = $('.orders-container');

let item = {
  title: 'Test Item',
  url: 'https://pbs.twimg.com/profile_images/573299500145483776/QA3TyDHc.jpeg',
  description: 'Pretty good item',
  price: '1,000'
};

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
    <div class='item'>
        <p class='item-title'>${item.title}</p>
        <img class='item-image' src=${item.url} alt='item image'/>
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
  ordersContainer.empty();
  orders.forEach(order => appendOrder(order));
}

function appendOrder(order) {
  ordersContainer.append(`
    <div class='order'>
         <p class='order-price'>${order.total_price}</p> 
         <p class='order-date'>${order.date}</p> 
    </div>`);
}

inventoryButton.on('click', () => fetchInventory());
ordersButton.on('click', () => fetchOrderHistory());
