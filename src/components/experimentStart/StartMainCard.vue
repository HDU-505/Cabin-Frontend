<template>
    <el-row style="width:100%;height:100%;">
        <!-- 左侧视频及数据展示区 -->
        <el-col :span="10" style="width:100%;height:100%;">
            <!-- 视频展示 -->
            <el-row style="height:46%;width:100%;">
                <el-col :span="24" style="width:100%;height:100%">
                    <el-row style="width:100%;height:80%;">
                        <div id="divPlugin" class="divPlugin" style="margin-left:7%;margin-top:3%;width:640px;height:340px;" ></div>
                    </el-row>
                    <el-row style="width:100%;height:20%;margin-top:2%">
                        <el-col :span="22"></el-col>
                        <el-col :span="2" style="margin-left:90%;display:flex;justify-content: center;">
                            <IconControl />
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 心率数据展示 -->
            <el-row style="height:25%;">
                <el-card style="height:100%;margin-left:7%">
                    <el-row style="width:100%;height:100%;">
                        <el-col :span="2" style="height:100%;">
                            <img style="width:90%" src="@/assets/electro_imgs/heart.png" />
                        </el-col>
                        <el-col :span="22" style="height:100%">
                            <ItemHeart :eData="eData"></ItemHeart>
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>
            <!-- 皮肤电数据展示 -->
            <el-row style="margin-top:2%;height:25%;">
                <el-card style="height:100%;margin-left:7%">
                    <el-row style="width:100%;height:100%;">
                        <el-col :span="2" style="height:100%;">
                            <img style="width:90%" src="@/assets/electro_imgs/skin.png" />
                        </el-col>
                        <el-col :span="22" style="height:100%">
                            <ItemSkin :skinData="skinData"></ItemSkin>
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>
        </el-col>
        <!-- 右侧EEG数据展示区 -->
        <el-col :span="14">
            <el-row style="display:flex;justify-content: center;align-items: center;height:100%;">
                <el-col :span="23" style="height:100%;">
                    <el-card style="width: 96.5%;height:96%;margin-left:1.5%;margin-top:2%;">
                        <el-col style="width: 100%;height:100%;">
                            <el-row style="height:1%;width:90%;margin-top:-2%">
                                <p style="font-size:5px;margin-top:0%">{{capName}}</p>
                            </el-row>
                            <div style="margin-top:2%"></div>
                            <el-row :style="{height: changeChannelSize}" v-for="item in eegType" :key="item.id">
                                <ItemEEG :eegdata="item"></ItemEEG>
                            </el-row>
                        </el-col>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<style scoped>
.channelSize{
    height: 4%;
}
.el-card ::v-deep .el-card__body{
    height: 100%;
    width:100%;
}
.main1 {
    height: 50%;
    width: 100%
}
.row1 {
    height: 100%;
}
.main-card {
    margin:auto;
    width: 100%;
    height: 90%;
    margin-top: 3.5%;
}
.el-card_body {
    padding-top: 0px;
    padding-left: 0px;
}
.chartContainer{
        margin: 0 auto;
        border: 1px solid red;
        padding: .125rem .125rem 0;
        background-color: gray;
        height:500px;
        display:flex;
}
.itemLeft{
    width:40%;
}
.el-card {
    width: 90%;
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
}
.divPlugin{
    width:90%;
}
</style>

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
import * as echarts from "echarts"
import ItemSkin from './ItemSkin.vue'
import ItemHeart from './ItemHeart.vue'
import ItemEEG from './ItemEEG.vue'
import mitt from "mitt"
import * as mqtt from 'mqtt/dist/mqtt.min';
import emitter from '../../public'

export default {
    name: 'VideoPlay',
    data() {
        return {
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
                { id: 1, name: 'AFz', rtdata: 0 },
                // ... 其他EEG数据
                { id: 8, name: 'P4', rtdata: 0 },
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
            eegType: this.eegData_DSI24,
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
        console.log($echarts)
        console.log($http)
    },
    created() {},
    mounted() {
        this.initVideoPlay()
        this.mqttMSG()
        const socket = new WebSocket("ws://localhost:8088/websocket/w");
        socket.addEventListener("open", () => {
            console.log("WebSocket连接已经打开");
        });
        socket.addEventListener("message", (event) => {
            const message = event.data;
            console.log("接收到的消息", event, event.data);
            this.handleMessage(message);
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
        mqttMSG() {
            const mqtt_host = "ws://localhost:8083/mqtt";
            const client = mqtt.connect(mqtt_host, this.options)
            client.on("connect", () => {
                client.subscribe("/hdu/brain", function (err) {
                    if (!err) {
                        console.log("订阅成功")
                    }
                })
            })
            client.on('message', (topic, message) => {
                const payload = JSON.parse(message.toString())
                this.handleMessage(payload)
            })
        },
        handleMessage(message) {
            console.log("处理信息", message)
            if (message.eType == "eeg") {
                this.handleEEGMessage(message)
            } else if (message.eType == "heart") {
                this.eData.data = message.data
                this.eData.eType = message.eType
            } else if (message.eType == "skin") {
                this.skinData.data = message.data
                this.skinData.eType = message.eType
            }
        },
        handleEEGMessage(message) {
            this.eegType.map(item => {
                if (item.name == message.name) {
                    item.rtdata = message.data
                }
            })
        },
        initVideoPlay() {
            const $this = this;
            this.webVideo = new WebVideo()
            this.webVideo.login({
                ip: $this.hkvInfo.ip,
                port: "80",
                username: $this.hkvInfo.username,
                password: $this.hkvInfo.password,
                channel: 1,
                stream: 1,
                rtspport: "554"
            })
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
    }
}
</script>


<style scoped>
.channelSize{
    height: 4%;
    
}
.el-card ::v-deep .el-card__body{
    height: 100%;
    width:100%;
}
.main1 {
    height: 50%;
    width: 100%
}
.row1 {
    height: 100%;
}
.main-card {
    margin:auto;
    width: 100%;
    height: 90%;
    margin-top: 3.5%;
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
    width:90%;
}
</style>

