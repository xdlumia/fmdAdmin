<template>
    <div>
		<header class="header">
	        <el-menu
	          :default-active="activeIndex"
	          class="el-menu-demo"
	          mode="horizontal"
	          background-color="#222"
	          text-color="#fff"
	          router
	          active-text-color="#33ba9b">
	          <div class="d-main">
	              <a href="http://test.fangmaidong.com:7001/userList" class="logo">{{companyName}}</a>
	              <el-menu-item index="/">上架管理</el-menu-item>
	              <!-- <el-menu-item index="/article"><a>文章管理</a></el-menu-item>
	              <el-menu-item index="/user"><a>用户管理</a></el-menu-item>
	              <el-menu-item index="/order"><a>预约管理</a></el-menu-item>
	              <el-menu-item index="/setting"><a>系统设置</a></el-menu-item> -->
                <a class="header-item" v-show="backgroundOpen" target="_blank" href="http://test.fangmaidong.com:7001/userList">系统设置</a>
	              <div class="user">
	                  你好,
	                  <span class="user-name"><span v-if="!islogin">请登录</span>{{loginId}}</span>
	                  <span class="logout ml20" @click="loginOut">退出</span>
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
        companyName:"房脉动管理系统",
        activeIndex: '/', //导航当前状态
        islogin:false,    //是否登录
        loginId:'',       //登录名称
        backgroundOpen:'0'
      };
    },
    created(){
    	
    },
    created(){
      
    },
    beforeMount(){

      if(this.companyType=="lmd"){
        this.companyName="楼脉动管理系统"
      }
      let loginInfo = this.$local.fetch("loginInfo");
      this.loginId=loginInfo.loginId;
      this.islogin = loginInfo.islogin;
      this.backgroundOpen=localStorage.backgroundOpen;
    },
    methods: {
      loginOut(){
      	var token = localStorage.getItem("token")
        this.Http.get('/logoutWeb?token='+token+'')
          .then((res)=>{
              this.$local.save("loginInfo",null)
              localStorage.setItem("token","")
              localStorage.setItem("backgroundOpen","")
      	      this.$router.push('/login')
          })

      }
    },
    watch:{
    	$route(){
        this.backgroundOpen=localStorage.backgroundOpen
	    	let loginInfo = this.$local.fetch("loginInfo")
	    	this.loginId=loginInfo.loginId
	    	this.islogin = loginInfo.islogin
    	}
    }
    

  }
</script>