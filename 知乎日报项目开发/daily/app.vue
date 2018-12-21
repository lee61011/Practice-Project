<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item"
                 @click="handleToRecommend"
                :class="{ on: type === 'recommend' }">每日推荐</div>
            <div class="daily-menu-item"
                :class="{ on: type === 'daily'}"
                @click="showThemes = !showThemes">主题日报</div>
            <ul v-show="showThemes">
                <li v-for="item in themes">
                    <a :class="{ on: item.id === themeId && type === 'daily' }"
                        @click="handleToTheme(item.id)">{{ item.name }}</a>
                </li>    
            </ul>
        </div>
        <div class="daily-list">
            <!-- <Item></Item> -->
            <template v-if="type === 'recommend'">
                <div v-for="list in recommendList">
                    <div class="daily-date">{{ formatDay(list.date) }}</div>
                    <Item
                            v-for="item in list.stories"
                            :data="item"
                            :key="item.id"></Item>
                </div>
            </template>
            <template v-if="type === 'daily'">
                <Item
                        v-for="item in list"
                        :data="item"
                        :key="item.id"></Item>
                <template>
        </div>
        <!-- <daily-article></daily-article> -->
    </div>
</template>

<script>
    import $ from './libs/util';
    import axios from 'axios';
    import Item from './components/item.vue';
    export default {
        components: { Item },
        data () {
            return {
                themes: [],
                showThemes: false,
                type: 'recommend',
                list: [],
                themeId: 0,
                recommendList: [],
                dailyTime: $.getTodayTime(),
                isLoading: false
            }
        },
        methods: {
            getThemes () {
                console.log('准备发请求')

                $.ajax.get('themes').then(res => {
                    //  cosnole.log('themes axios 发起get请求');
                    console.log(res)
                    this.themes = res.others;
                })
            },
            handleToTheme (id) {
                //  改变菜单分类
                this.type = 'daily';
                //  设置当前点击子类的主题日报 id
                this.themeId = id;
                //  清空中间栏数据
                this.list = [];
                $.ajax.get('theme/' + id).then(res => {
                    //  过滤掉类型为 1 的文章, 该类型下面的文章为空
                    this.list = res.stories.filter(item => item.type !== 1);
                })
            },
            handleToRecommend () {
                this.type = 'recommend';
                this.recommendList = [];
                this.dailyTime = $.getTodayTime();
                this.getRecommendList();
            },
            getRecommendList () {
                this.isLoading = true;
                const prevDay = $.prevDay(this.dailyTime + 86400000);
                $.ajax.get('news/before/' + prevDay).then(res => {
                    this.recommendList.push(res);
                    this.isLoading = false;
                })
            },
            //	转换为带汉子的日月
            formatDay (date) {
                let month = date.substr(4, 2);
                let day = date.substr(6, 2);
                if (month.substr(0, 1) === '0') month = month.substr(1, 1);
                if (day.substr(0, 1) === '0') day = day.substr(1, 1);
                return `${month} 月 ${day} 日`;
            }
        },
        mounted () {
            //  初始化时调用
            this.getThemes();
            this.getRecommendList();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
