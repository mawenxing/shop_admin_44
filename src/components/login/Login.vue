<template>
  <!--
    el-form 表单组件
     - model : 表单数据对象
     - rules : 校验规则 (待会细说)
     - ref : 获取组件
     - label-width : 标题宽度
       - 如果给一个具体的值 : 在左边显示具体的宽度
       - 如果删除 在上面独占一行
    el-form-item 表单元素
      -  label : 标题
      -  prop : 校验、重置用的

   span='8'
   :span='8'

   -->
  <el-row
    type='flex'
    justify='center'
    align='middle'
  >
    <el-col :span='8'>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 登录部分 -->
        <el-form-item>
          <!--
        type : 决定颜色
          - primary 蓝色
          - success 绿色
          - danger  红色

       -->
          <el-button
            type='success'
            @click='startLogin'
          >登录</el-button>
          <el-button @click='resetForm'>重置</el-button>
        </el-form-item>
        <!-- <h1>我是login页的h1</h1> -->
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        // 用户名
        username: [
          // 1. 校验 用户名输入不输入内容
          // required: true : 必填 *
          // message : 提示的内容信息
          // trigger : blur  失去焦点会触发
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 2. 校验格式
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 开始登录
    startLogin () {
      // 校验
      // valid 布尔值
      this.$refs.loginForm.validate((valid) => {

        if (!valid) {
          // return console.log('校验失败');
          this.$message({
            message: '校验失败',
            type: 'error',
            duration: 800
          })
          return;
        }
        // console.log('校验成功, 开始去登录了')
        // axios.post(url,data,config)
        axios.post('login', this.loginForm).then(res => {
          console.log(res);

          if (res.data.meta.status === 200) {

            //0. 把 token 保存到本地
            // console.log(res.data.data.token);
            localStorage.setItem('token', res.data.data.token)


            // 1. 提示
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 800
            })
            // 2. 跳转到home页
            this.$router.push('/home')
          } else {
            this.$message({
              message: '登录失败',
              type: 'error',
              duration: 800
            })
          }

        })


      })
    },
    // 重置 把数据恢复到初始值
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
/* 行 */
.el-row {
  height: 100%;
  background: #2d434c;
}

/* 表单 */
.el-form {
  background: #fff;
  padding: 20px 30px;
  border-radius: 20px;
}

h1 {
  color: red;
}
</style>




