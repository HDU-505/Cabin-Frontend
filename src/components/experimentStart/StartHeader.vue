<template>
    <div>
        <el-header class="header" width="100%" height="75px" style="background-color:#F0F2F5">
            <el-row style="vertical-align:middle;height:100%;">
                <!-- 标题 -->
                <el-col :span="5" style="margin-top: 20px">
                    <b style="font-size: 20px;">{{$t('homepage.start')}}</b>
                </el-col>
                
                <!-- EEG阻抗对话框按钮 -->
                <el-col :span="3" style="margin:auto">
                    <el-button @click="openeegDialog" class="header-button" plain>{{$t('head_title.impedance')}}</el-button>
                    <el-dialog :title="$t('head_title.impedance')" v-model="eegdialogVisible" style="width:33%;margin-left:35%;height:65%" :center="true" class="el-dialog__body" draggable :show-close="false">
                        <el-table :data="gridData">
                            <el-table-column property="channel" label="Channel" width="250" />
                            <el-table-column property="impedance" label="Impedance[KΩ]" width="250" />
                        </el-table>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="closeeegDialog" style="margin-top:-7%">{{$t('confirmation_box.back')}}</el-button>
                                <el-button type="primary" v-model="form" @click="closeeegDialog" style="margin-top:-7%">
                                    {{$t('confirmation_box.isYes')}}
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
                </el-col>
                
                <!-- 开始实验按钮 -->
                <el-col :span="3" style="margin:auto">
                    <el-button @click="openDialog" style="margin-top:5%;background-color:#19376D;color:white">{{$t('head_title.startExper')}}</el-button>
                    <el-dialog :title="$t('subjectInfo.title')" v-model="dialogVisible" style="width:25%;margin-left:40%;height:65%" :center="true" class="el-dialog__body">
                        <el-form :model="form" :rules="rules" ref="form">
                            <el-form-item :label="$t('subjectInfo.name')" prop="name" :label-width="formLabelWidth">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('subjectInfo.gender')" prop="gender" :label-width="formLabelWidth">
                                <el-select v-model="form.gender" :placeholder="$t('subjectInfo.selectGender')">
                                    <el-option :label="$t('subjectInfo.male')" value="1" />
                                    <el-option :label="$t('subjectInfo.female')" value="0" />
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('subjectInfo.age')" prop="age" :label-width="formLabelWidth">
                                <el-input v-model="form.age"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('subjectInfo.idCard')" prop="identity" :label-width="formLabelWidth">
                                <el-input v-model="form.identity"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('subjectInfo.phoneNumber')" prop="phone" :label-width="formLabelWidth">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('subjectInfo.height')" prop="height" :label-width="formLabelWidth">
                                <el-input v-model="form.height"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('subjectInfo.weight')" prop="weight" :label-width="formLabelWidth">
                                <el-input v-model="form.weight"></el-input>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="closeDialog" style="margin-top:-7%">{{$t("confirmation_box.isNo")}}</el-button>
                                <el-button type="primary" v-model="form" @click="sendUserInfo(form)" style="margin-top:-7%">
                                    {{$t('head_title.startExper')}}
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
                </el-col>

                <!-- 上传数据按钮 -->
                <el-col :span="3" style="margin:auto">
                    <el-button class="header-button" plain>{{$t('head_title.uploadData')}}</el-button>
                </el-col>

                <!-- 连接设备按钮 -->
                <el-col @click="connectDevice" :span="3" style="margin:auto">
                    <el-button class="header-button" plain>{{$t('head_title.connectDevice')}}</el-button>
                </el-col>

                <!-- 用户信息和头像 -->
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
                            <span class="choice"><b>Client_HDU</b></span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-header>
    </div>
</template>


