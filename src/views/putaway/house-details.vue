<template>
  <div>
    <el-form :label-position="labelPosition" label-width="100px" :model="form" class="house-details el-form-small">
        <div class="details-top mt60">
            <div class="d-main">
                <div class="search-main">
                   <a  class="logo" href=""><img src=""alt=""></a>
                   <h5 class="name">详情页</h5>
                   <div class="seachr-box d-disabled fr">
                       <input type="text" class="d-disabled" disabled="" placeholder="请输入区域、商圈或者楼盘名开始找房">
                       <i class="iconfont icon-search"></i>
                   </div>
                </div>
                <div class="details-title">
                    <div class="d-input-block">
                        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
                    </div>
                    <div class="d-input-block">
                        <el-input v-model="form.name" placeholder="请输入副标题"></el-input>
                    </div>
                    <div class="d-input-inline">
                        <el-input v-model="form.name" placeholder="月租-元/月"></el-input>
                    </div>
                    <div class="d-input-inline">
                        <el-input v-model="form.name" placeholder="日租-元/平米/天"></el-input>
                    </div>
                    <div class="d-input-inline">
                        <el-input v-model="form.name" placeholder="销售面积-平米"></el-input>
                    </div>
                    <div class="d-input-inline">
                        <el-input v-model="form.name" placeholder="月租-元/月"></el-input>

                    </div>
                    <div class="d-input-inline">
                        <el-select v-model="form.date1" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                    <div class="d-input-inline">
                        <el-select v-model="form.quyu2" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                    <div class="d-input-inline">
                        <el-select v-model="form.quyu3" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                    <div class="d-input-inline">
                        <el-input v-model="form.name" placeholder="总楼层-层"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-main pb50"> 
            <div class="d-breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div> 
            <div class="d-details-content" style="width: 710px;">
                <h3 class="title">基本信息</h3>
                <div class="d-info-block">
                    <div class="d-info-title">基本属性</div>
                    <div class="d-info-con">
                      <el-form-item label="审批人" class="w240 fl">
                        <el-input v-model="form.user" placeholder="审批人"></el-input>
                      </el-form-item>

                      <el-form-item label="活动区域" class="w240 fl">
                        <el-select v-model="form.region" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                </div>
                <h3 class="title">房源特色</h3>
                <div class="d-info-block">
                    <div class="d-info-title">房屋卖点</div>
                    <div class="d-clear"></div>
                    <el-col :span="4">
                        <el-checkbox v-model="checked">备选项</el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="checked">备选项</el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="checked">备选项</el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="checked">备选项</el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="checked">备选项</el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="checked">备选项</el-checkbox>
                    </el-col>
                    <!-- 核心亮点 -->
                    <div class="d-clear"></div>
                    <div class="d-info-title mt20">核心亮点</div>
                    <el-input type="textarea" v-model="form.desc"></el-input>
                    <!-- 核心亮点 -->
                    <div class="d-clear"></div>
                    <div class="d-info-title mt20">核心亮点</div>
                    <el-input type="textarea" v-model="form.desc"></el-input>
                    <!-- 核心亮点 -->
                    <div class="d-clear"></div>
                    <div class="d-info-title mt20">核心亮点</div>
                    <el-input type="textarea" v-model="form.desc"></el-input>
                    <!-- 核心亮点 -->
                    <div class="d-clear"></div>
                    <div class="d-info-title mt20">核心亮点</div>
                    <el-input type="textarea" v-model="form.desc"></el-input>
                    
                    <div class="mt20">
                        <el-button size="medium" type="primary" @click="onSubmit">立即保存</el-button>
                        <el-button size="medium">取消</el-button>
                    </div>
                </div>
            </div>
        </div> 
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'houseDetails',
    data() {
      return {
        activeIndex: '1',
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        labelPosition: 'right',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          quyu:'',
        },
      };
    }
  }
</script>
<style>

</style>
