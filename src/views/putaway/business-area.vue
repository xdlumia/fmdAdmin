
<template>
  <div class="d-main" style="padding-top: 60px">
    <el-form label-width="80px">
          <div class="d-content mt20">
            <div class="d-filter-main el-form-small">
                <div class="d-filter-item">
                    <div class="d-filter-key">位置</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-tab mb10">
                            <span :class="{'active':isArea}" @click="isArea = true">区域<i class="iconfont icon-arrow-down"></i></span>
                            <span :class="{'active':!isArea}" @click="getSubway">地铁<i class="iconfont icon-arrow-down" ></i></span>
                        </div>
                        <div class="d-filter-val-list" v-show="isArea" >
                            <a  href="javascript:;" :key="index" :class="{'active':item.id == districtId}" v-for="(item,index) of districtInfo" @click="getDistrictId(item.id)">{{item.mc}}</a>
                        </div>
                         <div class="d-filter-val-list bt" v-show="isArea && businessAreaInfo.length > 0" >
                            <a href="javascript:;" :key="index" :class="{'active':item.id == businessAreaId}" v-for="(item,index) of businessAreaInfo" @click="getBusinessAreaId(item.id)" >{{item.sqMc}}</a>
                        </div>
                        <div class="d-filter-val-list" v-show="!isArea" >
                            <a href="javascript:;" :key="index" :class="{'active':item.id == subwayId}" v-for="(item,index) of subwayInfo" @click="getSubwayId(item.id)" >{{item.mc}}</a>
                        </div>
                        <div ></div>
                    </div>
                </div>
                <!-- 管理状态 -->
                <div class="d-filter-item filter-stuta" >
                    <div class="d-filter-key">管理</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-list">
                    <!--       <el-select id="d-shangjia" v-model="checkedStatus" @change="putawayChangeStatus" placeholder="上架状态" size="mini" >
                            <el-option class="d-shangjia" v-for="(value,key,index) of putawayStatus" :label="value" :value="key" :key="index" ></el-option>
                          </el-select> -->
                             <!--  <el-date-picker
                                  type="daterange"
                                  v-model="submitTime"
                                  value-format="yyyy-MM-dd"
                                  @change="submitTimeChange"
                                  range-separator="至"
                                  start-placeholder="提交时间起"
                                  end-placeholder="提交时间止">
                            </el-date-picker> -->
     <!--                        <el-date-picker
                               type="daterange"
                               range-separator="至"
                               v-model="putawayTime"
                               @change="putawaytTimeChange"
                               value-format="yyyy-MM-dd"
                               size="mini"
                               start-placeholder="上/下架时间起"
                               end-placeholder="上/下架时间止">
                            </el-date-picker> -->
                            <el-input v-model.trim="searchString" @blur="toSearch"  placeholder="搜索房源编号、提交人、维护人"></el-input>
                            <el-button slot="append" icon="el-icon-search"  class="tosearch"></el-button>
                        </div>
                    </div>
                </div>
                 <!-- 装修 -->
                <div class="d-filter-item">
                    <div class="d-filter-val">
                        <div class="d-filter-val-list">
                            <el-checkbox v-model="recommend" @change="recommendChange" >首页推荐</el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </el-form>
    <h2 class="title">商圈上下架管理</h2>
    <!-- 上下架管理列表 -->
    <div class="d-content">
        <div class="house-list-top">
            <div class="h-result-sum d-inline">
                共<span class="num">{{countSum}}</span>套房源
            </div>
            <div class="button-box d-inline ml20 " v-show="checkedHouses.length > 0 " >
