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
    const app = new Vue({
        el: '#app',
        data: {
            goods: [],
            query: '',
            basketName: 'Добавить в корзину',
            isVisibleCart: false
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
    console.log(app);
});