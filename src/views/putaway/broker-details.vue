<template>
   <div>
   	 <header-nav></header-nav>
     <side-nav></side-nav>
   	 <router-view></router-view>	
   </div>
</template>

<script>
  import Header from '@/components/header'
  import sideNav from '@/components/side-nav'

  export default {
  	components:{
  		headerNav:header,
      sideNav,
  	}
  }
</script>
