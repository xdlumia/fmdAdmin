import Vue from 'vue'
import Router from 'vue-router'


// 上架管理
import PutawayMan from '@/views/articleMan'
import Houselist from '@/views/putaway/house-list'
import Housedetailst from '@/views/putaway/house-details'

// // 文章管理
// import ArticleMan from '@/views/articleMan.vue'
// import Articlelist from '@/views/article/article-list.vue'
// import Articlerelease from '@/views/article/article-release'



Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'PutawayMan',
      component: PutawayMan,
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
    },
    
    // 文章管理
    // {
    //   path: '/',
    //   name: 'ArticleMan',
    //   component: ArticleMan,
    //   children:[
    //      {
    //      	path:'/',
    //      	name:'Articlelist',
    //      	component:Articlelist
    //      },
    //      {
    //      	path:'/articlerelease',
    //      	name:'Articlerelease',
    //      	component:Articlerelease
    //      }
    //   ]
    // },
  ]
})
