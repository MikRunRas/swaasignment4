
import MenuComponent from './components/MenuComponent.vue';
<template>
  <div>
    <MenuComponent></MenuComponent>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  a {
    display: inline-block;
    background-color: black;
    border: solid 1px black;
    color: white;
    padding: 5px;
    margin: 10px;
  }
  a:hover,
  a.router-link-active {
    background-color: rgb(110, 79, 13);
  }
  button {
    padding: 5px;
    margin: 10px;
  }
</style>