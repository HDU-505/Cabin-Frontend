<template>
  <div class="common-layout" >
    <el-container>
      <el-header  style="height:10%;background-color: #0D1E41;">
          <el-row>
              <el-col :span="5" class="logo-image">
                  <img style="display:inline-block;margin:auto;margin-top:-1%;width: 90%;margin-left:3%;"   src="@/assets/img/login_img/log1.png" />
                  
              </el-col>
              <el-col :span="12" style="card">
                  <p style="margin-top:3.5%;color:white;font-size:30px">{{$t('homepage.title')}}</p>
              </el-col>
              <el-col :span="4">
                  <el-select v-model="value" class="m-2" :placeholder="$t('index.select')" style="margin-top:11%">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="changeLang(value)" />
                  </el-select>
                  <!-- <el-link type="info" style="font-color:white" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="changeLang(value)">{{"|" + item.value + "|"}}</el-link> -->
                  <!-- <a v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="changeLang(value)">{{"|" + item.value + "|"}}</a> -->
              </el-col>
               <el-col :span="3">
                   <el-row style="width:100%;height:90%">
                       <el-col :span="6" style="margin-top:13%;">
                           
                           <el-avatar style="background-color:#0D1E41">
                               <el-icon>
                                   <img src="@/assets/img/login_img/hdu.png" />
                               </el-icon>
                           </el-avatar>
                           
                       </el-col>
                       <el-col :span="10" style="margin-top:18%">
                           <span class="choice" style="color:white"><b>Client_HDU</b></span>
                       </el-col>
                        
                   </el-row>
                    
                    
                </el-col>
          </el-row>
      </el-header>

      <el-main width="100%" height="80%" style="background-color: #F2F6FC;padding-left:5%;padding-right:5%;padding-bottom:5%;">
            <el-row  class="button-row" style="margin-top:2%;height:95%">
                <el-col :span="6">
                    <button @click="$router.push('/start')" style="margin:auto;background-color: #262A56;" class="el-button" round:false>
                        <el-col height=100% :span="24" >
                            <el-row  style="justify-content: center;">
                                <img src="@/assets/img/login_img/2.png" class="image">
                            </el-row>
                            <el-row style="justify-content: center;" class="text-wrapper">
                                <p style="margin:auto;margin-top: 22px;color:white;font-size=100px" >{{tran_txt.start}}</p>
                            </el-row>
                        </el-col>
                        
                    </button>
                    
                </el-col>
                <el-col :span="6">
                    <button @click="$router.push('/paramdigm')" style="margin:auto;background-color: #1A5F7A;round:false" class="el-button" round:false>
                        <el-col height=100%>
                            <el-row width=100% style="justify-content: center;">
                                <img src="@/assets/img/login_img/3.png" class="image">
                            </el-row>
                            <el-row style="justify-content: center;" class="text-wrapper">
                                <p style="margin:auto;margin-top: 22px;color:white;font-size=100px">{{tran_txt.paradigm}}</p>
                            </el-row>
                        </el-col>
                        
                    </button>

                </el-col>
                <el-col :span="6">
                    <button @click="$router.push('/result')" style="margin:auto;background-color: #4E6E81;round:false" class="el-button" round:false>
                        <el-col height=100%>
                            <el-row width=100% style="justify-content: center;">
                                <img src="@/assets/img/login_img/1.png" class="image">
                            </el-row>
                            <el-row style="justify-content: center;" class="text-wrapper">
                                <p style="margin:auto;margin-top: 20px;color:white;font-size=100px" >{{tran_txt.result}}</p>
                            </el-row>
                        </el-col>
                        
                    </button>
                    
                    <el-dialog :title="tran_txt.result" v-model="resultDialogVisible" style="width:25%;height:28%;margin-top:15%;margin-left:40%" :center="true" class="choiceDialog">
   
                        <div class="login-container" style="margin-bottom:2%;display:flex;justify-content:center;">
                            <el-input v-model="form.password" type="password" style="border:1px solid #fff;width:280px;" autocomplete="new-password" :placeholder="tran_txt.inputPwd" show-password>
                                
                            </el-input>
                        </div>
                        
                        <el-row style="margin-top:6%;">
                            <el-col :span="3"></el-col>
                            <el-col :span="10">
                                <el-button @click="closeResultDialog" style="width:80%;height:80%;font-size:15px;margin-top:10%">{{tran_txt.isNo}}</el-button>
                            </el-col>
                            <el-col  :span="10">
                                <el-button type="primary" @click="closeResultSubmit" style="width:80%;height:80%;font-size:15px;margin-top:10%">{{tran_txt.isYes}}</el-button>
                            </el-col>
                        </el-row>

                    </el-dialog>
                </el-col>

                <el-col :span="6">
                     <button @click="openDialog" style="margin:auto;background-color: #443C68;round:false" class="el-button" round:false>
                        <el-col height=100%>
                            <el-row width=100% style="justify-content: center;">
                                <img src="@/assets/img/login_img/4.png" class="image">
                            </el-row>
                            <el-row style="justify-content: center;" class="text-wrapper">
                                <p style="margin:auto;margin-top: 20px;color:white;font-size=100px" >{{tran_txt.configuration}}</p>
                            </el-row>
                        </el-col>
                        
                    </button>
                   
                    <el-dialog :title="tran_txt.configuration" v-model="dialogVisible" style="width:25%;height:28%;margin-top:15%;margin-left:40%" :center="true" class="choiceDialog">

                        <div class="login-container" style="margin-bottom:2%;display:flex;justify-content:center;">
                            <el-input v-model="form.password" type="password" style="border:1px solid #fff;width:280px;" autocomplete="new-password" :placeholder="tran_txt.inputPwd" show-password>
                                
                            </el-input>
                        </div>
                        
                        <el-row style="margin-top:6%">
                            <el-col :span="3"></el-col>
                            <el-col :span="10">
                                <el-button @click="closeDialog" style="width:80%;height:80%;font-size:15px;margin-top:10%">{{tran_txt.isNo}}</el-button>
                            </el-col>
                            <el-col  :span="10">
                                <el-button type="primary" @click="closeSubmit" style="width:80%;height:80%;font-size:15px;margin-top:10%">{{tran_txt.isYes}}</el-button>
                            </el-col>
                        </el-row>

            </el-dialog>
                    
                </el-col>
                
            </el-row>
        </el-main>

      <el-footer height="10%" style="background-color: #0D1E41;">
          <p style="margin-top:2%;color:#F2F3F5;text-align:center;font-size:20px">Copyright©2023-2030 NeuroX www.neurox.com All Rights Reserved</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import 'element-plus/es/components/message/style/css'
