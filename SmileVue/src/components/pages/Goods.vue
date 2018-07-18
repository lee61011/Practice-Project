<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  export default {
    data() {
      return {
        //  goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7'
        goodsId: '',
        goodsInfo: {},		//	商品详细数据
      }
    },
    created(){
      this.goodsId = this.$route.query.goodsId;
      console.log(this.goodsId);
      this.getInfo();
    },
    methods: {
      getInfo() {
        axios({
          url:url.getDetailGoodsInfo,
          method:'post',
          data:{
            goodsId:this.goodsId
          }
        })
        .then(response=>{

          if(response.data.code == 200 && response.data.message ){
            this.goodsInfo = response.data.message
          }else{
            Toast('服务器错误，数据取得失败')
          }
          console.log( this.goodsInfo )

        })
        .catch(error=>{
          console.log(error)
        })
      },
      onClickLeft(){
        this.$router.go(-1);
      },
    },
  }
</script>

<style scoped>

</style>
