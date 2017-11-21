<template>
  <div id="app">
    <header-nav></header-nav>
    <side-nav></side-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header-nav'
import SideNav from '@/components/side-nav'


export default {
  name:'app',
  components: {
      headerNav: Header,
      sideNav:SideNav
    }
}
</script>
