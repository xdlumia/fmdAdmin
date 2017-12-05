
<template>
  <div>
    <div class="h-info-contrast">
      <el-form ref="form" :model="contrastForm">
        <div class="contrast-top">
          <div class="d-main">
               <div class="contrast-handle f24" style="width: 252px;">对比经纪人</div>
               <div v-for="(item,index) in titleInfo" class="contrast-title" style="width: 300px;">
                  <div class="d-check" style="display:none">
                    <input type="radio" name="all">
                    <i></i>
                    <label>全选</label>
                  </div>
                  <div class="img w80">
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

export default {
  data() {
      return {
        contrastForm: {
          id:'',
          xingMing:'',
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
      this.contrastForm.id=urlQuery.id
      // HTTP.post("/compareFy",resData)
      this.Http.post("/set/compareBroker",resData)

        .then((response)=>{
          var fyCurrent = response.data.fyVoCurrent;
          var fyNew = response.data.fyVoNew;
          var fyArr=[fyCurrent,fyNew]
          var titleInfo=[]; //存放主标题
          for(var i=0;i<fyArr.length;i++){
            titleInfo.push({
              title:fyArr[i].xingMing,
              img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511532358060&di=eece1dae4c351b06d4884ae3368ea229&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8cb1cb1349540923af45736a9858d109b3de49f1.jpg",
              name:'xingMing'
            })
          }
          this.titleInfo = titleInfo;
          this.contrastForm.zhuBt=titleInfo[1].title
          this.mainInfo = [
                {  title:"职位",    
                   current:fyCurrent.zhiWeiMc,   
                   currentVal:fyCurrent.zhiWeiId,   
                   new:fyNew.zhiWeiMc,   
                   newVal:fyNew.zhiWeiId,   
                   name:"zhiWeiId"
                },

                {  title:"所属门店",    
                   current:fyCurrent.suoShuZzMc,   
                   currentVal:fyCurrent.suoShuZz,   
                   new:fyNew.suoShuZzMc,   
                   newVal:fyNew.suoShuZz,   
                   name:"suoShuZz"
                },
                {  title:"主营板块",    
                   current:fyCurrent.sqMc,   
                   currentVal:fyCurrent.sqId,   
                   new:fyNew.sqMc,   
                   newVal:fyNew.sqId,   
                   name:"sqId"
                },
                {  title:"重点楼盘",    
                   current:fyCurrent.lpMc,   
                   currentVal:fyCurrent.lpId,   
                   new:fyNew.lpMc,   
                   newVal:fyNew.lpId,   
                   name:"lpId"
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
        this.Http.post('/set/updateCompareBroker',this.contrastForm)
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
