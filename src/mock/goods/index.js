import Mock from 'mockjs'

const { goodsList } = Mock.mock({
  'goodsList|10': [
    {
      id: '@increment',
      goodsName: '@ctitle(2,8)',
      // 属性 guid 是唯一机器码
      guid: '@guid',
      // 属性 image 是一个随机图片 参数分别为size, background, text
      image: "@image('200x100', '#4A7BF7', 'Hello')",
      // 属性 address 是一个随机地址
      address: '@county(true)',
      createTime: '@date(yyyy-MM-dd)',
      time: '@time("HH:mm:ss")',
      // 属性 url 是一个随机的url
      url: '@url',
      // 属性 email 是一个随机email
      email: '@email',
      // 属性 ip 是一个随机ip
      ip: '@ip'
    }
  ]
})

export default {
  getGoodsList: () => {
    return {
      code: 2000,
      data: {
        goodsList,
        total: 100,
        page: 1,
        pageSize: 10
      },
      token: 'xxxx3423423xxxxx'
    }
  },
  getGoodsListByPage: (page, pageSize) => {

  },
  getGoodsByID: (options) => {
    console.log(options.body)
    const { id } = JSON.parse(options.body)
    return {
      code: 2000,
      data: {
        goods: {
          id: id,
          goodsName: '巧乐兹' + id,
          guid: 'dfgevhsdc3453ascas3r3d3',
          address: '宜昌三峡大学科技学院',
          email: 'sdfsd@qq.com',
          createTime: '2021-4-28'
        }
      },
      token: 'xxxx3423423xxxxx'
    }
  }
}
