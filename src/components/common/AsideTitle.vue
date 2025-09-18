<template>
    <!-- 包含Logo的容器 -->
    <div class="logo-container">
      <!-- 行，包含Logo图片 -->
      <el-row style="align-items: left; margin-top: -10%; justify-content: left;">
        <el-col :span="6">
          <!-- Logo图片 -->
          <img class="logo-image" src="@/assets/img/login_img/log1.png" />
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { ElCol, ElRow } from 'element-plus'

export default {
  components: {
    ElCol, ElRow
  }
}
</script>

<style scoped>
/* Logo图片的样式 */
.logo-image {
  width: 200px;
  margin-left: 7px;
  margin-top: 10px;
}

/* 包含Logo的容器样式 */
.logo-container {
  margin-top: 20px;
}
</style>
