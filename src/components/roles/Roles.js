export default {
  data () {
    return {
      // 角色列表数据
      rolesData: [
        {
          roleName: '王小虎',
          roleDesc: '上海市普陀区'
        }
      ],
      // 是否显示分配权限对话框
      dialogAssignRightsVisible: false,
      // 树的数据
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      // 配置
      // chilren : 结构
      // label : 标题
      defaultProps: {
        // 以 数据的 children/child 负责显示结构
        children: 'children',
        // 以数据的 字段 label  负责显示标题
        label: 'authName'
      },
      // 角色id
      roleId: 0
    }
  },
  created () {
    this.loadRolesData()
    this.loadRightsData()
  },
  methods: {
    // 加载角色列表数据
    async loadRolesData () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesData = res.data.data
    },
    // 处理 索引
    indexMethod (index) {
      return index
    },
    // 加载权限数据
    async loadRightsData () {
      let res = await this.$axios.get('rights/tree')
      console.log(res)
      this.treeData = res.data.data
    },
    // 显示分配权限对话框
    showAssignRightsDialog (row) {
      // console.log(row)

      // 从row 里面读取id ,赋值 给 roleId
      this.roleId = row.id

      this.dialogAssignRightsVisible = true
      // 处理row
      // id=105 添加商品
      // setTimeout(() => {
      //   console.log(this.$refs)
      // }, 5000)

      // 获取第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id)
            keys.push(item3.id)
          })
        })
      })

      // DOM更新完毕后,自动调用回调
      this.$nextTick(() => {
        console.log(this.$refs.tree)
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 分配权限
    async assignRights () {
      // 1. 获取半选 和 全选的 key(id)
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()

      let keys = [...keys1, ...keys2]

      // [1,4,7] => '1,4,7'

      // post(url,data,config)
      // 参数1 :角色id this.roleId
      // 参数2 : rids :所有权限的id
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        // 1. 关闭对话框
        this.dialogAssignRightsVisible = false
        // 2. 提示
        this.$message({
          message: '角色授权成功',
          type: 'success',
          duration: 800
        })
        // 3. 刷新一下
        this.loadRolesData()
      }
    }
  }
}
