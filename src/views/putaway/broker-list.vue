<template>
   <div class="d-main" style="padding-top: 60px">
           <el-form ref="form" :model="form" label-width="80px">
             <div class="d-content mt20">
               <div class="d-filter-main el-form-small">
                <!-- 位置 -->
                 <div class="d-filter-item">
                    <div class="d-filter-key jvzhong1">区域</div>
                    <div class="d-filter-val">
                    <div class="d-filter-val-list xiangshang" >
                            <a href="javascript:;" v-for="(item,index) of xzqVos" :key="index" :class="{'active':item.id == districtID}" @click="clickdistrict(item.id,index)" >{{item.mc}}</a>
                      </div>
                         <div class="d-filter-val-list bt" v-show="businessArea.length" >
                            <a href="javascript:;" v-for="(item,index) of businessArea" @click="clickBusinessArea(item.id,index)" :key="index" :class="{'active':item.id == businessAreaID}" >{{item.sqMc}}</a>
                      </div>
                    </div>
                    <div class="d-filter-item mt10">
                    <div class="d-filter-key jvzhong2 d-clear ">管理</div>
                    <div class="d-filter-val ">
                        <div class="d-filter-val-list">
                              <el-radio v-model="putawayStatus" @change="statuschange" :label="''">全部</el-radio>
                              <el-radio v-model="putawayStatus" @change="statuschange" :label="1">已开启</el-radio>
                              <el-radio v-model="putawayStatus" @change="statuschange" :label="0">未开启</el-radio>
                              <el-input placeholder="经纪人姓名" @blur="toSeach"   v-model.trim="brokerName">
                                <template slot="append"  >搜索</template>
                              </el-input>
                        </div> 
                    </div>
                </div>
                </div>
               </div>
              </div>
           </el-form>

           <h2 class="title">经纪人上下架管理</h2>
           <div class="d-content">
            <div class="house-list-top">
            <div class="h-result-sum d-inline">
                共<span class="num">{{countSum}}</span>经纪人
            </div>
            <div class="button-box d-inline ml20 " >
              <el-button size="small" v-show="batch.length > 0" @click="batchOpen">批量开启</el-button>
              <el-button size="small" v-show="batch.length > 0" @click="batchClose">批量关闭</el-button>
              <el-button size="small" v-show="batch.length > 0" @click="batchDelete">批量删除</el-button>
            </div>
        </div>
        <div class="house-list-con">
          <div class="house-list-head">
            <div class="h-list-check">
                <div class="d-check">
                    <input type="checkbox"  v-model="isAll" @change="batchControl">
                    <i></i>
                </div>  
            </div>

            <div class="h-list-info" style="width: 540px;">经纪人信息</div>
            <div class="h-list-release" >发布信息</div>
            <div class="h-list-putaway" >上架信息</div>
            <div class="h-list-handle"  >操作</div>
          </div>
          <ul class="house-list-ul">
            <li style="text-align:center;line-height:120px;font-size:40px" v-show="isLoading"><i class="el-icon-loading"></i></li>
            <li style="text-align:center;line-height:120px;font-size:20px" v-show="!isLoading && !countSum" >没有数据了</li>
              <li v-for="(item,index) of ryXxVos" :key="index" >
                 <div class="h-list-check">
                  <div class="d-check">
                    <input type="checkbox" v-model="batch" @click="aloneControl" :value="item" >
                    <i></i>
                  </div>  
                 </div>
                 <div class="h-list-img w80 mr20"><router-link  :to="{path:'/putaway/brokerEdit',query:{id:item.id}}" tag="a" ><img src="" alt=""></router-link></div>
                 <div class="h-list-info w170">
                      <router-link  :to="{path:'/putaway/brokerEdit',query:{id:item.id}}" tag="a" ><a  class="title d-elip">{{item.xingMing}}</a></router-link>
                      <div class="info mt5">
                        <p class="xinxi" >职位：<span>{{item.zhiWeiMc}}</span></p>
                        <p class="xinxi">所属门店：<span>{{item.suoShuMd}}</span></p>
                        <p class="xinxi">联系方式：<span>{{item.shouJiHao}}</span></p>
                      </div>
                 </div>
                 <div class="h-list-info w170 mt5">
                      <div class="info ">
                        <p class="xinxi d-elip">主营板块：<span>{{item.sqMc}}</span></p>
                        <p class="xinxi d-elip">重点楼盘：<span>{{item.lpMc}}</span></p>
                      </div>
                 </div>

                 <div class="h-list-release">
                   <div class="mt5">提交人：<span>{{item.tiJiaoRenMc}}</span></div>
                   <div class="mt5">提交时间：<span>{{item.tiJiaoSj | formatData}}</span></div>
                 </div>
                 <div class="h-list-putaway">
                   <div>上架状态：<span class="d-status " :class="{'d-bg-cyan': item.shangJiaZt == 1,'d-bg-gray': item.shangJiaZt == 2,'d-bg-crimson': item.shangJiaZt == 0,'d-bg-blue': item.shangJiaZt == 4,'d-bg-orange': item.shangJiaZt == 3,}" round >{{item.shangJiaZtMc}}</span></div>
                   <div class="mt5">上架时间：<span>{{item.shangJiaSj | formatData}}</span></div>
                 </div>
                 <div class="h-list-handle">

                   <div><router-link  :to="{path:'/putaway/brokerEdit',query:{id:item.id}}" tag="a" ><span class="d-status" d-view>预览查看</span></router-link><router-link  :to="{path:'/putaway/brokercontrast',query:{id:item.id}}" tag="a" ><span class="d-status ml4" d-view v-show="item.shangJiaZt == 4" >对比查看</span></router-link></div>
                   <div class="mt5"><router-link  :to="{path:'/putaway/brokerEdit',query:{id:item.id}}" tag="a" ><span class="d-status" d-edit  >编辑</span></router-link><span class="d-status ml5" d-soldout v-show="item.shangJiaZt == 1 || item.shangJiaZt == 4 " @click="aloneClose(item.id)" >下架</span><span class="d-status ml5 " v-show = "item.shangJiaZt == 3" d-soldout @click="closeTheDeal(item.id)" >成交下架</span><span class="d-status ml5" d-soldout  v-show="item.shangJiaZt == 0 || item.shangJiaZt == 2" @click="aloneOpen(item.id)">上架</span><span class="d-status ml5" d-update v-show="item.shangJiaZt == 4" @click="update(item)" >更新</span></div>
                   <div class="mt5"><span class="d-status mr5" d-record v-show="item.shangJiaZt != 2" @click="brokerRecordDisplay(item.id)" >经纪人记录</span><span class="d-status " d-del @click="aloneDelete(item.id)" >删除</span></div>
                 </div>
              </li>
          </ul>

          <!-- 分页 -->
          <div class="d-page ar">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="countSum">
            </el-pagination>
          </div>
          <broker-record-list :brokerRecord="brokerRecord"></broker-record-list>
        </div>
    </div>

  </div>
