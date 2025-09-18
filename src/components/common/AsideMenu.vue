<template>
  <!-- 主菜单容器 -->
  <el-row style="height:80%;width:100%;margin-top:15%">
    <el-menu active-text-color="#ffd04b" class="aside-menu" style="background-color: #0D1E41;width:100%">
      <!-- 菜单项：开始 -->
      <el-menu-item index="start" @click="clickRouterPush('start')" id="menu_item">
        <el-icon class="icon"><Coin /></el-icon>
        <span class="choice"><b>{{$t('homepage.start')}}</b></span>
      </el-menu-item>
      
      <!-- 菜单项：选择参数 -->
      <el-menu-item index="paramdigm" @click="clickRouterPush('selectParamdigm')">
        <el-icon class="icon"><Grid /></el-icon>
        <span class="choice"><b>{{$t('homepage.paradigm')}}</b></span>
      </el-menu-item>
      
      <!-- 菜单项：结果 -->
      <el-menu-item index="result" @click="clickRouterPush('result')">
        <el-icon class="icon"><Document /></el-icon>
        <span class="choice"><b>{{$t('homepage.result')}}</b></span>
      </el-menu-item>
      
      <!-- 结果对话框 -->
      <el-dialog :title="$t('homepage.result')" v-model="resultDialogVisible" style="width:25%;height:28%;margin-top:15%;margin-left:40%" :center="true" class="choiceDialog">
        <div class="login-container" style="margin-bottom:2%;display:flex;justify-content:center;">
          <el-input v-model="form.password" type="password" style="border:1px solid #fff;width:280px;" autocomplete="new-password" :placeholder="$t('confirmation_box.inputPwd')" show-password></el-input>
        </div>
        <el-row style="margin-top:6%;">
          <el-col :span="3"></el-col>
          <el-col :span="10">
            <el-button @click="closeResultDialog" style="width:80%;height:80%;font-size:15px;margin-top:10%">{{$t('confirmation_box.isNo')}}</el-button>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" @click="closeResultSubmit" style="width:80%;height:80%;font-size:15px;margin-top:10%">{{$t('confirmation_box.isYes')}}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      
      <!-- 菜单项：配置 -->
      <el-menu-item index="choice" @click="openDialog">
        <el-icon class="icon"><Setting /></el-icon>
        <span class="choice"><b>{{$t('homepage.configuration')}}</b></span>
      </el-menu-item>
      
      <!-- 配置对话框 -->
      <el-dialog :title="$t('homepage.configuration')" v-model="dialogVisible" style="width:25%;height:28%;margin-top:15%;margin-left:40%" :center="true" class="choiceDialog">
        <div class="login-container" style="margin-bottom:2%;display:flex;justify-content:center;">
          <el-input v-model="form.password" type="password" style="border:1px solid #fff;width:280px;" autocomplete="new-password" :placeholder="$t('confirmation_box.inputPwd')" show-password></el-input>
        </div>
        <el-row style="margin-top:6%">
          <el-col :span="3"></el-col>
          <el-col :span="10">
            <el-button @click="closeDialog" style="width:80%;height:80%;font-size:15px;margin-top:10%">{{$t('confirmation_box.isNo')}}</el-button>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" @click="closeSubmit" style="width:80%;height:80%;font-size:15px;margin-top:10%">{{$t('confirmation_box.isYes')}}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </el-menu>
  </el-row>

  <!-- 退出按钮 -->
  <el-row style="width:100%;">
    <el-menu class="aside-menu" style="background-color: #0D1E41;">
      <el-menu-item style="width:100%" index="/" @click="clickRouterPush('/')">
        <el-icon class="icon"><Back /></el-icon>
        <span class="choice"><b>{{$t('homepage.exit')}}</b></span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
import 'element-plus/es/components/message/style/css'
import { ElMenu, ElIcon, ElRow, ElCol } from 'element-plus'
import { Coin, Document, Setting, Grid, Back } from '@element-plus/icons-vue'
import { getD, postD } from '../../api/index'
import emitter from '../../public'

export default {
  data() {
    return {
      flag: false,
      formLabelWidth: "80px",
      url_verify: "/verification/client",
      dialogVisible: false,
      resultDialogVisible: false,
      errDialogVIsible: false,
      form: {
        client_name: "client_hdu",
        password: ""
      },
      page_msg: [{}],
      url_reportMsg: "/experiment/experimentInfo",
      url_pageNumber: "/experiment/limitNumber",
      msg_limit: {
        limit: 1
      }
    }
  },
  components: {
    ElMenu, ElIcon, Coin, Document, Setting, Grid, Back, ElRow, ElCol
  },
  methods: {
    // 路由导航
    clickRouterPush(item) {
      if (item == 'start') {
        this.$router.push('/start');
      } else if (item == 'selectParamdigm') {
        this.$router.push('/paramdigm');
      } else if (item == 'result') {
        this.$router.push('/result');
      } else if (item == 'choice') {
        this.$router.push('/choice');
      } else {
        this.$router.push('/');
      }
    },
    
    // 打开配置对话框
    openDialog() {
      this.dialogVisible = true
    },
    
    // 关闭配置对话框
    closeDialog() {
      this.dialogVisible = false;
    },
    
    // 提交配置对话框表单
    closeSubmit() {
      this.dialogVisible = false;
      postD(this.url_verify, this.form)
        .then(response => {
          console.log(response);
          if (response.success) {
            this.$router.push('/choice')
          } else {
            this.$message({
              showClose: false,
              center: true,
              message: '密码错误',
              type: 'error'
            });
            this.form.password = ""
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    // 打开结果对话框
    openResultDialog() {
      this.resultDialogVisible = true
    },
    
    // 关闭结果对话框
    closeResultDialog() {
      this.resultDialogVisible = false;
    },
    
    // 提交结果对话框表单
    closeResultSubmit() {
      this.resultDialogVisible = false;
      postD(this.url_verify, this.form)
        .then(response => {
          console.log(response);
          if (response.success) {
            postD(this.url_reportMsg, this.msg_limit)
              .then(response => {
                this.page_msg = response.msg
                emitter.emit('experimentInfos', this.page_msg)
              })
              .catch(error => {
                console.log(error);
              });
            getD(this.url_pageNumber)
              .then(res => {
                if (res.data.success) {
                  emitter.emit('limitNumber', res.data.number)
                }
              })
              .catch(err => {
                console.log(err)
              });
            this.$router.push('/result')
          } else {
            this.$message({
              showClose: false,
              center: true,
              message: '密码错误',
              type: 'error'
            });
            this.form.password = ""
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    // 打开错误对话框
    openErrDialog() {
      this.errDialogVIsible = true
    },
    
    // 关闭错误对话框
    closeErrDialog() {
      this.errDialogVIsible = false
    }
  }
}
</script>

<style scoped>
.choice {
  color: #F0F2F5;
  text-align: center;
  font-size: 17px;
}

.el-dialog__body {
  padding-bottom: 0%;
}

.aside-menu {
  text-decoration-color: white;
  border-right: solid 0px;
  text-align: center;
}

.icon {
  color: #F0F2F5;
}

.el-menu-item:hover {
  background: #213363;
  color: #FDFFAE;
}

.el-menu-item.is-active {
  background: #213363;
  color: #FFFEC4;
}
</style>
