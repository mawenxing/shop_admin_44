
<template>
  <div>
    <el-breadcrumb
      class="bread"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="rightsData"
      style="width: 100%"
    >
      <el-table-column
        type='index'
        :index='indexMethod'
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope='scope'>
          <span v-if='scope.row.level==0'>一级</span>
          <span v-else-if='scope.row.level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      rightsData: [{
        authName: '商品管理',
        path: 'goods',
        level: '一级'
      }]
    }
  },
  created () {
    this.loadRightsData()
  },
  methods: {
    // 加载权限列表数据
    async loadRightsData () {
      let res = await this.$axios.get('rights/list')
      console.log(res);
      this.rightsData = res.data.data

    },
    // 自定义索引
    // 参数 index : 当前行号(从0开始的) 0 1 2 3 4 5 6....
    indexMethod (index) {
      // console.log(index);
      // 通过return 把当前行号返回给列的索引
      return index
    }
  },
}
</script>
<style scoped>
.bread {
  height: 40px;
  background: #d4dae0;
  line-height: 40px;
  padding-left: 20px;
}
</style>
