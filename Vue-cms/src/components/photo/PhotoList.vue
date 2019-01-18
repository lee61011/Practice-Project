<template>
    <div>
        
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
//  可以使用 "transform-remove-strict-mode" 这个插件来解决 webpack 打包中使用严格模式的问题

export default {
    data() {
        return {
            cates: [{"title": "滑动条0", "id": 0},
            {"title": "滑动条1", "id": 1},
            {"title": "滑动条2", "id": 2},
            {"title": "滑动条3", "id": 3},
            {"title": "滑动条4", "id": 4},
            {"title": "滑动条5", "id": 5},
            {"title": "滑动条6", "id": 6},]
        }
    },
    mounted() {
        // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
        // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
        // 2. 初始化滑动控件
        mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
}
</script>

<style lang="scss" scoped>
/* 添加这个样式的作用是消除滑动滑动条的时候 Chrome 浏览器的警告  */
* {
  touch-action: pan-y;
}
</style>
