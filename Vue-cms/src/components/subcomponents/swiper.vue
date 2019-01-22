<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中使用 v-for 一定要绑定一个 key -->
            <mt-swipe-item v-for="(item, index) in lunboList" :key="index">
                <img :src="item.imgPath" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: [ "lunboList" ]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: yellow;
    }
    &:nth-child(3) {
      background-color: blue;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
