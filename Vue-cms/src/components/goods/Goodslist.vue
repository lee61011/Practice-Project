<template>
    <div class="goods-list">

        <div class="goods-item">
            <img src="http://images.baixingliangfan.cn/compressedPic/20180415115202_8432.jpg" alt="">
            <h1 class="title">阿华田麦芽乳饮品牛奶味250mL/盒</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ 4.5</span>
                    <span class="old">¥ 6.0</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="http://images.baixingliangfan.cn/compressedPic/20180415115202_8432.jpg" alt="">
            <h1 class="title">阿华田麦芽乳饮品牛奶味250mL/盒阿华田麦芽乳饮品牛奶味250mL/盒</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ 4.5</span>
                    <span class="old">¥ 6.0</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://images.baixingliangfan.cn/compressedPic/20180415115202_8432.jpg" alt="">
            <h1 class="title">阿华田麦芽乳饮品牛奶味250mL/盒</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ 4.5</span>
                    <span class="old">¥ 6.0</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;

        img {
            width: 100%;
        }

        .title {
            font-size: 14px;
        }

        .info {
            background-color: #eee;
            padding: 5px;

            p {
                margin: 0;
            }

            .price {
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old {
                    font-size: 12px;
                    text-decoration: line-through;
                    margin-left: 10px;
                }
            }

            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>

