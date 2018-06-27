<template>
  <div>
    <el-button class="mark-arrow" @click="navControl" type="info" :collapse="isCollapse">
      <i v-if="isCollapse" class="el-icon-d-arrow-right nav_button_right"></i>
      <i v-if="!isCollapse" class="el-icon-d-arrow-left nav_button_left"></i>
    </el-button>
    <el-menu :default-active="`1-${current.index + 1}`" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">文件列表</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">分组一</span> -->
          <el-menu-item @click="onChangeImage(index)" v-for="(item, index) in list" :key="index" :index="'1-' + (index + 1)">{{item.name}}</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['list'],
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {
    ...mapState('Mark', ['current'])
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    navControl () {
      this.isCollapse = !this.isCollapse
    },
    onChangeImage (index) {
      this.current.index = index
    }
  }
}
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .mark-arrow {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: #333;
    font-size: 16px;
    font-weight: 400px;
  }
</style>
