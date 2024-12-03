<template>
  <view
    class="container"
  >
    <view class="search-top">
      <view class="search-top-left">
        <up-search
          :inputStyle="inputStyle"
          searchIconColor="#C8CCCC"
          :searchIconSize="20"
          placeholder="请输入内容"
          placeholderColor="#C8CCCC"
          bgColor="#FFF"
          :showAction="false"
          v-model="searchKeyword"
          @search="searchList"
        ></up-search>
        <text class="tips">提示：此处只展示参数变更，数据需与实际后台接口数据联动。</text>
      </view>
    </view>
    <view
      :class="[
        'tabs-top',
        {
          'active-type': !!queryParams.professional,
          'active-status': !!queryParams.sex,
          'active-startTime': !!queryParams.startTime,
          'active-endTime': !!queryParams.endTime,
        },
      ]"
    >
      <up-dropdown ref="uDropdownRef" :title-size="10" active-color="#468EFF">
        <up-dropdown-item
          v-model="queryParams.professional"
          :title="options1Title"
          :options="options1"
          @change="changeOptions1"
        ></up-dropdown-item>
        <up-dropdown-item
          v-model="queryParams.sex"
          :title="options2Title"
          :options="options2"
          @change="changeOptions2"
        >
        </up-dropdown-item>
        <up-dropdown-item :title="options3Title">
          <view
            class="slot-content"
            :style="{ height: dropdownHeight + 'rpx' }"
          >
            <scroll-view scroll-y="true" style="height: 800rpx">
              <wu-calendar
                mode="range"
                operationPosition="top"
                :insert="true"
                :lunar="true"
                textColor="#646D79"
                :useToday="false"
                :itemHeight="58"
                :isToday="false"
                :date="tempStartTimeVal"
                isShowBtn
                @change="calendarChangeStart"
                @close="closeStartCalendar"
                @resetRange="startResetRange"
                @confirmRange="startconfirmRange"
              >
              </wu-calendar>
            </scroll-view>
            <view class="calendar-time" v-if="startBefore || startAfter">
              <text>上限：{{ startBefore }}</text>
              <text>下限：{{ startAfter }}</text>
            </view>
          </view>
        </up-dropdown-item>
        <up-dropdown-item :title="options4Title">
          <view
            class="slot-content"
            :style="{ height: dropdownHeight1 + 'rpx' }"
          >
            <scroll-view scroll-y="true" style="height: 800rpx">
              <wu-calendar
                mode="range"
                operationPosition="top"
                :insert="true"
                :lunar="true"
                textColor="#646D79"
                :useToday="false"
                :itemHeight="58"
                :isToday="false"
                :date="tempEndTimeVal"
                isShowBtn
                @change="calendarChangeEnd"
                @close="closeEndCalendar"
                @resetRange="endResetRange"
                @confirmRange="endconfirmRange"
              >
              </wu-calendar>
            </scroll-view>
            <view class="calendar-time" v-if="endBefore || endAfter">
              <text>上限：{{ endBefore }}</text>
              <text>下限：{{ endAfter }}</text>
            </view>
          </view>
        </up-dropdown-item>
      </up-dropdown>
    </view>
    <view class="scroll-style">
      <scroll-view
        style="height: 100%"
        scroll-y="true"
        @scrolltolower="scrolltolower"
      >
        <block v-if="list.length > 0">
          <view class="list-item" v-for="(item, index) in list" :key="item.id" @click="getDetail(item)">
            <view class="flex font-[600] text-[28rpx]">
              <p>{{ item.name }}</p>
              <p class="m-l-15rpx ">
                <text class="iconfont icon-man-line1 color-blue" v-if="item.gender === 'male'"></text>
                <text class="iconfont icon-man-line color-pink" v-else></text>
              </p>
              <p class="m-l-15rpx">{{ item.age }}岁</p>
            </view>
            <view class="flex items-center m-t-12rpx text-[25rpx] color-#555555">
              <text class="iconfont icon-jiliangzhuanye"></text>
              <p class="m-l-8rpx">{{ (options1.find(subItem => subItem.value === item.professional) || {label: '-'}).label || '-' }}</p>
            </view>
            <view class="flex items-start m-t-12rpx text-[26rpx]">
              <text class="p-t-2rpx text-[28rpx] iconfont icon-qianming color-#555555"></text>
              <p class="m-l-8rpx color-#646D79">{{ item.motto }}</p>
            </view>
            <view class="flex items-center m-t-12rpx text-[24rpx] color-#999">
              <text class="text-[22rpx] iconfont icon-a-6ruxueshijian"></text>
              <p class="m-l-8rpx">入学日期：{{ item.admissionDate }}</p>
            </view>
            <view class="flex items-center m-t-12rpx text-[24rpx] color-#999">
              <text class="text-[22rpx] iconfont icon-a-6ruxueshijian"></text>
              <p class="m-l-8rpx">毕业日期：{{ item.graduationDate }}</p>
            </view>
          </view>
        </block>
        <no-more v-if="loaded && list.length == 0"></no-more>
        <view class="load-more">
          <up-loadmore
            :status="loadStatus"
            v-if="list.length !== 0"
          ></up-loadmore>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { findList } from '@/api/api.js'

