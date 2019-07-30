
<template>
  <!--
  el-table 表格组件
   - data : 表格数据 数组

  el-table-column 列
    - prop : 赋值
    - label 当前列的顶部标题
 -->
  <div>
    <el-table
      :data="usersData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size='2'
      :current-page='pagenum'
      @current-change='currentPageChanged'
    >
    </el-pagination>

  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  data () {
    return {
      // 表格数据
      usersData: [{
        username: '大飞哥',
        email: 'fei@.com',
        mobile: '1233211234567'
      }],
      // total
      total: 0,
      // 当前页
      pagenum: 1

    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // 加载用户列表数据
    getUsersData (pagenum = 1) {
      // axios.get(url,config)  config : { params : {} , headers }
      axios.get('http://localhost:8888/api/private/v1/users', {
        // 参数对象
        params: {
          query: '', // 给一个代表请求全部  a 包含a的,
          pagenum,  // 当前第一页
          pagesize: 2  // 2个
        },
        // 请求头对象
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res);
        // 保存列表数据
        this.usersData = res.data.data.users
        // 保存 total
        this.total = res.data.data.total
        // 保存当前页
        this.pagenum = res.data.data.pagenum
      })
    },
    // 点击分页
    currentPageChanged (curPage) {
      console.log(curPage);
      this.getUsersData(curPage)
    }
  },
}
</script>

<style>
</style>
