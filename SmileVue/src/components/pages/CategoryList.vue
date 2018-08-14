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
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

              </van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
              >
                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                  <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {toMoney} from '@/filter/moneyFilter.js'

  export default {
    data(){
      return {
        category: [],
        categoryIndex:0,
        categorySub:[],  //小类类别
        active:0,       //激活标签的值
        list: [],
        loading: false, //  上拉加载的使用
        finished: false,//  下拉加载是否没有数据了
        isRefresh: false, //  下拉加载
        page: 1,			//	商品列表的页数
        goodList: [],		//	商品信息
        categorySubId: '',	//	商品字分类ID
        errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"',   //  错误图片显示路径
      }
    },

    filters:{
      moneyFilter(money){
        return toMoney(money);
      }
    },

    created(){
      this.getCategory();
    },

    mounted(){
      let winHeight = document.documentElement.clientHeight;
      document.getElementById("leftNav").style.height = winHeight - 46 - 50 + "px";
      document.getElementById("list-div").style.height = winHeight - 90 - 50 + "px";
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
            this.getCategorySubByCategoryId( this.category[0].ID );
          } else {
            Toast('服务器错误，数据取得失败')
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //点击大类的方法
      clickCategory(index,categoryId){
        this.categoryIndex=index;
        this.page = 1;
        this.finished = false;
        this.goodList = [];
        this.getCategorySubByCategoryId( categoryId );
      },

      //根据大类ID读取小类类别列表
      getCategorySubByCategoryId(categoryId){
        axios({
          url:url.getCategorySubList,
          method:'post',
          data:{categoryId:categoryId}
        })
        .then(response=>{
          if(response.data.code == 200 && response.data.message ){
            this.categorySub=response.data.message
            this.active = 0
          }else{
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error=>{
          console.log(error)
        })
      },

      //  上拉加载
      onLoad(){
          setTimeout(()=>{
            for(let i = 0; i < 10; i++) {
            this.list.push(this.list.length+1);
          }
          this.loading = false;
          if ( this.list.length >= 40 ) {
            this.finished = true;
          }
        },500);
        },

      //下拉刷新方法
      onRefresh(){
        setTimeout(() => {
          this.isRefresh = false;
          this.finished = false;
          this.goodList = []
          this.page = 1
          this.onLoad()
        },500)
      },

      getGoodList(){
        axios({
          url: url.getGoodListByCategorySubID,
          method: 'post',
          data: {
            categorySubId: this.categorySubId,
            page: this.page
          }
        }).then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message)
          } else {
            this.finished = true;
          }
          this.loading = false;
          console.log(this.finished);
        }).catch(error => {
            console.log(error);
        })
      },

      //	点击子类获取商品信息
      onClickCategorySub(index,title){
        this.categorySubId = this.categorySub[index].ID;
        console.log(this.categorySubId);

        this.goodList = [];
        this.finished = false;
        this.page = 1;
        this.onLoad();
      },

      goGoodsInfo (id) {
        this.$router.push({name: 'Goods', params: {goodsId: id}})
      },

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

  .list-item{
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
  }
  #list-div{
    overflow: scroll;
  }

  .list-item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
  }
  #list-div{
    overflow: scroll;
  }
  .list-item-img{
    flex:8;
  }
  .list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
  }
</style>
