<template>
    <div>
        <el-header class="header" width="100%" height="75px" style="background-color:#F0F2F5">
            <el-row style="vertical-align:middle;">
                <el-col :span="4" style="margin-top: 20px"><b style="font-size: 20px;">{{$t("homepage.detailResult")}}</b></el-col>
                <el-col :span="4" style="margin:auto;margin-top:1%">
                    <el-button @click="clickRouterPush" class="header-button" plain >
                        上一页
                    </el-button>
                </el-col>
                <el-col :span="4" style="margin:auto;margin-top:1%">
                    <el-button class="header-button" plain>
                        导出
                    </el-button>
                </el-col>
                <el-col :span="12" style="margin-top: 20px; text-align:right;padding-right:2%">
                    <!-- <el-tag round size="large">
                        <el-icon style="color:#0D1E41;margin-right:1%"><User /></el-icon>
                    </el-tag> -->
                    <el-button circle style="margin-right: 1%">
                        <el-icon class="icon"><User /></el-icon>
                    </el-button>
                    <!-- &nbsp; -->
                    <span class="choice"><b>Client_HDU</b></span>
                    
                </el-col>
            </el-row>
        </el-header>
    </div>
</template>

<script>
import 'element-plus/es/components/message/style/css'
import { User } from '@element-plus/icons-vue'
import { ElHeader,ElRow,ElCol,ElTag,ElButton } from 'element-plus'
import { postD,getD } from '../../api'
import emitter from '../../public'

export default {
    data(){
        return{
            url_reportMsg:"/experiment/experimentInfo",
            url_pageNumber: "/experiment/limitNumber",
            msg_limit:{
                limit:1
            },
        }
    },
    components:{
        ElHeader,ElRow,ElCol,User,ElTag,ElButton
    },
    methods: {
        clickRouterPush(){
            postD(this.url_reportMsg,this.msg_limit) 
                        .then(response => {
                            // for(this.msg_index=0;this.msg_index<response.msg.length;this.msg_index++){
                            //     console.log(response.msg[this.msg_index]);
                            // }
                            
                            this.page_msg = response.msg
                            console.log(this.page_msg)
                            emitter.emit('experimentInfos', this.page_msg)
                            // console.log(this.page_msg)                   
                        })
                        .catch(error => {
                            console.log(error);
                        });
                        getD(this.url_pageNumber)
                        .then(res => {
                        //   console.log("666"+res.data)
                          if(res.data.success){
                        //   console.log("888"+res)
                            emitter.emit('limitNumber', res.data.number)
                          }
                        })
                        .catch(err => {
                          console.log(err)
                        });
            this.$router.push('/result');
      },
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
.header-button {
    margin-top:5%;
    color: #FFF4F4;
    background-color: #46458C;
}
</style>