<script>
import 'element-plus/es/components/message/style/css'
import { User } from '@element-plus/icons-vue'
import * as mqtt from 'mqtt/dist/mqtt.min'
import { ElHeader, ElRow, ElCol, ElTag, ElButton, ElTable } from 'element-plus'
import { getD, postD } from '../../api/index'
import emitter from "../../public"
import i18n from "../../language"

const socket = new WebSocket("ws://localhost:8888/websocket/w"); // WebSocket地址

export default {
    data() {
        return {
            formLabelWidth: "100px",
            dialogVisible: false,
            eegdialogVisible: false,
            deviceConnectionAddress: "/emqx/connectSensor",
            form: {
                name: "",
                gender: "",
                identity: "",
                phone: "",
                height: "",
                weight: "",
                age: "",
            },
            url_setUserInfo: "/experiment/start",
            experiment_id: "11",
            gridData: [
                { channel: 'GND', impedance: 'Open' },
                { channel: 'REF', impedance: 'Open' },
                { channel: 'AFz', impedance: 'Open' },
                { channel: 'AF3', impedance: 'Open' },
                { channel: 'AF4', impedance: 'Open' },
                { channel: 'AF7', impedance: 'Open' },
                { channel: 'AF8', impedance: 'Open' },
                { channel: 'Pz', impedance: 'Open' },
                { channel: 'P3', impedance: 'Open' },
                { channel: 'P4', impedance: 'Open' },
            ],
            rules: {
                name: [{ required: true, message: i18n.global.t('info.name'), trigger: 'blur' }],
                gender: [{ required: true, message: i18n.global.t('info.gender'), trigger: 'change' }],
                age: [{ required: true, message: i18n.global.t('info.age'), trigger: 'blur' }],
                identity: [{ required: true, message: i18n.global.t('info.idCard'), trigger: 'blur' }],
                phone: [{ required: true, message: i18n.global.t('info.phone'), trigger: 'blur' }],
                height: [{ required: true, message: i18n.global.t('info.height'), trigger: 'blur' }],
                weight: [{ required: true, message: i18n.global.t('info.weight'), trigger: 'blur' }],
            },
        }
    },
    mounted() {
        emitter.on("EEG", (val) => {
            console.log(val);
            for (let index = 0; index < this.gridData.length; index++) {
                this.gridData[index].impedance = Math.round(val[index].rtdata);
            }
        });
    },
    components: {
        ElHeader, ElRow, ElCol, User, ElTag, ElButton, ElTable
    },
    methods: {
        EEGCalibration() {
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
            });

            setTimeout(200)
            socket.send("calibration")
        },

        handleMessage(message) {
            console.log("handleMessage" + message)
            if (message === "stop") {
                this.openEndMessage()
                console.log("发出stop命令")
            }
        },
        connectDevice() {
            getD(this.deviceConnectionAddress)
        },
        openDialog() {
            this.dialogVisible = true
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        openeegDialog() {
            this.eegdialogVisible = true
            this.EEGCalibration()
        },
        closeeegDialog() {
            socket.send("acquisition");
            this.eegdialogVisible = false
        },
        sendUserInfo(item) {
            this.dialogVisible = false;
            postD(this.url_setUserInfo, this.form)
                .then(response => {
                    this.experiment_id = response.experiment_id
                    console.log("my_experimentId:" + this.experiment_id)
                })
                .catch(error => {
                    console.log(error);
                });
            this.handleStart()
        },
        handleStart() {
            const options = {
                connectTimeout: 40000,
                clientId: 'client_hdu_send',
                username: 'root',
                password: '98991217q',
                clean: true
            }
            const client = mqtt.connect('ws://localhost:8083/mqtt', options);

            client.on('connect', () => {
                console.log('MQTT connected');
                client.publish('/order', '{"msg":"start"}');
                setTimeout(() => {
                    client.end();
                }, 300);
            });

            client.on('close', () => {
                console.log('MQTT connection closed');
            });

            client.on('error', (error) => {
                console.error('MQTT connection error:', error);
            });
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
    background-color: #19376D;
}
</style>
