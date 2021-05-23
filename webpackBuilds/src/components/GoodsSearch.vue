<template>
    <input class="header-input" type="text" placeholder="Найти товар..." v-on:input="$emit('query_event', $event.target.value)">
</template>

<script>
export default {
    name: 'goods-search'
}
</script>

<style>
.header-input {
    margin-left: auto;
    margin-right: auto;
}
</style>
