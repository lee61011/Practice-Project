<template>
    <div class="newsinfo-container">
        <h3 class="title"> {{ newsInfo.title }} </h3>
        <p class="subtitle">
            <span>发表时间: {{ newsInfo.add_time }} </span>
            <span>点击: {{ newsInfo.click }} 次</span>
        </p>

        <hr>

        <!--  文章内容   -->
        <div class="content" v-html="newsInfo.msg"></div>

        <!-- 评论子组件区域 -->
        <common-box :id="this.id"></common-box>
    </div>
</template>


<script>
import axios from 'axios'
//  导入评论子组件
import Common from '../subcomponents/comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,      //  通过 $route.params.id 来获取 URL 地址中传递过来的 ID 值
            newsInfo: {}
        }
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo() {
            axios.get('https://www.easy-mock.com/mock/5c3eeb373093412ec11e4598/Vue-cms/getNewsInfo').then((res) => {
                this.newsInfo = res.data;  
                console.log(res.data)
            })
        }
    },
    components: {
        "common-box": Common
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
    padding: 0 5px;

    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {}
}
</style>
