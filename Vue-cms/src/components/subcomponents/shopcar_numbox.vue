<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
    mounted() {
      // 初始化数字选择框组件
      mui(".mui-numbox").numbox();
      //  console.log(this.max);
    },
    methods: {
      countChanged() {
        // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
        // console.log(this.$refs.numbox.value);
        //console.log(this.$refs.numbox.value)
        this.$emit("getcount", parseInt(this.$refs.numbox.value));
      }
    },
}
</script>

<style lang="scss" scoped>

</style>
