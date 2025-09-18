<template>
    <div>
        <el-header class="header" width="100%" height="75px" style="background-color:#F0F2F5">
            <el-row :gutter="20" style="vertical-align:middle;height:100%;">
                <!-- 图标 -->
                <el-col :span="10" style="margin-top: 20px; text-align:left;padding-right:2%">
                    <el-row>
                        <el-avatar style="background-color:#F0F2F5">
                            <el-icon>
                                <img src="@/assets/img/login_img/hdu_blue.png" />
                            </el-icon>
                        </el-avatar>

                        <span class="choice"><b>{{$t('homepage.start')}}</b></span>    
                    </el-row>
                </el-col>
            </el-row>
        </el-header>
    </div>
</template>


<script>
import 'element-plus/es/components/message/style/css'



export default {
    data() {
        return {
        }
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>


<style scoped>
.choice {
  color: #0D1E41;
  text-align: left;
  font-size: 20px;
  line-height: 40px;
  margin-left: 10px;
}
.el-tag {
  padding: 0 4px;
  margin-right: 5px;
}
.el-icon {
    margin-right: 0;
}
.header-button {
    margin-top:5%;
    color: #FFF4F4;
    background-color: #19376D;
}
</style>
