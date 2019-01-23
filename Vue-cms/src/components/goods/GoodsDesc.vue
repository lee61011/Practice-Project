<template>
    <div>
        <h3>商品图文介绍页面</h3>
        <p>{{ id }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
}
</script>

<style lang="scss" scoped>

</style>

