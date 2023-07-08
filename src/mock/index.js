// 导入mockjs
import Mock from 'mockjs'
import userApi from './user/index.js'
import goodsApi from './goods/index.js'

// 设置延时200-2000延时
Mock.setup({
  timeout: '200-2000'
})

// 查询所有用户信
// 拦截的是/api/user_list
Mock.mock(/\/api\/user_list/, 'get', userApi.getUserList)

// 查询商品信息
// 拦截的是/api/good_list
Mock.mock(/\/api\/good_list/, 'post', goodsApi.getGoodsList)
Mock.mock(/\/api\/good_listbyPage/, 'get', goodsApi.getGoodsListByPage)
Mock.mock(/\/api\/goodbyID/, 'post', goodsApi.getGoodsByID)
