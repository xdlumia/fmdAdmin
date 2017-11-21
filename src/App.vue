<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header-nav'

export default {
  name:'app',
  components: {
      headerNav: Header,
    }
}
</script>
