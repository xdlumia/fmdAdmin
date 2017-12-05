<template>
 <div class="putaway-record">
   <el-dialog
  title="上/下架记录"
  :visible.sync="putawayjilu.isvisible"
  width="50%"
  :before-close="handleClose">
  <p>房源编号：<span>{{putawayjilu.serialNumber}}</span></p>
   <el-table
    :data="putawayjilu.table"
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
      width="238"
      >
    </el-table-column>
  </el-table>

    <span slot="footer" class="dialog-footer">
    <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="putawayjilu.pageSize"
      layout="prev, pager, next, jumper"
      :total="putawayjilu.countSum">
    </el-pagination>
  </div>

  </span>
</el-dialog>
 </div>
</template>

<script>
  export default {
    name: 'putaway-record',
    props:['putawayjilu'],
    data () {
      return {
        currentPage:1,
      }
    },
    methods: {
      handleClose(done) {
            done();
      },
      handleCurrentChange() {
         this.Http.post('/set/listShangJiaFy',{
            "id": this.putawayjilu.id,
            "currentPage" : this.currentPage,
          })
          .then( (res)=> {
           if(res && res.data && res.data.SUCCESS){
            // 展示成交记录框
             this.putawayjilu.table = [];
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
           }
          })
        .catch( (error) => {
          console.log(error);
        });
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