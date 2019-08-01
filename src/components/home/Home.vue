<template>
  <!-- 容器 -->
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span='8'>
          <img
            src="../../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span='8'>
          <h1>后台管理系统</h1>
        </el-col>
        <el-col
          :span='8'
          class="col3"
        >
          恭喜黑马前端44期年薪200万 <a
            @click.prevent='logout'
            href="#"
          >退出</a>
        </el-col>

      </el-row>
    </el-header>
    <!-- 容器 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <!--
          el-menu : 菜单组件
           -  default-active="2" 默认高亮  值:index
           - @open="handleOpen"   处理打开
           - @close="handleClose" 处理关闭
           - background-color="#545c64"  背景色
           - text-color="#fff"  字体默认颜色
           - active-text-color="#ffd04b"  高亮颜色

          el-submenu  子菜单 (可以展开)

          el-menu-item 菜单元素 (最小单位)

        开启路由模式
        1. 给 el-menu 添加 router属性 :router='true'
        2. 激活时, 会 以index 值作为路径进行跳转

         -->
        <el-menu
          :router='true'
          :default-active="handleUrlPath()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <!-- 自定义标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 选项 -->
            <el-menu-item index='/users'>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 自定义标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- 选项 -->
            <el-menu-item index='/roles'>角色列表</el-menu-item>
            <el-menu-item index='/rights'>权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <!-- 留一个出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  methods: {
    // 退出登录
    async logout () {
      /**
       * 使用 async 和 await 处理 $confirm 不能 和之前那样处理了
       * 之前 点击确定 => 打印 confirm ,点击取消 => 打印 cancel
       * 现在 :
       *   点击确定 =>  没有异常  点击取消 => 有异常
       * try{
       *   // 点击确定
       * }catch(err) {
       *  // 点击取消
       * }
       */

      try {
        await this.$confirm('此操作将退出账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log('点击了确定')

        // 1. 退出删除本地的token
        localStorage.removeItem('token')

        // 2. 提示 退出成功
        this.$message({
          message: '退出成功',
          type: 'success',
          duration: 800
        })

        // 3. 回到login页
        this.$router.push('/login')
      } catch (error) {
        console.log('点击了取消')
        this.$message({
          message: '取消退出',
          type: 'info',
          duration: 800
        })
      }

      // this.$confirm('此操作将退出账户, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   // console.log('点击了确定 走then');

      // // 0. 退出删除本地的token
      // localStorage.removeItem('token')

      // // 1. 提示 退出成功
      // this.$message({
      //   message: '退出成功',
      //   type: 'success',
      //   duration: 800
      // })

      // // 2. 回到login页
      // this.$router.push('/login')
      // }).catch(() => {
      // this.$message({
      //   message: '取消退出',
      //   type: 'info',
      //   duration: 800
      // })
      // })
    },
    // 处理路径
    handleUrlPath () {
      // 待做 :
      return this.$route.path
    }
  }
}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
}

.el-header {
  background: #b3c1cd;
  padding: 0;
  h1 {
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 60px;
  }
  .col3 {
    line-height: 60px;
    text-align: right;
    padding-right: 30px;
    a {
      color: #daa520;
    }
  }
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>
