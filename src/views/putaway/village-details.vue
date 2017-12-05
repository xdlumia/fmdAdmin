<template>
  <div>
    <el-form :label-position="labelPosition" label-width="100px" :model="villagedetailForm" class="village-details el-form-small">
			<div class="village-top">
				<!--大轮播-->
				<div class="swiper-container gallery-top">
		        <div class="villagebig swiper-wrapper">
		           <!--<div class="swiper-slide"><img src="../../assets/img/u11251.jpg" alt=""><div class="d-zhu">主</div><div class="swiper-check"><input type="radio" name="name" value=""/><i></i></div></div>-->
		            <div class="swiper-slide"><img src="../../assets/img/u11251.jpg" alt=""></div>
		        </div>
		    </div>
		    <div class="swiper-container gallery-thumbs">
			        <div class="villagesmall swiper-wrapper">
			            <div class="swiper-slide"><img src="../../assets/img/u11251.jpg" alt=""><div class="swiper-check"><input type="radio" name="name"/><i></i></div></div>
			        </div>
			    <div class="swiper-button-prev swiper-button-white" style="
background-image:none;"><span></span></div>
		        <div class="swiper-button-next swiper-button-white" style="
background-image:none;"><span></span></div>
				</div>
				<!--logo-->
				<div class="logopic">
					<img src=""/>
				</div>
				<!--搜索框-->
			  <div class="search">
           <input type="text" class="d-disabled" placeholder="请输入区域、商圈或者楼盘名开始找房">
           <i class="el-icon-search iconfont icon-search"></i>
			  </div>
				<!--右边介绍-->
				<div class="villmsg">
					<div class="villmsg-top">
						<h3>{{villagedetailForm.xqMc1}}</h3>
						<div class="dizhi">
							<i class="el-icon-location"></i><span>{{villagedetailForm.xzqMc}}</span> - <span>{{villagedetailForm.sqMc}}</span> - <span>{{villagedetailForm.xzDz}}</span>
						</div>
					</div>
					<div class="villmsg-down">
						<div class="down-top">
							<div class="down-left down-del">
								<i></i><span><span class="d-pri">54654</span>元/㎡</span>
								<p>共 <b> 654 </b> 套房源在售</p>
							</div>
							<div class="down-right down-del">
								<i></i><span><span class="d-pri">3500</span>元月</span>
								<p>共 <b> 654 </b> 套房源出租</p>
							</div>
						</div>
						
						
						
						<div class="down-dn">
							<ul class="down-ul">
								<li><span>建成年代</span><i>{{villagedetailForm.kpSj}}</i></li>
								<li><span>建筑类型</span><i>{{villagedetailForm.jzLx}}</i></li>
								<li><span>物业费</span><i>{{villagedetailForm.wyf}}</i></li>
								<li><span>物业公司</span><i>{{villagedetailForm.wyGsMc}}</i></li>
								<li><span>开发商</span><i>{{villagedetailForm.kfsMc}}</i></li>
								
								<li class="down-dbl"><span>总面积</span><i>{{villagedetailForm.zzdMj}}</i></li>
								<li class="down-dbl"><span>总户数</span><i>{{villagedetailForm.zhs}}</i></li>
								<li class="down-dbl"><span>容积率</span><i>{{villagedetailForm.rjl}}</i></li>
								<li class="down-dbl"><span>总栋数</span><i>{{villagedetailForm.zds}}</i></li>
								<li class="down-dbl"><span>停车位</span><i>{{villagedetailForm.dxCw}}</i></li>
								<li class="down-dbl"><span>绿化率</span><i>{{villagedetailForm.lhl}}</i></li>
							</ul>
						</div>
					</div>
				</div>
				
			</div>
			
			<!---->
			<div class="village-main">
				<div class="village-mid">
					<div class="maodian">
						<ul>
							<li><a href="#v-huxing">户型介绍</a></li>
							<li><a href="#v-loupan">楼盘详情</a></li>
							<li><a href="#v-peitao">配套信息</a></li>
							<li><a href="#v-pic">小区相册</a></li>
							<li><a>周边配套</a></li>
							<li><a>二手房</a></li>
							<li><a>租房</a></li>
						</ul>
					</div>
					
					<!--户型介绍-->
					<el-form :label-position="labelPosition" label-width="100px" :model="bianjiform" class="village-details el-form-small">
					<div id="v-huxing" class="d-hux">
						<div class="hux-title">
							<h3>户型介绍</h3><span>共6个户型</span>
	            <el-select id="vill-xiala" v-model="hxvalue" label="户型" placeholder="户型">
	              <el-option v-for="item in hxoptions"
      					:key="item.value"
      					:label="item.label"
      					:value="item.value"></el-option>
	            </el-select>
	             <el-select id="vill-xialaa" v-model="jzvalue"  placeholder="建筑面积">
	              <el-option v-for="item in jzoptions"
      					:key="item.value"
      					:label="item.label"
      					:value="item.value"></el-option>
	            </el-select>
	            
	            <el-button class="vill-del jia" size="small" @click="deleteHouses">删除</el-button>
	            <el-button @click="getData('')" class="vill-add jia" size="small">新增</el-button>
						</div>
					</div>
						
					<!--表格开始-->
					<div class="hux-list" v-for="(item,index) in bianjiform.fjHxVos" :key="index">
						<!--按钮-->
						<div class="list-rad">
							<div class="d-check">
                    <input type="checkbox" v-model="checkedHouses" :value="item" >
                    <i></i>
              </div>
						</div>
						<!--图片-->
						<div class="list-img">
							<img src="../../assets/img/u11251.jpg"/>
						</div>
						<!--详情-->
						<div class="list-detail">
							<h3>{{item.shi}}室{{item.ting}}厅{{item.chu}}厨{{item.wei}}卫</h3>
							<p>建筑面积 <span>{{item.mj}}平米</span></p>
							<p>使用面积 <span>{{item.syMj}}平米</span></p>
							<p>户型结构<span>{{item.hxJg}}</span></p>
						</div>
						<!--编辑删除-->
						<div class="list-bianji">
							<el-button @click="getData(item.id)" class="vill-bianji list-btn" size="small">编辑</el-button>
							<el-button @click="deleteData(index,item.id)" class="vill-remove list-btn" size="small" >删除</el-button>
						</div>
						<!--有关经纪人-->
						<div class="list-jingji">
							<img src="../../assets/img/u161.png"/>
							<div class="jingji-info">
								<h4>谢谢谢</h4><span>评分：<i>5.0</i>/<i>240</i>人评价</span>
								<h5>我是户型录入人，了解户型特色</h5>
								<h6><b>4006009600</b> 转 <b>45678</b></h6>
							</div>
						</div>
					</div>
			    </el-form>
			    <!--新增弹出框内容-->
					<el-form :label-position="labelPosition" label-width="100px" :model="tanchuform" class="village-details el-form-small">
						<div class="v-tantext">
								<el-dialog
								  title="编辑户型"
								  :visible.sync="dialogVisible"
								  width="40%"
								  :before-close="handleClose">
								  <div class="bj-info bianji-hx">
								  	<span>户型</span>
								  	<div class="d-sele">
                        <el-select v-model="tanchuform.shi" placeholder="室">
                          <el-option
											      v-for="item in soptions"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
                        </el-select>
                    </div>
                    <div class="d-sele">
                        <el-select v-model="tanchuform.ting" placeholder="厅">
                          	<el-option
												      v-for="item in soptions"
												      :key="item.value"
												      :label="item.label"
												      :value="item.value">
												    </el-option>
                        </el-select>
                    </div>
                    <div class="d-sele">
                        <el-select v-model="tanchuform.chu" placeholder="厨">
                          <el-option
											      v-for="item in soptions"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
                        </el-select>
                    </div>
                    <div class="d-sele">
                        <el-select v-model="tanchuform.wei" placeholder="卫">
                         	<el-option
											      v-for="item in soptions"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
                        </el-select>
                    </div>
								  </div>
								  <div class="bj-info bianji-cx">
								  	<span>朝向</span>
								  	<el-checkbox-group v-model="tanchuform.fjCx" @change="test">
                        <el-checkbox v-for="(value,key,index) in tanchuform.fjCxMap" :key="index" :label="key">{{value}}</el-checkbox>
                    </el-checkbox-group>
	                	</div>
								  <div class="bj-info bianji-jz">
								  	<span>建筑面积</span>
								  	<el-input type="number" placeholder="平米，仅可输入数字" v-model="tanchuform.mj"></el-input>
								  </div>
								  <div class="bj-info bianji-use">
								  	<span>使用面积</span>
								  	<el-input type="number" placeholder="平米，仅可输入数字" v-model="tanchuform.syMj"></el-input>
								  </div>
								  <div class="bj-info bianji-hxjg">
								  	<span>户型结构</span>
								  		<el-select placeholder="" v-model="tanchuform.hxJg">
                  			<el-option v-for="(value,key,index) of tanchuform.houseStructure" :key="index" :label="value" :value="key" ></el-option>
            		 			 </el-select>
								  </div>
								  
								  <span slot="footer" class="dialog-footer">
								  	 <el-button type="primary" @click="bianbaoc">保存</el-button>
								    <el-button @click="dialogVisible = false">取 消</el-button>
								  </span>
								  
                   
								</el-dialog>
						</div>
					</el-form>
					<!--楼盘详情-->
					<div id="v-loupan" class="d-hux d-lop">
						<div class="hux-title">
							<h3>楼盘详情</h3>
						</div>
					</div>
					<!--表格开始-->
					<div class="lop-list">
						<div class="list-left">
							<ul class="left-ul1">
								<li>城市</li>
								<li>商圈</li>
								<li>行政地址</li>
								<li>土地使用年限</li>
								<li>总建筑面积</li>
								<li>开盘时间</li>
								<li>建筑结构</li>
							</ul>
							<ul class="left-ul2">
								<li>{{villagedetailForm.csMc}}</li>
								<li>{{villagedetailForm.sqMc}}</li>
								<li>{{villagedetailForm.xzDz}}</li>
								<li><el-input v-model="villagedetailForm.tdSyNx" placeholder="请输入"></el-input></li>
								<li><el-input v-model="villagedetailForm.zjzMj" placeholder="请输入"></el-input></li>
								<li><el-input v-model="villagedetailForm.kpSj" placeholder="请输入"></el-input></li>
								<li class="">
									<div class="vill-jg">
										<el-checkbox-group v-model="villagedetailForm.jzJg">
	                        <el-checkbox v-for="(value,key,index) in villagedetailForm.jZJgMap" :label="key" :key="index">{{value}}</el-checkbox>
	               		</el-checkbox-group>
									</div>
								</li>
							</ul>
						</div>
						<div class="list-right">
							<ul class="right-ul1 left-ul1">
								<li>行政区</li>
								<li>楼盘名称</li>
								<li>开发商名称</li>
								<li>总占地面积</li>
								<li>容积率</li>
								<li>绿化率</li>
								<li>建筑类型</li>
							</ul>
							<ul class="right-ul2 left-ul2">
								<li>{{villagedetailForm.xzqMc}}</li>
								<li>{{villagedetailForm.xqMc1}}</li>
								<li>{{villagedetailForm.kfsMc}}</li>
								<li><el-input v-model="villagedetailForm.zzdMj" placeholder="请输入"></el-input></li>
								<li><el-input v-model="villagedetailForm.rjl" placeholder="请输入"></el-input></li>
								<li><el-input v-model="villagedetailForm.lhl" placeholder="请输入"></el-input></li>
								<li>
								 	<el-select v-model="villagedetailForm.jzLx" placeholder="请选择">
                  	<el-option v-for="(value,key,index) in villagedetailForm.jZLxMap" :key="index" :label="value" :value="key"></el-option>
            		  </el-select>
								</li>
							</ul>
						</div>
					</div>
					
					<!--配套信息-->
					<div id="v-peitao" class="d-peit d-lop">
						<div class="hux-title">
							<h3>配套信息</h3>
						</div>
					</div>
					<!--表格开始-->
					<div class="peit-list">
						<div class="list-left">
							<ul class="left-ul1">
								<li>物业公司名称</li>
								<li>地下车位</li>
								<li>供水类型</li>
								<li>供气方式</li>
							</ul>
							<ul class="left-ul2">
								<li><el-input v-model="villagedetailForm.wyGsMc" placeholder="请输入"></el-input></li>
								<li><el-input v-model="villagedetailForm.dsCw" placeholder="请输入"></el-input></li>
								<li>
									<el-select v-model="villagedetailForm.gsLx" placeholder="请选择">
                  	<el-option v-for="(value,key,index) in villagedetailForm.gsLxMap" :key="index" :label="value" :value="key"></el-option>
            		  </el-select>
								</li>
								<li>
									<el-select v-model="villagedetailForm.gsFs" placeholder="请选择">
                  	<el-option v-for="(value,key,index) in villagedetailForm.gqFsMap" :key="index" :label="value" :value="key"></el-option>
            		  </el-select>
								</li>
							</ul>
						</div>
						<div class="list-right">
							<ul class="left-ul1">
								<li>物业费</li>
								<li>地上车位</li>
								<li>供电类型</li>
								<li>采暖方式</li>
							</ul>
							<ul class="left-ul2">
								<li><el-input v-model="villagedetailForm.wyf" placeholder="请输入"></el-input></li>
								<li><el-input v-model="villagedetailForm.dxCw" placeholder="请输入"></el-input></li>
								<li>
									<el-select v-model="villagedetailForm.gsFs" placeholder="请选择">
                  	<el-option v-for="(value,key,index) in villagedetailForm.gdLxMap" :key="index" :label="value" :value="key"></el-option>
            		  </el-select>
								</li>
								<li>
									<el-select v-model="villagedetailForm.cnFs" placeholder="请选择">
                  	<el-option v-for="(value,key,index) in villagedetailForm.cnFsMap" :key="index" :label="value" :value="key"></el-option>
            		  </el-select>
								</li>
							</ul>
						</div>
					</div>
					
					<!--小区相册-->
					<div id="v-pic" class="d-peit d-lop">
						<div class="villpic hux-title">
							<h3>小区相册</h3>
							<ul>
								<li>全部</li>
								<li>总规图</li>
								<li>楼盘布置图</li>
								<li>项目外观图</li>
								<li>项目景观图</li>
								<li>栋座外观图</li>
							</ul>
						</div>
						<!--图片显示位置-->
						<div class="villd-pic">
							<ul>
								<li><img src="../../assets/img/u11251.jpg" alt=""></li>
								<li><img src="../../assets/img/u11251.jpg" alt=""></li>
								<li><img src="../../assets/img/u11251.jpg" alt=""></li>
								<li><img src="../../assets/img/u11251.jpg" alt=""></li>
							</ul>
						</div>
						<div class="villd-click">
							<span>查看全部</span>
						</div>
					</div>
					
					<!--保存、取消操作-->
					<div class="bottom-handle pt30">
             <div class="d-main">
               <el-button size="small" type="primary"@click="zhutijiao">立即保存</el-button>
               <el-button @click="quxiao" size="small">取消</el-button>
             </div>
           </div>
	               
				</div>
			</div>
    </el-form>
  </div>
