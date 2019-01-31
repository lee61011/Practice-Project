<template>
    <div class="shopcar-container">
        
        <div class="goods-list">


            <div class="mui-card" v-for="(item, index) in goodsList" :key="index">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <mt-switch></mt-switch>
                        <img src="http://plgg6kn0l.bkt.clouddn.com/vue-cms/getLunbo/lunbo1.jpg" alt="">
                        <div class="info">
                            <h1>{{ item.id }}</h1>
                            <p>
                                <span class="price">¥ {{ item.price }}</span>
                                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id, index)">删除</a>
                            </p>
                        </div>

					</div>
				</div>
			</div>


        </div>

        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
			</div>

    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'

export default {
    data(){
        return {
            goodsList: [],
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            //  加载页面之后请求接口获取购物车商品类表, 这是使用 本地 localstorage 数据来模拟
            this.goodsList = JSON.parse(localStorage.getItem('car') || '[]');
        },
        remove(id, index) {
            //  删除商品信息
            this.goodsList.splice(index, 1);
            this.$store.commit('removeFromCar', id)
        }
    },
    components: {
        numbox
    }
}
</script>

<style lang="scss" scoped>

.shopcar-container {
    background-color: #eee;
    overflow: hidden;

    .goods-list {
        .mui-card-content-inner {
            display: flex;
            align-items: center;

            img {
                width: 60px;
                height: 60px;
                margin: 0 5px;
            }

            h1 {
                font-size: 13px;
                line-height: 26px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .price {
                color: red;
                font-weight: bold;
            }
        }

    }
}

</style>