import { User,Hide,UserFilled } from '@element-plus/icons-vue'
import {ElRow,ElCol,ElHeader,ElMain,ElFooter,ElContainer,ElButton,ElDialog,ElAvatar,ElSelect,ElOption,ElLink} from 'element-plus' 
import { postD,getD } from '../../api/index'
import emitter from '../../public'
import {useI18n} from "vue-i18n"
import {computed, ref} from "vue"
import {getCurrentInstance} from "vue"
import i18n from '../../language'

// const value = ref('')
// const options = [
//     {
//         value: '英文',
//         label: 'en',
//     },
//     {
//         value: '中文',
//         label: 'zh',
//     },
// ]


export default {
    name: "Home",
    data(){
        return{
            options : [
                {
                    value: 'en',
                    label: i18n.global.t('index.english'),
                },
                {
                    value: 'zh',
                    label: i18n.global.t('index.chinese'),
                },
            ],
            flag:false, 
            formLabelWidth:"80px",
            url_verify:"/verification/client",
            dialogVisible :false,
            resultDialogVisible :false,
            errDialogVIsible:false,
            page_msg: [{}],
            url_reportMsg:"/experiment/experimentInfo",
            url_pageNumber: "/experiment/limitNumber",
            msg_limit:{
                limit:1
            },
            form:{
                client_name : "client_hdu",
                password :""
            },
            // rules:{
            //     password:[
            //         {required:true,message:'请输入密码',trigger:'blur'}
            //     ],
               
            // },
        }
        
    },

    components:{
        ElRow,ElCol,ElHeader,ElMain,ElFooter,ElContainer,ElButton,postD,User,ElDialog,Hide,ElAvatar,UserFilled,ElSelect,ElOption,ElLink
    },
    setup(){
        const {t} = useI18n();
        let {proxy} = getCurrentInstance();

        //定义需要循环的语言
        const lang_menu = ref([
            {name:"中文", id:"zh"},
            {name:"英文", id:"en"},
        ]);

        const current_lang = ref("中文")

        const tran_txt = computed( () => {
            return {
                title: t("homepage.title"),
                start: t("homepage.start"),
                paradigm: t("homepage.paradigm"),
                result: t("homepage.result"),
                configuration: t("homepage.configuration"),
                isYes: t("confirmation_box.isYes"),
                isNo: t("confirmation_box.isNo"),
                inputPwd: t("confirmation_box.inputPwd")
            }
        });

        //切换语言
        const changeLang = (item) => {
            // current_lang.value = item.name;
            proxy.$i18n.locale = item;
        }

        return {
            t,
            tran_txt,
            current_lang,
            lang_menu,
            changeLang,
        };

    },
    methods:{
        // changeLang(item){
        //     console.log("之前：" + i18n.locale)
        //     i18n.locale = item;
        //     console.log("现在：" + i18n.locale)
        // },
        openDialog(){
            this.dialogVisible = true
        },
        openResultDialog(){
            this.resultDialogVisible = true
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        closeResultDialog() {
            this.resultDialogVisible = false;
        },
        closeSubmit(){
            this.dialogVisible = false;
            postD(this.url_verify,this.form)
            .then(response => {
                    console.log(response);
                    if (response.success){
                        
                        this.$router.push('/choice')
                    } else {
                        this.$message({
                            showClose: false,
                            center:true,
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
         closeResultSubmit(){
            this.resultDialogVisible = false;
            // console.log(this.form.password)
            postD(this.url_verify,this.form)
            .then(response => {
                    console.log(response);
                    if (response.success){
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
                        this.$router.push('/result')
                    } else {
                        this.$message({
                            showClose: false,
                            center:true,
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
        openErrDialog(){
            this.errDialogVIsible = true
        },
        closeErrDialog(){
            this.errDialogVIsible = false
        }
       
    },

    

    

}
</script>

<style scoped>
.el-dialog__body {
    padding-bottom: 0%;
    /* padding-left: 10%; */
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.text-wrapper {
  word-break: break-all;
  word-wrap: break-word;
  height: 100px;
}
.button-row {
    width: 100%;
    height: 100%;
}
.el-message-box {
    width: 80%;
    height: 80%;
}
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置布局容器的高度为视口高度 */
}
.logo-image{
    display: flex;
    width: 100%;margin-left: 5%;
    margin:0 auto;
    align-items: center;
    /* text-align: center; */

}
.box {
		height: 80%;
		/*overflow-y: auto;*/
		display: flex;
		flex-direction: row;
}
.el-button {
    display: flex;
    width:90%;
    height: 100%;
    font-size:35px;
}

.el-button:hover {
    background: #0D1E41 !important;
    color: white !important;
    font-weight: bold;
    border-color: #4A55A2 !important;

}
.image {
    display: flex;
    width:80%;
    height:80%;
    align-items: center;
    justify-content: center;
    /* background-size: cover; */
}

.textInCard{
    width:80%;
    height:80%;
    align-items: center;
    justify-content: center;
}
.card{
    display: flex;
    width: 100%;
    /* margin-left: 5%; */
    margin:0 auto;
    /* align-items: center; */
    /* display: flex; */
    height:80%;
    align-items: center;
    justify-content: center;
}



</style>