
<template>
  <div>
    <div class="h-info-contrast">
      <el-form ref="form" :model="contrastForm">
        <div class="contrast-top">
          <div class="d-main">
               <div class="contrast-handle f24" style="width: 252px;">对比房源</div>
               <div v-for="(item,index) in titleInfo" class="contrast-title" style="width: 300px;">
                  <div class="d-check" style="display:none">
                    <input type="radio" name="all">
                    <i></i>
                    <label>全选</label>
                  </div>
                  <div class="img">
                    <img :src="item.img" alt="">
                    <div class="status d-bg-cyan" v-if="index == 0">现</div>
                    <div class="status d-bg-orange" v-if="index == 1">改</div>
                  </div>
                  <div class="title">
                    <div class="d-check">
                      <input type="radio" checked v-model="contrastForm[item.name]" :name="item.name" checked :value="item.title">
                      <i></i>
                    </div>
                    {{item.title}}
                  </div>
                  <div class="d-text-orange b mt10 f16">{{item.price}}万元</div>
               </div>
           </div>
        </div>
        <div class="d-main">
          <!-- 主要信息对比 -->
          <div class="table-main-info">
            <template>
              <el-table
                :data="mainInfo"
                border>
                <el-table-column
                  label="主要信息"
                  prop=title
                  width="250">
                </el-table-column>

                <el-table-column
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" v-model="contrastForm[scope.row.name]" :disabled="scope.row.currentVal==scope.row.newVal?true:false" :name="scope.row.name" :value="scope.row.currentVal">
                      <i></i>
                    </div>
                    <span>{{ scope.row.current }}</span>
                  </template>
                </el-table-column>

                <el-table-column 
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" v-model="contrastForm[scope.row.name]" :disabled="scope.row.currentVal==scope.row.newVal?true:false" :name="scope.row.name"  :value="scope.row.newVal">
                      <i></i>
                    </div>
                    <span :class="scope.row.new==scope.row.current?'':'red'">{{ scope.row.new }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <!-- 基本属性 -->
          <div class="table-base-info">
            <template>
              <el-table
                :data="baseInfo"
                border>
                <el-table-column
                  label="基本属性"
                  prop=title
                  width="250">
                </el-table-column>
                <el-table-column
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" v-model="contrastForm[scope.row.name]"  :disabled="scope.row.currentVal==scope.row.newVal?true:false" :name="scope.row.name" :value="scope.row.currentVal">
                      <i></i>
                    </div>
                    <span>{{ scope.row.current }}</span>
                  </template>
                </el-table-column>
                <el-table-column 
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" v-model="contrastForm[scope.row.name]"  :disabled="scope.row.currentVal==scope.row.newVal?true:false" :name="scope.row.name"  :value="scope.row.newVal">
                      <i></i>
                    </div>
                    <span>{{ scope.row.new }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <!-- 交易属性 -->
          <div class="table-deal-info">
            <template>
              <el-table
                :data="dealInfo"
                border>
                <el-table-column
                  label="交易属性"
                  prop=title
                  width="250">
                </el-table-column>
                <el-table-column
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" v-model="contrastForm[scope.row.name]"  :disabled="scope.row.currentVal==scope.row.newVal?true:false" :name="scope.row.name" :value="scope.row.currentVal">
                      <i></i>
                    </div>
                    <span>{{ scope.row.current }}</span>
                  </template>
                </el-table-column>
                <el-table-column 
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" v-model="contrastForm[scope.row.name]"  :disabled="scope.row.currentVal==scope.row.newVal?true:false" :name="scope.row.name"  :value="scope.row.newVal">
                      <i></i>
                    </div>
                    <span>{{ scope.row.new }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <!-- 房源特色 -->
          <div class="table-tese-info">
            <template>
              <el-table
                :data="teseInfo"
                border>
                <el-table-column
                  label="房源特色"
                  prop=title
                  width="250">
                </el-table-column>
                <el-table-column
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" :disabled="scope.row.currentVal==scope.row.newVal?true:false" :name="scope.row.name" :value="scope.row.currentVal">
                      <i></i>
                    </div>
                    <span>{{ scope.row.current }}</span>
                  </template>
                </el-table-column>
                <el-table-column 
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" :disabled="scope.row.currentVal==scope.row.newVal?true:false" v-model="scope.row.name" :name="scope.row.name"  :value="scope.row.newVal">
                      <i></i>
                    </div>
                    <span>{{ scope.row.new }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <!-- 房源照片 -->
          <div class="table-img-info">
            <template>
              <el-table
                :data="imgInfo"
                border>
                <el-table-column
                  label="房源照片"
                  prop=title
                  width="250">
                </el-table-column>
                <el-table-column
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" :disabled="scope.row.currentVal==scope.row.newVal?true:false" :name="scope.row.name" :value="scope.row.currentVal">
                      <i></i>
                    </div>
                    <div class="tabimg">
                      <img :src="scope.row.current" alt="">
                    </div>
                  </template>
                </el-table-column>
                <el-table-column 
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <div class="d-check">
                      <input type="radio" :disabled="scope.row.currentVal==scope.row.newVal?true:false" v-model="scope.row.name" :name="scope.row.name"  :value="scope.row.newVal">
                      <i></i>
                    </div>
                    <div class="tabimg">
                      <img :src="scope.row.new" alt="">
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>

        </div>
        <div class="bottom-handle">
         <div class="d-main">
           <el-button size="small" type="primary" @click="onSubmitSave">立即保存</el-button>
           <el-button size="small"><router-link :to="{path:'/putaway/detail',query:$route.query}"> 编辑</router-link></el-button>
           <el-button size="small" onclick="window.history.back()">取消</el-button>
         </div>
        </div>

      </el-form>
     </div>
  </div>

</template>

<script>
import axios from 'axios'
import queryString from 'queryString'

// var HTTP = axios.create({
//   baseURL:"http://easy-mock.com/mock/5a14c66e5d683e067acc5978/fmdadmin",
//   responseType:'json',
//     headers:{
//       token:1
//     },
//     transformRequest:[function(data){
//       return queryString.stringify(data)
//     }]
// })

export default {
  data() {
      return {
        contrastForm: {
          zhuBt:'',
          //主要属性
          riZuJin:'',
          xsMj: '',
          shi: '',
          ting: '',
          wei: '',
          fjChaoXiang: '',
          zhuangXiu: '',
          lcLx: '',
          upstairCount: '',
          // 基本信息
          hxJg: '',
          shMj: '',
          jzLx: '',
          jzJg: '',
          nTiNHu: '',
          // 交易属性
          weiTuoRq: '',
          fwQuanShu: '',
          fangChanCyNx: '',
          fangWuLx: '',
          diYaQk: '',
          kfSj: '',
          // 房源特色
          heXinMd: '',
          zhuangXiuMs: '',
          jiaoTongCx: '',
          zhouBianPt: '',
          // 图片来源
          attr1: '',
        },
        titleInfo:[], //对比数据title
        mainInfo:[],  //主要信息
        baseInfo:[],  //基本属性
        dealInfo:[],  //交易属性
        teseInfo:[],  //房源特色
        imgInfo:[],   //房源照片
      }
    },
    created(){
      var urlQuery=this.$route.query
      var resData={
        id:urlQuery.id,
        // typeTab:urlQuery.typeTab
      }
      this.contrastForm.id=urlQuery.id
      this.Http.post("/set/compareFy",resData)

        .then((response)=>{
          var fyCurrent = response.data.fyVoCurrent;
          var fyNew = response.data.fyVoNew;
          var fyArr=[fyCurrent,fyNew]
          var titleInfo=[]; //存放主标题
          for(var i=0;i<fyArr.length;i++){
            titleInfo.push({
              title:fyArr[i].zhuBt,
              img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511532358060&di=eece1dae4c351b06d4884ae3368ea229&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8cb1cb1349540923af45736a9858d109b3de49f1.jpg",
              price:fyArr[i].chuShouZj,
              name:'zhuBt'
            })
          }
          this.titleInfo = titleInfo;
          this.contrastForm.zhuBt=titleInfo[1].title
          this.mainInfo = [

                {  title:"朝向",    
                   current:fyCurrent.fjChaoXiangMc,   
                   currentVal:fyCurrent.fjChaoXiang,   
                   new:fyNew.fjChaoXiangMc,   
                   newVal:fyNew.fjChaoXiang,   
                   name:"fjChaoXiang"
                },

                {  title:"装修",    
                   current:fyCurrent.zhuangXiuMc,   
                   currentVal:fyCurrent.zhuangXiu,   
                   new:fyNew.zhuangXiuMc,   
                   newVal:fyNew.zhuangXiu,   
                   name:"zhuangXiu"
                },
                {  title:"楼层类型",    
                   current:fyCurrent.lcLx,   
                   currentVal:fyCurrent.lcLx,   
                   new:fyNew.lcLx,   
                   newVal:fyNew.lcLx,   
                   name:"lcLx"
                },
                {  title:"总楼层",    
                   current:fyCurrent.upstairCount,   
                   currentVal:fyCurrent.upstairCount,   
                   new:fyNew.upstairCount,   
                   newVal:fyNew.upstairCount,   
                   name:"upstairCount"
                },
             ];
             // 出租 二手房 对比
            if(urlQuery.typeTab=='ChuShou' ||urlQuery.typeTab=='ChuZu' ){
                this.mainInfo.unshift(
                  {
                   title:"户型：室", 
                   current:fyCurrent.shi,  
                   currentVal:fyCurrent.shi,   
                   new:fyNew.shi,   
                   newVal:fyCurrent.shi, 
                   name:"shi"
                 }, 
                {  title:"户型：厅", 
                   current:fyCurrent.ting,  
                   currentVal:fyCurrent.ting,  
                   new:fyNew.ting,  
                   newVal:fyNew.ting,  
                   name:"ting"
                 }, 

                {  title:"户型：卫", 
                   current:fyCurrent.wei,   
                   currentVal:fyCurrent.wei,   
                   new:fyNew.wei,   
                   newVal:fyNew.wei,   
                   name:"wei"},)
            }
            // 二手房 和商业买卖对比
            if(urlQuery.typeTab=='ChuShou' || urlQuery.typeTab=='SyMaiMai'){
                this.mainInfo.unshift(
                  {
                     title:"销售面积",
                     current:fyCurrent.xsMj,
                     currentVal:fyCurrent.xsMj,  
                     new:fyNew.xsMj,
                     newVal:fyNew.xsMj,
                     name:"xsMj"
                  },)
            }
            
            // 写字楼出租
            if(urlQuery.typeTab=='SyZuLin'){
                this.mainInfo.unshift(
                  {
                     title:"日租金",
                     current:fyCurrent.riZuJin,
                     currentVal:fyCurrent.riZuJin,  
                     new:fyNew.riZuJin,
                     newVal:fyNew.riZuJin,
                     name:"riZuJin"
                  },)
            }

          this.baseInfo = [
                {
                   title:"户型结构",
                   current:fyCurrent.hxJgMc,
                   currentVal:fyCurrent.hxJg,  
                   new:fyNew.hxJgMc,
                   newVal:fyNew.hxJg,
                   name:"hxJg"
                },
                {
                   title:"使用面积", 
                   current:fyCurrent.shMj,  
                   currentVal:fyCurrent.shMj,   
                   new:fyNew.shMj,   
                   newVal:fyCurrent.shMj, 
                   name:"shMj"
                 }, 
                {  title:"建筑类型", 
                   current:fyCurrent.jzLxMc,  
                   currentVal:fyCurrent.jzLx,  
                   new:fyNew.jzLxMc,  
                   newVal:fyNew.jzLx,  
                   name:"jzLx"
                 }, 

                {  title:"建筑结构", 
                   current:fyCurrent.jzJg,   
                   currentVal:fyCurrent.jzJg,   
                   new:fyNew.jzJg,   
                   newVal:fyNew.jzJg,   
                   name:"jzJg"},

                {  title:"梯户比例",    
                   current:fyCurrent.nTiNHu,   
                   currentVal:fyCurrent.nTiNHu,   
                   new:fyNew.nTiNHu,   
                   newVal:fyNew.nTiNHu,   
                   name:"nTiNHu"
                },
             ];
          this.dealInfo = [
                {
                   title:"委托时间",
                   current:fyCurrent.weiTuoRq,
                   currentVal:fyCurrent.weiTuoRq,  
                   new:fyNew.weiTuoRq,
                   newVal:fyNew.weiTuoRq,
                   name:"weiTuoRq"
                },
                {
                   title:"房屋权属", 
                   current:fyCurrent.fwQuanShuMc,  
                   currentVal:fyCurrent.fwQuanShu,   
                   new:fyNew.fwQuanShuMc,   
                   newVal:fyCurrent.fwQuanShu, 
                   name:"fwQuanShu"
                 }, 
                {  title:"房本年限", 
                   current:fyCurrent.fangChanCyNxMc,  
                   currentVal:fyCurrent.fangChanCyNx,  
                   new:fyNew.fangChanCyNxMc,  
                   newVal:fyNew.fangChanCyNx,  
                   name:"fangChanCyNx"
                 }, 

                {  title:"房屋用途", 
                   current:fyCurrent.fangWuLxMc,   
                   currentVal:fyCurrent.fangWuLx,   
                   new:fyNew.fangWuLxMc,   
                   newVal:fyNew.fangWuLx,   
                   name:"fangWuLx"},

                {  title:"抵押情况",    
                   current:fyCurrent.diYaQkMc,   
                   currentVal:fyCurrent.diYaQk,   
                   new:fyNew.diYaQkMc,   
                   newVal:fyNew.diYaQk,   
                   name:"diYaQk"
                },
                {  title:"看房时间",    
                   current:fyCurrent.kfSjMc,   
                   currentVal:fyCurrent.kfSj,   
                   new:fyNew.kfSjMc,   
                   newVal:fyNew.kfSj,   
                   name:"kfSj"
                },
             ];
          this.teseInfo = [
                {
                   title:"核心亮点",
                   current:fyCurrent.heXinMd,
                   currentVal:fyCurrent.heXinMd,  
                   new:fyNew.heXinMd,
                   newVal:fyNew.heXinMd,
                   name:"heXinMd"
                },
                {
                   title:"装修描述", 
                   current:fyCurrent.zhuangXiuMs,  
                   currentVal:fyCurrent.zhuangXiuMs,   
                   new:fyNew.zhuangXiuMs,   
                   newVal:fyCurrent.zhuangXiuMs, 
                   name:"zhuangXiuMs"
                 }, 
                {  title:"交通出行", 
                   current:fyCurrent.jiaoTongCx,  
                   currentVal:fyCurrent.jiaoTongCx,  
                   new:fyNew.jiaoTongCx,  
                   newVal:fyNew.jiaoTongCx,  
                   name:"jiaoTongCx"
                 }, 

                {  title:"周边配套", 
                   current:fyCurrent.zhouBianPt,   
                   currentVal:fyCurrent.zhouBianPt,   
                   new:fyNew.zhouBianPt,   
                   newVal:fyNew.zhouBianPt,   
                   name:"zhouBianPt"},
             ];
          this.imgInfo = [
                {
                   title:"来源1",
                   current:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=518169459,2299078241&fm=27&gp=0.jpg",
                   currentVal:fyCurrent.heXinMd,  
                   new:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=518169459,2299078241&fm=27&gp=0.jpg",
                   newVal:fyNew.heXinMd,
                   name:"attr1"
                },
                {
                   title:"来源2", 
                   current:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=518169459,2299078241&fm=27&gp=0.jpg",  
                   currentVal:fyCurrent.zhuangXiuMs,   
                   new:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=518169459,2299078241&fm=27&gp=0.jpg",   
                   newVal:fyCurrent.zhuangXiuMs, 
                   name:"attr2"
                 }, 
                {  title:"来源3", 
                   current:fyCurrent.jiaoTongCx,  
                   currentVal:fyCurrent.jiaoTongCx,  
                   new:fyNew.jiaoTongCx,  
                   newVal:fyNew.jiaoTongCx,  
                   name:"attr3"
                 }, 
             ]; 
          this.loading= false;
        })
        .catch(function (error) {
       
        });
    },
    methods:{
      // let self = this;
      onSubmitSave(){
        const loading = this.$loading({
          lock: true,
          text: '正在保存中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.5)'
        });
        this.Http.post('/set/updateCompareFy',this.contrastForm)
          .then((res)=>{
            if(res.data.SUCCESS){
              loading.close(); //关闭弹出框
               this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success'
                });
             }else{
              loading.close(); //关闭弹出框
              this.$notify({
                title: '错误',
                message: '数据请求错误',
              });
             }
            
          })
          .catch(function (error) {
            loading.close(); //关闭弹出框
            this.$notify({
              title: '错误',
              message: '数据请求错误',
            });
          });
      }
    }
}

</script>
<style>

</style>
