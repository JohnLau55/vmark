<template>
  <el-dialog title="标注属性" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="Pose" :label-width="formLabelWidth">
        <el-select v-model="form.pose" placeholder="请选择Pose">
          <el-option label="front" value="front"></el-option>
          <el-option label="back" value="back"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['visable'],
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '150px',
      form: {
        pose: null
      }
    }
  }
}
</script>

<style scoped>

</style>
