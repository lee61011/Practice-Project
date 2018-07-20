<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar   title="类别列表" />
    </div>

    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            左侧导航
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

      }
    },

    created(){
      this.getCategory();
    },

    methods: {
      getCategory() {
        axios({
          url:url.getCategoryList,
          method:'get',
        })
          .then(response=>{

          console.log(response)

        if(response.data.code == 200 && response.data.message ){

        }else{
          Toast('服务器错误，数据取得失败')
        }

      })
      .catch(error=>{
          console.log(error)
      })
      }
    },
  }
</script>

<style scoped>

</style>
