<template>
    <div>
		<div class="d-main" style="padding-top: 60px">
        <!-- 条件筛选 -->
        <el-form ref="form" :model="form" label-width="80px">
          <div class="d-content mt20">
            <div class="d-filter-main el-form-small">
                <div class="d-filter-item">
                    <div class="d-filter-key">位置</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-tab mb10">
                            <span :class="{active:isactive1}" @click="getdistrict">区域<i class="iconfont icon-arrow-down"></i></span>
                            <span :class="{active:isactive2}" @click="getsubway">地铁<i class="iconfont icon-arrow-down"></i></span>
                        </div>
                        <div class="d-filter-val-list" v-show="isactive1">
                            <a  v-for="(item,index) of district" :key="index" :class="{active:item.id == districtId}" @click="getBusinessArea(item.id)" href="javascript:;">{{item.mc}}</a>
                        </div>
                         <div class="d-filter-val-list bt" v-show="districtId">
                            <a href="javascript:;" v-for="(item,index) of businessArea" :key="index" :class="{active:item.id == businessAreaId}" @click="businessAreaClicked(item.id)" >{{item.sqMc}}</a>
                        </div>
                        <div class="d-filter-val-list" v-show="isactive2">
                            <a  v-for="(item,index) of subway" :key="index"  :class="{active:item.id == subwayId}" @click="subwaymes(item.id)" href="javascript:;">{{item.mc}}</a>
                        </div>
                    </div>
                </div>
                <!-- 价格 -->
                <div class="d-filter-item" v-show="formdata.typeTab != 'xiaoqu'">
                    <div class="d-filter-key">价格</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-tab mb15">
                            <span :class="{active:zongjia}" @click="allprice" >{{priceFont.first}}<i class="iconfont icon-arrow-down"></i></span>
                            <span :class="{active:danjia}" @click="aloneprice" v-show="formdata.typeTab != 'ChuZu'">{{priceFont.second}}<i class="iconfont icon-arrow-down"></i></span>
                        </div>
                        <div class="d-filter-val-list d-filter-custom" v-show="zongjia">
                            <div class="d-filter-val-con" :class="{dHidden: !isCustomPrice}">
                                <el-checkbox v-for="(item,index) of fyPrice" @change="getMessage" v-model="modelshujv.allprice"  :label="item" :key="item">{{item}}{{$route.query.typeTab == 'SyZuLin' || $route.query.typeTab == undefined ? '元/月':'万元'}}</el-checkbox>
                                <div class="d-filter-custom-box d-inline"  v-show="!isCustomPrice">
                                   <input type="text"> - <input type="text"> {{$route.query.typeTab == 'SyZuLin' || $route.query.typeTab == undefined ? '元/月':'万元'}}
                                   <button type="button" class="btn el-icon-search"></button>
                                </div>
                            </div>  
                            <span class="filter-custom-btn" @click="customHandle('price')" v-show="false">+更多及自定义</span>  
                        </div>
                        <div class="d-filter-val-list d-filter-custom" v-show="danjia">
                            <div class="d-filter-val-con" :class="{dHidden: isCustomPrice}">
                                <el-checkbox v-for="(item,index) of danjiaprice " @change="getMessage" v-model="modelshujv.unitprice" :label="item" :key="item">{{item}}{{$route.query.typeTab == 'SyZuLin' ? '元/㎡/日':'元/㎡'}}</el-checkbox>
                                <div class="d-filter-custom-box d-inline" v-show="!isCustomPrice">
                                   <input type="text"> - <input type="text"> 元
                                   <button type="button" class="btn el-icon-search"></button>
                                </div>
                            </div>
                            <span class="filter-custom-btn" @click="customHandle('price')" v-show="false">+更多及自定义</span>
                        </div>
                    </div>
                </div>
                <!-- 面积 -->
                <div class="d-filter-item" v-show="formdata.typeTab != 'xiaoqu'">
                    <div class="d-filter-key">面积</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-list  d-filter-custom">
                            <div class="d-filter-val-con" :class="{dHidden: isCustomArea}">
                                <el-checkbox v-for="(item,index) in mianji" v-model="modelshujv.area" @change="getMessage" :label="item" :key="item">{{item}}㎡</el-checkbox>
                                <div class="d-filter-custom-box d-inline" v-show="!isCustomArea">
                                   <input type="text" v-model="modelshujv.xs_mj_from"> - <input type="text" v-model="modelshujv.xs_mj_from"> m² 
                                   <button type="button" class="btn el-icon-search"></button>
                                </div>
                            </div>
                            <span class="filter-custom-btn" v-show="false" @click="customHandle('area')">+更多及自定义</span>
                        </div> 
                    </div>
                </div>
                <!-- 装修 -->
                <div class="d-filter-item" v-show="formdata.typeTab != 'xiaoqu'">
                    <div class="d-filter-key">装修</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-list">
                            <el-checkbox v-for="(value,key,index) in zhuangxiuprop" v-model="modelshujv.fitment" @change="getMessage" :label="key" :key="key">{{value}}</el-checkbox>
                        </div>
                    </div>
                </div>
                <!-- 管理状态 -->
                <div class="d-filter-item filter-stuta" >
                    <div class="d-filter-key">管理</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-list">
                           <el-select id="d-shangjia" placeholder="上架状态" size="mini" v-model="modelshujv.mangestatus" @change="getMessage">
                            <el-option class="d-shangjia" v-for="(value,key,index) of shangjiaprop" :key="index"  :label="value" :value="key"></el-option>
                          </el-select>
                              <el-date-picker
                                  type="daterange"
                                  v-model="modelshujv.fafan_sj"
                                  @change="getMessage"
                                  range-separator="至"
                                  start-placeholder="提交时间起"
                                  end-placeholder="提交时间止">
                            </el-date-picker>
                            <el-date-picker
                               type="daterange"
                               @change="getMessage"
                               range-separator="至"
                               v-model="modelshujv.shang_jia_sj"
                               size="mini"
                               start-placeholder="上/下架时间起"
                               end-placeholder="上/下架时间止">
                            </el-date-picker>
                            <el-input class="shuru" v-model.trim="modelshujv.searchname" @blur="getMessage"  placeholder="搜索房源编号、提交人、维护人"></el-input>
                             <el-button slot="append" icon="el-icon-search" class="tosearch"></el-button>
                        </div>
                    </div>
                </div>
                 <!-- 装修 -->
                <div class="d-filter-item">
                    <div class="d-filter-val">
                        <div class="d-filter-val-list">
                            <el-checkbox v-model="modelshujv.shou_ye_tj1" @change="getMessage" >首页推荐</el-checkbox>
                            <el-checkbox v-model="modelshujv.shang_quan_tj1" @change="getMessage" >商圈列表推荐</el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </el-form>
	</div>