/**
 * 顶部搜索栏
 */
const inputStyle = {
  fontSize: "26rpx",
};
const searchKeyword = ref("");
const searchList = (val) => {
  searchKeyword.value = val;
  queryParams.value.appSearch = val;
};

/**
 * 顶部条件筛选项
 */
const uDropdownRef = ref(null);
const options1Title = ref("专业");
const options1 = ref([]); //下拉组件选项

// 查询字典
const getprofessionalList = async () => {
  uni.request({
    url: '/devMock/list/getProDict',
    success: (res) => {
      let opt = {
        label: '不限',
        value: "no_limit",
      }
      options1.value = [opt,...res.data.data.proData]
    }
  })
}

const changeOptions1 = (val) => {
  if (val === "no_limit") {
    options1Title.value = "专业";
    queryParams.value.professional = "";
    return;
  }
  queryParams.value.professional = val;
  let opts = options1.value.find((item) => item.value === val);
  options1Title.value = opts.label;
};

const options2Title = ref("性别");
const options2 = ref([
  {
    label: "不限",
    value: "no_limit",
  },
  {
    label: "男",
    value: "male",
  },
  {
    label: "女",
    value: "female",
  },
]);

const changeOptions2 = (val) => {
  if (val === "no_limit") {
    options2Title.value = "性别";
    queryParams.value.sex = ""
    return;
  }
  queryParams.value.sex = val;
  let opts = options2.value.find((item) => item.value === val);
  options2Title.value = opts.label;
}


//日历筛选-开始日期
const options3Title = ref("开始日期");
const tempStartTimeVal = ref([]); //用于回显
const startBefore = ref(""); //左区间
const startAfter = ref(""); //右区间
const calendarChangeStart = (e) => {
  startBefore.value = e.range.before;
  startAfter.value = e.range.after;
  console.log(startBefore.value, startAfter.value);
};

const closeStartCalendar = () => {
  console.log("点击遮罩");
  tempStartTimeVal.value = [];
};

// 日历下方回显已选择的日期
const dropdownHeight = computed(() => {
  if (startBefore.value || startAfter.value) {
    return 880;
  } else {
    return 800;
  }
});

// 重置开始日期
const startResetRange = () => {
  tempStartTimeVal.value = [];
  queryParams.value.startTime = ""
  startBefore.value = "";
  startAfter.value = "";
  options3Title.value = "开始日期";
  uDropdownRef.value.close();
};

const startconfirmRange = () => {
  if (startBefore.value == "" || startAfter.value == "") {
    uni.showToast({
      title: "请选择日期区间",
      icon: "none",
    });
    return;
  }
  tempStartTimeVal.value = [startBefore.value, startAfter.value];
  queryParams.value.startTime = `${startBefore.value},${startAfter.value}`
  options3Title.value = `${startBefore.value}-${startAfter.value}`;
  uDropdownRef.value.close();
};

