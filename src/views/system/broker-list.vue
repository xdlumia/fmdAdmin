<template>
   <div>
   	 <header-nav></header-nav>
     <!-- <h1>nihao</h1>  -->
   	 <router-view></router-view>	
   </div>
</template>

<script>
  import Header from '@/components/header'

  export default {
  	components:{
  		headerNav:header
  	}
  }
</script>