<template>

    <div class="common-layout">
        <el-container>
          
            <el-aside class="aside" width="20%" height="100%" style="background-color: #0D1E41">
                
                <AsideTitle />
                <AsideMenu class="menu" />
            </el-aside>
            <el-container direction="vertical">
                <StartHeader2 />
                <StartMainCard2 />
                <!-- <ExperimentMain class="main" /> -->
            </el-container>
                
      
        </el-container>

    </div>
</template>

<script>
import AsideMenu from '../../components/common/AsideMenu.vue'
import AsideTitle from '../../components/common/AsideTitle.vue'
import StartHeader from '../experimentStart/StartHeader.vue'
// import StartMainCard from '../experimentStart/StartMainCard.vue'
import StartHeader2 from '../experimentStart/StartHeader2.vue'
import StartMainCard2 from '../experimentStart/StartMainCard2.vue'

export default {
    components:{
        AsideMenu,AsideTitle,StartHeader,StartHeader2,StartMainCard2
    }
    
}
</script>

<style scoped>

.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置布局容器的高度为视口高度 */
}

.container {
  flex: 1; /* 设置容器在垂直方向上占据剩余空间 */
  display: flex;
}

.aside {
  width: 220px; /* 设置侧边栏的固定宽度 */
  /* margin: auto; */
  
}
.menu {
    margin-top: 20%;
}

.main {
  flex: 1; /* 设置主内容区域占据剩余空间 */
}

.header {
  flex: 0 0 auto; /* 设置头部区域的高度不随内容变化 */
}
/* .common-layout{
    margin-top: 0px;
} */
/* .el-container{
    height: 100%;
    padding: 0;
    margin: 0;
    width: 100%;
} */
</style>