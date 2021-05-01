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

const renderList = (items) => {
    return items.map(item => {
        const isAdded = true;
        const basketName = isAdded ? 'Добавить' : 'Удалить';
        const basketUrl = isAdded ? `${baseUrl}${addToBasketUrl}` : `${baseUrl}${removeFromBasketUrl}`
        return `
            <div class="goods-list__item">
                <img />
                <span class="heading">${item.product_name}</span>
                <a class="button" href="${basketUrl}">${basketName}</a>
            </div>
        `;
    }).join('')
};

const insertCode = (container, html) => {
    container.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', async () => {
    let isBasketOpen = false;
    const r = await fetch(`${baseUrl}${getListUrl}`);
    goods = await r.json();
    console.log(goods);
    const listElement = document.querySelector('.goods-list');

    insertCode(listElement, renderList(goods));

    const cartBtn = document.querySelector('.cart-button');
    const cart = document.querySelector('.basket');

    cartBtn.addEventListener('click', () => {
        isBasketOpen = !isBasketOpen;
        cart.style.display = isBasketOpen ? 'none': 'block';
    });
});
