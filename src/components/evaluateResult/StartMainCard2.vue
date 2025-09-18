<template>

    <el-header>
        本次实验基础信息
    </el-header>
    <el-main>
        <el-row :gutter="10" style="width:100%;height:100%;">
            <!-- 左侧展示 -->
            <el-col :span="12" style="width:100%;height:736px;">
                <!-- 各类视频 -->
                <el-row :gutter="5" class="video-row">
                    <el-col :span="8">
                        <div id="divPlugin0" class="divPlugin" ></div>     
                    </el-col>
                    <el-col :span="8">
                        <div id="divPlugin2" class="divPlugin" ></div>     
                    </el-col>
                    <el-col :span="8">
                        <div id="divPlugin3" class="divPlugin" ></div>     
                    </el-col>
                </el-row>
                <!-- 心率 -->
                <el-row class="hr-row">
                    <el-card class="hr-card">
                        <el-row style="width:100%;height:100%;">
                            <el-col :span="2" style="height:190px; line-height: 190px">
                                <img style="width:90%" src="@/assets/electro_imgs/heart.png" />
                            </el-col>
                            <el-col :span="22" style="height:100%; width: 190px;">
                                <ItemHeart :eData="eData"></ItemHeart> 
                            </el-col>
                        </el-row>
                    </el-card>
                </el-row>
                <!-- 皮肤电 -->
                <el-row class="gsr-row">
                    <el-card class="gsr-card">
                        <el-row style="width:100%;height:100%;">
                            <el-col :span="2" style="height:190px;width: 100%;line-height: 190px;">
                                <img style="width:90%" src="@/assets/electro_imgs/skin.png" />
                            </el-col>
                            <el-col :span="22" style="height:100%;width:190px;">  
                                <ItemSkin :skinData="skinData"></ItemSkin>  
                            </el-col>
                        </el-row> 
                    </el-card>
                </el-row>
            </el-col>
            <!-- 右侧展示 -->
            <el-col :span="12" class="eeg-col">
                <el-row class="eeg-row-1">
                    <div class="eeg-header-div">
                        <progressbar ></progressbar>
                    </div>
                    
                </el-row>
                <el-row class="eeg-row-2">
                    <el-card class="eeg-card">
                        <el-col style="width: 100%;height:660px;position: absolute;top: 0px; left: 0px; ">
                            <el-row style="height: 80px;margin: 0 auto;margin-top:2px;" v-for="item in eegType" :key="item.id"> 
                                <ItemEEG :eegdata="item"></ItemEEG>
                            </el-row>
                        </el-col>
                    </el-card>
                </el-row>
            </el-col>
        </el-row>
    </el-main>
    
    </template>
    
    
    <script>
import 'element-plus/es/components/message/style/css'
import { WebVideo } from '@/assets/js/webVideo.js'
import IconControl from './IconControl.vue'
import { ElCard, ElButton, ElSelect, ElOption, ElFormItem, ElCol, ElRow, ElText, ElSwitch, ElInput, ElDialog, ElForm } from 'element-plus'
import { Opportunity, VideoCamera, Microphone, Mute } from '@element-plus/icons-vue'
import { getD, postD } from '../../api'
import { reactive, ref } from 'vue'
import { eventBus } from '../../hooks/eventBus'
import { inject } from "vue"
import ItemSkin from './ItemSkin.vue'
import ItemHeart from './ItemHeart.vue'
import ItemEEG from './ItemEEG.vue'
import mitt from "mitt"
import * as mqtt from 'mqtt/dist/mqtt.min';
import emitter from '../../public'
import progressbar from './progressbar.vue'

