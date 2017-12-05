<template>
 <div class="putaway-record">
   <el-dialog
  title="上/下架记录"
  :visible.sync="brokerRecord.isvisible"
  width="50%"
  :before-close="handleClose">
  <p>经纪人姓名：<span>{{brokerRecord.table[0] && brokerRecord.table[0].jjrMc}}</span>编号：<span>{{brokerRecord.table[0] && brokerRecord.table[0].gongHao}}</span></p>
   <el-table
    :data="brokerRecord.table"
    style="width: 100%"
    border
    >
    <el-table-column
      prop="fyZt"
      label="房源状态"
      width="120">
    </el-table-column>
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
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="brokerRecord.countSum">
    </el-pagination>
  </div>

  </span>
</el-dialog>
 </div>
</template>

<script>
  export default {
    name: 'putaway-record',
    props:['brokerRecord'],
    data () {
      return {
        // tableData2: [{
        //   fyZt: '已上架',
        //   tiJiaoRenMc: '王小虎',
        //   tiJiaoSj: '2017-01-01 11:11:11',
        //   shangJiaZt: '上架',
        //   modifyUserMc: '王小虎',
        //   modifyDate: '2017-01-01 11:11:11',
        // },{
        //   fyZt: '已上架',
        //   tiJiaoRenMc: '王小虎',
        //   tiJiaoSj: '2017-01-01 11:11:11',
        //   shangJiaZt: '上架',
        //   modifyUserMc: '王小虎',
        //   modifyDate: '2017-01-01 11:11:11',
        // },{
        //   fyZt: '已上架',
        //   tiJiaoRenMc: '王小虎',
        //   tiJiaoSj: '2017-01-01 11:11:11',
        //   shangJiaZt: '上架',
        //   modifyUserMc: '王小虎',
        //   modifyDate: '2017-01-01 11:11:11',
        // },{
        //   fyZt: '已上架',
        //   tiJiaoRenMc: '王小虎',
        //   tiJiaoSj: '2017-01-01 11:11:11',
        //   shangJiaZt: '上架',
        //   modifyUserMc: '王小虎',
        //   modifyDate: '2017-01-01 11:11:11',
        // },{
        //   fyZt: '已上架',
        //   tiJiaoRenMc: '王小虎',
        //   tiJiaoSj: '2017-01-01 11:11:11',
        //   shangJiaZt: '上架',
        //   modifyUserMc: '王小虎',
        //   modifyDate: '2017-01-01 11:11:11',
        // },],
        currentPage:1,
      }
    },
    methods: {
      handleClose(done) {
       
            done();
          
      },
      handleCurrentChange(val) {
         this.Http.post('/set/listShangJiaJjr',{
          id:this.brokerRecord.id,
          currentPage:this.currentPage,
        })
        .then(res=>{
          if(res && res.data && res.data.SUCCESS){
            this.brokerRecord.table = [];
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
              this.brokerRecord.table.push(tableUnit)
            })
          }else{
             this.$notify({
                title: '错误',
                message: '操作失败',
                type: 'error'
            });
          }
        })
        .catch(error=>{
          console.log(error)
        })
      }
    },
  }
</script>
<style scoped>
.pt-box{
  border-top:1px solid black;
}
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>