<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>

        <textarea placeholder="请输入内容(最多 120 字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in commons" :key="index">
                <div class="cmt-title">
                    第{{index + 1}}楼&nbsp;&nbsp;用户: {{item.user}}&nbsp;&nbsp;发表时间: 2012-12-12 12:12:12
                </div>
                <div class="cmt-body">
                    {{ item.body }} --- 第 {{ pageIndex }} 页的数据
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            pageIndex: 1,        //  默认展示第一页数据
            commons: []
        }
    },
    created() {
        this.getCommon()
    },
    methods: {
        getCommon() {
            axios.get('https://www.easy-mock.com/mock/5c3eeb373093412ec11e4598/Vue-cms/gitCommon').then( (res) => {
                //  this.commons = res.data
                //  点击加载更多按钮 老数据拼接上获取到的新数据
                this.commons = this.commons.concat( res.data )
            })
        },
        getMore() {
            this.pageIndex++;
            this.getCommon();
        }
    },
    props: ['id']
}
</script>


<style lang="scss" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0
    }

    .cmt-list {
        margin: 8px;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                background-color: #ccc;
                line-height: 35px;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em
            }
        }
    }
}
</style>
