<template>
    <div>
        <cmtBox></cmtBox>
        <p>{{ id }}</p>
    </div>
</template>

<script>
import cmtBox from '../subcomponents/comment.vue';

export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components: {
        cmtBox,
    }
}
</script>

<style lang="scss" scoped>

</style>

