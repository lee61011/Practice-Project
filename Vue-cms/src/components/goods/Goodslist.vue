<template>
    <div class="goods-list">

        <!-- 
            <div class="goods-item" v-for="item in goodsList" :key="item.goodsId"> 
            由于这里加载更多是再次请求原来的数据, 商品的 ID 会重复, 所以不能使用 item.id 来绑定
        -->
        <!--    使用 router-link 方式进行跳转
        <router-link class="goods-item" v-for="(item, index) in goodsList" :key="index" :to="'/home/goodsinfo/' + item.goodsId" tag="div">
            <img :src="item.image" alt="">
            <h1 class="title">{{ item.name }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ {{ item.price }}</span>
                    <span class="old">¥ {{ item.mallPrice }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </router-link> -->


        <!-- 使用编程式导航进行路由跳转 -->
        <div class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="goDetail(item.goodsId)">
            <img :src="item.image" alt="">
            <h1 class="title">{{ item.name }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ {{ item.price }}</span>
                    <span class="old">¥ {{ item.mallPrice }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            pageIndex: 1,
            goodsList: [],
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList () {
            //  axios.get('url' + this.pageIndex)...    分页功能
            axios.get('https://www.easy-mock.com/mock/5c3eeb373093412ec11e4598/Vue-cms/getGoodsList').then( (res) => {
                this.goodsList = this.goodsList.concat(res.data)
            })
        },
        getMore () {
            this.pageIndex++,
            this.getGoodsList()
        },
        goDetail (id) {
            //  使用 js 的形式进行导航
            // 注意要区分 this.$route 和 this.$router 这两个对象，
            // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
            // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址


            //  1. 最简单的
            //  this.$router.push('/home/goodsinfo/' + id)
            //  2. 传递对象
            //  this.$router.push({path: '/home/goodsinfo/' + id})
            //  3. 传递命名的路由
            this.$router.push({name: "goodsinfo", params: { id: id }});
        }
    },
}
</script>

<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;

        img {
            width: 100%;
        }

        .title {
            font-size: 14px;
        }

        .info {
            background-color: #eee;
            padding: 5px;

            p {
                margin: 0;
            }

            .price {
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old {
                    font-size: 12px;
                    text-decoration: line-through;
                    margin-left: 10px;
                }
            }

            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>

