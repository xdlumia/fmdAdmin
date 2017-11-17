<template>
    <div>
		<el-menu
		  :default-active="activeIndex2"
		  class="el-menu-demo"
		  mode="horizontal"
		  @select="handleSelect"
		  background-color="#222"
		  font-size ="20px"
		  active-text-color="#fff">
		  <div class="row">
			  <el-menu-item index="1">处理中心</el-menu-item>
			  <el-menu-item index="3"><a>订单管理</a></el-menu-item>
		  </div>
		</el-menu>
	</div>
</template>
<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>