
<template>
  <div class="d-main">
    <filter-main :allMessage='allMessage' :priceFont="priceFont" :fyvos='fyvos' :fyPrice="fyPrice" :shangjiaprop="shangjiaprop" :key="index" :index="index" :zhuangxiuprop="zhuangxiuprop"  :mianji="mianji" :district="district" :isshow="isshow" :formdata="formdata" ></filter-main>
    <h2 class="title">{{pageListName}}上下架管理</h2>
    <!-- 上下架管理列表 -->
    <div class="d-content">
        <div class="house-list-top">
            <div class="h-result-sum d-inline">
                共<span class="num">{{allMessage.countSum}}</span>套房源
            </div>
            <div class="button-box d-inline ml20 " v-show="alonecheck.length">
              <el-button size="small" @click="pilianghsangjia">批量上架</el-button>
              <el-button size="small" @click="piliangxiajia">批量下架</el-button>
              <el-button size="small" @click="piliangshanchu">批量删除</el-button>
            </div>
        </div>
        <div class="house-list-con">

          <div class="house-list-head">
            <div class="h-list-check">
                <div class="d-check">
                    <input type="checkbox" v-model="allchecked"   @change="alonecheck = allchecked ? fyvos : [] ;">
                    <i></i>
                </div>
            </div>

            <div class="h-list-info" style="width: 540px;">房源信息</div>
            <div class="h-list-release">发布信息</div>
            <div class="h-list-putaway">上架信息</div>
            <div class="h-list-handle">操作</div>
          </div>
          <ul class="house-list-ul">
            <li style="text-align:center;line-height:120px;font-size:40px" v-show="isshow.show"><i class="el-icon-loading"></i></li>
            <li style="text-align:center;line-height:120px;font-size:20px" v-show="!isshow.show && !allMessage.countSum">没有数据了</li>
              <li v-for="(item,index) of allMessage.fyVos" :key="index">
                 <div class="h-list-check">
                  <div class="d-check">
                    <input type="checkbox" v-model="alonecheck"  :value="item">
                    <i></i>
                  </div>
                 </div>
                 <div class="h-list-img mr20"><router-link  :to="{path:'/putaway/detail',query:{id:item.id,typeTab:formdata.typeTab,shop_office:formdata.shop_office}}" tag="a" ><img :src="item.imgSrc" alt=""></router-link></div>
                 <div class="h-list-info d-elip">
                  <router-link  :to="{path:'/putaway/detail',query:{id:item.id,typeTab:formdata.typeTab,shop_office:formdata.shop_office}}" class="title d-elip" tag="a" >{{item.zhuBt}}</router-link>
                      <div class="info mt5">
                        <span>{{item.IpMc}}</span>
                        <span>{{item.shi}}室{{item.ting}}厅{{item.chu}}厨{{item.wei}}卫</span>
                        <span>{{item.xsMj}}</span>
                        <span>{{item.fjChaoXiang}}</span>
                        <span>{{item.zhuangXiu}}</span>
                      </div>
                      <div class="price mt5">
                        <span class="main-text">{{item.chuShouZj}}{{units.first}}</span>
                        <span v-show="formdata.typeTab !== 'ChuZu'">{{item.chuShouDj}}{{units.second}}</span>
                      </div>
                      <div class="status mt5">
                        <span>编号：<a style="color:#33ba9b">{{item.fyZt}}</a></span>
                        <span>房源状态：<a style="color:#33ba9b">{{item.fyZtMc}}</a></span>
                      </div>
                 </div>

                 <div class="h-list-release">
                   <div>维护人：<span>{{item.weiHuRenMc}}</span></div>
                   <div class="mt5">提交人：<span>{{item.modifyIp}}</span></div>
                   <div class="mt5">提交时间：<span>{{item.fafanSj | formatData}}</span></div>
                 </div>
                 <div class="h-list-putaway">
                   <div>上架状态：<span class="d-status " :class="{'d-bg-cyan': item.shangJiaZt == 1,'d-bg-gray': item.shangJiaZt == 2,'d-bg-crimson': item.shangJiaZt == 0,'d-bg-blue': item.shangJiaZt == 4,'d-bg-orange': item.shangJiaZt == 3,}" round >{{item.shangJiaZtMc}}</span></div>
                   <div class="mt5">上架时间：<span>{{item.shangJiaSj | formatData}}</span></div>
                   <div class="mt5"><span class="d-status" :class="item.shouYeTj==0?'d-bg-gray':'d-bg-pink'"  @click="shouyetuijian(item)" d-home>首页推荐</span><span class="d-status  ml10" :class="item.shangQuanTj==0?'d-bg-gray':'d-bg-violet'" @click="shangquantuijian(item)"  d-putaway>商圈推荐</span></div>
                 </div>
                 <div class="h-list-handle">
                   <div><router-link  :to="{path:'/putaway/detail',query:{id:item.id,typeTab:formdata.typeTab,shop_office:formdata.shop_office}}" tag="a" ><span class="d-status" d-view>预览查看</span></router-link><router-link  :to="{path:'/putaway/contrast',query:{id:item.id,typeTab:formdata.typeTab,shop_office:formdata.shop_office}}" tag="a" ><span class="d-status ml4" d-view v-show="item.shangJiaZt == 4">对比查看</span></router-link></div>
                   <div class="mt5"><router-link  :to="{path:'/putaway/detail',query:{id:item.id,typeTab:formdata.typeTab,shop_office:formdata.shop_office}}" tag="a" ><span class="d-status" d-edit>编辑</span></router-link><span class="d-status ml5" d-soldout  v-show="item.shangJiaZt == 1  || item.shangJiaZt == 4" @click="xiajia(item.id)">下架</span><span class="d-status ml5 " v-show = "item.shangJiaZt == 3" d-soldout @click="dealSoldOut(item.id)" >成交下架</span><span class="d-status ml5" d-soldout v-show="item.shangJiaZt == 0 || item.shangJiaZt == 2" @click="shangjia(item.id)" >上架</span><span class="d-status ml5" d-update @click="update(item)" v-show="item.shangJiaZt == 4" >更新</span></div>
                   <div class="mt5"><span class="d-status" d-record @click="jilu(item.id)">上/下架记录</span><span class="d-status ml5" d-del @click="shanchu(item.id)">删除</span></div>
                 </div>
              </li>
          </ul>
          <!-- 分页 -->
          <div class="d-page ar">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="allMessage.countSum">
            </el-pagination>
          </div>
        </div>
    </div>
    <putaway-record :putawayjilu='putawayjilu'></putaway-record>
  </div>
