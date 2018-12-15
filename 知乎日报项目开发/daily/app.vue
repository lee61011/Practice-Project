<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item"
                :class="{ on: type === 'recommend' }">每日推荐</div>
            <div class="daily-menu-item"
                :class="{ on: type === 'daily'}"
                @click="showThemes = !showThemes">主题日报</div>
            <ul v-show="showThemes">
                <li v-for="item in themes">
                    <a :class="{ on: item.id === themeId && type === 'daily' }">{{ item.name }}</a>
                </li>    
            </ul>
        </div>
        <div class="daily-list">
            <!-- <Item></Item> -->
        </div>
        <!-- <daily-article></daily-article> -->
    </div>
</template>

<script>
    export default {
        data () {
            return {
                themes: [],
                showThemes: false,
                type: 'recommend',
                themeId: 0
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
