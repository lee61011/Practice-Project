<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item, index) in newsList" :key="index">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="https://img.souche.com/20161230/png/bc836261fbb654dda6b653e428014279.png">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <!-- <span>时间: {{ item.add_time | dateFormat("YYYY-MM-DD") }}</span> -->
                                <span>时间: {{ item.add_time | dateFormat }}</span>
                                <span>点击数量: {{ item.click }} 次</span>
                            </p>
						</div>
					</a>
				</li>
			</ul>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    data() {
        return {
            newsList: []
        }
    },
    created() {
        this.getNewsList();
    },
    methods: {
        getNewsList() {     //  获取新闻列表
            axios.get('https://www.easy-mock.com/mock/5c3eeb373093412ec11e4598/Vue-cms/getNewsList').then((res) => {
                this.newsList = res.data;
            })
        }
    },  
}
</script>

<style lang="scss" scoped>
.mui-table-view {

    h1 {
        font-size: 14px;
    }
    .mui-ellipsis {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
}
</style>
