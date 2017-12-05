import Vue from 'vue'
import Router from 'vue-router'


// 上架管理
import PutawayMan from '@/views/putawayMan'
import Houselist from '@/views/putaway/house-list'
import businessArea from '@/views/putaway/business-area'
import Plotlist from '@/views/putaway/plot-list'
import HouseDetails from '@/views/putaway/house-details'
import HouseContrast from '@/views/putaway/house-contrast'
import XiaoquContrast from '@/views/putaway/xiaoqu-contrast'
import BrokerList from '@/views/putaway/broker-list'
import BrokerEdit from '@/views/putaway/broker-edit'
import BrokerContrast from '@/views/putaway/broker-contrast'
import VillageDetails from '@/views/putaway/village-details'

// // 文章管理
import ArticleMan from '@/views/articleMan.vue'
// import Articlelist from '@/views/article/article-list.vue'
// import Articlerelease from '@/views/article/article-release'

//登录
import Login from '@/components/login'


Vue.use(Router)

export default new Router({
  // mode:'history',
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      component: PutawayMan,
      children:[
          {
            path:'/',  //租房
            name:'zufang',
            component:Houselist,
          },
          {
            path:'/putaway/ershoufang', //二手房
            name:'ershoufang',
            component:Houselist
          },
          {
            path:'/putaway/officerent', //写字楼租赁
            name:'officerent',
            component:Houselist
          },
          {
            path:'/putaway/officesale', //写字楼买卖
            name:'officesale',
            component:Houselist
          },
          {
            path:'/putaway/shoprent',  //商铺租赁
            name:'shoprent',
            component:Houselist
          },
          {
            path:'/putaway/shopsale',  //商铺买卖
            name:'shopsale',
            component:Houselist
          },
          {
            path:'/putaway/detail',  //房源详情
            name:'detail',
            component:HouseDetails
          },
          {
            path:'/putaway/contrast', //房源对比
            name:'contrast',
            component:HouseContrast
          },

          {
            path:'/putaway/xiaoqu',   //小区列表
            name:'xiaoqu',
            component:Plotlist
          },
          {
           path:'/putaway/villagedetails',//小区详情
            name:'village',
            component:VillageDetails
          },

          {
            path:'/putaway/xiaoqucontrast', //小区对比
            name:'XiaoquContrast',
            component:XiaoquContrast
          },
          {
            path:'/putaway/broker',  //经纪人列表
            name:'broker',
            component:BrokerList
          },
          {
            path:'/putaway/brokercontrast',  //经纪人对比
            name:'BrokerContrast',
            component:BrokerContrast
          },
          
          {
            path:'/putaway/brokerEdit', //经纪人编辑
            name:'brokerEdit',
            component:BrokerEdit
          },
          {
            path:'/putaway/businessarea', //商圈
            name:'businessArea',
            component:businessArea
          },
          
      ]
    },
    // 文章管理
    // {
    //   path: '/article',
    //   component: ArticleMan,
    //   // children:[
    //   //    {
    //   //    	path:'',
    //   //    	name:'Articlelist',
    //   //    	component:Articlelist
    //   //    },
    //   //    {
    //   //    	path:'/articlerelease',
    //   //    	name:'Articlerelease',
    //   //    	component:Articlerelease
    //   //    }
    //   // ]
    // },
    // 登录
    {
      path: '/login',
      name:'login',
      component: Login
    },
    // 404返回首页
    {
      path: '*',
      redirect:'/'
    },
  ]
})
