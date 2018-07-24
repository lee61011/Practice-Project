const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"

const URL = {
  getShoppingMallInfo:BASEURL+'index',
  getGoodsInfo:BASEURL+'getGoodsInfo',
  registerUser:LOCALURL+'user/register',                    //用户注册接口
  login:LOCALURL+'user/login',                              //用户注册接口
  getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',   //得到商品详细数据
  getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
  getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
  getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
}

module.exports = URL
