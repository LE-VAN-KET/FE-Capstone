export default {
  get_menu_data: () => {
    return [
      {
        path: '/home',
        name: 'home',
        label: 'Trang chủ',
        icon: 's-platform'
      },
      {
        path: '/catalog',
        name: 'catalog',
        label: 'Danh mục tốt nghiệp',
        icon: 'setting'
      },
      {
        path: '/phoi',
        name: 'phoi',
        label: 'Dữ liệu phôi bằng',
        icon: 'user'
      },
      {
        path: '/diplomas',
        name: 'diplomas',
        label: 'Dữ liệu văn bằng',
        icon: 'help',
        children: [
          {
            path: '/student-graduation',
            name: 'student-graduation',
            label: 'Văn bằng',
            icon: 's-grid'
          },
          {
            path: '/statistics',
            name: 'statistics',
            label: 'Thống kê',
            icon: 's-marketing'
          }
        ]
      },
      {
        path: '/users',
        name: 'users',
        label: 'Quản lý người dùng',
        icon: 'help',
        children: [
          {
            path: '/users',
            name: 'users',
            label: 'Tài khoản người dùng',
            icon: 's-grid'
          }
        ]
      }
    ]
  }
}
