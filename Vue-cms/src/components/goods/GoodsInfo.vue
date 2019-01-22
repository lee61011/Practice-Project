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
				<div class="mui-card-header">页眉</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
					</div>
				</div>
			</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">页眉</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
					</div>
				</div>
				<div class="mui-card-footer">页脚</div>
			</div>

    </div>
</template>

<script>
import axios from 'axios';
import swiper from '../subcomponents/swiper.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            lunbotu: [],
        }
    },
    created() {
        this.getLunboto()
    },
    methods: {
        getLunboto () {
            axios.get('https://www.easy-mock.com/mock/5c3eeb373093412ec11e4598/Vue-cms/getlunbo').then( (res) => {
                this.lunbotu = res.data.message;
            })
        }
    },
    components: {
        swiper
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-content {
    background-color: #eee;
    overflow: hidden;
}
</style>