//日历筛选-结束日期
const options4Title = ref("结束日期");
const tempEndTimeVal = ref([]); //用于回显
const endBefore = ref("");
const endAfter = ref("");
const calendarChangeEnd = (e) => {
  console.log("confirmCalendar", e);
  endBefore.value = e.range.before;
  endAfter.value = e.range.after;
  console.log(endBefore.value, endAfter.value);
};

const closeEndCalendar = () => {
  console.log("点击遮罩");
  tempEndTimeVal.value = [];
};

const dropdownHeight1 = computed(() => {
  if (endBefore.value || endAfter.value) {
    return 880;
  } else {
    return 800;
  }
});
// 重置结束日期
const endResetRange = () => {
  tempEndTimeVal.value = [];
  queryParams.value.endTime = "";
  endBefore.value = "";
  endAfter.value = "";
  options4Title.value = "结束日期";
  uDropdownRef.value.close();
};

const endconfirmRange = () => {
  if (endBefore.value == "" || endAfter.value == "") {
    uni.showToast({
      title: "请选择日期区间",
      icon: "none",
    });
    return;
  }
  tempEndTimeVal.value = [endBefore.value, endAfter.value];
  queryParams.value.endTime = `${endBefore.value},${endAfter.value}`;
  options4Title.value = `${endBefore.value}-${endAfter.value}`;
  uDropdownRef.value.close();
};

// 列表数据
const list = ref([]);
const total = ref(0);
const loaded = ref(false); // 数据请求完成的标识
const loadStatus = ref("loadmore");
// 筛选参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  appSearch: "", //模糊搜索
  professional: "", //专业
  sex: "", //性别
  startTime: "", //开始时间
  endTime: "", //结束时间
});

async function getList() {
  loadStatus.value = "loading";
  try {
    // 业务数据请求
    const res = await findList(queryParams.value);
    loaded.value = true
    if (res.success) {
      total.value = res.data.total;
      if (queryParams.value.pageNum > 1) {
        list.value = [...list.value, ...res.data.list];
      } else {
        list.value = res.data.list;
      }
      if (total.value === list.value.length) {
        loadStatus.value = "nomore";
      } else {
        loadStatus.value = "loadmore";
      }
    } else {
      uni.showToast({
        title: res.message || "查询数据失败",
        icon: "none",
      });
      loadStatus.value = "nomore";
    }
  } catch (error) {
    uni.showToast({
      title: "查询数据失败",
      icon: "none",
    });
    loaded.value = true;
    loadStatus.value = "nomore";
  }
}

// 上拉加载更多
const scrolltolower = () => {
  console.log("scrolltolower~");
  // 如果当前显示数据小于总数，显示上拉加载更新，否则显示没有更多
  if (list.value.length >= total.value) {
    loadStatus.value = "nomore";
  } else {
    loadStatus.value = "loadmore";
    queryParams.value.pageNum += 1;
    getList();
  }
};

// 清空条件
function clearParams() {
  queryParams.value.pageNum = 1;
  list.value = [];
  total.value = 0;
  getList();
}

watch(queryParams.value, (newVal) => {
  console.log("参数变更", newVal);
  uni.showToast({
    title: JSON.stringify(newVal),
    icon: "none",
    duration: 3000
  })
  clearParams()
});

onLoad((options) => {
  getprofessionalList()
});

onShow(() => {
  getList();
});

const getDetail = (item) => {

};

</script>

<style lang="scss" scoped>
@mixin webkit-ellipis($line) {
  display: -webkit-box;
  -webkit-line-clamp: $line;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  font-family: PingFangSC, PingFang SC;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 0 24rpx 14rpx 24rpx;
  display: flex;
  flex-direction: column;
}

.navBg {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
}

.search-top {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin-bottom: 24rpx;

  .search-top-left {
    // width: 577rpx;
    width: 100%;
  }
  .tips {
    font-family: PingFangSC, PingFang SC;
    font-size: 20rpx;
    color: #3a3a3a;
  }

  .search-top-right {
    display: flex;
    align-items: center;

    .text {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #468eff;
      line-height: 40rpx;
      margin-left: 7rpx;
    }
  }
}