<!--               <el-button size="small" @click="batchPutAway">批量上架</el-button>
              <el-button size="small" @click="batchSoldOut">批量下架</el-button> -->
              <el-button size="small" @click="batchDelete">批量删除</el-button>
            </div>
        </div>
        <div class="house-list-con">

          <div class="house-list-head">
            <div class="h-list-check">
                <div class="d-check">
                    <input type="checkbox" v-model="checkedAll" @change="allcheck">
                    <i></i>
                </div>
            </div>

            <div class="h-list-info" style="width: 540px;">房源信息</div>
            <div class="h-list-release">发布信息</div>
            <div class="h-list-putaway">上架信息</div>
            <div class="h-list-handle">操作</div>
          </div>
          <ul class="house-list-ul">
            <li style="text-align:center;line-height:120px;font-size:40px" v-show="isLoading"><i class="el-icon-loading"></i></li>
            <li style="text-align:center;line-height:120px;font-size:20px" v-show="!isLoading && countSum == 0" >没有数据了</li>
              <li v-for="(item,index) of housesInfo">
                 <div class="h-list-check">
                  <div class="d-check">
                    <input type="checkbox" v-model="checkedHouses" :value="item" >
                    <i></i>
                  </div>
                 </div>
                 <div class="h-list-img mr20"><img src="item.imgSrc" alt=""></div>
                 <div class="h-list-info">
                      <div class="info mt5">
                        <span class="title">{{item.sqMc}}</span>
                      </div>
                      <div class="status mt5">
                        <span class="mr10">在售写字楼：<b class="title f14">{{item.countSyMaiMaiX}}</b></span><span>出租写字楼：<b class="title f14">{{item.countSyZuLinX}}</b></span>
                      </div>
                       <div class="status mt5">
                       <span class="mr10">在售商铺：<b class="title f14">{{item.countSyMaiMaiS}}</b></span><span>出租商铺：<b class="title f14">{{item.countSyZuLinS}}</b></span>
                      </div>
                      <div class="status mt5">
                        <i class="el-icon-info"></i><span class="ml5" v-for="(item1,index) of item.attr1.split(',')">{{item1}}</span>
                      </div>
                 </div>
                 <div class="h-list-release">
                   <div class="mt5">提交人：<span>{{item.modifyIp}}</span></div>
                   <div class="mt5">提交时间：<span>{{item.modifyDate | formatData}}</span></div>
                 </div>
                 <div class="h-list-putaway">
                    <div class="mt5">
                      <span class="d-status" :class="item.remenSq== 0?'d-bg-gray':'d-bg-pink'" @click="homePageRecommend(item)"  d-home>首页推荐</span>
                    </div>
                 </div>
                 <div class="h-list-handle">
                   <!-- <div><span class="d-status d-upload" d-view>上传图片</span></div> -->
                   <el-upload
                        :on-success="uploadPictureHandle"
                        action="http://test.fangmaidong.com:7001/set/uploadPicture"
                        :limit="1"
                        :data="{'bsKeyword':'sq','recordId':item.id}"
                        >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                 </div>
              </li>
          </ul>
          <!-- 分页 -->
          <div class="d-page ar">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="countSum">
            </el-pagination>
          </div>
        </div>
    </div>

  </span>
</el-dialog>

  </div>
</template>

