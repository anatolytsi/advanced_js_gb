// const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const baseUrl = '';
const getListUrl = '/catalogData';
const getCartUrl = '/getCart';
const addToCartUrl = '/addToCart';
const removeFromCartUrl = '/removeFromCart';

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

const makePOSTRequest = (url, data, callback) => {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    }

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.send(data);
}

document.addEventListener('DOMContentLoaded', async () => {
    Vue.component('goods-search', {
        template: `<input class="header-input" type="text" placeholder="Найти товар..." v-on:input="$emit('query_event', $event.target.value)">`,
    })

    Vue.component('basket', {
        template: `
            <div class="basket" :style="is_visible ? { 'display': 'block' } : { 'display': 'none' }">
                <div class="basket-list">
                    <p style="display: block; margin: auto" v-if="!basketItems.length">Корзина пуста</p>
                    <div v-for="item in basketItems" class="basket-list__item">
                        <img src="#" alt="image">
                        <span class="heading"> {{ item.title }} </span>
                        <span class="price"> {{ item.price }} </span>
                    </div>
                </div>
            </div>
        `,
        props: {
            is_visible: {
                type: Boolean,
                default: false
            },
            basketItems: {
                type: Array,
                default: () => []
            }
        }
    });

    Vue.component('goods-list', {
        template: `
        <div>
            <div class="goods-list" v-if="goods">
                <p style="display: block; margin: auto" v-if="!goods.length">Нет данных :(</p>
                <div v-for="(item, i) in filterGoods" class="goods-list__item">
                    <img src="#" alt="image">
                    <span class="heading"> {{ item.title }} </span>
                    <span class="price"> {{ item.price }} </span>
                    <a class="button" href="#" @click="() => toggleCart(item)"> {{ basketName[i] }} </a>
                </div>
            </div>
        </div>
        `,
        props: {
            query: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                goods: [],
                basketList: []
            }
        },
        methods: {
            fetchData() {
                makeGETRequest(`${baseUrl}${getListUrl}`, (data) => {
                    this.goods = this.transformData(JSON.parse(data));
                })
            },
            transformData(list) {
                return list.map((item) => ({
                    title: item.product_name,
                    price: item.price,
                    id: item.id_product
                }))
            },
            getCart() {
                makeGETRequest(`${baseUrl}${getCartUrl}`, (data) => {
                    for (const item of JSON.parse(data)) {
                        this.basketList.push(item);
                    }
                })
            },
            removeFromCart(item) {
                makePOSTRequest(`${baseUrl}${removeFromCartUrl}`, JSON.stringify(item), () => {
                    console.log('Товар успешно удален из корзины');
                    this.basketList = this.basketList.filter(({ id }) => id !== item.id)
                });
            },
            addToCart(item) {
                makePOSTRequest(`${baseUrl}${addToCartUrl}`, JSON.stringify(item), () => {
                    console.log('Товар успешно добавлен в корзину');
                    this.basketList.push(item);
                });
            },
            toggleCart(item) {
                this.checkItemInBasket(item.id) ? this.removeFromCart(item) : this.addToCart(item);
            },
            checkItemInBasket(id) {
                return this.basketList.some((el) => el.id === id);
            }
        },
        created() {
            this.getCart();
        },
        computed: {
            filterGoods() {
                return this.goods.filter((product) => (new RegExp(this.query, 'i')).test(product.title));
            },
            basketName() {
                return this.goods.map(item => this.checkItemInBasket(item.id) ? 'Удалить из корзины' : 'Добавить в корзину');
            }
        },
        mounted() {
            this.fetchData();
        }
    });

    const app = new Vue({
        el: '#app',
        data: {
            query: '',
            isVisibleCart: false
        },
        methods: {
            update_query: function (data) {
                this.query = data;
            }
        }
    });
});