</template>

<script>
	
	import axios from 'axios'
	import qs from 'qs'
	import Swiper from '../../../static/swiper.js'
  export default {
    name: 'village',
    data() {
      return {
      	//主链接
        villagedetailForm:{
        	zhs:'',
        	zds:'',
        	xzqMc:'',
        	sqMc:'',
        	xzDz:'',
        	xqMc1:'',
        	kpSj:'',
        	jzLx:'',
        	wyf:'',
        	wyGsMc:'',
        	kfsMc:'',
        	zzdMj:'',
        	rjl:'',
        	lhl:'',
        	csMc:'',
        	xzDz:'',
        	tdSyNx:'',
        	zjzMj:'',
        	kpSj:'',
        	dsCw:'',
        	dxCw:'',
        	jzLx:'',
        	gsLx:'',
        	gsFs:'',
        	gdLx:'',
        	cnFs:'',
        	jzJg:'',
        	jZLxMap:{},
        	gsLxMap:{},
        	gqFsMap:{},
        	gdLxMap:{},
        	cnFsMap:{},
        	jZJgMap:{},
        },
        //筛选编辑
        bianjiform:{
        	fjHxVos:[],
        },
        //弹出框编辑
        tanchuform:{
        	id:'',//户型id
        	lpId:'',//楼盘id 
        	shi:'',//室
        	ting:'',//厅
        	chu:'',//厨
        	wei:'',//卫
        	syMj:'',//使用面积
        	mj:'',//建筑面积
        	hxJg:'',//户型结构
        	fjCx:[],//房屋朝向
    			fjCxMap:{},//房屋朝向下拉
    			houseStructure:{},//户型结构下拉
        },
        //室 厅 厨 卫
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
       	structure:'',
       	checkedHouses:[],
        labelPosition: 'right',
        checked:{},
        dialogVisible: false,
        lpid:'',
        ha:{},
        hxoptions: [{
          value: '选项1',
          label: '一室'
        }, {
          value: '选项2',
          label: '二室'
        }, {
          value: '选项3',
          label: '三室'
        }, {
          value: '选项4',
          label: '四室'
        }, {
          value: '选项5',
          label: '五室'
        },{
          value: '选项6',
          label: '五室以上'
        }],
        hxvalue: '',
        jzoptions: [{
          value: '选项1',
          label: '50平以下'
        }, {
          value: '选项2',
          label: '50-70平'
        }, {
          value: '选项3',
          label: '70-90平'
        }, {
          value: '选项4',
          label: '90-110平'
        }, {
          value: '选项5',
          label: '110-130平'
        },{
          value: '选项6',
          label: '130-150平'
        },{
          value: '选项7',
          label: '150-200平'
        },{
          value: '选项8',
          label: '200平以上'
        }],
        jzvalue: '',
      };
    },
    created(){
    	this.getmsg()
    },
    methods:{
    	getmsg(){
    		this.lpid=this.$route.query.id
    	let that=this
    	let villData={
    		id:this.lpid,
    	}
    	this.Http.post("/set/detailBuildingEdit",qs.stringify(villData))
    	.then(function(res){
    		console.log(res)
    		that.villagedetailForm={
    			id:"",
    			zhs:res.data.lpVo.zds,//总户数
    			zds:res.data.lpVo.zds,//总栋数
    			xzqMc:res.data.lpVo.xzqMc,//行政区
    			sqMc:res.data.lpVo.sqMc,//商圈
    			xqMc1:res.data.lpVo.xqMc1,//楼盘名称
    			kpSj:res.data.lpVo.kpSj,//开盘时间
    			jzLx:res.data.lpVo.jzLx,//建筑类型
    			wyf:res.data.lpVo.wyf,//物业费
    			wyGsMc:res.data.lpVo.wyGsMc,//物业公司名称
    			kfsMc:res.data.lpVo.kfsMc,//开发商名称
    			zzdMj:res.data.lpVo.zzdMj,//总占地面积
    			rjl:res.data.lpVo.rjl,//容积率
    			lhl:res.data.lpVo.lhl,//绿化率
    			csMc:res.data.lpVo.csMc,//城市
    			xzDz:res.data.lpVo.xzDz,//行政地址
    			tdSyNx:res.data.lpVo.tdSyNx,//土地使用年限
    			zjzMj:res.data.lpVo.zjzMj,//总建筑面积
    			kpSj:res.data.lpVo.kpSj,//开盘时间
    			dsCw:res.data.lpVo.dsCw,//地下车位
    			dxCw:res.data.lpVo.dxCw,//地上车位
    			jZLxMap:res.data.jZLxMap,//建筑类型下拉
    			jzLx:res.data.lpVo.jzLx,//建筑类型默认
    			gsLxMap:res.data.gsLxMap,//供水类型下拉
    			gsLx:res.data.lpVo.gsLx,//供水类型默认
    			gsFs:res.data.lpVo.gsFs,//供气默认
    			gqFsMap:res.data.gqFsMap,//供气类型下拉
    			gdLxMap:res.data.gdLxMap,//供电类型下拉
    			gdLx:res.data.lpVo.gdLx,//供气默认
    			cnFs:res.data.lpVo.cnFs,//采暖默认
    			cnFsMap:res.data.cnFsMap,//采暖类型下拉
    			jZJgMap:res.data.jZJgMap,//建筑结构
    			jzJg:res.data.lpVo.jzJg.split(","),//建筑结构默认
    		}
    		
    		that.bianjiform={
    			fjHxVos:res.data.fjHxVos,
    		}
    		if(res.data.lpVo.kpSj != ""){
    		let date= new Date(res.data.lpVo.kpSj)
					let Y = date.getFullYear() + '-';
					let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					let D = date.getDate() + ' ';
					console.log(Y+M+D); 
					that.villagedetailForm.kpSj=Y+M+D
				}
    	})
    	},
    	test(){
//  		console.log(this.tanchuform.fjCx)
    	},
			swiper(){
		    var galleryTop = new Swiper('.gallery-top', {
		         navigation: {
			        nextEl: '.swiper-button-next',
			        prevEl: '.swiper-button-prev',
			      },

		        spaceBetween: 10,
		    });
		    var galleryThumbs = new Swiper('.gallery-thumbs', {
		        spaceBetween: 10,
		        centeredSlides: true,
		        slidesPerView: 'auto',
		        touchRatio: 0.2,
		        slideToClickedSlide: true
		    });
		     galleryTop.controller.control = galleryThumbs;
   			 galleryThumbs.controller.control = galleryTop;
    	},
    	//小区编辑户型
    	getData(id){
//  		console.log(id)
    		if(id){
    			//编辑
						this.tanchuform.id=id;
						this.tanchuform.lpId=this.lpid;
    				this.tanchuform.hxJg = '';
    				this.tanchuform.mj = '';
    				this.tanchuform.fjCx = [];
    				this.tanchuform.syMj = '';
    				this.tanchuform.shi='';
    				this.tanchuform.ting='';
    				this.tanchuform.chu='';
    				this.tanchuform.wei='';
    		}else{
    			//新增
    				this.tanchuform.id='';
    				this.tanchuform.lpId='';
    				this.tanchuform.hxJg = '';
    				this.tanchuform.mj = '';
    				this.tanchuform.fjCx = [];
    				this.tanchuform.syMj = '';
    				this.tanchuform.shi='';
    				this.tanchuform.ting='';
    				this.tanchuform.chu='';
    				this.tanchuform.wei='';
    		}
    		let bjData = {
    			id:id,
    		}
    		this.Http.post('/set/editHx',qs.stringify(bjData))
    		.then(res=>{
//  			console.log(res)
    			if(res.data.SUCCESS){
    				this.dialogVisible = true;
    				this.tanchuform.id=id;
    				this.tanchuform.lpId=this.lpid;
    				this.tanchuform.fjCxMap = res.data.fjCxMap;
    				this.tanchuform.houseStructure = res.data.hxJgMap;
    				this.tanchuform.hxJg = res.data.fjHxVo.hxJg;
    				this.tanchuform.fjCx = res.data.fjHxVo.fjCx.split(",");
    				this.tanchuform.mj = res.data.fjHxVo.mj;
    				this.tanchuform.syMj = res.data.fjHxVo.syMj;
    				this.tanchuform.shi=res.data.fjHxVo.shi;
    				this.tanchuform.ting=res.data.fjHxVo.ting;
    				this.tanchuform.chu=res.data.fjHxVo.chu;
    				this.tanchuform.wei=res.data.fjHxVo.wei;
    			}
    			
    		})
    		.catch(error=>{
//  			console.log(error)
    		})
    		this.getmsg()
    	},
    	//小区筛选删除信息                                                               
    	deleteData(index,id){
//  		console.log(id)
    		this.bianjiform.fjHxVos.splice(index,1)
    		this.Http.post('/set/deleteHx',qs.stringify({
    			"id":id,
    		}))
    		.then(res=>{
    			if(res.data.SUCCESS){
    				//改变页面，删除信息
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
              message: '删除失败',
            });
    		})
//  		this.getmsg()
    	},
    	handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
			//小区编辑保存
			bianbaoc(){
				this.dialogVisible=false;
				if(this.tanchuform.fjCx){
					this.tanchuform.fjCx=this.tanchuform.fjCx.join(',')
				}
				this.Http.post('/set/updateOrInsertHx',this.tanchuform)
				.then((res)=>{
					if(res.data.SUCCESS){
						this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
					}
				})
				.catch((error)=>{
					this.$notify({
	          title: '错误',
	          message: '数据请求错误',
	        });
				})
				this.getmsg()
			},

			//点击删除
			deleteHouses(){
				


				let ids = [];
				this.checkedHouses.forEach(item=>{
					
					ids.push(item.id);
				})
//				console.log(ids)
//				console.log(ids.join(","))
				const checkedform = {
					id:ids.join(",")
				}
				this.Http.post('/set/deleteHx',qs.stringify(checkedform))
				.then(res=>{
					if(res && res.data && res.data.SUCCESS){
						let indexs = [];
						this.bianjiform.fjHxVos.forEach((item,index)=>{
						if(ids.includes(item.id)){
							console.log(ids,item.id)
							indexs.push(index);
						}
					})
						for(let i = indexs.length - 1 ; i >= 0 ;i--){
							this.bianjiform.fjHxVos.splice(indexs[i],1)
						}
//						this.$notify({
//              title: '成功',
//              message: '删除成功',
//              type: 'success'
//            });
					}
				})
				.catch(error=>{
//					this.$notify({
//	          title: '错误',
//	          message: '数据请求错误',
//	        });
				})
//				this.getmsg()
			},
			//页面保存
      zhutijiao(){
      	this.villagedetailForm.jzJg=this.villagedetailForm.jzJg.join(',')
      	this.villagedetailForm.id=this.lpid
      	this.Http.post('/set/updateBuilding',this.villagedetailForm)
      	.then((res)=>{
//          console.log(res)
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
      
      //取消点击
      quxiao(){
				window.history.back()
			},
  	},
  	mounted(){
  		this.swiper()
  	},
  watch:{
  	$route(){
  	}
  }
 }
</script>
<style scoped>
    
	@import "../../assets/css/swiper.css";
		.swiper-container {
        width: 100%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-slide {
        background-size: cover;
        background-position: center;
    }
    .gallery-top {
        height: 100%;
        width: 100%;
    }
    .gallery-thumbs {
        height: 100px;
        width: 620px;
        box-sizing: border-box;
        padding: 10px 0;
        position: absolute !important;
       	bottom:20px;
        left: 385px;
        z-index: 8;
    }
    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 1;
    }
    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }
 		.villagebig{
    	width: 100%;
    	height: 100%;
    	position: absolute;
    }
    .swiper-container{
    	position: relative;
    }

    .villagesmall{
    	width: 630px;
		height: 80px;
		left: -220px;
    }
	.villagebig img{
		width:100%;
		height: 100%;
	}
	.villagesmall img{
		width: 120px;
		height: 80px;
		float: left;
		margin-right: 0px;
	}
  	.gallery-thumbs .swiper-slide {
  		position: relative;
	    width: 18%;
	    height: 100%;
	}
	.swiper-button-white{
		width: 30px;
		height: 80px;
		background:#000;
		margin-top: -40px;
	}
	.swiper-button-prev{
		left: 0px;
	}
	.swiper-button-prev span:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: translate(-50%, -50%) rotate(45deg);
}
	.swiper-button-next{
		right: 0px ;
	}
	.swiper-button-next span:before{
    content: "";
    position: absolute;
    top: 50%;
    left: 22%;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    border-right: 2px solid #fff;
    border-top: 2px solid #fff;
    transform: translate(-50%, -50%) rotate(45deg);
	}
	.house-l{
		width: 710px;
	}
	.swiper-check{position:absolute; right:0; bottom:0px; width: 40px; height: 40px;}
	.swiper-check input{ z-index: 1; opacity: 0; display: block; position:absolute; width: 100%;height:100%;}
	.swiper-check input ~ i{position:absolute;  width: 100%;height:100%; background:rgba(95, 199, 147, 1);}
	.swiper-check input ~ i:before{content:""; position:absolute;left:14px;top:8px;  width:10px;height:18px; border:4px solid #fff; border-left:none;border-top:none; transform: rotate(45deg);}
	.d-zhu{
		width: 40px ;
		height: 40px;
		background: rgba(239, 189, 71, 1);
		font-weight: bold;
		line-height: 40px;
		line-height: 40px;
		color: #fff;
		position: absolute;
		bottom: 0px;
		right: 42px;
		text-align: center;
	}
	.el-form-small .el-checkbox{
		width: 30px;
	}
	.swiper-check{position:absolute; right:-7px; bottom:0px; width: 25px; height: 25px;}
	.swiper-check input{ z-index: 1; opacity: 0; display: block; position:absolute; width: 100%;height:100%;}
	.swiper-check input ~ i{position:absolute;  width: 100%;height:100%; background: rgba(153, 153, 153, 1);}
	.swiper-check input ~ i:before{content:""; position:absolute;left:8px;top:2px;  width:6px;height:13px; border:3px solid #fff; border-left:none;border-top:none; transform: rotate(45deg);}
	.swiper-check input:checked ~ i{background: rgba(95, 199, 147, 1);}
</style>
