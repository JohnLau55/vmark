<template>
  <header class="header">
    <el-menu class="el-menu-mark" mode="horizontal" @select="handleSelect" >
      <!-- <el-menu-item index="11">标注中心</el-menu-item> -->
      <el-submenu index="22">
        <template slot="title">配置</template>
        <el-submenu index="22-1">
          <template slot="title">标注属性</template>
          <el-menu-item index="22-1-1"><span>name, </span><span>pose</span><span style="color: #bbb"> [默认]</span></el-menu-item>
          <el-menu-item index="22-1-3">添加自定义</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="22-2">选项2</el-menu-item>
        <el-menu-item index="22-3">选项3</el-menu-item>
        <el-submenu index="22-4">
          <template slot="title">选项4</template>
          <el-menu-item index="22-4-1">选项1</el-menu-item>
          <el-menu-item index="22-4-2">选项2</el-menu-item>
          <el-menu-item index="22-4-3">选项3</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <!-- <el-menu-item index="33" disabled>消息中心</el-menu-item> -->
      <el-submenu index="44">
        <template slot="title">文件管理</template>
        <el-menu-item index="44-1">导入</el-menu-item>
        <el-menu-item index="44-2">导出</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