.tabs-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tabs-item {
    display: flex;
    align-items: center;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    line-height: 42rpx;

    .icon-down {
      margin-left: 5rpx;
    }
  }

  .tabs-item-active {
    font-weight: 500;
    color: #1c1d1d;
  }
}

.active-type {
  ::v-deep .u-dropdown__menu__item {
    &:nth-child(1) {
      .u-dropdown__menu__item__text {
        color: #468eff !important;
      }
    }
  }
}

.active-status {
  ::v-deep .u-dropdown__menu__item {
    &:nth-child(2) {
      .u-dropdown__menu__item__text {
        color: #468eff !important;
      }
    }
  }
}

.active-startTime {
  ::v-deep .u-dropdown__menu__item {
    &:nth-child(3) {
      .u-dropdown__menu__item__text {
        color: #468eff !important;
      }
    }
  }
}

.active-endTime {
  ::v-deep .u-dropdown__menu__item {
    &:nth-child(4) {
      .u-dropdown__menu__item__text {
        color: #468eff !important;
      }
    }
  }
}

.scroll-style {
  flex: 1;
  overflow-y: auto;
}

.load-more {
  box-sizing: border-box;
  // width: calc(100% - 48rpx);
  width: 100%;
}

.empty-status {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50rpx 0;

  .empty-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .no-more {
      margin-top: 20rpx;
      display: flex;
      justify-content: center;
      margin-top: 10rpx;

      .txt {
        text-align: center;
        height: 37rpx;
        font-size: 26rpx;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: #333333;
        line-height: 37rpx;
      }
    }
  }
}

