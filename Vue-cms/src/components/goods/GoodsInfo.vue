<template>
    <div class="goodsinfo-content">
        
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunboList="lunbotu"></swiper>
					</div>
				</div>
			</div>	

        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.name }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">市场价：<del>￥ {{ goodsinfo.mallPrice }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥ {{ goodsinfo.price }}</span></p>
                        <p>购买数量：<numbox></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small">加入购物车</mt-button>
                            
                        </p>
					</div>
				</div>
			</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号: {{ goodsinfo.goodsId }}</p>
                        <p>库存情况: {{ 233 }}</p>
                        <p>上架时间: 2018-12-21 </p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goCommon(id)">商品评论</mt-button>
                </div>
			</div>

    </div>
</template>

<script>
import axios from 'axios';
import swiper from '../subcomponents/swiper.vue';
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            lunbotu: [],
            goodsinfo: {}
        }
    },
    created() {
        this.getLunboto(),
        this.getGoodsInfo()
    },
    methods: {
        getLunboto () {
            axios.get('https://www.easy-mock.com/mock/5c3eeb373093412ec11e4598/Vue-cms/getlunbo').then( res => {
                this.lunbotu = res.data.message;
            })
        },
        getGoodsInfo () {       //  获取商品信息
            //  axios.get('url' + id).then( res => {})
            axios.get('https://www.easy-mock.com/mock/5c3eeb373093412ec11e4598/Vue-cms/getGoodsList').then( res => {
                this.goodsinfo = res.data[0]
            })
        },
        goDesc (id) {
            this.$router.push({ name: "goodsdesc", params: { id } })
        },
        goCommon (id) {
            this.$router.push({ name: "goodscommon", params: { id } })
        },
    },
    components: {
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-content {
    background-color: #eee;
    overflow: hidden;

    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer {
        display: block;
        
        button {
            margin: 15px 0;
        }
    }
}
</style>
