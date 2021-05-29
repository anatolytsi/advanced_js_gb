<template>
    <div>
        <div class="goods-list" v-if="goods">
            <p style="display: block; margin: auto" v-if="!goods.length">Нет данных :(</p>
            <div class="goods-list__item" v-for="(item, i) in filterGoods" :key="item">
                <img src="#" alt="image">
                <span class="heading"> {{ item.title }} </span>
                <span class="price"> {{ item.price }} </span>
                <a class="button" href="#" @click="() => toggleCart(item)"> {{ basketName[i] }} </a>
            </div>
        </div>
    </div>
</template>

<script>
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

export default {
    name: 'GoodsList',
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
}
</script>

<style>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 100px;
}

.goods-list__item {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 350px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid gray;
}

.goods-list__item img {
    display: block;
    width: 100%;
    height: 200px;
}

.goods-list__item .heading {
    color: black;
    text-align: center;
    padding: 5px;
}

.goods-list__item .price {
    color: #2f2f2f;
    text-align: right;
    padding: 5px;
}

.goods-list__item .button {
    display: block;
    margin-left: auto;
    margin-top: auto;
    padding: 8px 12px;
    border-radius: 40%;
    border: 1px solid gray;
}
</style>
