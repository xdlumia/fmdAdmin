<template>
  <div>
    <!-- <side-nav></side-nav> 侧边栏导航  -->
    <div class="side-nav">
      <div class="title b">上架管理</div>
      <div class="nav-main">
          <router-link v-show="isShow" to="/" tag="a" exact class="nav-item">租房</router-link>
          <router-link v-show="isShow" to="/putaway/ershoufang?typeTab=ChuShou" tag="a" class="nav-item">二手房</router-link>
          <router-link v-show="isShow" to="/putaway/officerent?typeTab=SyZuLin&shop_office=x" tag="a" class="nav-item">写字楼出租</router-link>

          <router-link v-show="!isShow" to="/" tag="a" exact class="nav-item">写字楼出租</router-link>

          <router-link to="/putaway/officesale?typeTab=SyMaiMai&shop_office=x" tag="a" class="nav-item">写字楼出售</router-link>
          <router-link to="/putaway/shoprent?typeTab=SyZuLin&shop_office=s" tag="a" class="nav-item">商铺出租</router-link>
          <router-link to="/putaway/shopsale?typeTab=SyMaiMai&shop_office=s" tag="a" class="nav-item">商铺出售</router-link>

          <router-link v-show="isShow" to="/putaway/xiaoqu?typeTab=xiaoqu" tag="a" class="nav-item">小区/楼盘</router-link>
          <router-link v-show="isShow" to="/putaway/broker?typeTab=broker" tag="a" class="nav-item">经纪人</router-link>
          <router-link  to="/putaway/businessarea?typeTab=businessarea" tag="a" class="nav-item">商圈</router-link>
      </div>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
   export default {
    data(){
      return{
        isShow:true
      }
    },
    beforeMount(){
      if(this.companyType =="lmd"){
        this.isShow=false
      }
    }
   }
</script>
<style>

</style>
