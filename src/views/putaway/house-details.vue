<template>
<div>
    <el-form :label-position="labelPosition" label-width="100px" :model="detailForm" class="house-details el-form-small">
   
        <div class="details-top mt60">
            <div class="d-main">
                <div class="search-main">
                   <a  class="logo" href=""><img src=""alt=""></a>
                   <h5 class="name">{{breadx}}</h5> 	
                   <div class="seachr-box d-disabled fr">
                       <input type="text" class="d-disabled" disabled="" placeholder="请输入区域、商圈或者楼盘名开始找房">
                       <i class="el-icon-search iconfont icon-search"></i>
                   </div>
                </div>
                <div class="details-title">
                  <div class="d-input-w">
                    <div class="d-input-block">
                        <el-input v-model="detailForm.zhuBt" placeholder="请输入主标题"></el-input>
                    </div>
                    <div class="d-input-block">
                        <el-input v-model="detailForm.fuBt" placeholder="请输入副标题"></el-input>
                    </div>
                   </div>
                    <div class="details-title-w">
                     <div v-show="$route.query.typeTab != 'ChuZu' && $route.query.typeTab !='SyZuLin'" class="d-input-inline">
                        <el-input  v-model="detailForm.chuShouZj+'万元'" placeholder="出售总价/万元"></el-input>
                    </div>
                   
                    
                    <div v-show="$route.query.typeTab != 'ChuShou' && $route.query.typeTab != 'SyMaiMai' " class="d-input-inline">
                        <el-input v-model="detailForm.czJg+'元/月'" placeholder="月租-元/月"></el-input>
                    </div>
                    
                    <div v-show="$route.query.typeTab != 'SyMaiMai' && $route.query.typeTab !='SyZuLin'" class="d-input-inline d-shi">
                        <el-select v-model="detailForm.shiSl" placeholder="室">
                           	<el-option
												      v-for="item in soptions"
												      :key="item.value"
												      :label="item.label"
												      :value="item.value">
												    </el-option>
                        </el-select>
                    </div>
                    <div v-show="$route.query.typeTab != 'SyMaiMai' && $route.query.typeTab !='SyZuLin'" class="d-input-inline d-shi">
                        <el-select v-model="detailForm.tingSl" placeholder="厅">
                          <el-option
												      v-for="item in soptions"
												      :key="item.value"
												      :label="item.label"
												      :value="item.value">
												    </el-option>
                        </el-select>
                    </div>
                    <div  v-show="$route.query.typeTab != 'SyMaiMai' && $route.query.typeTab !='SyZuLin'" class="d-input-inline d-shi">
                        <el-select v-model="detailForm.weiSl" placeholder="卫">
                          <el-option
												      v-for="item in soptions"
												      :key="item.value"
												      :label="item.label"
												      :value="item.value">
												    </el-option>
                        </el-select>
                    </div>
                    
                    
                    
                    <div v-show="$route.query.typeTab != 'ChuShou' && $route.query.typeTab !='ChuZu' && $route.query.typeTab !='SyMaiMai'" class="d-input-inline">
                        <el-input v-model="detailForm.riZuJin+'元/平米/天'" placeholder="日租-元/平米/天"></el-input>
                    </div>
                    <div class="d-input-inline">
                        <el-input v-model="detailForm.xsMj+'平米'" placeholder="面积-平米"></el-input>
                    </div>

                    <div class="d-cx">
                        <el-select v-model="detailForm.fjChaoXiang" multiple collapse-tags placeholder="朝向">   <!--collapse-tags-->
                          <el-option v-for="(value,key,index) in detailForm.roomTowords" :key="index" :label="value" :value="key" ></el-option>
                        </el-select>
                    </div>
                    <div class="d-input-inline">
                        <el-select v-model="detailForm.zhuangXiu" placeholder="装修">
                          <el-option v-for="(value,key,index) in detailForm.roomDecoration" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                    </div>
                    <div class="d-input-inline">
                        <el-select v-model="detailForm.lcLx" placeholder="楼层类型">
                          <el-option v-for="(value,key,index) in detailForm.floorType" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                    </div>
                    <div class="d-input-inline">
                        <el-input v-model="detailForm.upstairCount+'层'" placeholder="总楼层-层"></el-input>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="d-main pb50"> 
            <div class="d-breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item class="breadspan" :to="{ path: '/'}">首页</el-breadcrumb-item>
                  <span class="breadspan" @click="quxiao">{{breadx}}</span> 
                  <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
                  <!--:to="{ path: '/putaway/shoprent',query:{typeTab:$route.query.typeTab,shop_office:$route.query.shop_office}}"-->
                  <!--<el-breadcrumb-item>详情页</el-breadcrumb-item>-->
                  <span class="breadspan">详情页</span>
                </el-breadcrumb>
                <!--<router-link to="/" tag="a" exact class="nav-item">首页</router-link> >-->
            </div> 
            
            <!--大轮播-->
            <swiper-big></swiper-big>
            
            <div class="d-details-content" style="width: 710px;">
                <h3 class="title">基本信息</h3>
                <div class="d-info-block d-shux">
                    <div class="d-info-title">基本属性</div>
                    <div class="d-info-con">
                    	<div class="w240 fl d-jian pl30">商圈信息<span class="d-zhi">{{detailForm.sqMc}}</span></div>
                    	<div class="w240 fl d-jian pl30">所在楼层<span class="d-zhi">{{detailForm.suoZaiLouCeng}}</span></div>
                    	 <div class="w240 fl d-jian pl30 zhxi">装修情况<span class="d-zhi">{{detailForm.zhuangXiuMc}}</span></div>
                    	<div class="w240 fl zhxi d-jian pl30" v-show="$route.query.typeTab != 'SyMaiMai' && $route.query.typeTab !='SyZuLin'">房屋户型<span class="d-zhi">{{detailForm.hxJgMc}}</span></div>
                    	
                      <div class="w240 fl d-jian pl30">使用面积
                        <el-input v-model="detailForm.shMj" class="d-input" placeholder="平米"></el-input>
                    	</div> 

                      <div class="w240 fl d-jian pl30">户型结构
                        <el-select class="d-input" v-model="detailForm.hxJg" placeholder="请选择">
                          <el-option v-for="(value,key,index) in detailForm.houseStruct" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                      </div>
                      
                      <div class="w240 fl d-jian pl30 ">建筑结构
                        <el-select class="d-input jzjg" v-model="detailForm.jzJg"  multiple collapse-tags placeholder="请选择">
                          <el-option v-for="(value,key,index) in detailForm.buildingStruct" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                      </div>
                      
                      <div class="w240 fl d-jian pl30" v-show="$route.query.typeTab != 'SyMaiMai' && $route.query.typeTab !='SyZuLin'">梯户比例
                        <el-input v-model="detailForm.nTiNHu" class="d-input" placeholder="平米"></el-input>
                    	</div> 
                    	
                      <div class="w240 fl zhxi d-jian pl30">房屋朝向<span class="d-zhi">{{detailForm.fjChaoXiangMc}}</span></div>
                      
                      <div class="w240 fl d-jian pl30">建筑类型
                        <el-select class="d-input " v-model="detailForm.jzLx" placeholder="请选择">
                          <el-option v-for="(value,key,index) in detailForm.buildingType" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                      </div>

                    </div>
                </div>
                
                <div class="d-info-block">
                    <div class="d-info-title">交易属性</div>
                    <div class="d-info-con">
                    	
                      <div class="w240 fl d-jian pl30">委托时间
                        <el-input id="d-wtime" class="d-input" v-model="detailForm.weiTuoRq" placeholder="请输入"></el-input>
                    	</div> 

                      <div class="w240 fl d-jian pl30">房屋所属
                        <el-select class="d-input " v-model="detailForm.fwQuanShu" placeholder="请选择">
                          <el-option v-for="(value,key,index) in detailForm.houseOwership" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                      </div>
                      
                      <div class="w240 fl d-jian pl30" v-show="$route.query.typeTab != 'ChuZu' && $route.query.shop_office !='x'">房本年限
                        <el-select class="d-input " v-model="detailForm.fangChanCyNx" placeholder="请选择">
                         <el-option v-for="(value,key,index) in detailForm.houseAge" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                      </div>
                      
                      <!--<div class="w240 fl d-jian pl30">委托时间
                      	
                 
                      <span class="d-zhi">南，北</span></div>-->
                      <div class="w240 fl d-jian pl30">房屋用途
                        <el-select class="d-input " v-model="detailForm.fangWuLx" placeholder="请选择">
                         <el-option v-for="(value,key,index) in detailForm.houseUse" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                      </div>
                      
                      <div class="w240 fl d-jian pl30" v-show="$route.query.typeTab != 'ChuZu' && $route.query.typeTab !='SyZuLin' && $route.query.typeTab !='SyMaiMai'">居住状况
                        <el-select class="d-input " v-model="detailForm.juZhuZk" placeholder="请选择">
                          <el-option v-for="(value,key,index) in detailForm.juZhuZK" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                      </div>
                      <div class="w240 fl d-jian pl30">看房时间
                        <el-select class="d-input " v-model="detailForm.kfSj" placeholder="请选择">
                          <el-option v-for="(value,key,index) in detailForm.lookDate" :key="index" :label="value" :value="key"></el-option>
                        </el-select>
                      </div>
                      <div class="w240 fl d-jian pl30 d-diy" v-show="$route.query.typeTab != 'ChuZu' && ($route.query.typeTab !='SyZuLin' || $route.query.shop_office !='x')">抵押情况
  											<el-radio v-model="detailForm.diYaQk" checked="checked" class="d-rad" v-for="(value,key,index) in detailForm.diYaNianXian" :label="value" :key="index" :value="key"></el-radio>
                      </div>
                      
                     	

											<div class="w240 fl d-jian pl30 d-diy" v-show="$route.query.typeTab != 'ChuZu' && $route.query.typeTab !='SyMaiMai' && $route.query.typeTab !='SyZuLin'">房产证情况
                        <el-radio v-model="detailForm.fczQk" class="d-rad" v-for="(value,key,index) in detailForm.fangChanZhengQK" :key="index" :label="value" :value="key"></el-radio>
                      </div>
                      
											
                    </div>
                </div>
                
                <h3 class="title">房源特色</h3>
                <div class="d-info-block">
                	
                		<!--<div class="d-fwpeit">
                			<div class="d-info-title pt">房屋配套</div>
                			<div class="d-jd">
                				<span>家电设施</span>
                				<el-checkbox-group>
                        	<el-checkbox>哈哈</el-checkbox>
                    		</el-checkbox-group>
                			</div>
                			<div class="d-jd">
                				<span>其他</span>
                			</div>
                			<div class="d-jd">
                				<span>家具</span>
                			</div>
                		</div>-->
                	
                    <div class="d-info-title mt20">房屋卖点</div>
                    <div class="d-clear"></div>
                    <el-checkbox-group v-model="detailForm.fjBiaoQian">
                        <el-checkbox v-for="(item,index) in detailForm.fangWuMaiDianVos" @change="test" :key="index" :label="index+1">{{item.fjBiaoQian}}</el-checkbox>
                    </el-checkbox-group>
                    
                    <!-- 核心亮点 -->
                    <div class="d-clear"></div>
                    <div class="d-info-title mt20">核心亮点</div>
                    <el-input type="textarea" v-model="detailForm.heXinMd"></el-input>
                    <!-- 核心亮点 -->
                    <div class="d-clear"></div>
                    <div class="d-info-title mt20">装修描述</div>
                    <el-input type="textarea" v-model="detailForm.zhuangXiuMs"></el-input>
                    <!-- 核心亮点 -->
                    <div class="d-clear"></div>
                    <div class="d-info-title mt20">交通出行</div>
                    <el-input type="textarea" v-model="detailForm.jiaoTongCx"></el-input>
                    <!-- 核心亮点 -->
                    <div class="d-clear"></div>
                    <div class="d-info-title mt20">周边配套</div>
                    <el-input type="textarea" v-model="detailForm.zhouBianPt"></el-input>
                    

                </div>
                
                <div v-show="$route.query.typeTab != 'SyMaiMai' && $route.query.typeTab !='SyZuLin'">
                <h3 class="title">户型分间</h3>
                <!--<swiper-small></swiper-small>-->
                <div class="d-info-block">
                	<div class="d-fj">
                		<div class="d-fjtitle">
                			<div class="d-title d-xuhao">序号</div>
                			<div class="d-title d-mingcheng">名称</div>
                			<div class="d-title d-xsmj">面积(平米)</div>
                			<div class="d-title d-fjcx">房间朝向</div>
                			<div class="d-title d-chuang">窗户</div>
                			<div class="d-title d-caozuo">操作</div>
                		</div>
                		<div v-for="(value,index) in detailForm.tableData" class="d-list">
                			<span class="d-input">{{index+1}}</span>
                			<el-input v-model="value.name" class="d-input d-left d-mingcheng" placeholder="输入名称"></el-input>
                			<el-input type="number" v-model="value.xsMj" class="d-input d-left d-fenjian" placeholder="面积,仅数字"></el-input>
                			<el-input v-model="value.fjChaoXiang" class="d-input d-left d-fenjian" placeholder="朝向"></el-input>
                			<el-input v-model="value.chuangHu" class="d-input d-left d-fenjian" placeholder="窗户"></el-input>
                			<el-button size="small" @click="saveRow(index)">保存</el-button>
                			<el-button @click="deleteRow(value,index)" class="d-del" size="small"><span class="el-icon-close"></span></el-button>
                		</div>
                	</div>
                	<div class="d-jia">
                		<el-button @click="addRow" class="d-del d-jiaa" size="small">+</el-button>
                	</div>
                </div>
                	</div>
                	
            		<div class="bottom-handle pt30">
                     <div class="d-main">
                       <el-button size="small" type="primary" @click="subrtn">立即保存</el-button>
                       <el-button @click="quxiao" size="small">取消</el-button>
                     </div>
                   </div>
                		
                
                
                
            </div>
        </div> 
    </el-form>
  </div>