.project-item {
  box-sizing: border-box;
  // width: calc(100% - 48rpx);
  width: 100%;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx 17rpx 24rpx 17rpx;

  &:not(:first-child) {
    margin-top: 20rpx;
  }

  .pro-box {
    // display: flex;
    // align-items: flex-end;

    .pro-name {
      display: flex;
      align-items: flex-start;

      .name {
        // max-width: 388rpx;
        // @include webkit-ellipis(1);
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 30rpx;
        color: #000000;
        line-height: 42rpx;
        margin-left: 5rpx;
      }
    }

    .p-code {
      // max-width: 284rpx;
      // @include webkit-ellipis(1);
      word-break: break-all;
      font-family: PingFang-SC, PingFang-SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      margin-left: 36rpx;
      margin-top: 5rpx;
    }
  }

  .pro-box-cus {
    display: flex;
    align-items: flex-end;

    .pro-name-cus {
      display: flex;
      align-items: flex-start;

      .name {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 30rpx;
        color: #000000;
        line-height: 42rpx;
        margin-left: 5rpx;
      }
    }
  }

  .info-box {
    margin-left: 37rpx;

    .card-item {
      display: flex;
      align-items: center;
      margin-top: 16rpx;
    }

    .tags {
      flex-wrap: wrap;

      .tag-item {
        border-radius: 3rpx;
        font-family: PingFang-SC, PingFang-SC;
        font-weight: 400;
        font-size: 24rpx;
        height: 36rpx;

        &:not(:last-child) {
          margin-right: 10rpx;
        }
      }

      .status-item {
        width: 96rpx;
        text-align: center;
      }

      .status-0 {
        background: #ffede7;
        border: 1rpx solid #ff7d4b;
        color: #ff7741;
      }

      .status-1 {
        background: #f2feef;
        border: 1rpx solid #aedf97;
        color: #3fb944;
      }

      .status-2 {
        background: #f1f7ff;
        border: 1rpx solid #89b7ff;
        color: #5597ff;
      }

      .score {
        width: 83rpx;
        text-align: center;
        background: #fff8ec;
        border: 1rpx solid #ffcf8b;
        color: #ffad36;
      }

      .pro-type {
        max-width: 168rpx;
        padding: 0 12rpx;
        text-align: center;
        background: #f1f7ff;
        border-radius: 3rpx;
        border: 1rpx solid #7fb1ff;
        color: #468eff;
        @include webkit-ellipis(1);
      }
    }

    .manages {
      .manage-item {
        padding: 10rpx 11rpx 9rpx 9rpx;
        background: #f3f5ff;
        border-radius: 8rpx;
        font-family: PingFang-SC, PingFang-SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #646d79;
        line-height: 33rpx;

        &:first-child {
          margin-right: 13rpx;
        }
      }
    }

    .pro-time {
      .protime {
        font-family: PingFang-SC, PingFang-SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 33rpx;
      }

      .line {
        font-family: PingFang-SC, PingFang-SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #93bbfb;
        margin: 0 10rpx;
      }
    }

    .moneys {
      height: 80rpx;
      display: flex;
      align-items: center;
      // justify-content: space-around;
      // padding-right: 20rpx;

      .money-number {
        // width: 176rpx;
        height: 80rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        .number {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #000000;
          line-height: 45rpx;
        }

        .desc {
          font-family: PingFang-SC, PingFang-SC;
          font-weight: 400;
          font-size: 22rpx;
          color: #a2a9b1;
          line-height: 30rpx;
          margin-top: 5rpx;
        }
      }

      .line {
        height: 78rpx;
        height: 73rpx;
        border: 1rpx solid #e4e8fa;
        margin: 0 88rpx;
      }
    }
  }

  .contact {
    box-sizing: border-box;
    width: 100%;
    // height: 113rpx;
    margin-top: 23rpx;
    padding: 14rpx 15rpx 10rpx 15rpx;
    background: linear-gradient(
      270deg,
      rgba(244, 247, 255, 0.46) 0%,
      rgba(221, 235, 254, 0.46) 100%
    );
    border-radius: 8rpx;
    // opacity: 0.76;

    .company-info {
      display: flex;
      align-items: center;
      font-family: PingFang-SC, PingFang-SC;
      font-weight: 400;
      font-size: 24rpx;
      margin-bottom: 18rpx;

      .name {
        color: #646d79;
        margin-left: 13rpx;
        @include webkit-ellipis(1);
      }

      .code {
        color: #999999;
        margin-left: 13rpx;
      }
    }

    .people-info {
      display: flex;
      align-items: center;

      .name {
        font-family: PingFang-SC, PingFang-SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #646d79;
        margin: 0 11rpx 0 16rpx;
      }

      .img-phone {
        // padding: 5rpx;
      }
    }
  }
}

.active-item-bg {
  background: #f6faff;
}

.img-28 {
  width: 28rpx;
  height: 28rpx;
}

.img-32 {
  flex: 0 0 32rpx;
  margin-top: 5rpx;
  width: 32rpx;
  height: 32rpx;
}

::v-deep .u-dropdown__menu__item {
  flex: 0 0 25%;
}

::v-deep .u-dropdown__menu__item__text {
  display: -webkit-box;
  /* 设置显示为弹性盒模型 */
  -webkit-box-orient: vertical;
  /* 设置盒模型的排列方式为垂直 */
  -webkit-line-clamp: 1;
  /* 显示的行数 */
  overflow: hidden;
}

.slot-content {
  position: relative;
  // height: 880rpx;
  background-color: #fff;

  .calendar-time {
    display: flex;
    justify-content: space-around;
    padding: 10rpx 0 0 0;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: 400;
    font-size: 30rpx;
    color: #646d79;
  }
}

.drop-item-text {
  padding: 26rpx 30rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 30rpx;
  color: rgb(96, 98, 102);

  &:not(:last-child) {
    border-bottom: 1px solid rgb(214, 215, 217);
  }
}

.drop-btn {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-item {
  padding: 20rpx;
  background: #FFF;
  border-radius: 8rpx;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-family: PingFangSC, PingFang SC;
  font-size: 28rpx;
  &:not(:last-child) {
    margin-bottom: 30rpx;
  }
}
</style>

<style>
uni-page-body,
page {
  height: 100%;
  background: #f5f5f5;
}
</style>