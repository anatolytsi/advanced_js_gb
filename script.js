const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addToBasketUrl = '/addToBasket';
const removeFromBasketUrl = '/deleteFromBasket.json';

const makeGETRequest = (url, callback) => {
    return new Promise(async(resolve) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 0:
                    console.log('Initialization');
                    break;
                case 1:
                    console.log('Loading');
                    break;
                case 2:
                    console.log('Server loaded');
                    break;
                case 3:
                    console.log('Exchange');
                    break;
                case 4:
                    callback(xhr.responseText);
                    resolve();
                    break;
                default:
                    break;
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    })
}

let goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const basketName = 'Добавить';

const insertCode = (container, html) => {
    container.innerHTML = html;
};

class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    addToBasket() {
        return new Promise(async(resolve) => {
            makeGETRequest(`${baseUrl}${addToBasketUrl}`, (data) => {
                resolve(JSON.parse(data));
            });
        });
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

    static fetchData() {
        return new Promise(async(resolve) => {
            makeGETRequest(`${baseUrl}${getListUrl}`, (data) => {
                resolve(JSON.parse(data));
            });
        });        
    }

    static transformData(list) {
        return list.map(item => ({
            title: item.product_name,
            price: item.price,
            id: item.id_product
        }));
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

    removeFromBasket() {
        return new Promise(async(resolve) => {
            makeGETRequest(`${baseUrl}${removeFromBasketUrl}`, (data) => {
                resolve(JSON.parse(data));
            });
        });  
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

    getBasket() {
        return new Promise(async(resolve) => {
            makeGETRequest(`${baseUrl}${getBasketUrl}`, (data) => {
                resolve(JSON.parse(data));
            });
        });        
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
    const listElement = document.querySelector('.goods-list');

    await Goods.fetchData().then(data => {
        goods = Goods.transformData(data);
        const items = goods.map((product) => new Product(product.title, product.price));
        const goodsList = new Goods(items);
        goodsList.render(listElement);
    });
    

    const cartBtn = document.querySelector('.cart-button');
    const cart = document.querySelector('.basket');

    cartBtn.addEventListener('click', () => {
        isBasketOpen = !isBasketOpen;
        cart.style.display = isBasketOpen ? 'none': 'block';
    });
});