</template>

<script>
import Filter from '@/components/filter.vue'
import putawayRecord from '@/components/putaway-record.vue'
import qs from 'qs'
  export default {
    data(){
        return{
            priceFont:{
              first:'月租金',
              second:'日租金',
            },
            units:{
              first:'',
              second:'',
            },
            allchecked:false,
            alonecheck:[],
            formdata:{},
            isshow:{
              show:false,
            },
            pageListName:'',
            index:1,
            fyPrice:[],
            mianji:[],
            shangjiaprop:[],
            district:[],
            zhuangxiuprop:[],
            currentPage:1,
            allMessage:{},
            fyvos:[],
            putawayjilu:{
              isvisible : false,
              id:'',
              table:[],
              serialNumber:'',
            },
        }
    },
    beforeMount(){
      let urlQuery=this.$route.query
        if((urlQuery.typeTab=="" || urlQuery.typeTab==undefined) && this.companyType=="fmd"){
          this.formdata={
            typeTab:"ChuZu",
            cs_id:"110100",
            }
        }else if((urlQuery.typeTab=="" || urlQuery.typeTab==undefined) && this.companyType=="lmd"){
          this.formdata={
            typeTab:"SyZuLin",
            shop_office:"x",
            cs_id:"110100",
            }
        }else{
          this.formdata=urlQuery
          this.formdata.cs_id="110100"
        };
       this.getMessage();
    },
    created(){
        this.formdata["typeTab"] = this.$route.query.typeTab;
        this.formdata["shop_office"] = this.$route.query.shop_office;
        this.formdata['cs_id'] = '110100';
        if(this.formdata.typeTab == undefined){
          this.formdata.typeTab = 'ChuZu';
        }
        if(this.formdata.shop_office == undefined){
          this.formdata.shop_office = '';
        }
        if(this.formdata.typeTab == 'ChuZu'){
          this.pageListName = '租房';
        }else if(this.formdata.typeTab == 'ChuShou'){
          this.pageListName = '二手房';
        }else if(this.formdata.typeTab == 'SyZuLin' && this.formdata.shop_office == "x"){
           this.pageListName = '写字楼出租';
        }else if(this.formdata.typeTab == 'SyMaiMai' && this.formdata.shop_office == "x"){
           this.pageListName = '写字楼出售';
        }else if(this.formdata.typeTab == 'SyZuLin' && this.formdata.shop_office == "s"){
           this.pageListName = '商铺出租';
        }else if(this.formdata.typeTab == 'SyMaiMai' && this.formdata.shop_office == "s"){
           this.pageListName = '商铺出售';
        }
        if(this.$route.query.typeTab == undefined || this.$route.query.typeTab == 'SyZuLin'){
          this.priceFont.first = '月租金';
          this.priceFont.second = '日租金';
        }else{
          this.priceFont.first = '总价';
          this.priceFont.second = '单价';
        }
        if(this.formdata.typeTab == 'ChuShou' || this.formdata.typeTab == 'SyMaiMai'){
          this.units.first = '万元';
          this.units.second = '元/平米'
        }else if(this.formdata.typeTab == 'ChuZu' || this.formdata.typeTab == 'SyZuLin'){
          this.units.first = '元/月';
          this.units.second = '元/平米/天';
        }
    },
    methods:{
      xiajia(id){
        this.Http.post('/set/modifyShangJiaFy',qs.stringify({
          'id':id,
          'cao_zuo':0,
        }))
        .then( (res) => {
         if(res && res.data && res.data.SUCCESS){
              this.getMessage();
         }else{
             this.$notify({
                title: '错误',
                message: '下架失败',
                type: 'error',
             });
         }
        })
        .catch( (error) => {
          console.log(error);
        });

      },
      shangjia(id){
        this.Http.post('/set/modifyShangJiaFy',qs.stringify({
          'id':id,
          'cao_zuo':1
        }))
        .then( res => {
         if(res && res.data && res.data.SUCCESS){
          this.getMessage();
         }else{
              this.$notify({
                title: '错误',
                message: '上架操作失败',
                type: 'error',
             });
         }
        })
        .catch( (error) => {
        });
      },
      update(Item){
          this.Http.post('/set/refreshFy',qs.stringify({
          "id":Item.id,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
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
      jilu(id){
          this.putawayjilu.id = id;
          this.Http.post('/set/listShangJiaFy',{
            'id':id
          })
          .then( res=> {
           if(res && res.data && res.data.SUCCESS){
             this.putawayjilu.table = [];
              res.data.vos[0] &&  (this.putawayjilu.serialNumber = res.data.vos[0].fyBh);
             res.data.vos.forEach(item=>{
                 let data = {
                         fyZt: item.fyZt,
                         tiJiaoRenMc: item.tiJiaoRenMc,
                         tiJiaoSj: item.tiJiaoSj,
                         shangJiaZt: item.shangJiaZt,
                         modifyUserMc: item.modifyUserMc,
                         modifyDate: item.modifyDate,
                 }
               this.putawayjilu.table.push(data);
             })
             this.putawayjilu.isvisible = true;
           }
          })
        .catch(function (error) {
          console.log(error);
        });
      },
      shanchu(id){
        this.Http.post('/set/deleteFy',qs.stringify({
          'id':id
        }))
          .then( (res) =>{
           if(res && res.data && res.data.SUCCESS){
              this.getMessage();
           }else{
             this.$notify({
                title: '错误',
                message: '删除失败',
                type: 'error'
             });
           }
          })
        .catch((error)=> {
          console.log(error);
        });
      },
      pilianghsangjia(){
        let arrid = [];
          this.alonecheck.forEach((item)=>{
              arrid.push(item.id);
          });
          this.Http.post('/set/modifyShangJiaFy',qs.stringify({
            "id":arrid.join(','),
            "cao_zuo":1,
          }))
          .then(res=>{
            if(res && res.data && res.data.SUCCESS){
                this.getMessage();
            }else{
               this.$notify({
                    title: '错误',
                    message: '批量上架失败',
                    type: 'error'
              });
            }
          })
      },
      piliangxiajia(){
          let arrid = [];
          this.alonecheck.forEach((item)=>{
              arrid.push(item.id);
          });
          this.Http.post('/set/modifyShangJiaFy',qs.stringify({
            "id":arrid.join(','),
            "cao_zuo":0,
          }))
          .then(res=>{
            if(res && res.data && res.data.SUCCESS){
                 this.getMessage();
            }else{
               this.$notify({
                    title: '错误',
                    message: '批量下架失败',
                    type: 'error'
              });
            }
          })
          .catch(error=>{
            console.log(error)
          })
      },
      piliangshanchu(){
          let arrid = [];
          this.alonecheck.forEach((item)=>{
              arrid.push(item.id);
          });
          this.Http.post('/set/deleteFy',qs.stringify({
            "id":arrid.join(","),
          }))
          .then(res=>{
            if(res && res.data && res.data.SUCCESS){
                this.getMessage();
            }else{
               this.$notify({
                    title: '错误',
                    message: '批量删除操作失败',
                    type: 'error'
            });
            }
          })
          .catch(error=>{
            console.log(error)
          })

          },
      shouyetuijian(item){
        this.Http.post('/set/tuiJianByFyLp',qs.stringify({
           'id':item.id,
          'lx' : 'sy',
          'type':'fy',
          'value': item.shouYeTj == 0 ? 1 : 0 ,
        }))
        .then(res=>{
          if(res &&res.data && res.data.SUCCESS){
            this.getMessage();
          }else{
              this.$notify({
                    title: '错误',
                    message: '改变首页推荐失败',
                    type: 'error'
              });
          }
        })
        .catch(error=>{
          console.log(error)
        })

      },
      dealSoldOut(id){
        this.Http.post('/set/modifyShangJiaFy',qs.stringify({
          "id":id,
          "cao_zuo":0,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
           this.getMessage();
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
      shangquantuijian(item){
        this.Http.post('/set/tuiJianByFyLp',qs.stringify({
          'id':item.id,
          'lx' : 'sq',
          'type':'fy',
          'value': item.shangQuanTj == 0 ? 1 : 0,
        }))
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.getMessage();
          }else{
            this.$notify({
                    title: '错误',
                    message: '改变商圈推荐失败',
                    type: 'error'
            });
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },
      handleCurrentChange(val){
          this.getMessage()
      },
      getMessage(){
        this.isshow.show = true;
        this.allchecked = false;
        this.allMessage.fyvos = [];
        this.alonecheck = [];
        let form = {
            'cs_id':'110100',
            'typeTab':this.formdata["typeTab"],
            "currentPage":this.currentPage,
            "shop_office":this.formdata["shop_office"],
            "currentPage":this.currentPage,
          };
        this.Http.post('/set/listFyUpdate',form)
          .then( res => {
              if(res && res.data && res.data.SUCCESS){
                this.isshow.show = false;
                this.allMessage = res.data;
                this.fyvos = res.data.fyVos;
                this.fyPrice = res.data.jiaGeLst;
                this.mianji = res.data.mianJiLst;
                this.shangjiaprop  = res.data.shangJiaMap;
                this.district = res.data.xzqVos;
                this.zhuangxiuprop = res.data.zhuangXiuMap;
              }else{
                  this.$notify({
                    title: '错误',
                    message: '获取数据失败',
                    type: 'error'
                 });

              }
          })
          .catch( error => {
              this.$notify({
                    title: '错误',
                    message: '捕捉异常',
                    type: 'error'
                 });
            throw new error;
          });
      }
    },
    watch:{
    $route(){
        this.formdata["typeTab"] = this.$route.query.typeTab;
        this.formdata["shop_office"] = this.$route.query.shop_office;
        this.formdata['cs_id'] = '110100';
        if(this.formdata.typeTab == undefined){
          this.formdata.typeTab = 'ChuZu';
        }
        if(this.formdata.shop_office == undefined){
          this.formdata.shop_office = '';
        }
        if(this.formdata.typeTab == 'ChuZu'){
          this.pageListName = '租房';
        }else if(this.formdata.typeTab == 'ChuShou'){
          this.pageListName = '二手房';
        }else if(this.formdata.typeTab == 'SyZuLin' && this.formdata.shop_office == "x"){
           this.pageListName = '写字楼出租';
        }else if(this.formdata.typeTab == 'SyMaiMai' && this.formdata.shop_office == "x"){
           this.pageListName = '写字楼出售';
        }else if(this.formdata.typeTab == 'SyZuLin' && this.formdata.shop_office == "s"){
           this.pageListName = '商铺出租';
        }else if(this.formdata.typeTab == 'SyMaiMai' && this.formdata.shop_office == "s"){
           this.pageListName = '商铺出售';
        }
        if(this.$route.query.typeTab == undefined || this.$route.query.typeTab == 'SyZuLin'){
          this.priceFont.first = '月租金';
          this.priceFont.second = '日租金';
        }else{
          this.priceFont.first = '总价';
          this.priceFont.second = '单价';
        }
         if(this.formdata.typeTab == 'ChuShou' || this.formdata.typeTab == 'SyMaiMai'){
          this.units.first = '万元';
          this.units.second = '元/平米'
        }else if(this.formdata.typeTab == 'ChuZu' || this.formdata.typeTab == 'SyZuLin'){
          this.units.first = '元/月';
          this.units.second = '元/平米/天';
        }
        this.index++;
        this.getMessage();
    }
  },
    components: {
      filterMain:Filter,
      putawayRecord,
    }
  }

</script>
<style scoped>
  .myinput{
    color: #5a5e66;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    white-space: nowrap;
  }
  .bgcolor{
    background:#ff6969;
  }
  img{
    object-fit: cover;
    width:180px;
    height:98px;
  }

</style>

