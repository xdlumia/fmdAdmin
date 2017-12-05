<template>
   <div class="d-main" style="padding-top: 60px">
      <div class="w-style">
        <div class="fl w180" ><img src="../../assets/img/u161.png" alt=""></div>
        <div class="fl ml20 w290">
          <div class="mt10">

            <p class="pt17"><span class="mr2">姓名：</span><el-input v-model="name" placeholder="请输入姓名"></el-input></p>
            <p class="pt17"><span>所属门店：</span><el-input v-model="shop" @focus="selectShop" placeholder="请选择经纪人所属门店"></el-input></p>
            <p class="pt17"><span>重点楼盘：</span><el-input v-model="houses" @focus="selectHouses" placeholder="请选择经纪人重点楼盘"></el-input></p>
            <p class="pt17"><span>联系方式：</span><el-input v-model="phoneNumber" placeholder="请输入联系方式"></el-input></p>
          </div>
        </div>
        <div class="d-inline w290 ml20 mt10">
          <p class="pt17"><span class="mr2">职位：</span><el-input v-model="job" placeholder="请输入职位"></el-input></p>
          <p class="pt17"><span>板块商圈：</span><el-input v-model="mainPlate"  @focus="selectMainPlate" placeholder="请选择经纪人主营板块"></el-input></p>
            <el-button class="finishposition" type="success" @click="submitBroker" round>确定</el-button>
        </div>

      </div>
      
      <!-- 组织树对话框 -->
        <el-dialog
          title="组织树"
          :visible.sync="shopIsVisible"
          width="30%"
          :before-close="handleClose">
          <div>
            <p>
            <!--   <el-input placeholder="请输入内容" v-model="shopSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search">查询</el-button>
               </el-input> -->
              <el-button type="success" @click="shopSearchfinish">确定</el-button>
            </p>
            <el-tree :data="dataTree" 
              show-checkbox
              class="checkBoxchange"
              accordion
              node-key="id"
              ref="tree"
              v-model="treeNodeData"
             :props="defaultProps"
              ></el-tree>
          </div>
        </el-dialog>

        <!-- 主营板块 -->
           <el-dialog
          title="主营板块"
          :visible.sync="mainPlateIsVisible"
          width="14%"
          >
          <div>
              <el-checkbox v-model="mainPlateChecked" v-for="(item,index) of mainPlateInfo.sqList" :key="index" :label="item.id">{{item.xzq_mc}}</el-checkbox>
               <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="mainPlateClose(false)">取 消</el-button>
              <el-button type="success" @click="mainPlateClose(true)">确定</el-button>
            </div>
          </div>
        </el-dialog>

        <!-- 重点楼盘 -->
        <el-dialog
          title="重点楼盘"
          :visible.sync="houseIsVisible"
          width="30%"
          :before-close="handleClose">
          <div>
            <p>
              楼盘
              <el-input placeholder="请输入内容" v-model="houseSearch" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="houseToSearch">查询</el-button>
               </el-input>
              <el-button type="danger" icon="el-icon-delete" @click="houseClear">清空</el-button>
            </p>
            <el-table
            :data="houseTable"
             ref="multipleTable"
             @selection-change="tableChange"
            style="width: 100%">
            <el-table-column
             type="selection"
              width="70">
            </el-table-column>
            <el-table-column
              prop="city"
              label="城市"
              width="110">
            </el-table-column>
            <el-table-column
              prop="district"
              label="行政区"
              width="110">
            </el-table-column>
            <el-table-column
              prop="businessArea"
              label="商圈"
              width="110">
            </el-table-column>
            <el-table-column
              prop="houses"
              label="楼盘">
            </el-table-column>
            </el-table>
              <div class="block">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="housecurrentpage"
                  :page-size="houseInfo.pageSize"
                  layout="prev, pager, next, jumper"
                  :total="houseInfo.countSum">
                </el-pagination>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="houseFinish(false)">取 消</el-button>
              <el-button type="primary" @click="houseFinish(true)">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs';
  export default {
    data(){
      return {
        // 表单数据
        name:'',
        shop:'',
        shopID:'',
        houses:'',
        housesID:[],
        phoneNumber:'',
        job:'',
        jobID:'',
        mainPlate:'',
        mainPlateID:'',
        componyId:'',
        // 组织树弹出框
        shopIsVisible:false,
        shopSearch:'',
        treeNodeData:[],
         dataTree: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        //重点楼盘
        houseIsVisible:false,
        housecurrentpage:1,
        houseSearch:'',
        houseInfo:{},
        housesval:[],
        //主营板块
        mainPlateIsVisible:false,
        mainPlateChecked:[],
        mainPlateInfo:{},
        houseTable:[],
         multipleTable:[],
        houseTable2: [{
            id:'',
            city: '北京',
            district: '王小虎',
            businessArea: '商圈',
            houses: '楼盘',
          }, {
            id:'',
            city: '北京',
            district: '王小虎',
            businessArea: '商圈',
            houses: '楼盘',
          }, {
            id:'',
            city: '北京',
            district: '王小虎',
            businessArea: '商圈',
            houses: '楼盘',
          }, {
            id:'',
            city: '北京',
            district: '王小虎',
            businessArea: '商圈',
            houses: '楼盘',
          }],
      }
    },
    created(){
      let formdata = {
        "id":this.$route.query.id,
      } 
      this.Http.post('/set/editBroker',qs.stringify(formdata))
      .then(response=>{
          if(response && response.data && response.data.SUCCESS){
            this.name = response.data.ryXxVo.xingMing;
            this.houseTypeID = response.data.ryXxVo.id;
            this.shop = response.data.ryXxVo.suoShuZzMc;
            this.shopID = response.data.ryXxVo.suoShuZzId;
            this.houses = response.data.ryXxVo.lpMc;
            this.housesID = response.data.ryXxVo.lpId;
            this.phoneNumber = response.data.ryXxVo.shouJiHao;
            this.job = response.data.ryXxVo.zhiWeiMc;
            this.jobID = response.data.ryXxVo.zhiWeiId;
            this.mainPlate = response.data.ryXxVo.sqMc;
            this.mainPlateID = response.data.ryXxVo.sqId;
            this.componyId = response.data.ryXxVo.owner_company;
          }else{
            this.$notify({
                title: '错误',
                message: '数据加载失败',
                type: 'error'
            });
          }
      })
      .catch(error=>{

      })
    },
    methods:{
       handleClose(done) {
            done();
      },
      selectShop(){
        let formdata = {
          'owner_company':this.componyId,
        }
        this.Http.post('/set/selectOrgList',formdata)
        .then(response=>{
            if(response.data.code == 0){
                this.shopIsVisible = true;
                this.dataTree = response.data.data;
            }
        })
        .catch(error=>{
          console.log(error)
        })
      },
      selectHouses(){
        let formdata = {
          "owner_company":this.componyId,
          "queryLp":"",
          "currentPage":1,
        };
        this.Http.post('/set/selectLpList',formdata)
        .then(response=>{
          if(response.data.SUCCESS){
            this.houseInfo = response.data;
            this.houseIsVisible = true;
            this.houseTable = [];
            this.housecurrentpage = 1;
            response.data.lpList.forEach(item=>{
              let tableItem = {
                "city":item.cs_mc,
                "district":item.xzq_mc,
                "businessArea":item.sq_mc,
                "houses":item.xq_mc,
              };
              this.houseTable.push(tableItem);
            })
          }
        })
        .catch(error=>{

        })
      },
      tableChange(val){
        this.housesval = val;
      },
      handleCurrentChange(){
         let formdata = {
          "owner_company":this.componyId,
          "queryLp":this.houseSearch,
          "currentPage":this.housecurrentpage,
        };
        this.Http.post('/set/selectLpList',formdata)
        .then(response=>{
          if(response.data.SUCCESS){
            this.houseInfo = response.data;
            this.houseIsVisible = true;
            this.houseTable = [];
            response.data.lpList.forEach(item=>{
              let tableItem = {
                "city":item.cs_mc,
                "district":item.xzq_mc,
                "businessArea":item.sq_mc,
                "houses":item.xq_mc,
              };
              this.houseTable.push(tableItem);
            })
          }
        })
        .catch(error=>{

        })
      },
      selectMainPlate(){
        let formdata = {
          "owner_company":this.componyId,
          "querySq":"",
          "currentPage":1,
        }
        this.Http.post('/set/selectSqList',formdata)
        .then(response=>{
          if(response.data.SUCCESS){
            this.mainPlateInfo = response.data;
            this.mainPlateIsVisible = true;
            this.mainPlateChecked = this.mainPlate.split(",");
          }
        })
        .catch(error=>{

        })
      },
      // houseClick(row,event,column){
      //   this.houses = row["houses"];
      // },
      shopSearchfinish(){
          // console.log(this.$refs.tree.getCheckedKeys())
          this.shopID = this.$refs.tree.getCheckedKeys().join(",");
      },
      houseFinish(bool){
          if(bool){
            let housemes = [];
            this.housesId = [];
            this.housesval.forEach(item=>{
            this.housesId.push(item.id);
            housemes.push(item.houses)
            })
            this.houses = housemes.join(",");
          }
          this.houseIsVisible = false

      },
      houseToSearch(){
        let formdata = {
          "owner_company":this.componyId,
          "queryLp":this.houseSearch,
          "currentPage":1,
        };
        this.Http.post('/set/selectLpList',formdata)
        .then(response=>{
          if(response.data.SUCCESS){
            this.houseInfo = response.data;
            this.houseIsVisible = true;
            this.houseTable = [];
            response.data.lpList.forEach(item=>{
              let tableItem = {
                "city":item.cs_mc,
                "district":item.xzq_mc,
                "businessArea":item.sq_mc,
                "houses":item.xq_mc,
              };
              this.houseTable.push(tableItem);
            })
          }
        })
        .catch(error=>{

        })
      },
      houseClear(){
        this.houseSearch = '';
        this.selectHouses();
      },
      mainPlateClose(bool){
        if(bool){
          this.mainPlate = this.mainPlateChecked.join(",");
        }
          this.mainPlateIsVisible = false;

      },
      submitBroker(){
        let formdata = {
          "id":this.shopID,
          "xingMing":this.name,
          "zhiWeiMc":this.job,
          "zhiWeiId":this.jobID,
          "suoShuZzMc":this.shop,
          "suoShuZzId":this.shopID,
          "sqId":this.mainPlateID,
          "sqMc":this.mainPlate,
          "lpId":this.housesID.join(","),
          "lpMc":this.houses,
          "shouJiHao":this.phoneNumber,
        }
        this.Http.post('/set/updateBroker',qs.stringify(formdata))
        .then(res=>{
          if(res.data.SUCCESS){
            // 返回之前的页面
          }
        })
        .catch(error=>{

        })
      },
    },
  	components:{

  	},

  }
</script>
<style scoped>
  img{
    object-fit: cover;
    width:180px;
    height:240px;
  }
  .w-style{
    width: 860px;
    height: 240px;
    background-color: rgba(250, 250, 250, 1);
  }
  input{
    width: 220px;
    height: 30px;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-decoration: none;
  }
  .el-input__inner{
    width:20px;
  }
  .style-control p ,.style-control span{
    float:left;
  }
  .style-control p {
    width:220px;
  }
  .el-input{
    width:75%;
  }
  .checkBoxchange{
    /*width:16px;*/
  }
  .finishposition {
    position: absolute;
    top: 242px;
    left: 1000px;
    background:rgb(51, 186, 155);
}
</style>

<!-- 一个颜色样式 -->
