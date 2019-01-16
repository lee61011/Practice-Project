<template>
  <div>
    <!-- 轮播图 -->
    <!-- {{ this.lunboList }} -->
    <mt-swipe :auto="4000">
      <!-- 在组件中使用 v-for 一定要绑定一个 key -->
      <mt-swipe-item v-for="(item, index) in lunboList" :key="index">
        <img :src="item.imgPath" alt="">
      </mt-swipe-item>
      <!-- <mt-swipe-item>
          <img src="../../images/lunbo1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>222</mt-swipe-item>
      <mt-swipe-item>333</mt-swipe-item>-->
    </mt-swipe>

    
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunboList: [] //  保存获取到的轮播图
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      axios.get("https://www.easy-mock.com/mock/5c3eeb373093412ec11e4598/Vue-cms/getlunbo")
      .then(response => {
          if (response.status == 200) {
            this.lunboList = response.data.message;
          } else {
            Toast("图片加载失败...");
          }
        });
    }
  }
};
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

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;

  img {
    width: 60px;
    height: 60px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