</div>
</template>
<script>
import qs from 'qs'
export default {
	name: 'Filter',
    props:['allMessage','formdata','priceFont','fyvos','fyPrice','shangjiaprop','mianji','district','zhuangxiuprop','index','isshow'],
    data() {
      return {
        isCustomPrice:true, //是否显示自定义价格
        isCustomArea:true, //是否显示自定义面积
        isactive1:true,
        isactive2:false,
        //分割线
        districtId:'',//行政区ID
        businessAreaId:'',//商圈ID
        subwayId:'',//地铁ID
        zongjia:true,
        danjia:false,
        danjiaprice:[],
        dateTime1:'',
        dateTime2:'',
        search:'',
        recommed1:'',
        recommed2:'',
        businessArea:[],
        subway:[],
        modelshujv:{
            searchname:'',//查询条件
            area:[],//面积区间
            allprice:[],//总价区间
            unitprice:[],//单价区间
            monthrentprice:[],//月租金区间
            dayrentprice:[],//日租金区间
            fitment:[],//装修
            mangestatus:'',//管理状态
            fafan_sj:[],//提交时间
            shang_jia_sj:[],//上架时间
            shou_ye_tj1:'',//首页推荐
            shang_quan_tj1:'',//商圈推荐
            xs_mj_from:'', //自定义面积区间
            xs_mj_to:'',
        },
        form:{},
      };
    },
    computed:{
        businessSelect(){
            if(this.formdata.change){
                console.log(true)
            }
            return true;
        }
    },
    methods:{
        customHandle(val){
            if(val =="price"){
                this.isCustomPrice = false
            }else if(val =="area"){
                this.isCustomArea = false
            }
            
        },
        getBusinessArea(id){
            this.districtId = id;
            this.subwayId = '';
            this.getMessage();
            this.Http.post('/webSite/getSqVos',qs.stringify({
                "xzq_id":this.districtId
            }))
            .then( (res) => {
                if(res && res.data && res.data.SUCCESS){
                    this.businessArea = res.data.sqVos;
                }
            })
            .catch( (error) => {
              console.log(error);
            });

        },
        getsubway(){
        this.isactive1 = false;
        this.isactive2 = true;
        this.districtId = '';
        this.businessAreaId = '';
            let form = {
                cs_id:110100,
            }
        this.Http.post('/webSite/getDtXlVos',qs.stringify(form))
        .then((res)=>{
            if(res && res.data && res.data.SUCCESS){
                  this.subway = res.data.dtXlVos;
            }

        })
        .catch( (error) => {
          console.log(error);
        });
        },
        getdistrict(){
            this.isactive1 = true;
            this.isactive2 = false;
        },
        businessAreaClicked(id){
            this.businessAreaId = id;
            this.getMessage();
        },
        subwaymes(id){
            this.subwayId = id;

            this.getMessage();
        },
        allprice(){
            this.zongjia = true;
            this.danjia = false;
            this.modelshujv.aloneprice = [];
        },
        aloneprice(){
            this.modelshujv.allprice = [];
            let form = {
                "cs_id":'110100',
                "typeTab":this.formdata.typeTab,
                "type":'jiaGe',
                "col":1,
            }
        this.Http.post('/webSite/getFilterLst',qs.stringify(form))
        .then( (response) => {
            if(response && response.data && response.data.SUCCESS){
                this.danjiaprice = response.data.jiaGeLst;
                this.zongjia =false;
                this.danjia = true;
            }else{
                this.$notify({
                    title: '错误',
                    message: '操作失败',
                    type: 'error'
                });
            }
        })
        .catch( (error) => {
                this.$notify({
                    title: '错误',
                    message: '操作失败',
                    type: 'error'
                });
        });
            
        },
        //获得数据
        getMessage(){
                // 首页推荐
                this.isshow.show = true;
                this.allMessage.fyVos = [];
                let form = {
                    "cs_id":'110100',
                    'xzq_id':this.districtId,
                    'sq_id':this.businessAreaId,
                    'dt_xl':this.subwayId,
                    "shou_ye_tj":this.modelshujv.shang_quan_tj1 ? 1:'',
                    "shang_quan_tj":this.modelshujv.shang_quan_tj1 ? 1:'',
                    "xs_mj":this.modelshujv.area.join(','),

                    "zhuang_xiu":this.modelshujv.fitment.join(","),
                    "shang_jia_zt":this.modelshujv.mangestatus,
                    "serach_name":this.modelshujv.searchname,
                    "shang_jia_sj_from":geshi(this.modelshujv.shang_jia_sj[0]),
                    "shang_jia_sj_to":geshi(this.modelshujv.shang_jia_sj[1]),
                    "fafan_sj_from":geshi(this.modelshujv.fafan_sj[0]),
                    "fafan_sj_to":geshi(this.modelshujv.fafan_sj[1])
                }
                Object.assign(form,this.formdata);
                if(this.formdata.typeTab === 'ChuZu' || this.formdata.typeTab === 'SyZuLin' ){
                    form.cz_jg = this.modelshujv.allprice.join(',');
                    form.ri_zu_jin = this.modelshujv.unitprice.join(',');
                }else if(this.formdata.typeTab === 'ChuShou' || this.formdata.typeTab == 'SyMaiMai' ){
                    form.chu_shou_zj = this.modelshujv.allprice.join(',');
                    form.chu_shou_dj = this.modelshujv.unitprice.join(',');
                }
                this.Http.post('/set/listFyUpdate',form)
              .then(res=> {
                    if(res && res.data && res.data.SUCCESS){
                        this.isshow.show =false;
                        this.allMessage = Object.assign(this.allMessage,res.data);
                    }
              })
              .catch((error)=> {
                console.log(error);
              });
            function geshi(date){
                if(date == '' || date == undefined) return;
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                // console.log(month.length)
                month = month.toString().length != 2 ? '0'+month : month;
                day = day.toString().length != 2 ? '0'+day : day;
                return `${year}-${month}-${day}` 
            }
        }
    },
    watch:{
        index(){
            this.isactive1 = true;
            this.isactive2=false;
            this.isactiveBusiness=false;
            this.districtId = '';
            this.businessAreaId = '';
            this.subwayId = '';
            this.zongjia=true;
            this.danjia=false;
            this.danjiaprice=[];
            this.dateTime1='';
            this.dateTime2='';
            this.search='';
            this.recommed1='';
            this.recommed2='';
            this.businessArea=[];
            this.subway=[];
            this.modelshujv.searchname = '';
            this.modelshujv.area = [];
            this.modelshujv.allprice = [];
            this.modelshujv.unitprice = [];
            this.modelshujv.monthrentprice = [];
            this.modelshujv.dayrentprice = [];
            this.modelshujv.fitment = [];
            this.modelshujv.mangestatus = '';
            this.modelshujv.fafan_sj = [];
            this.modelshujv.dayrentprice = [];
            this.modelshujv.shang_jia_sj = '';
            this.modelshujv.shou_ye_tj1 = '';
            this.modelshujv.shang_quan_tj1 = '';
        },
    }
  }
</script>
<style> 
.d-filter-val-list .el-checkbox{width: 130px !important; vertical-align: middle;}
.dHidden{ overflow:hidden; height: 26px; }
.bt{
    border-top:1px solid #efefef !important;
}
a.active{
    color: #ff6969;
}    
.shezhi{
    display: inline-block;
    width:100px;
}
.el-form-small .el-input__inner{
    width: 222px;
}
.shuru{
    float: right !import;
}
.el-input{
    width: 200px
}
#d-shangjia{
    width: 200px !important;
}
.tosearch{
    height: 35px;
    position: relative;
    top: 2px;
    left: 22px;
}


</style>


<!-- 存在的问题 -->


