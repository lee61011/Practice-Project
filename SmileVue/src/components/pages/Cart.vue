<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cartInfo: [],         //  购物车内的商品
        isEmpty: false,       //  购物车是否为空，不为空则显示 true，为空显示 false
      }
    },
    created(){
      this.getCartInfo();
    },
    methods: {
      //  得到购物车的商品
      getCartInfo() {
        //  判断 localStorage 里是否有购物车数据
        if(localStorage.cartInfo){
          //  如果有数据，去除并赋值给 cartInfo
          this.cartInfo = JSON.parse(localStorage.cartInfo  )
        }
        //  打印到控制台查看效果
        console.log("this.cartInfo: " + JSON.stringify( this.cartInfo ));
        this.isEmpty = this.cartInfo.length > 0 ? true : false;
      }
    },
  }
</script>

<style scoped>

</style>
