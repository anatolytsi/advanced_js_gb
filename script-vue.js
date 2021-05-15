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
                <div v-for="item in filterGoods" class="goods-list__item">
                    <img src="#" alt="image">
                    <span class="heading"> {{ item.title }} </span>
                    <span class="price"> {{ item.price }} </span>
                    <a class="button" href="#"> {{ basketName }} </a>
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
                basketName: 'Добавить в корзину'
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
            }
        },
        computed: {
            filterGoods() {
                return this.goods.filter((product) => (new RegExp(this.query, 'i')).test(product.title));
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