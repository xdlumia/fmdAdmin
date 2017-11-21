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
                            <span class="active">区域<i class="iconfont icon-arrow-down"></i></span>
                            <span>地铁<i class="iconfont icon-arrow-down"></i></span>
                        </div>
                        <div class="d-filter-val-list">
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a><a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a><a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a><a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a><a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                            <a data-id="110102" href="javascript:;">西城区</a>
                        </div>
                    </div>
                </div>
                <!-- 价格 -->
                <div class="d-filter-item">
                    <div class="d-filter-key">价格</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-tab mb15">
                            <span class="active">总价<i class="iconfont icon-arrow-down"></i></span>
                            <span>地铁<i class="iconfont icon-arrow-down"></i></span>
                        </div>
                        <div class="d-filter-val-list">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </div>
                    </div>
                </div>
                <!-- 面积 -->
                <div class="d-filter-item">
                    <div class="d-filter-key">面积</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-list">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </div>
                    </div>
                </div>
                <!-- 装修 -->
                <div class="d-filter-item">
                    <div class="d-filter-key">装修</div>
                    <div class="d-filter-val">
                        <div class="d-filter-val-list">
                           <el-select v-model="form.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
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
const cityOptions = ['上海', '北京', '广州', '深圳',];
export default {
	name: 'Filter',
    data() {
      return {
        activeIndex: '1',
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
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
    },

  }
</script>