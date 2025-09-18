<template>
    <div>
        <el-header class="header" width="100%" height="75px" style="background-color:#F0F2F5">
            <el-row style="vertical-align:middle">
                <el-col :span="17" style="margin-top: 20px"><b style="font-size: 20px;">{{$t("homepage.configuration")}}</b></el-col>
                <el-col :span="7" style="margin-top: 20px; text-align:right;padding-right:2%">
                    <el-row>
                        <el-col :span="14">
                            <el-avatar style="background-color:#F0F2F5">
                                <el-icon>
                                    <img src="@/assets/img/login_img/hdu_blue.png" />
                                </el-icon>
                            </el-avatar>
                        </el-col>
                        <el-col :span="1"></el-col>
                        <el-col :span="6" style="margin-top:2%">
                            <span class="choice" ><b>Client_HDU</b></span>
                        </el-col>
                    </el-row>
                   
                </el-col>
                <!-- <el-col :span="12" style="margin-top: 20px; text-align:right;padding-right:2%">
                    
                    <el-button circle style="margin-right: 1%">
                        <el-icon class="icon"><User /></el-icon>
                    </el-button>
                
                    <span class="choice"><b>Client_HDU</b></span>
                    
                </el-col> -->
            </el-row>
        </el-header>
    </div>
</template>

<script>
import 'element-plus/es/components/message/style/css'
import { User } from '@element-plus/icons-vue'
import { ElHeader,ElRow,ElCol,ElTag,ElButton } from 'element-plus'
export default {
    components:{
        ElHeader,ElRow,ElCol,User,ElTag,ElButton
    }
}
</script>

<style scoped>
.choice {
  color: #0D1E41;
  text-align: center;
  font-size: 20px;

}
.el-tag {
  padding: 0 4px;
  margin-right: 5px;

}
.el-icon {
    margin-right: 0;
  }
</style>