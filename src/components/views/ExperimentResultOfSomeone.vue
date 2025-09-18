<template>
     <div class="common-layout">
        <el-container>
          
            <el-aside class="aside" width="20%" height="100%" style="background-color: #0D1E41">
                
                <AsideTitle />
                <AsideMenu class="menu" />
            </el-aside>
            <el-container direction="vertical" style="width:80%">
                <ResultOfSomeoneHeader />
                <ResultMainCard class="main-card" />
            </el-container>
                
      
        </el-container>

    </div>
</template>

<script>
import AsideTitle from '../common/AsideTitle.vue'
import AsideMenu from '../common/AsideMenu.vue'
import ResultOfSomeoneHeader from '../experimentResultOfSomeone/ResultOfSomeoneHeader.vue'
import ResultMainCard from '../experimentResultOfSomeone/ResultMainCard.vue'
export default {
    components:{
        ResultOfSomeoneHeader,AsideMenu,AsideTitle,ResultMainCard
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
.main-card {
    display: flex;
    width: 90%;
    height: 100%;
    flex: 1
}

</style>