</template>

<script>
	
	import Swiperb from '@/components/swiper-big.vue'
	import Swiperm from '@/components/swiper-small.vue'
	import qs from 'qs'
	import axios from 'axios'
  export default {
    name: 'HouseDetails',
    data() {
      return {
        activeIndex: '1',
        labelPosition: 'right',
        radio:'',
        i:"-1",
        fname:[],
        fjname:[],
        typeTab:'',
        isChuShou:true,
//      isChuZu:true,
				soptions: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        },{
          value: '6',
          label: '6'
        },{
          value: '7',
          label: '7'
        },{
          value: '8',
          label: '8'
        },{
          value: '9',
          label: '9'
        }],
        detailForm:{
        },
        breadx:'租房',
        form: {},
        tableData: [],
      };
    },
    components: {
      swiperBig:Swiperb,
      swiperSmall:Swiperm
    },
    computed:{
    },
    
    methods:{
    	//获取数据
    	test(){
//  		console.log(this.detailForm.fjBiaoQian)
    	},
    	getmsg(){
//  		console.log(this.$route.query)

				let typeTab=this.$route.query.typeTab
    		let fyid=this.$route.query.id
				let resData={
					id:fyid,
					typeTab:typeTab
				}
//				console.log(resData)
    		let that=this
    		this.Http.post('/set/detailUpdateFy',qs.stringify(resData))
			  .then(function (res) {
//			  	console.log(res)
//			  	console.log(res.data.juZhuZK)
			  	that.detailForm={
			  		//主副标题
			  		zhuBt:res.data.fyVo.zhuBt,
			  		fuBt:res.data.fyVo.fuBt,
						//出售总价
			  		chuShouZj:res.data.fyVo.chuShouZj,
			  		//月租
			  		czJg:res.data.fyVo.czJg,
			  		//室，厅，卫
			  		shiSl:res.data.fyVo.shiSl,
			  		tingSl:res.data.fyVo.tingSl,
			  		weiSl:res.data.fyVo.weiSl,
			  		//日租金
			  		riZuJin:res.data.fyVo.riZuJin,
			  		//销售面积
			  		xsMj:res.data.fyVo.xsMj,
			  		//商圈信息
			  		sqMc:res.data.fyVo.sqMc,
			  		//使用面积
			  		shMj:res.data.fyVo.shMj,
			  		//所在楼层
			  		suoZaiLouCeng:res.data.fyVo.suoZaiLouCeng,
			  		//装修情况
			  		zhuangXiuMc:res.data.fyVo.zhuangXiuMc,
			  		//房屋户型
			  		hxJgMc:res.data.fyVo.hxJgMc,
			  		//总楼层
			  		upstairCount:res.data.fyVo.upstairCount,
			  		//朝向
			  		fjChaoXiang:res.data.fyVo.fjChaoXiang.split(","),
			  		roomTowords:res.data.roomTowords,
			  		//装修
			  		zhuangXiu:res.data.fyVo.zhuangXiu,
			  		roomDecoration:res.data.roomDecoration,
			  		//楼层类型
			  		lcLx:res.data.fyVo.lcLx,
			  		floorType:res.data.floorType,
			  		//户型结构
			  		hxJg:res.data.fyVo.hxJg,
			  		houseStruct:res.data.houseStruct,
			  		//建筑类型
			  		jzLx:res.data.fyVo.jzLx,
			  		buildingType:res.data.buildingType,
			  		//房屋卖点，房间标签
//			  		fjBiaoQian:res.data.fyVo.fjBiaoQian.split(","),
			  		fjBiaoQian:[],
			  		//建筑结构
			  		jzJg:res.data.fyVo.jzJg.split(","),
			  		buildingStruct:res.data.buildingStruct,
			  		//梯户比例
			  		nTiNHu:res.data.fyVo.nTiNHu,
			  		//委托时间
			  		weiTuoRq:'',
			  		//房屋所属
			  		fwQuanShu:res.data.fyVo.fwQuanShu,
			  		houseOwership:res.data.houseOwership,
			  		//房本年限
			  		fangChanCyNx:res.data.fyVo.fangChanCyNx,
			  		houseAge:res.data.houseAge,
			  		//房屋用途
			  		fangWuLx:res.data.fyVo.fangWuLx,
			  		houseUse:res.data.houseUse,
			  		//看房时间
			  		kfSj:res.data.fyVo.kfSj,
			  		lookDate:res.data.lookDate,
			  		//居住状况
			  		juZhuZk:res.data.fyVo.juZhuZk,
			  		juZhuZK:res.data.juZhuZK,
			  		//房屋卖点
			  		fangWuMaiDianVos:res.data.fangWuMaiDianVos,
//			  		fangWuMaiDianVos:[],
			  		//核心亮点
			  		heXinMd:res.data.fyVo.heXinMd,
			  		//装修描述
		  			zhuangXiuMs:res.data.fyVo.zhuangXiuMs,
			  		//交通出行
			  		jiaoTongCx:res.data.fyVo.jiaoTongCx,
			  		//周边配套
			  		zhouBianPt:res.data.fyVo.zhouBianPt,
			  		//户型分间
			  		tableData:res.data.hxfjVos,
			  		//抵押情况
			  		diYaNianXian:res.data.diYaNianXian,
			  		diYaQk:res.data.fyVo.zhouBianPt,
			  		//房产证情况
			  		fangChanZhengQK:res.data.fangChanZhengQK,
			  		fczQk:res.data.fyVo.fczQk,
			  		//房源id
			  		id:fyid,
			  		//房间标签
//			  		fjBiaoQian:[],
			  		//实勘id
			  		shiKanId:res.data.fyVo.shiKanId,
			  		//主图id
			  		zhuTuId:'',
			  		//显示的图片的id
			  		xianShiIds:'',
			  		//户型显示的图片的id
			  		xianShiHxIds:'',
			  		//房间户型id
			  		fjHxId:res.data.fyVo.fjHxId,
			  		//公司ID
			  		ownerCompany:res.data.companyVo.id,
			  		//token
//			  		token:"416c6ffe495ba679e1d0f327f901b892"
			  	}
			  	that.tableData =res.data.hxfjVos
//					that.detailForm.weiTuoRq 
//				if(that.detailForm.weiTuoRq != ''){
					let date= new Date(res.data.fyVo.weiTuoRq)
					let Y = date.getFullYear() + '-';
					let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					let D = date.getDate() + ' ';
//					console.log(Y+M+D); 
					that.detailForm.weiTuoRq=Y+M+D
//				}	

					for(var i=0;i<res.data.fyVo.fjBiaoQian.length;i++){
						that.detailForm.fjBiaoQian.push(parseInt(res.data.fyVo.fjBiaoQian[i]))
					}
					
			  })
    	},
    	
    	//户型分间删除行数
			deleteRow(value,index) {
				console.log(value,index)
				this.detailForm.tableData.splice(index,1)
				let deletform={
					"id":value.id  //户型分间id
				}
				console.log(deletform)
				this.Http.post('/set/deleteHuXing',qs.stringify(deletform))
				.then(res=>{
					if(res.data.SUCCESS){
						this.$notify({
	                title: '成功',
	                message: '删除成功',
	                type: 'success'
	              });
          		 }
				})
				.catch(error=>{
					this.$notify({
              title: '错误',
              message: '数据请求错误',
            });
				})
			},
			//增加行数
			addRow() {
				var jia={
		          name: '',
		          xsMj:'',
		          fjChaoXiang: '',
		          chuangHu:'',
		        }
				this.tableData.push(jia)
			},
			//户型分间保存
			saveRow(idx){
				var fyid=this.$route.query.id
//				console.log(fyid)
//				console.log(this.detailForm.tableData[idx].name)
				let hxfjform = {
					"token":"416c6ffe495ba679e1d0f327f901b892",
					'fyId':fyid,
					'ownerCompany':this.detailForm.ownerCompany,
					'name':this.detailForm.tableData[idx].name,
					'xsMj':this.detailForm.tableData[idx].xsMj,
					'fjChaoXiang':this.detailForm.tableData[idx].fjChaoXiang,
					'chuangHu':this.detailForm.tableData[idx].chuangHu,
				}
		
				this.Http.post('/set/updateHuXing',hxfjform)
				.then(res=>{
					if(res.data.SUCCESS){
						this.$notify({
	                title: '成功',
	                message: '保存成功',
	                type: 'success'
	              });
           		}
				})
				.catch(error=>{
					this.$notify({
              		title: '错误',
              		message: '数据请求错误',
            	  });
				})

				this.getmsg()
			},
			//取消
			quxiao(){
				window.history.back()
			},
			//立即保存
			subrtn(){
//				if(this.detailForm.fjBiaoQian != []){
				this.detailForm.fjBiaoQian=this.detailForm.fjBiaoQian.join(',')
//				}
				this.detailForm.jzJg = this.detailForm.jzJg.join(',')
				this.detailForm.fjChaoXiang = this.detailForm.fjChaoXiang.join(',')
//				this.detailForm.tableData = this.detailForm.tableData.join(',')
				this.detailForm.fangWuMaiDianVos = '',
				console.log(this.detailForm.fjBiaoQian)
				
				this.Http.post('/set/updateFy',this.detailForm)
		          .then((res)=>{
		          	if(res.data.SUCCESS){
			           this.$notify({
			                title: '成功',
			                message: '保存成功',
			                type: 'success'
			              });
		            }  
		         })
		        .catch(error=>{
		        	this.$notify({
		              title: '错误',
		              message: '数据请求错误',
		            });
		        })


				this.getmsg()
			}
  },
  created(){
  	this.getmsg();
  	if(this.$route.query.typeTab == 'ChuShou'){
  		this.breadx = '二手房'
  		
  	}else if(this.$route.query.typeTab == 'SyZuLin' && this.$route.query.shop_office == 'x'){
  		this.breadx = '写字楼出租'
  	}else if(this.$route.query.typeTab == 'SyZuLin' && this.$route.query.shop_office == 's'){
  		this.breadx = '商铺出租'
  	}else if(this.$route.query.typeTab == 'SyMaiMai' && this.$route.query.shop_office == 'x'){
  		this.breadx = '写字楼出售'
  	}else if(this.$route.query.typeTab == 'SyMaiMai' && this.$route.query.shop_office == 's'){
  		this.breadx = '商铺出售'
  	}else{
  		this.breadx = '租房'
  	}

  	
  },
  beforeMounted(){
  	var urlQuery=this.$route.query
		
  },
watch:{
	$route(){
		if(urlQuery.typeTab=="ChuShou"){
				this.isChuShou=false
			};
	}
}
 }
</script>
<style scoped>

.house-details .d-input-inline i,{position: absolute;right:5px; top:0; font-size: 12px; color: #999; height: 100%; line-height: 32px;}
.house-details .d-input-inline{ width: 120px; }
.house-details .d-input-inline span{position: absolute;right:5px; top:0; font-size: 12px; color: #999; height: 100%; line-height: 32px;}
.pb50{padding-bottom: 80px;}
.el-form-small .el-checkbox{width: 177px !important;}
</style>
