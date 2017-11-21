import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 上架管理
import ArticleMan from '@/views/articleMan'
import Houselist from '@/views/putaway/house-list.vue'
import Housedetailst from '@/views/putaway/house-details.vue'
// // 系统设置
// import Login from '@/views/layout.vue'
// import Login from '@/views/layout.vue'
// import Login from '@/views/layout.vue'
// // 系统设置
// import Login from '@/views/layout.vue'
// import Login from '@/views/layout.vue'
// import Login from '@/views/layout.vue'





export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'ArticleMan',
      component: ArticleMan,
      children:[
         {
         	path:'/',
         	name:'Houselist',
         	component:Houselist
         },
         {
         	path:'/housedetailst',
         	name:'Housedetailst',
         	component:Housedetailst
         }
      ]
    }
  ]
})
