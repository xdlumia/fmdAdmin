<template>
  <div>
    <side-nav></side-nav>
    <side-nav></side-nav>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import SideNav from '@/components/side-nav'
  import Filter from '@/components/filter'

  export default {
    data(){
   
    },

    components: {
      sideNav:Filter,
    }
  }
</script>
<style>

</style>
