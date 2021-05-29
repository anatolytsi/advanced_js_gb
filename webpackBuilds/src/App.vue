<template>
    <div id="app">
        <header>
            <goods-search @query_event="update_query"></goods-search>
            <button class="cart-button" v-on:click="isVisibleCart = !isVisibleCart">Корзина</button>
        </header>
        <basket :is_visible="isVisibleCart"></basket>
        <main>
            <goods-list :query="query"></goods-list>
        </main>
    </div>
</template>

<script>
import GoodsList from './components/GoodsList.vue';
import GoodsSearch from './components/GoodsSearch.vue';
import Basket from './components/Basket.vue';

export default {
    name: 'app',
    components: {
        'goods-list': GoodsList,
        'goods-search': GoodsSearch,
        'basket': Basket
    },
    data () {
        return {
            query: '',
            isVisibleCart: false
        }
    },
    methods: {
        update_query: function (data) {
            this.query = data;
        }
    }
}
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
}

header {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    width: 100%;
    padding: 0 20px;
    border: 1px solid gray;
}

.cart-button {
    display: block;
    margin-left: auto;
    margin-right: 30px;
    padding: 8px 12px;
    border-radius: 40%;
    border: 1px solid gray;
}
</style>