<script>
import qs from 'qs'
  export default {
    data(){
        return{
            currentPage:1,// 分页条
            isLoading:false,//正在加载
            countSum:0,//楼盘总量
            pageSize:5,//每页的数量
            companyId:'',//公司Id
            isArea:true,//当前是否是区域
            districtInfo:[],//行政区信息
            districtId:'',//行政区Id
            housesInfo:[],//楼盘信息
            businessAreaInfo:[],//商圈信息
            businessAreaId:'',//商圈id
            subwayInfo:[],//地铁信息
            subwayId:'',//地铁id
          //  putawayStatus:{},//上下架状态
          //  checkedStatus:"",//选中的状态
            // submitTime:'',//提交时间
            // putawayTime:['',''],//上下架时间
            searchString:'',//搜索字符串
            recommend:'',//推荐的值
            checkedHouses:[],//选中的房屋
            checkedAll:'',//全选或者全不选
        }
    },
    created(){
      this.getMessage();
    },
    methods:{
        handleCurrentChange(){
        // 分页条改变
        this.checkedHouses = [];
        this.getMessage();
       },
       getDistrictId(id){
        this.districtId = id;
        this.Http.post('/webSite/getSqVos',{
          "xzq_id":id,
        })
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.businessAreaInfo = res.data.sqVos;
            this.currentPage = 1;
            this.checkedHouses = [];
            this.getMessage();
          }else{
            this.$notify({
                title: '错误',
                message: '商圈信息加载失败',
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
       getBusinessAreaId(id){
          this.businessAreaId = id;
          this.currentPage = 1;
          this.checkedHouses = [];
          this.getMessage();
       },
       getSubway(){
        this.isArea = false;
        this.districtId = '';
        this.businessAreaId = '';
        this.Http.post('/webSite/getDtXlVos',{
          'cs_id':'110100',
        })
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
              this.subwayInfo = res.data.dtXlVos;
              this.currentPage = 1;
              this.checkedHouses = [];
              this.getMessage();
          }else{
            this.$notify({
                title: '错误',
                message: '地铁信息加载失败',
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
       getSubwayId(id){
        this.subwayId = id;
        this.currentPage = 1;
        this.checkedHouses = [];
        this.getMessage();
       },
       // putawayChangeStatus(){
       //  this.currentPage = 1;
       //  this.checkedHouses = [];
       //  this.getMessage();
       // },
       // submitTimeChange(){
       //    this.currentPage = 1;
       //    this.checkedHouses = [];
       //    this.getMessage();
       // },
       // putawaytTimeChange(){
       //  this.currentPage = 1;
       //  this.checkedHouses = [];
       //  this.getMessage();
       // },
       toSearch(){
          this.currentPage = 1;
          this.checkedHouses = [];
          this.getMessage();
       },
       recommendChange(){
          this.currentPage = 1;
          this.checkedHouses = [];
          this.getMessage();
       },
       homePageRecommend(Item){
        let status = Item.remenSq  ? 0 : 1;
        this.Http.post('/set/tuiJianByFyLp',{
          "id":Item.id,
          "lx":"sq",
          "type":"sq",
          "value":status,
        })
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            Item.remenSq = status;
          }else{
             this.$notify({
                title: '错误',
                message: '首页推荐失败',
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
       allcheck(){
        this.checkedHouses = this.checkedAll ? this.housesInfo : [];
       },
       // batchPutAway(){
       //  let ids = [];
       //  this.checkedHouses.forEach(item=>{
       //    ids.push(item.id);
       //  })
       //  this.Http.post('/set/modifyShangJiaFy',{
       //    "id":ids.join(","),
       //    "cao_zuo":1,
       //  })
       //  .then(res=>{
       //    if(res && res.data && res.data.SUCCESS){
       //     this.checkedHouses.forEach(item=>{
       //      item.shangJiaZt = 1;
       //      item.shangJiaZtMc = "已上架";
       //     })
       //      this.$notify({
       //          title: '成功',
       //          message: '批量上架成功',
       //          type: 'success'
       //      });
       //    }else{
       //      this.$notify({
       //          title: '错误',
       //          message: '批量上架操作失败',
       //          type: 'error'
       //      });
       //    }
       //  })
       //  .catch(error=>{
       //    this.$notify({
       //          title: '错误',
       //          message: '捕捉到异常',
       //          type: 'error'
       //      });
       //      throw new error;
       //  })
       // },
    //    batchSoldOut(){
    //     let ids = [];
    //     this.checkedHouses.forEach(item=>{
    //       ids.push(item.id);
    //     })
    //     this.Http.post('/set/modifyShangJiaFy',{
    //       "id":ids.join(","),
    //       "cao_zuo":0,
    //     })
    //     .then(res=>{
    //       if(res && res.data && res.data.SUCCESS){
    //         this.checkedHouses.forEach(item=>{
    //           item.shangJiaZt = 0;
    //           item.shangJiaZtMc = "已下架";
    //         })
    //          this.$notify({
    //             title: '成功',
    //             message: '批量下架成功',
    //             type: 'success'
    //         });
    //       }else{
    //         this.$notify({
    //             title: '错误',
    //             message: '批量下架操作失败',
    //             type: 'error'
    //         });
    //       }
    //     })
    //     .catch(error=>{
    //       this.$notify({
    //             title: '错误',
    //             message: '捕捉到异常',
    //             type: 'error'
    //         });
    //         throw new error;
    //     })
    // },
    batchDelete(){
        let ids = [];
        this.checkedHouses.forEach(item=>{
          ids.push(item.id);
        })
        this.Http.post('/set/deleteLp',{
          "id":ids.join(","),
        })
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
              this.checkedHouses = [];
              this.getMessage();
               this.$notify({
                title: '成功',
                message: '批量删除成功',
                type: 'success'
            });
          }else{
            this.$notify({
                title: '错误',
                message: '批量删除操作失败',
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
        });
    },
    uploadPictureHandle(res){
      console.log(res,'res');
      console.log(res.data,'data')
    },
      getMessage(){
        this.isLoading = true;
        this.housesInfo = [];
        let form = {
          'cs_id':'110100',
          "serach_name":this.searchString,
          "xzq_id":this.districtId,
          "sq_id":this.businessAreaId,
          "dt_xl":this.subwayId,
          "remen_sq":this.recommend ? 1 : '',
          "currentPage":this.currentPage,
          // "modify_date_from":this.submitTime[0],
          // "modify_date_to":this.submitTime[1],
          // "shang_jia_sj_from":'',
          // "shang_jia_zt":this.checkedStatus,
          // "shang_jia_sj_to":'',
        }
        this.Http.post('/set/listBusinessAreaUpdate',form)
      .then( res => {
          if(res && res.data && res.data.SUCCESS){
              this.isLoading = false;
             this.countSum = res.data.countSum;
             this.pageSize = res.data.pageSize;
             this.housesInfo = res.data.sqVos;
             this.districtInfo = res.data.xzqVos;
             this.putawayStatus = res.data.shangJiaMap;
          }else{
             this.$notify({
                title: '错误',
                message: '数据加载失败',
                type: 'error'
            });
          }
        })
      .catch(error => {
          this.$notify({
                title: '错误',
                message: '捕捉到异常',
                type: 'error'
            });
          throw new error;
        });
      }
    },
}
</script>
<style scoped>
  a.active{
    color: #ff6969;
  }
  img{
    object-fit: cover;
    width:180px;
    height:98px;
  }
  .el-form-small .el-input__inner{
    width: 222px;
  }
  .el-input{
    width: 200px
  }
  .tosearch{
    height: 35px;
    position: relative;
    top: 2px;
    left: 2px;
  }
  .house-sum {
    position: relative;
    top: -37px;
    left: 200px;
}
.bt{
  border-top:1px solid #efefef !important;
}
span.weizhi {
    position: relative;
    left: 64px;
}
.title{
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color:#333;
}
.el-button:hover{background: #ff6969;color:#fff; border-color:#ff6969}  /*红色*/
</style>

<!-- 样式还需要进行调整 -->


