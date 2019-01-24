<template>
    <div class="goodsinfo-content">

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div id="boll" v-show="bollFlag" ref="boll"></div>
        </transition>
        
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
                        <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsStock"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
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
            goodsinfo: {},
            bollFlag: false,     //  控制加入购物车小球的显示与隐藏, 默认隐藏状态
            selectedCount: 1,    //  保存用户选中的商品的数量, 默认为 1
            goodsStock: 60,      //  数据中没有库存信息, 这里手动设置一个值
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
        addToShopCar() {
            this.bollFlag = !this.bollFlag;

            //  首先拼接出一个要购买商品的信息 准备保存在 stact 中
            const goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.price,
                selected: true
            }

            //  调用 store 中的 mutations 来将商品加入到购物车
            this.$store.commit("addToCar", goodsinfo);
        },
        beforeEnter (el) {
            el.style.transform = 'translate(0, 0)';
        },
        enter (el, done) {
            el.offsetWidth;

            //  console.log( this.$refs.boll )

            //  获取小球在页面中的位置
            const bollPosition = this.$refs.boll.getBoundingClientRect();
            //  获取徽章在页面中的位置, 使用 DOM 操作的方法
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - bollPosition.left;
            const yDist = badgePosition.top - bollPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all .8s ease"
            done();
        },
        afterEnter (el) {
            this.bollFlag = !this.bollFlag;
        },
        getSelectedCount (count) {
            //  子组件向父组件传值
            this.selectedCount = count;
        }
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

    #boll {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;

        position: absolute;
        left: 146px;
        top: 390px;
        z-index: 999;
    }
}
</style>
