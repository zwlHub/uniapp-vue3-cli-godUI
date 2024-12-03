<template>
  <view
    :class="[
      'tabs-top',
      {
        'active-type': !!projectTypeVal,
        'active-status': !!projectStatusVal,
        'active-startTime': !!startTimeVal,
        'active-endTime': !!endTimeVal,
      },
    ]"
  >
    <up-dropdown ref="uDropdownRef" :title-size="10" active-color="#468EFF">
      <up-dropdown-item
        v-model="projectTypeVal"
        :title="options1Title"
        :options="optionsType"
        @change="changeOptions1"
      ></up-dropdown-item>
      <up-dropdown-item
        v-model="projectStatusVal"
        :title="options2Title"
        :options="optionsStatus"
        @change="changeOptions2"
      >
      </up-dropdown-item>
      <!-- 项目开始日期 -->
      <up-dropdown-item :title="options3Title">
        <view class="slot-content" :style="{ height: dropdownHeight + 'rpx' }">
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
      <!-- 项目结束日期 -->
      <up-dropdown-item :title="options4Title">
        <view class="slot-content" :style="{ height: dropdownHeight1 + 'rpx' }">
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
</template>
<script setup>
import { ref, reactive } from "vue";
</script>
<style lang='scss' scoped>
</style>