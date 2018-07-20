<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar   title="类别列表" />
    </div>

    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li @click="clickCategory(index)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in category" :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>

        <van-col span="18">
          右侧列表
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'

  export default {
    data(){
      return {
        category: [],
        categoryIndex:0,
      }
    },

    created(){
      this.getCategory();
    },

    mounted(){
      let winHeight = document.documentElement.clientHeight;
      document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    },

    methods: {
      getCategory() {
        axios({
          url: url.getCategoryList,
          method: 'get',
        }).then(response => {
          console.log(response)
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
          } else {
            Toast('服务器错误，数据取得失败')
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //点击大类的方法
      clickCategory(index){
        this.categoryIndex=index
      }
    },
  }
</script>

<style scoped>
  #leftNav{
    background-color: aliceblue;
  }
  #leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
  }
  .categoryActive{
    background-color: #fff;
  }
</style>
