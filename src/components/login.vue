<template>
  <div class="login">
    <div class="loginbg">
      <div class="loginbg-box">
        <li class="active"><img src="../assets/img/loginbg1.jpg" alt=""></li>
      </div>
       <div class="shade">
       <div class="login-content">
        <div class="loging-logo">
          <img src="../assets/img/logo.png">
          <h2>{{companyName}}</h2>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="52px" class="login-info">
          <el-form-item label="账号" prop="loginId">
            <el-input v-model="loginForm.loginId" res="input" autofocus placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" v-on:keyup.13.native="login('loginForm')" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="button-box">
            <el-button type="danger" style="background:#ff6969" @click="login('loginForm')" v-on:keyup.native="login('loginForm')" round>立即登录</el-button>
          </div>
        </el-form>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'login',
    data () {

      return {
        companyName:"房脉动管理系统",
        loginForm: {
          loginId: '',
          password: '',
        },
        rules: {
          loginId: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
    
        }
      }
    },
    methods:{
       login(){
        axios.defaults.withCredentials=true;
        // axios.post('http://r1757b7438.51mypc.cn:14041/loginPostWeb?loginId='+this.loginForm.loginId+'&password='+this.loginForm.password+'')
        // axios.post('http://test.fangmaidong.com:7001/loginPostWeb?loginId='+this.loginForm.loginId+'&password='+this.loginForm.password+'')
        this.Http.post('/loginPostWeb',qs.stringify(this.loginForm))
          .then((res)=>{
            if(res.data.SUCCESS){
              this.loginForm.islogin=true
              localStorage.token=res.data.token
              localStorage.backgroundOpen=res.data.open
                this.Http.interceptors.request.use(
                config=>{
                   config.headers.token = localStorage.token;
                   return config
                },
                err=>{
                   return Promise.reject(err);
                })

              this.$local.save("loginInfo",this.loginForm)
              this.$router.push('/')
            }else{
              this.$notify.error({
                title: '登陆失败',
                message:res.data.msg 
              });
            }
          })
        }
    },
    beforeMount(){
      if(this.companyType=="lmd"){
        this.companyName="楼脉动管理系统"
      } 
    }
  }
</script>
<style>
button:active{background:#ff5555 !important;}
.el-menu--horizontal{border-bottom:#222;}
.loginbg{position: fixed;top:0px; /*background: url(../images/loginbg1.jpg) center;*/ background-size: cover;width: 100%; height: 100%;}
.loginbg .shade{position: relative; z-index: 2; background:rgba(0,0,0,.5); width:100%; height: 100%; }
.loginbg-box{position: absolute; height: 100%;width: 100%; top:0; left:0;}
.loginbg-box li{position: absolute; left:0;top:0; width: 100%; height: 100%; overflow:hidden;opacity: 0; transition:all 3s;}
.loginbg-box li.active{opacity: 1;}
.loginbg-box li img{ display: block; width: 100%; height: 100%; object-fit:cover;}
.login-content{position: absolute; border-radius: 5px; left: 50%;top:50%;transform:translate(-50%,-50%); width:400px;margin-top: -20px; overflow: hidden; text-align: center; }

.loging-logo{background: rgba(255,105,105,.9); margin:auto; padding:10px; box-sizing: border-box;  }
.loging-logo img {height: 50px; margin-top: 15px; }

.login-content h2{font-weight: 600; font-size:18px; color:#fff; margin:18px 0 10px; }
.login-info{ background:rgba(255,255,255,1);padding:20px 40px; box-sizing: border-box; }
.login-info.layui-form-pane .layui-form-label{ width: 70px;position: relative; }
.login-info.layui-form-pane .layui-form-label img{position: absolute; left: 0; top: 0; display: block; height: 100%;}
.login-info.layui-form-pane .vercode{ border-color: #fff; width: 150px; }
.login-info.layui-form-pane .layui-input-block{ margin-left: 70px; }

.login-info .loginbtn{border-radius: 19px; margin:10px auto; cursor: pointer; width: 160px; }
.logintips{ text-align:left; font-size:14px;}
</style>
