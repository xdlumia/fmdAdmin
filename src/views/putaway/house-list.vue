
<template>
  <div class="d-main">
    <filter-main></filter-main>
    <h2 class="title">二手房上下架管理</h2>
    <!-- 上下架管理列表 -->
    <div class="d-content">
        <div class="house-list-top">
            <div class="h-result-sum d-inline">
                共<span class="num">999</span>套房源
            </div>
            <div class="button-box d-inline ml20">
              <el-button size="small">批量上架</el-button>
              <el-button size="small">批量下架</el-button>
              <el-button size="small">批量删除</el-button>
            </div>
        </div>
        <div class="house-list-con">
          <div class="house-list-head">
            <div class="h-list-check"><el-checkbox v-model="checked"></el-checkbox></div>
            <div class="h-list-info" style="width: 540px;">房源信息</div>
            <div class="h-list-release">发布信息</div>
            <div class="h-list-putaway">上架信息</div>
            <div class="h-list-handle">操作</div>
          </div>
          <ul class="house-list-ul">
              <li>
                 <div class="h-list-check"><el-checkbox v-model="checked"></el-checkbox></div>
                 <div class="h-list-img mr20"><a href=""><img src="" alt=""></a></div>
                 <div class="h-list-info">
                      <a href="" class="title d-elip">主标题主标题主标题主标题主标题主标题主标</a>
                      <div class="info mt5">
                        <span>流星花园三区</span>
                        <span>335m²</span>
                        <span>南北</span>
                        <span>豪装</span>
                      </div>
                      <div class="price mt5">
                        <span class="main-text">650万元</span>
                        <span>6500元/平米</span>
                      </div>
                      <div class="status mt5">
                        <span>编号：<a style="color:#33ba9b">111110909</a></span>
                        <span>房源状态：<a style="color:#33ba9b">待租售</a></span>
                      </div>
                 </div>

                 <div class="h-list-release">
                   <div>维护人：<span>付福福</span></div>
                   <div class="mt5">提交人：<span>付福福</span></div>
                   <div class="mt5">提交时间：<span>2017-06-22</span></div>
                 </div>
                 <div class="h-list-putaway">
                   <div>上架状态：<span class="d-status" round>待上架</span></div>
                   <div class="mt5">上架时间：<span>2014-54-45</span></div>
                   <div class="mt5"><span class="d-status d-bg-gray" d-home>首页推荐</span><span class="d-status d-bg-gray ml10" d-putaway>上架推荐</span></div>
                 </div>
                 <div class="h-list-handle">
                   <div><span class="d-status" d-view>预览查看</span></div>
                   <div class="mt5"><span class="d-status" d-edit>编辑</span><span class="d-status ml10" d-soldout>下架</span></div>
                   <div class="mt5"><span class="d-status" d-record>上/下架记录</span><span class="d-status ml10" d-del>删除</span></div>
                 </div>
              </li>
              <li>
                 <div class="h-list-check"><el-checkbox v-model="checked"></el-checkbox></div>
                 <div class="h-list-img mr20"><a href=""><img src="" alt=""></a></div>
                 <div class="h-list-info">
                      <a href="" class="title d-elip">主标题主标题主标题主标题主标题主标题主标</a>
                      <div class="info mt5">
                        <span>流星花园三区</span>
                        <span>335m²</span>
                        <span>南北</span>
                        <span>豪装</span>
                      </div>
                      <div class="price mt5">
                        <span class="main-text">650万元</span>
                        <span>6500元/平米</span>
                      </div>
                      <div class="status mt5">
                        <span>编号：<a style="color:#33ba9b">111110909</a></span>
                        <span>房源状态：<a style="color:#33ba9b">待租售</a></span>
                      </div>
                 </div>

                 <div class="h-list-release">
                   <div>维护人：<span>付福福</span></div>
                   <div class="mt5">提交人：<span>付福福</span></div>
                   <div class="mt5">提交时间：<span>2017-06-22</span></div>
                 </div>
                 <div class="h-list-putaway">
                   <div>上架状态：<span class="d-status" round>待上架</span></div>
                   <div class="mt5">上架时间：<span>2014-54-45</span></div>
                   <div class="mt5"><span class="d-status d-bg-gray" d-home>首页推荐</span><span class="d-status d-bg-gray ml10" d-putaway>上架推荐</span></div>
                 </div>
                 <div class="h-list-handle">
                   <div><span class="d-status" d-view>预览查看</span></div>
                   <div class="mt5"><span class="d-status" d-edit>编辑</span><span class="d-status ml10" d-soldout>下架</span></div>
                   <div class="mt5"><span class="d-status" d-record>上/下架记录</span><span class="d-status ml10" d-del>删除</span></div>
                 </div>
              </li>
          </ul>

          <!-- 分页 -->
          <div class="d-page ar">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </div>
    </div>
  </div>
</template>

<script>


import Filter from '@/components/filter.vue'


  export default {
    data(){
   
    },

    components: {
      filterMain:Filter,
    }
  }

</script>
<style>

</style>
