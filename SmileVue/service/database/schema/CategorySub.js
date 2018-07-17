const mongoose = require('mongoose')	//	引入 Mongoose
const Schema = mongoose.Schema			//	声明 Schema

const categorySubSchema = new Schema({
  ID:{unique:true,type:String},
  MALL_CATEGORY_ID:{type:String},
  MALL_SUB_NAME:{type:String},
  COMMENTS:{type:String},
  SORT:{type:Number}
})

mongoose.model('CategorySub',categorySubSchema)
