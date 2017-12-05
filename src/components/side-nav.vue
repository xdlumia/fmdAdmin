<template>
	<div class="side-nav">
        <div class="title b">上架管理</div>
        <div class="nav-main">
            <router-link v-for="item in sideNav" :to="item.path" tag="a" class="nav-item">{{item.name}}</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
      url:'/',
      sideNav: [
            {
              name: '租房',
              path: 'zufang',
              type: 'ChZu'
            },
            {
              name: '二手房',
              path: 'ershoufang',
              type: 'ChZu'
            },
            {
              name: '写字楼出租',
              path: 'officerent',
              type: 'SyZuLin'
            },
            {
              name: '写字楼出售',
              path: 'officesale',
              type: 'SyMaiMai'
            },
            {
              name: '商铺出租',
              path: 'shoprent',
              type: 'SyZuLin'
            },
            {
              name: '商铺出售',
              path: 'shopsale',
              type: 'SyMaiMai'
            },
        ]
      }
    },
}

</script>
<style>
    
</style>