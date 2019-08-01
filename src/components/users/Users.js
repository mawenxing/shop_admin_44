// import axios from 'axios'
/* eslint-disable */
export default {
  name: 'users',
  data() {
    return {
      // 表格数据
      usersData: [
        {
          username: '大飞哥',
          email: 'fei@.com',
          mobile: '1233211234567'
        }
      ],
      // total
      total: 0,
      // 当前页
      pagenum: 1,
      // 输入框绑定的内容
      input3: '',
      // 是否显示添加用户对话框
      dialogAddUserVisible: false,
      // 添加用户表单对象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      rules: {
        // 用户名
        username: [
          // 判断填不填
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式
          { min: 3, max: 5, message: '长度应该在3-5之间', trigger: 'blur' }
        ],
        // 密码
        password: [
          // 判断填不填
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 判断格式
          { min: 5, max: 10, message: '长度应该在5-10之间', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          // 判断格式
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        // 手机
        mobile: [
          // 判断格式
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 开关
      value1: true
    }
  },
  created() {
    // 刷新页面 , 默认请求全部数据的第一页
    this.getUsersData()
  },
  methods: {
    // 加载用户列表数据
    async getUsersData(pagenum = 1, query = '') {
      // axios.get(url,config)  config : { params : {} , headers }

      let config = {
        params: {
          query, // 给一个代表请求全部  a 包含a的,
          pagenum, // 当前第一页
          pagesize: 2 // 2个
        }
      }

      let res = await this.$axios.get('users', config)
      console.log(res)
      // 保存列表数据
      this.usersData = res.data.data.users
      // 保存 total
      this.total = res.data.data.total
      // 保存当前页
      this.pagenum = res.data.data.pagenum

      // this.$axios
      //   .get('users', {
      //     // 参数对象
      //     params: {
      //       query, // 给一个代表请求全部  a 包含a的,
      //       pagenum, // 当前第一页
      //       pagesize: 2 // 2个
      //     }
      //     // 请求头对象
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     console.log(res)
      // // 保存列表数据
      // this.usersData = res.data.data.users
      // // 保存 total
      // this.total = res.data.data.total
      // // 保存当前页
      // this.pagenum = res.data.data.pagenum
      //   })
    },
    // 点击分页
    currentPageChanged(curPage) {
      console.log(curPage)
      // 注意 : 以前input没有内容, 只需要传当前页即可
      // 以后需要添加第二个参数
      this.getUsersData(curPage, this.input3)
    },
    // 搜索
    search() {
      // console.log(this.input3); // t

      // 请求  内容 t 的 第一页内容
      this.getUsersData(1, this.input3)
    },
    // 显示添加用户对话框
    showAddUserDialog() {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    async addUser() {
      // axios.post(url,data,config)
      let res = await this.$axios.post('users', this.addUserForm)
      if (res.data.meta.status === 201) {
        // 1. 关闭对话框
        this.dialogAddUserVisible = false
        // 2. 提示
        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 800
        })
        // 3. 刷新一下
        this.getUsersData(1)
      }

      // this.$axios
      //   .post('users', this.addUserForm, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      // if (res.data.meta.status === 201) {
      //   // 1. 关闭对话框
      //   this.dialogAddUserVisible = false
      //   // 2. 提示
      //   this.$message({
      //     message: '添加用户成功',
      //     type: 'success',
      //     duration: 800
      //   })
      //   // 3. 刷新一下
      //   this.getUsersData(1)
      // }
      //   })
    },
    // 监听对话框关闭
    dialogClosed() {
      // console.log('关闭了')
      this.$refs.addUserRef.resetFields()
    },
    // 删除用户
    async delUser(id) {
      let res = await this.$axios.delete(`users/${id}`)
      if (res.data.meta.status === 200) {
        // 1. 提示
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 800
        })

        // 2. 刷新
        this.getUsersData()
      }

      // console.log(id)

      // // axios.delete(url,config)
      // this.$axios
      //   .delete(`users/${id}`, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      // if (res.data.meta.status === 200) {
      //   // 1. 提示
      //   this.$message({
      //     message: '删除成功',
      //     type: 'success',
      //     duration: 800
      //   })

      //   // 2. 刷新
      //   this.getUsersData()
      // }
      // })
    },
    // 改变状态
    async stateChange(row) {
      // 使用es6 的解构
      const { id, mg_state } = row

      let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
      if (res.data.meta.status === 200) {
        // 1. 提示
        this.$message({
          message: '更新状态成功',
          type: 'success',
          duration: 800
        })
      }

      // console.log('改变了')
      // axios.put(url,data,config)
      // this.$axios
      //   .put(`users/${id}/state/${mg_state}`, null, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     // console.log(res)
      // if (res.data.meta.status === 200) {
      //   // 1. 提示
      //   this.$message({
      //     message: '更新状态成功',
      //     type: 'success',
      //     duration: 800
      //   })
      // }
      //   })
    }
  }
}
