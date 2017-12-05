
<template>
  <div>
    <div class="h-info-contrast">
      <el-form ref="form" :model="contrastForm">
        <div class="contrast-top">
          <div class="d-main">
               <div class="contrast-handle f24" style="width: 252px;">对比楼盘</div>
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
               </div>
           </div>
        </div>
        <div class="d-main">
          <!-- 楼盘详情 -->
          <div class="table-main-info">
            <template>
              <el-table
                :data="mainInfo"
                border>
                <el-table-column
                  label="楼盘详情"
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
import qs from 'qs'
export default {
  data() {
      return {
        contrastForm: {
          xqMc1:'',
          //楼盘详情
          kfsMc:'',
          tdSyNx: '',
          zzdMj: '',
          zjzMj: '',
          rjl: '',
          kpSj: '',
          lhl: '',
          jzJg: '',
          jzLx: '',
          // 配套信息
          wyGsMc: '',
          wyf: '',
          dxCw: '',
          dsCw: '',

          // 图片来源
          attr1: '',
        },
        titleInfo:[], //对比数据title
        mainInfo:[],  //主要信息
        matchInfo:[],  //基本属性
        imgInfo:[],   //房源照片
      }
    },
    created(){
      let urlQuery=this.$route.query
      let resData={
        id:urlQuery.id,
        // typeTab:urlQuery.typeTab
      }
      this.contrastForm.id=urlQuery.id,
      // HTTP.post("/compareFy",resData)
      this.Http.post("/set/compareBuilding",qs.stringify(resData))

        .then((response)=>{
          var fyCurrent = response.data.fyVoCurrent;
          var fyNew = response.data.fyVoNew;
          var fyArr=[fyCurrent,fyNew]
          var titleInfo=[]; //存放主标题
          for(var i=0;i<fyArr.length;i++){
            titleInfo.push({
              title:fyArr[i].xqMc1,
              img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511532358060&di=eece1dae4c351b06d4884ae3368ea229&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8cb1cb1349540923af45736a9858d109b3de49f1.jpg",
              price:fyArr[i].chuShouZj,
              name:'xqMc1'
            })
          }
          this.titleInfo = titleInfo;
          this.contrastForm.zhuBt=titleInfo[1].title
          this.mainInfo = [
                {  title:"开发商名称",    
                   current:fyCurrent.kfsMc,   
                   currentVal:fyCurrent.kfsMc,   
                   new:fyNew.kfsMc,   
                   newVal:fyNew.kfsMc,   
                   name:"kfsMc"
                },

                {  title:"土地使用年限",    
                   current:fyCurrent.tdSyNx,   
                   currentVal:fyCurrent.tdSyNx,   
                   new:fyNew.tdSyNx,   
                   newVal:fyNew.tdSyNx,   
                   name:"tdSyNx"
                },
                {  title:"总占地面积",    
                   current:fyCurrent.zzdMj,   
                   currentVal:fyCurrent.zzdMj,   
                   new:fyNew.zzdMj,   
                   newVal:fyNew.zzdMj,   
                   name:"zzdMj"
                },
                {  title:"总建筑面积",    
                   current:fyCurrent.zjzMj,   
                   currentVal:fyCurrent.zjzMj,   
                   new:fyNew.zjzMj,   
                   newVal:fyNew.zjzMj,   
                   name:"zjzMj"
                },
                {  title:"容积率",    
                   current:fyCurrent.rjl,   
                   currentVal:fyCurrent.rjl,   
                   new:fyNew.rjl,   
                   newVal:fyNew.rjl,   
                   name:"rjl"
                },
                {  title:"开盘时间",    
                   current:fyCurrent.kpSj,   
                   currentVal:fyCurrent.kpSj,   
                   new:fyNew.kpSj,   
                   newVal:fyNew.kpSj,   
                   name:"kpSj"
                },
                {  title:"绿化率",    
                   current:fyCurrent.lhl,   
                   currentVal:fyCurrent.lhl,   
                   new:fyNew.lhl,   
                   newVal:fyNew.lhl,   
                   name:"lhl"
                },
                {  title:"建筑结构",    
                   current:fyCurrent.jzJgMc,   
                   currentVal:fyCurrent.jzJg,   
                   new:fyNew.jzJgMc,   
                   newVal:fyNew.jzJg,   
                   name:"jzJg"
                },
                {  title:"建筑类型",    
                   current:fyCurrent.jzLxMc,   
                   currentVal:fyCurrent.jzLx,   
                   new:fyNew.jzLxMc,   
                   newVal:fyNew.jzLx,   
                   name:"jzLx"
                },
             ];

            
          this.matchInfo = [
                {
                   title:"物业公司名称",
                   current:fyCurrent.wyGsMc,
                   currentVal:fyCurrent.wyGsMc,  
                   new:fyNew.wyGsMc,
                   newVal:fyNew.wyGsMc,
                   name:"wyGsMc"
                },
                {
                   title:"物业费", 
                   current:fyCurrent.wyf,  
                   currentVal:fyCurrent.wyf,   
                   new:fyNew.wyf,   
                   newVal:fyCurrent.wyf, 
                   name:"wyf"
                 }, 
                {  title:"地上车位", 
                   current:fyCurrent.dsCw,   
                   currentVal:fyCurrent.dsCw,   
                   new:fyNew.dsCw,   
                   newVal:fyNew.dsCw,   
                   name:"dsCw"},
                {  title:"地下车位", 
                   current:fyCurrent.dxCw,  
                   currentVal:fyCurrent.dxCw,  
                   new:fyNew.dxCw,  
                   newVal:fyNew.dxCw,  
                   name:"dxCw"
                 },
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
        this.Http.post('/set/updateCompareBuilding',qs.stringify(this.contrastForm))
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
