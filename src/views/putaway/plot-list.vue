
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
                          <el-select id="d-shangjia" v-model="checkedStatus" @change="putawayChangeStatus" placeholder="上架状态" size="mini" >
                            <el-option class="d-shangjia" v-for="(value,key,index) of putawayStatus" :label="value" :value="key" :key="index" ></el-option>
                          </el-select>
                              <el-date-picker
                                  type="daterange"
                                  v-model="submitTime"
                                  value-format="yyyy-MM-dd"
                                  @change="submitTimeChange"
                                  range-separator="至"
                                  start-placeholder="提交时间起"
                                  end-placeholder="提交时间止">
                            </el-date-picker>
                            <el-date-picker
                               type="daterange"
                               range-separator="至"
                               v-model="putawayTime"
                               @change="putawaytTimeChange"
                               value-format="yyyy-MM-dd"
                               size="mini"
                               start-placeholder="上/下架时间起"
                               end-placeholder="上/下架时间止">
                            </el-date-picker>
                            <el-input v-model.trim="searchString" @blur="toSearch"  placeholder="搜索房源编号、提交人、维护人"></el-input>
                            <el-button slot="append" icon="el-icon-search"  class="tosearch"></el-button>
                        </div>
                    </div>
                </div>
                 <!-- 装修 -->
                <div class="d-filter-item">
                    <div class="d-filter-val">
                        <div class="d-filter-val-list">
                            <el-checkbox v-model="homePageRecommendVal" @change="homePageRecommendChange" >首页推荐</el-checkbox>
                            <el-checkbox v-model="businessAreaRecommendVal" @change="businessAreaRecommendChange" >商圈列表推荐</el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </el-form>
    <h2 class="title">小区/楼盘上下架管理</h2>
    <!-- 上下架管理列表 -->
    <div class="d-content">
        <div class="house-list-top">
            <div class="h-result-sum d-inline">
                共<span class="num">{{countSum}}</span>套房源
            </div>
            <div class="button-box d-inline ml20 " v-show="checkedHouses.length > 0 " >
              <el-button size="small" @click="batchPutAway">批量上架</el-button>
              <el-button size="small" @click="batchSoldOut">批量下架</el-button>
              <el-button size="small" @click="batchDelete">批量删除</el-button>
            </div>
        </div>
        <div class="house-list-con">

          <div class="house-list-head">
            <div class="h-list-check">
                <div class="d-check">
                    <input type="checkbox" v-model="checkedAll" @change="checkedHouses = checkedAll ? housesInfo : [];">
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
            <li style="text-align:center;line-height:120px;font-size:20px" v-show="!isLoading && !countSum" >没有数据了</li>
              <li v-for="(item,index) of housesInfo">
                 <div class="h-list-check">
                  <div class="d-check">
                    <input type="checkbox" v-model="checkedHouses" :value="item" >
                    <i></i>
                  </div>
                 </div>
                 <div class="h-list-img mr20"><router-link :to="{path:'/putaway/villagedetails',query:{id:item.id}}"  tag="a" ><img :src="item.imgSrc" alt=""></router-link></div>
                 <div class="h-list-info">
                            <router-link :to="{path:'/putaway/villagedetails',query:{id:item.id}}"  tag="a" >{{item.xqMc1}}</router-link>
                      <div class="info mt5">
                        <span>{{item.xzqMc}}-</span>
                        <span>{{item.sqMc}}-</span>
                        <span>{{item.xzDz}}</span>
                      </div>
                      <div class="status mt5">
                        <span>建筑类型：{{item.jzLx}}</span>
                      </div>
                       <div class="status mt5">
                        <span>开盘时间：{{item.kpSj | formatData}}</span>
                      </div>
                      <b class="house-sum">{{item.countSyMaiMaiX}}套</b>
                 </div>

                 <div class="h-list-release">
                   <div class="mt5">提交人：<span>{{item.modifyIp}}</span></div>
                   <div class="mt5">提交时间：<span>{{item.modifyDate | formatData}}</span></div>
                 </div>
                 <div class="h-list-putaway">
                   <div>上架状态：<span class="d-status " :class="{'d-bg-cyan': item.shangJiaZt == 1,'d-bg-gray': item.shangJiaZt == 2,'d-bg-crimson': item.shangJiaZt == 0,'d-bg-blue': item.shangJiaZt == 4,'d-bg-orange': item.shangJiaZt == 3,}" round >{{item.shangJiaZtMc}}</span></div>
                   <div class="mt5">上架时间：<span>{{item.shangJiaSj | formatData}}</span></div>
                   <div class="mt5"><span class="d-status" :class="item.shouYeTj== 0?'d-bg-gray':'d-bg-pink'" @click="homePageRecommend(item)"  d-home>首页推荐</span><span class="d-status  ml10" :class="item.shangQuanTj==0?'d-bg-gray':'d-bg-violet'" @click="BusinessAreaRecommend(item)"   d-putaway>商圈推荐</span></div>
                 </div>
                 <div class="h-list-handle">

                   <div><router-link :to="{path:'/putaway/villagedetails',query:{id:item.id}}"  tag="a" ><span class="d-status" d-view>预览查看</span></router-link><router-link :to="{path:'/putaway/xiaoqucontrast',query:{id:item.id}}"  tag="a" ><span class="d-status ml4" d-view v-show="item.shangJiaZt == 4">对比查看</span></router-link></div>
                   <div class="mt5"><router-link  :to="{path:'/putaway/villagedetails',query:{id:item.id}}" tag="a" ><span class="d-status" d-edit>编辑</span></router-link><span class="d-status ml5" d-soldout  v-show="item.shangJiaZt == 1 || item.shangJiaZt == 4" @click="toSoldOut(item)" >下架</span><span class="d-status ml5 " v-show = "item.shangJiaZt == 3" d-soldout @click="dealSoldOut(item)" >成交下架</span><span class="d-status ml5" d-soldout v-show="item.shangJiaZt == 0 || item.shangJiaZt == 2" @click="toPutAway(item)">上架</span><span class="d-status ml5" d-update v-show="item.shangJiaZt == 4" @click="update(item)" >更新</span></div>
                   <div class="mt5"><span class="d-status" d-record @click="putAwayRecord(item.id)" >上/下架记录</span><span class="d-status ml5" d-del @click="houseDelete(item.id)" >删除</span></div>
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

    <el-dialog
  title="上/下架记录"
  :visible.sync="isVisible"
  width="50%"
  >
  <p><span>楼盘名称：{{houseName}}</span><span class="weizhi"><i class="el-icon-location"></i>{{housePosition}}</span></p>
   <el-table
    :data="recordTable"
    style="width: 100%"
    border
    >
    <el-table-column
      prop="tiJiaoRenMc"
      label="提交人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tiJiaoSj"
      label="提交时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="shangJiaZt"
      label="上/下架操作"
      width="120">
    </el-table-column>
    <el-table-column
      prop="modifyUserMc"
      label="操作人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="modifyDate"
      label="操作时间"
      >
    </el-table-column>
  </el-table>

    <span slot="footer" class="dialog-footer">
    <div class="block">
    <el-pagination
      @current-change="recordPageMessage"
      :current-page.sync="recordCurrentPage"
      :page-size="recordPageSize"
      layout="prev, pager, next, jumper"
      :total="recordCount">
    </el-pagination>
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
            putawayStatus:{},//上下架状态
            checkedStatus:"",//选中的状态
            submitTime:'',//提交时间
            putawayTime:'',//上下架时间
            searchString:'',//搜索字符串
            homePageRecommendVal:'',//首页推荐
            businessAreaRecommendVal:'',//商圈列表推荐
            checkedHouses:[],//选中的房屋
            checkedAll:'',//全选或者全不选
            isVisible:false,//上下架记录是否可见
            recordTable:[],//上下架记录表格
            recordCurrentPage:1,//上下架记录当前页
            recordId:'',//上下架记录Id
            houseName:'',//房源名字
            housePosition:'',//房源位置
            recordCount:0,
            recordPageSize:5,
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
        this.Http.post('/webSite/getSqVos',qs.stringify({
          "xzq_id":id,
        }))
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
        this.Http.post('/webSite/getDtXlVos',qs.stringify({
          'cs_id':'110100',
        }))
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
       putawayChangeStatus(){
        this.currentPage = 1;
        this.checkedHouses = [];
        this.getMessage();
       },
       submitTimeChange(){
          this.currentPage = 1;
          this.checkedHouses = [];
          this.getMessage();
       },
       putawaytTimeChange(){
        this.currentPage = 1;
        this.checkedHouses = [];
        this.getMessage();
       },
       toSearch(){
          this.currentPage = 1;
          this.checkedHouses = [];
          this.getMessage();
       },
       homePageRecommendChange(){
          this.currentPage = 1;
          this.checkedHouses = [];
          this.getMessage();
       },
       businessAreaRecommendChange(){
          this.currentPage = 1;
          this.checkedHouses = [];
          this.getMessage();
       },
       homePageRecommend(Item){
        let status = Item.shouYeTj == 0 ? 1 : 0;
        this.Http.post('/set/tuiJianByFyLp',qs.stringify({
          "id":Item.id,
          "lx":"sy",
          "type":"lp",
          "value":status,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            Item.shouYeTj = Item.shouYeTj == 0 ? 1 : 0;
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
       BusinessAreaRecommend(Item){
        let status = Item.shangQuanTj == 0 ? 1 : 0;
        this.Http.post('/set/tuiJianByFyLp',qs.stringify({
          "id":Item.id,
          "lx":"sq",
          "type":"lp",
          "value":status,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            Item.shangQuanTj = Item.shangQuanTj == 0 ? 1 : 0;
          }else{
             this.$notify({
                title: '错误',
                message: '商圈推荐失败',
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
       batchPutAway(){
        let ids = [];
        this.checkedHouses.forEach(item=>{
          ids.push(item.id);
        })
        this.Http.post('/set/modifyShangJiaLp',qs.stringify({
          "id":ids.join(","),
          "cao_zuo":1,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
           this.checkedHouses.forEach(item=>{
            item.shangJiaZt = 1;
            item.shangJiaZtMc = "已上架";
           })
            this.$notify({
                title: '成功',
                message: '批量上架成功',
                type: 'success'
            });
          }else{
            this.$notify({
                title: '错误',
                message: '批量上架操作失败',
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
       batchSoldOut(){
        let ids = [];
        this.checkedHouses.forEach(item=>{
          ids.push(item.id);
        })
        this.Http.post('/set/modifyShangJiaLp',qs.stringify({
          "id":ids.join(","),
          "cao_zuo":0,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.checkedHouses.forEach(item=>{
              item.shangJiaZt = 0;
              item.shangJiaZtMc = "已下架";
            })
             this.$notify({
                title: '成功',
                message: '批量下架成功',
                type: 'success'
            });
          }else{
            this.$notify({
                title: '错误',
                message: '批量下架操作失败',
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
    batchDelete(){
        let ids = [];
        this.checkedHouses.forEach(item=>{
          ids.push(item.id);
        })
        this.Http.post('/set/deleteLp',qs.stringify({
          "id":ids.join(","),
        }))
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
    houseDelete(id){
      this.Http.post('/set/deleteLp',qs.stringify({
          "id":id,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
              this.checkedHouses = [];
              this.getMessage();
               this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
            });
          }else{
            this.$notify({
                title: '错误',
                message: '删除操作失败',
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
    toPutAway(Item){
      this.Http.post('/set/modifyShangJiaLp',qs.stringify({
          "id":Item.id,
          "cao_zuo":1,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
           Item.shangJiaZt = 1;
           Item.shangJiaZtMc = "已上架";
            this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
            });
          }else{
            this.$notify({
                title: '错误',
                message: '下架操作失败',
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
    toSoldOut(Item){
        this.Http.post('/set/modifyShangJiaLp',qs.stringify({
          "id":Item.id,
          "cao_zuo":0,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
           Item.shangJiaZt = 0;
           Item.shangJiaZtMc = "已下架";
            this.$notify({
                title: '成功',
                message: '下架成功',
                type: 'success'
            });
          }else{
            this.$notify({
                title: '错误',
                message: '上架操作失败',
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
      putAwayRecord(id){
        this.recordId = id;
        this.recordCurrentPage = 1;
        this.recordPageMessage();
      },
      recordPageMessage(){
        this.isVisible = true;
        this.Http.post('/set/listShangJiaLp',{
          id:this.recordId,
          currentPage:this.recordCurrentPage,
        })
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.houseName = res.data.lpMc;
            this.housePosition = res.data.address;
            this.recordTable = [];
            this.recordPageSize = res.data.pageSize;
            this.recordCount = res.data.countSum;
            res.data.vos.forEach(item=>{
              let table = {
                "tiJiaoRenMc":item.tiJiaoRenMc,
                "tiJiaoSj":item.tiJiaoSj,
                "shangJiaZt":item.shangJiaZt,
                "modifyUserMc":item.modifyUserMc,
                "modifyDate":item.modifyDate,
              }
              this.recordTable.push(table);
            })
          }else{
             this.$notify({
                title: '错误',
                message: '显示上下架记录操作失败',
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
      dealSoldOut(Item){
        this.Http.post('/set/modifyShangJiaLp',qs.stringify({
          "id":Item.id,
          "cao_zuo":0,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
           Item.shangJiaZt = 0;
           Item.shangJiaZtMc = "已下架";
            this.$notify({
                title: '成功',
                message: '成交下架操作成功',
                type: 'success'
            });
          }else{
            this.$notify({
                title: '错误',
                message: '成交下架操作失败',
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
      update(Item){
          this.Http.post('/set/refreshLp',qs.stringify({
          "id":Item.id,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.checkedHouses = [];
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
      getMessage(){
        this.isLoading = true;
        this.housesInfo = [];
        this.checkedAll = false;
        let form = {
          'cs_id':'110100',
          "serach_name":this.searchString,
          "xzq_id":this.districtId,
          "sq_id":this.businessAreaId,
          "dt_xl":this.subwayId,
          "shang_jia_zt":this.checkedStatus,
          "modify_date_from":this.submitTime[0],
          "modify_date_to":this.submitTime[1],
          "shang_jia_sj_from":this.putawayTime[0],
          "shang_jia_sj_to":this.putawayTime[1],
          "shou_ye_tj":this.homePageRecommendVal ? 1:'' ,
          "shang_quan_tj":this.businessAreaRecommendVal ? 1 : '',
          "currentPage":this.currentPage,
        }
        this.Http.post('/set/listBuildingUpdate',qs.stringify(form))
      .then( res => {
          if(res && res.data && res.data.SUCCESS){
            this.isLoading = false;
             this.countSum = res.data.countSum;
             this.pageSize = res.data.pageSize;
             this.companyId = res.data.companyId;
             this.housesInfo = res.data.lpVos;
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
    components: {
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
span.weizhi {
    position: relative;
    left: 64px;
}
.bt{
    border-top:1px solid #efefef !important;
}
</style>

<!-- 样式还需要进行调整 -->


