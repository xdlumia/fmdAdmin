<template>
  <div>
    <!-- <side-nav></side-nav>  -->
    <div class="side-nav">
      <div class="title b">文章管理</div>
      <div class="nav-main">
          <router-link to="/article" tag="a" exact class="nav-item">推广信息</router-link>
          <router-link to="/article/news" tag="a" class="nav-item">公司新闻</router-link>
          <router-link to="/article/zixun" tag="a" class="nav-item">房产资讯</router-link>
          <router-link to="/article/baike" tag="a" class="nav-item">房产百科</router-link>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    
    <div id="index">
	    <header class="header">
	        <el-menu
	          class="el-menu-demo"
	          mode="horizontal"
	          background-color="#222"
	          text-color="#fff"
	          active-text-color="#33ba9b">
	          <div class="d-main">
	              <a href="/" class="logo">房脉动管理系统</a>
	              <el-menu-item index="1">上架管理</el-menu-item>
	              <el-menu-item index="2"><a>文章管理</a></el-menu-item>
	              <el-menu-item index="3"><a>用户管理</a></el-menu-item>
	              <el-menu-item index="4"><a>预约管理</a></el-menu-item>
	              <el-menu-item index="5"><a>系统设置</a></el-menu-item>
	              <div class="user">
	                  你好,
	                  <span class="user-name">FJD</span>
	                  <span class="logout ml20">退出</span>
	              </div>
	          </div>
	        </el-menu>
	    </header>
	    <div class="side-nav">
	        <div class="title b">上架管理</div>
	        <div class="nav-main">
	            <a class="nav-item active">二手房</a>
	            <a class="nav-item">租房</a>
	            <a class="nav-item">写字楼出租</a>
	            <a class="nav-item">写字楼出售</a>
	            <a class="nav-item">商铺出租</a>
	        </div>
	    </div>
	
	    <div class="d-main" style="padding-top: 60px">
	        <h2 class="title">二手房上下架管理 <div class="button-box fr"><el-button type="primary" size="mini" plain>新增</el-button><el-button type="danger" size="mini">批量删除</el-button></div></h2>
	
	        <!-- 上下架管理列表 -->
	        <div class="d-content new-list">
	           <template>
	              <el-table
	                ref="multipleTable"
	                :data="tableData"
	                border
	                fit>
	                <el-table-column
	                  type="selection"
	                  width="55">
	                </el-table-column>
	                <el-table-column
	                  width="80"
	                  align=center
	                  label="是否置顶">
	                  <template slot-scope="scope">
	                      <i class="el-icon-star-on stick"></i>
	                    </template>
	                </el-table-column>
	                <el-table-column
	                  prop="date"
	                  label="新闻标题"
	                  width="500">
	                </el-table-column>
	                <el-table-column
	                  prop="name"
	                  width="112"
	                  label="城市">
	                </el-table-column>
	                <el-table-column
	                  prop="name"
	                  width="110"
	                  label="发布人">
	                </el-table-column>
	                <el-table-column
	                  prop="name"
	                  width="112"
	                  label="发布时间">
	                </el-table-column>
	                <el-table-column
	                  prop="address"
	                  width="179"
	                  label="操作">
	                    <template slot-scope="scope">
	                      <el-button
	                        size="mini"
	                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	                      <el-button
	                        size="mini"
	                        type="danger"
	                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	                    </template>
	                </el-table-column>
	              </el-table>
	            </template>
	        </div>
	    </div>
	</div>
  </div>
</template>

<script>

  export default {
    data(){
   		return{
   			tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
   		}
    },

    beforeMount(){
    	
    },
		methods:{
			handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
       handleEdit(index, row) {
      },
      handleDelete(index, row) {
      	
        console.log(index, row);
//      row.splice(index, 1);
      }
		}
  }
</script>
<style>

</style>
