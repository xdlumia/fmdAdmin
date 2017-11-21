<template>
    <div>
		<header class="header">
	        <el-menu
	          :default-active="activeIndex"
	          class="el-menu-demo"
	          mode="horizontal"
	          background-color="#222"
	          text-color="#fff"
	          router=true
	          active-text-color="#33ba9b">
	          <div class="d-main">
	              <a href="/" class="logo">房脉动管理系统</a>
	              <el-menu-item index="/">上架管理</el-menu-item>
	              <el-menu-item index="/article"><a>文章管理</a></el-menu-item>
	              <el-menu-item index="3"><a>用户管理</a></el-menu-item>
	              <el-menu-item index="4"><a>预约管理</a></el-menu-item>
	              <el-menu-item index="/housedetailst"><a>系统设置</a></el-menu-item>
	              <div class="user">
	                  你好,
	                  <span class="user-name">FJD</span>
	                  <span class="logout ml20">退出</span>
	              </div>
	          </div>
	        </el-menu>
	    </header>
	</div>
</template>
<script>
export default {
    data() {
      return {
        activeIndex: '/',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }

  }
</script>