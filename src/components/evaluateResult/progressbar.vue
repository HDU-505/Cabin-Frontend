<template>
    <div class="mainDiv">
        <div class="titleDiv">
            <span >时间控制</span>
        </div>
        <!-- 进度条部分 -->
        <div class="progressDiv">
            <el-progress :percentage="percentage" :color="customColor"></el-progress>
        </div>
        <!-- 按键部分 -->
        <div class="btnDiv">
            <el-icon class="leftBtn"><DArrowLeft style="width: 24px; height: 24px;"/></el-icon>
            <el-icon class="pauseBtn"><VideoPause style="width: 24px; height: 24px;"/></el-icon>
            <el-icon class="playBtn"><VideoPlay style="width: 24px; height: 24px;"/></el-icon>
            <el-icon class="rightBtn"><DArrowRight style="width: 24px; height: 24px;"/></el-icon>
        </div>
    </div>
</template>

<script>
import 'element-plus/es/components/message/style/css'

export default {
    data() {
      return {
        percentage: 20,
        customColor: '#409eff',
      };
    },
    methods: {
    
    }
  }
</script>

<style scoped>
    .mainDiv{
        /* border: 1px solid red; */
        width: 100%;
        height: 20px;
        position: absolute;
        top: 20%;
    }

    .titleDiv{
        float: left;
        line-height: 20px;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 16px;
        margin-left: 5px;
    }

    .progressDiv{
        width: 50%;
        height: 20px;
        /* border: 1px solid blue; */
        float: left;
        margin-left: 5px;
        line-height: 20px;
    }

    .el-progress{
        height: 20px;
    }

    .btnDiv{
        width: 30%;
        height: 20px;
        /* border: 1px solid green; */
        float: left;
        position: relative;
    }

    .leftBtn{
        position: absolute;
        left: 0px;
        height: 20px;
        width: 20px;
    }
    .pauseBtn{
        position: absolute;
        left: 30px;
        width: 20px;
        height: 20px;
    }
    .playBtn{
        position: absolute;
        left: 30px;
        height: 20px;
        width: 20px;
    }

    
    .rightBtn{
        position: absolute;
        left: 60px;
        height: 20px;
        width: 20px;
    }
</style>