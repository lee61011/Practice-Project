<template>
    <div class="shopcar-container">
        
        <div class="goods-list">


            <div class="mui-card" v-for="(item, index) in goodsList" :key="index">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <mt-switch 
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
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
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计 (不含运费)</p>
                            <p>已勾选商品 <span class="red">0</span> 件， 总价 <span class="red">￥0</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
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
        },
        selectedChanged(id, val) {
            //  当点击选择开关， 将开关状态同步到 store 中
            console.log("触发了开关")
            //  this.$store.commit("updateGoodsSelected", {id, selected: val})
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

    .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .red {
            color: red;
            font-weight: bold;
            font-size: 16px;    
        }
    }
}

</style>
