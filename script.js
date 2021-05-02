const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addToBasketUrl = '/addToBasket';
const removeFromBasketUrl = '/deleteFromBasket.json';

let goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
// fetch(`${baseUrl}${getListUrl}`).then((d, e) => {
//     console.log('d, ', d.json(), 'e', e);
//     return {
//         a: d.json(),
//         b: d.text()
//     };
// }).then((d) => {
//     console.log('data: ', d);
// })

const basketName = 'Добавить';
// const renderList = (items) => {
//     return items.map(item => {
//         const isAdded = true;
//         const basketName = isAdded ? 'Добавить' : 'Удалить';
//         const basketUrl = isAdded ? `${baseUrl}${addToBasketUrl}` : `${baseUrl}${removeFromBasketUrl}`
//     }).join('')
// };

const insertCode = (container, html) => {
    container.innerHTML = html;
};

class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    addToBasket() {

    }

    render() {
        return `
            <div class="goods-list__item">
                <img />
                <span class="heading">${this.title}</span>
                <span class="price">${this.price}</span>
                <a class="button" href="#">${basketName}</a>
            </div>
        `;
    }
}

class Goods {
    constructor(goods) {
        this.goods = goods;
    }

    render(container) {
        let html = '';
        for (let i in this.goods) {
            const goodsItem = this.goods[i];
            html += goodsItem.render();
        }
        container.innerHTML = html;
    }

    sum() {
        return this.goods.reduce((a, b) => a + (b.price || 0), 0);
    }

}

class BasketItem extends Product{
    constructor(basketId, product, quantity) {
        this.basketId = basketId;
        this.product = product;
        this.quantity = quantity;
    }

    sum() {
        return this.product.price * this.product.quantity;
    }
}

class Basket {
    constructor(userId, basketId) {
        this.userId = userId;
        this.id = basketId;
        this.quantity = 0;
        this.items = [];
    }

    addItem(product, quantity=1) {
        this.items.push(new BasketItem(this.basketId, product, quantity));
    }

    changeAmount() {

    }

    removeItem() {

    }

    sum() {
        
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    let isBasketOpen = false;
    // const r = await fetch(`${baseUrl}${getListUrl}`);
    // goods = await r.json();

    const items = goods.map((product) => new Product(product.title, product.price));
    const goodsList = new Goods(items);

    console.log(goods);
    const listElement = document.querySelector('.goods-list');

    // insertCode(listElement, renderList(goods));
    goodsList.render(listElement);

    const cartBtn = document.querySelector('.cart-button');
    const cart = document.querySelector('.basket');

    cartBtn.addEventListener('click', () => {
        isBasketOpen = !isBasketOpen;
        cart.style.display = isBasketOpen ? 'none': 'block';
    });
});
