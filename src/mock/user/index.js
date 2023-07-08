import Mock from 'mockjs'
export default {
  getUserInfo: () => {
    console.log('1111111')
    return {
      code: 2000,
      data: {
        message: 'success'
      },
      token: 'xxxx3423423xxxxx'
    }
  },
  getUserList: () => {
    const { booksList } = Mock.mock({
      'booksList|10': [
        {
          id: '@increment',
          bookName: '@ctitle(3,6)',
          author: '@cname',
          'number|22-56': 1,
          price: 158,
          stock: 68,
          createTime: '@date(yyyy-MM-dd)',
          operation: ''
        }
      ]
    })
    return {
      code: 2000,
      data: {
        booksList,
        total: 100
      },
      token: 'xxxx3423423xxxxx'
    }
  }
}
