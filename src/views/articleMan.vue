<template>
  <div>
    <side-nav></side-nav>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import SideNav from '@/components/side-nav'

  export default {
    data(){
   
    },

    components: {
      sideNav:SideNav,
    }
  }
</script>
<style>

</style>