export default {
    name: 'VideoPlay',
    data() {
        return {
            eeg:[
                {
                    id:1,name:'test'
                },
                {
                    id:2,name:'test2'
                }
            ],
            capName: "GTEC",
            EEGHeight: 10,
            eData: { data: 0, eType: "" },
            skinData: { data: 0, eType: "" },
            eegData: [
                { id: 1, name: 'AF4', rtdata: 0 },
                // ... 其他EEG数据
                { id: 32, name: 'Oz', rtdata: 0 },
            ],
            eegData_mindTooth: [
                { id: 1, name: '1', rtdata: 0 },
                { id: 2, name: '2', rtdata: 0 },
                { id: 3, name: '3', rtdata: 0 },
                { id: 4, name: '4', rtdata: 0 },
                { id: 5, name: '5', rtdata: 0 },
                { id: 6, name: '6', rtdata: 0 },
                { id: 7, name: '7', rtdata: 0 },
                { id: 8, name: '8', rtdata: 0 },
            ],
            eegData_DSI24: [
                { id: 1, name: 'P3', rtdata: 0 },
                // ... 其他EEG数据
                { id: 24, name: 'T4', rtdata: 0 },
            ],
            eegData_mindTooth_calibration: [
                { id: 1, name: 'GND', rtdata: 0 },
                // ... 其他EEG数据
                { id: 10, name: 'P4', rtdata: 0 },
            ],
            eegType: [],
            index: 0,
            dataChart: "",
            eegIndex: 0,
            eType: "",
            typeFlag: false,
            options: {
                connectTimeout: 40000,
                clientId: 'client_hdu_receive',
                username: 'root',
                password: '98991217q',
                clean: true
            },
            formLabelWidth: "100px",
            dialogVisible: false,
            form: {
                name: "",
                gender: "",
                identity: "",
                phone: "",
                height: "",
                weight: ""
            },
            url_setUserInfo: "/experiment/start",
            experiment_id: "11",
            micro: false,
            webVideo: '',
            microIcon: 'Mute',
            url_getEEGType: "/device/eeg",
            hkvInfo: {
                ip: '192.168.110.64',
                username: 'admin',
                password: '98991217q'
            },
            url_startmicro: "/camera/startMicro",
            url_stopmicro: "/camera/stopMicro",
            params_micro: {}
        }
    },
    setup() {
        let $echarts = inject("echarts")
        let $http = inject("axios")
    },
    created() {
        this.eegType = this.eegData_mindTooth
    },
    mounted() {
        // this.initVideoPlay()
        // this.mqttMSG()
        const socket = new WebSocket("ws://127.0.0.1:8888/websocket/w");
        socket.addEventListener("open", () => {
            console.log("WebSocket连接已经打开");
        });
        socket.addEventListener("message", (event) => {
            const message = event.data;
            console.log("接收到的消息", event, event.data);
            const payload = JSON.parse(message.toString())
            this.handleMessage(payload);
        });
        socket.addEventListener("close", () => {
            console.log("WebSocket连接已关闭");
        })
        this.getEEGType()
    },
    beforeDestroy() {
        this.stopVideoPlay()
    },
    computed: {
        changeChannelSize() {
            return Math.floor((window.innerHeight - 150) / this.getChannelLenght(this.eegType)) + "px"
        },
    },
    methods: {
        getChannelLenght(item) {
            if (item != undefined) {
                return item.length
            }
        },
        getEEGType() {
            getD(this.url_getEEGType)
                .then(res => {
                    if (res.data.device == "GTEC") {
                        this.eegType = this.eegData
                        this.capName = "GTEC"
                    } else if (res.data.device == "DSI-24") {
                        this.eegType = this.eegData_DSI24
                        this.capName = "DSI-24"
                    } else if (res.data.device == "mindTooth") {
                        this.eegType = this.eegData_mindTooth
                        this.capName = "mindTooth"
                    }
                })
        },
        submitForm(formName) {
            this.dialogVisible = false;
            postD(this.url_setUserInfo, this.form).then(res => {
                console.log("用户信息提交成功")
            })
        },
        controlMic() {
            if (this.micro == false) {
                this.micro = true
                this.microIcon = "Microphone"
                postD(this.url_startmicro, this.params_micro).then(res => {
                    console.log("麦克风开启成功")
                })
            } else {
                this.micro = false
                this.microIcon = "Mute"
                postD(this.url_stopmicro, this.params_micro).then(res => {
                    console.log("麦克风关闭成功")
                })
            }
        },
        // mqttMSG() {
        //     const mqtt_host = "ws://localhost:8083/mqtt";
        //     const client = mqtt.connect(mqtt_host, this.options)
        //     client.on("connect", () => {
        //         client.subscribe("/hdu/brain", function (err) {
        //             if (!err) {
        //                 console.log("订阅成功")
        //             }
        //         })
        //     })
        //     client.on('message', (topic, message) => {
        //         const payload = JSON.parse(message.toString())
        //         this.handleMessage(payload)
        //     })
        // },
        // handleMessage(message) {
        //     console.log("处理信息", message.eType)
        //     if (message.eType == "eeg") {
        //         this.handleEEGMessage(message)
        //     } else if (message.eType == "heart") {
        //         console.log("处理心率数据")
        //         this.eData.data = message.data
        //         this.eData.eType = message.eType
        //     } else if (message.eType == "skin") {
        //         this.skinData.data = message.data
        //         this.skinData.eType = message.eType
        //     }
        // },
        handleMessage(message) {
            console.log("处理信息", message.header.type)
            var header = message.header
            var data = message.data
            if (header.type == "eeg") {
                this.handleEEGMessage(data)
            } else if (header.type == "hr") {
                this.eData.data = data[0]
                this.eData.eType = header.type
            } else if (header.type == "gsr") {
                this.skinData.data = message.data[0]
                this.skinData.eType = header.type
            }
        },

        handleEEGMessage(data) {
            console.log('处理eeg数据');
            console.log(data);
            // 批量处理数据
            const updatedEEGType = this.eegType.map((item, index) => ({
                ...item,
                rtdata: data[index],
            }));
            // 统一更新
            this.eegType = updatedEEGType;
        },

        
        stopVideoPlay() {
            if (this.webVideo != null) {
                this.webVideo.logout()
            }
        }
    },
    components: {
        ElCard,
        ElButton,
        ElSelect,
        ElOption,
        ElFormItem,
        ElCol,
        ElRow,
        ElText,
        ElSwitch,
        ElInput,
        ElDialog,
        ElForm,
        Opportunity,
        VideoCamera,
        Microphone,
        Mute,
        IconControl,
        ItemSkin,
        ItemHeart,
        ItemEEG,
        progressbar
    }
}
</script>
    
    <style scoped>
    .channelSize{
        height: 4%;
        
    }
    /* .el-card ::v-deep .el-card__body{
        height: 100%;
        width:100%;
    } */
    .main1 {
        height: 50%;
        width: 100%
    }
    .row1 {
        height: 100%;
    }

    .el-card_body {
        padding-top: 0px;
        padding-left: 0px;
    }
    .chartContainer{
            /* 最大最小宽度 */
            /* min-width: 1200px;
            max-width: 2048px; */
            margin: 0 auto;
            border: 1px solid red;
            padding: .125rem .125rem 0;
            background-color: gray;
            height:500px;
            display:flex;
            /* 设置左右份数 */
    }
    .itemLeft{
        width:40%;
        
    }
    
    
    .el-card {
        /* margin-bottom: 20px; */
        width: 90%;
        /* margin-top:  5%; */
        height: 100%;
    }
    .el-card__body{
        padding-top:10px
    }
    .dialog-footer button:first-child {
      margin-right: 10px;
    }
    .el-dialog__body {
        padding-bottom: 0%;
        /* padding-left: 10%; */
    }
    .divPlugin{
        width: 100%;
        height: 100%;
        /* border: 1px,solid,red; */
        background-color: #ffffff;
    }

    .video-row{
        /* height: 20%; */
        height: 30%
    }

    .hr-row{
        height: 30%;
        margin-top: 5%;
    }

    .hr-card{
        width: 100%;
        height: 100%;
    }

    .gsr-row{
        height: 30%;
        margin-top: 5%;
    }

    .gsr-card{
        width: 100%;
        height: 100%;

    }

    .eeg-col{
        height: 736px;
        width: 100%;
    }

    .eeg-card{
        width: 100%;
        height: 100%;
    }

    .eeg-row-1{
        height: 10%;
    }

    .eeg-row-2{
        height: 90%;
    }

    .eeg-header-div{
        /* border: 1px solid red; */
        background-color: #ffffff;
        height: 90%;
        width: 100%;
    }

    .eeg-header-row{
        height: 100%
    }

    .eeg-icon-col{
        height: 100%;
        position: relative;
    }

    .eeg-icon-img{
        height: 40px;
        width: 40px;
        /* line-height: 66px; */
        position: absolute;
        left: 10px;
        top: 13px;
    }

    .eeg-icon-title{
        position: absolute;
        line-height: 66px;
        left: 60px;
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
    }

    .eeg-icon-title-2{
        height: 100%;
        line-height: 66px;
        position: absolute;
        left: 10px;
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
    }


    .eeg-icon-col-2{
        position: relative;
        height: 100%;
        
    }

    .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    height: 760px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
    </style>
    
    