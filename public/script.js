const test = $('.test');
const inventoryContainer = $('.inventory-container');

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

test.on('click', () => fetchInventory());
