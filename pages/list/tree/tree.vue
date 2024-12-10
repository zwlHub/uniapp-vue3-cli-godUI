<template>
  <view>
    <view class="operation">
      <p class="title">支持多选和单选</p>
      <button type="primary" class="nav-btn btnType1" @click="showPicker(true)">
        多选
      </button>
      <button type="primary" class="nav-btn btnType1" @click="showPicker(false)">
        单选
      </button>
      <p class="title">改变选中后的返回类型</p>
      <p class="tip">控制台查看打印结果</p>
      <button type="primary" class="nav-btn btnType2" @click="dataType('parent')">
        只返回父级
      </button>
      <button type="primary" class="nav-btn btnType2" @click="dataType('child')">
        只返回子集
      </button>
      <button type="primary" class="nav-btn btnType2" @click="dataType('parentAndChild')">
        返回父集和子集
      </button>
      <p class="title">回显</p>
      <p class="tip">根据上面按钮选中的数据进行回显</p>
      <button type="primary" class="nav-btn btnType3" @click="echo">
        回显
      </button>
    </view>
    <ba-tree-picker ref="treePicker" :multiple=type :selectedDataType="selectedDataType" @select-change="selectChange" title="选择城市"
                    :localdata="listData" valueKey="id" textKey="name" childrenKey="children" />

    <ba-tree-picker ref="treePicker2" :multiple="true" title="回显" @select-change="selectChange"
                    :localdata="listData" valueKey="id" :selectedData="selectedData" textKey="name" childrenKey="children" />
  </view>
</template>

<script setup>
import {ref} from "vue";
import { onReady } from "@dcloudio/uni-app";

const treePicker = ref(null)
const type = ref(true)
const selectedDataType = ref('parent')
// 显示选择器
function showPicker(val) {
  type.value = val
  treePicker.value._show();
}
function dataType(type) {
  selectedDataType.value = type
  showPicker(true)
}
// 选中的数据，用于回显
const selectedData = ref([11, 111, 112, 12])

//监听选择（ids为数组）
function selectChange(ids, names) {
  console.log(ids, names)
}

const treePicker2 = ref(null)
function echo() {
  treePicker2.value._show()
}

//1.checkStatus:当前节点是否被选中
//2.childCount：有几个子节点
//3.isLastLevel: 是不是最后一级
//4.id：当前节点id
//5.name:当前节点name
//6.children:子节点集合，用于展开时计算
//7.level：当前级别。用于缩进

const newTreeData = ref([])
const formatTreeData = (list,level) => {
  list.forEach((item) => {
    item.checkStatus = false
    item.childCount = item.children?.length || 0
    item.checkStatus = false
    item.isLastLevel = !item.children || item.children?.length == 0
    if(!!level) {
      item.level = level + 1
    } else {
      item.level = 0
    }
  })
}


const listData = [
  {
    id: 1,
    name: '公司1',
    children: [{
      id: 11,
      name: '研发部',
      children: [{
        id: 111,
        name: '张三',

      }, {
        id: 112,
        name: '李四',

      }]
    }, {
      id: 12,
      name: '综合部',

    }]
  },
  {
    id: 2,
    name: '公司2',
    children: [{
      id: 21,
      name: '研发部',

    }, {
      id: 22,
      name: '综合部',

    }, {
      id: 23,
      name: '财务部',

    },]
  },
  {
    id: 3,
    name: '公司3'
  },
  {
    id: 4,
    name: '公司4',
    children: [{
      id: 41,
      name: '研发部',

    }]
  }
]
onReady(() => {
  // newTreeData.value = listData
  // formatTreeData(newTreeData.value)
  // console.log(newTreeData.value)
})

</script>


<style scoped lang="scss">
.operation {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 20rpx 20rpx 30rpx 20rpx;

  .title {
    font-size: 28rpx;
    font-weight: 500;
    letter-spacing: 0.1em;
  }

  .tip {
    margin: 20rpx 0;
    font-size: 24rpx;
    color: #333333;
    letter-spacing: 0.1em;
  }

  .nav-btn {
    margin: 20rpx 0;
    border-radius: 15rpx;
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    background: #3c9cff;
    font-size: 26rpx;
  }

  .btnType1 {
    background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
  }

  .btnType2 {
    background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
  }

  .btnType3 {
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}
</style>