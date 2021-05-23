<template>
    <div class="basket" :style="is_visible ? { 'display': 'block' } : { 'display': 'none' }">
        <div class="basket-list">
            <p style="display: block; margin: auto" v-if="!basketItems.length">Корзина пуста</p>
            <div v-for="item in basketItems" class="basket-list__item" :key="item">
                <img src="#" alt="image">
                <span class="heading"> {{ item.title }} </span>
                <span class="price"> {{ item.price }} </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'basket',
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
}
</script>

<style>
.basket {
    display: none;
    position: absolute;
    top: 50px;
    right: 0;
    background-color: gray;
    width: 400px;
    height: 100%;
    border-left: 1px solid gray;
}
</style>