</template>

<script>
import brokerRecordList from '@/components/broker-record.vue'
import qs from 'qs'
  export default {
    data(){
      return {
        form:{},
        radio:'',
        isLoading:false,
        currentPage1:1,
        countSum:0,
        companyId:1,
        ryXxVos:[],
        xzqVos:[],
        batch:[],
        isAll:false,
        districtID:'',
        brokerName:'',
        businessArea:[],
        businessAreaID:'',
        putawayStatus:'',
        brokerRecord:{
          isvisible:false,
          id:'',
          table:[],
          countSum:0,
        },
      }
    },
     created(){
        this.getMessage();
      },
    methods:{
      clickdistrict(id,idx){
        this.districtID = id;
        this.Http.post('/webSite/getSqVos',qs.stringify({
          'xzq_id':this.districtID,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.businessArea = res.data.sqVos;
            this.businessAreaID = '';
            this.currentPage1 = 1;
            this.getMessage();
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },
      clickBusinessArea(id,idx){
        this.businessAreaID = id;
        this.currentPage1 = 1;
        this.getMessage();
      },
      batchControl(){
        this.batch = this.isAll ? this.ryXxVos : [];
      },
      aloneControl(){
        this.isAll = this.batch.length == this.ryXxVos.length ? true : false ; 
      },
      batchOpen(){
        let arrId = [];
        this.batch.forEach(item=>{
          arrId.push(item.id);
        })
        let submitform = {
          id:arrId.join(','),
          cao_zuo:'1',
        }
        this.Http.post('/set/modifyShangJiaJjr',qs.stringify(submitform))
        .then(res=>{
          if(res&&res.data&&res.data.SUCCESS){
              //请求拉数据
              this.getMessage(arrId);
              this.batch = [];
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },

      batchClose(){
        let arrId = [];
        this.batch.forEach(item=>{
          arrId.push(item.id);
        })
        let submitform = {
          'id':arrId.join(','),
          'cao_zuo':'0',
        }
        this.Http.post('/set/modifyShangJiaJjr',qs.stringify(submitform))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
              //请求拉数据
             this.getMessage(arrId);
             this.batch = [];
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },
      batchDelete(){
        let arrId = [];
        this.batch.forEach(item=>{
          arrId.push(item.id);
        })
        this.Http.post('/set/deleteJjr',qs.stringify({
          id:arrId.join(','),
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
              this.getMessage();
              this.batch = [];
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },
      aloneOpen(id){
        let submitform = {
          'id':id,
          'cao_zuo':'1',
        }
        this.Http.post('/set/modifyShangJiaJjr',qs.stringify(submitform))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
               this.getMessage();
               this.batch = [];
          }
        })
        .catch(error=>{
          console.log(error)
        })

      },
      aloneClose(id){
          let submitform = {
          'id':id,
          'cao_zuo':'0',
        }
        this.Http.post('/set/modifyShangJiaJjr',qs.stringify(submitform))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
             this.getMessage();
             this.batch = [];
          }
        })
        .catch(error=>{
          console.log(error)
        })

      },
      closeTheDeal(id){
        let submitform = {
          'id':id,
          'cao_zuo':'0',
        }
        this.Http.post('/set/modifyShangJiaJjr',qs.stringify(submitform))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
              this.batch = [];
              this.getMessage(id);
          }
        })
        .catch(error=>{
          console.log(error)
        })

      },
      aloneDelete(id){
        this.Http.post('/set/deleteJjr',qs.stringify({
          'id':id,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.getMessage(id);
            this.batch = [];
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },
      getMessage(){
          this.isLoading = true;
          this.isAll  = false;
          let submitform = {
          'cs_id':'110100',
          'xing_ming': this.brokerName,
          'xzq_id':this.districtID,
          'sq_id':this.businessAreaID,
          'shang_jia_zt': this.putawayStatus,
          'currentPage':this.currentPage1,
        }
        this.Http.post('/set/listBrokerUpdate',qs.stringify(submitform))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.countSum = res.data.countSum;
            this.companyId = res.data.companyId;
            this.ryXxVos = res.data.ryXxVos;
            this.xzqVos = res.data.xzqVos;
            this.isLoading = false;
          }
        })
        .catch(error=>{

        })
      },
      brokerRecordDisplay(id){
        this.brokerRecord.isvisible = true;
        this.brokerRecord.id = id;
        this.Http.post('/set/listShangJiaJjr',{
          id:id,
        })
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            res.data.vos.forEach(item=>{
              let tableUnit = {
                id:item.id,
                jjrMc:item.jjrMc,
                gongHao:item.gongHao,
                ryZt:item.ryZt,
                tiJiaoRenMc:item.tiJiaoRenMc,
                tiJiaoSj:item.tiJiaoSj,
                shangJiaZt:item.shangJiaZt,
                modifyUserMc:item.modifyUserMc,
                modifyDate:item.modifyDate,
              }
              this.brokerRecord.table.push(tableUnit);
            })
            this.brokerRecord.countSum = countSum;
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },
      toSeach(){
        console.log(this.brokerName)
        this.currentPage1 = 1;
        this.getMessage();
      },
      update(Item){
          this.Http.post('/set/refreshBroker',qs.stringify({
          "id":Item.id,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.batch = [];
            this.getMessage();
            this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
            });
          }else{
            this.$notify({
                title: '错误',
                message: '信息变更操作失败',
                type: 'error'
            });
          }
        })
        .catch(error=>{
          this.$notify({
                title: '错误',
                message: '捕捉到异常',
                type: 'error'
            });
            throw new error;
        })
      },
      statuschange(){
        this.currentPage1 = 1;
        this.getMessage();
      },
      handleCurrentChange(){
        this.getMessage();
      },
      handleSizeChange(){

      },
    },
  	components:{
      brokerRecordList,
  	}
  }
</script>
<style scoped>
  .bt{
    border-top:1px solid #ccc !important;
  }
  .xiangshang{
    position: relative;
    top: -6px;
    left: 0;
  }
  .el-input-group{
    width:226px;
    margin-left: 30px;
  }
  .el-form-small .el-input__inner{
    width:180px;
  }
  .el-input-group--append div{
    padding:0 10px ;
    background-color:rgba(236, 99, 96, 1) ;
    cursor:pointer;
  }
  .imgWH{
    width:80px !important;
  }
  .w170{
    width:19%;
  }
  .xinxi{
    line-height: 28px;
  }
  .jvzhong1{
    line-height: 17px;
  }
  .jvzhong2{
    line-height: 35px;
  }
  a.active{
    color: #ff6969;
  }  
  img{
    object-fit: cover;
  }
</style>

<!-- 一个颜色样式 -->
