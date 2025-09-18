<template>

    <el-col style="height:100%;margin-left:2%;width:96%">
     
        <el-row style="margin-right:2%;margin-bottom:0.8%;margin-top:1.3%;text-align:right;margin-left:1.5%;">
            <el-form-item :label="$t('homepage.devices')" style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">
                <el-select @click="getEEG" @change="selectEEGDevice(selectedDevice)" v-model="selectedDevice" :placeholder="$t('homepage.select')">
                    <el-option
                        v-for="(item,index) in eegDevices"
                        :value="item"
                        :label="item"
                        :key="index"
                    >{{item}}</el-option>
                </el-select>    
                <!-- <el-tree-select v-model="value" :data="devices" multiple :render-after-expand="false" show-checkbox /> -->
            </el-form-item>
            <el-form-item :label="$t('homepage.coms')" style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">
                    <!-- 下拉列表 -->
                <el-select @click="init" @change="select(selectedItem)" v-model="selectedItem" :placeholder="$t('homepage.select')">
                    <el-option
                        v-for="(item,index) in com_data"
                        :value="item"
                        :label="item"
                        :key="index"
                    >{{item}}</el-option>
                </el-select>
            </el-form-item>
            
        </el-row>

        <el-row style="width:100%">
            <el-card class="box-card">
                
                <el-row>
                    <el-col style="display: inline-block;" :span="6">
                        <img style="margin-top: 5%;margin-left: 0.5%;" src="@/assets/img/NeuroConfig/1.png" />

                    </el-col>

                    <el-col :span="8">
                        <el-row>
                            <el-text style="font-size: 25px; font-weight: bold;">{{$t('config.breathLight')}}</el-text>
                        </el-row>   
                        <el-row class="row-in-card"> 
                            <el-text style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">{{$t('config.switch')}}</el-text>
                            <el-switch
                                @change="switch_breath(breath_value)"
                                v-model="breath_value"

                                active-color="#5b91d8"
                                inactive-color="#eaecf0">
                            </el-switch>
                        </el-row>
                        <el-row class="row-in-card"> 
                            <el-text style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">{{$t('config.lightness')}}</el-text>
                        </el-row>
                        <el-row class="row-in-card">

                            <el-slider
                                @change="changeBreathLight(breathLightness)"
                                v-model="breathLightness"
                                show-input
                                :step="200"
                                :max="2000">
                            </el-slider>
                            
                        </el-row>
                        <el-row class="row-in-card"> 
                            <el-text style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">{{$t('config.cycle')}}</el-text>
                        </el-row>
                        <el-row class="row-in-card">

                            <el-slider
                                @change="changeCycle(breathCycle)"
                                v-model="breathCycle"
                                show-input
                                :step="10"
                                :max="200">
                            </el-slider>
                            
                        </el-row>
                    </el-col>

                </el-row>
                
               
            </el-card>
        </el-row>

        <el-row>
            <el-card class="box-card">
                <el-row>
                    <el-col :span="6">
                        <img style="margin-top: 4%;margin-left: 10%;" src="@/assets/img/NeuroConfig/2.png" />
                    </el-col>

                    <el-col :span="8">
                        <el-row>
                            <el-text style="font-size: 25px; font-weight: bold;">{{$t('config.strip')}}</el-text>
                        </el-row>   
                        <el-row class="row-in-card"> 
                            <el-text style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">{{$t('config.switch')}}</el-text>
                            <el-switch
                                @change="switch_strip(strip_value)"
                                v-model="strip_value"
                                active-color="#5b91d8"
                                inactive-color="#eaecf0">
                            </el-switch>
                        </el-row>
                        <el-row class="row-in-card"> 
                            <el-text style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">{{$t('config.lightness')}}</el-text>
                        </el-row>
                        <el-row class="row-in-card">
                            <el-slider
                                @change="changeStripLight(stripLightness)"
                                v-model="stripLightness"
                                show-input
                                :step="200"
                                :max="2000">
                            </el-slider>
                        </el-row>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>

        <el-row>
            <el-card class="box-card">
                <el-row>
                    <el-col :span="6">
                        <img style="margin-top: 4%;margin-left: 10%;" src="@/assets/img/NeuroConfig/3.png" />
                    </el-col>

                    <el-col :span="8">
                        <el-row>
                            <el-text style="font-size: 25px; font-weight: bold;">{{$t('config.mainLight')}}</el-text>
                        </el-row>   
                        <el-row class="row-in-card"> 
                            <el-text style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">{{$t('config.switch')}}</el-text>
                            <el-switch
                                @change="switch_main(main_value)"
                                v-model="main_value"
                                active-color="#5b91d8"
                                inactive-color="#eaecf0">
                            </el-switch>
                        </el-row>
                        <el-row class="row-in-card"> 
                            <el-text style="font-size: 18px; font-weight: bold; color: #939394;margin-right: 7%">{{$t('config.lightness')}}</el-text>
                        </el-row>
                        <el-row class="row-in-card">
                            <el-slider
                                @change="changeMainLight(mainLightness)"
                                v-model="mainLightness"
                                show-input
                                :step="200"
                                :max="2000">
                            </el-slider>
                           
                        </el-row>
                    </el-col>
                    
                </el-row>
            </el-card>
        </el-row>


    </el-col>

</template>


<style scoped>
.icons {
    size: 40px;
    font-weight: bold; 
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.loc {
    margin-top: 8%;
    margin-left: 8%;
}

.row-in-card {
    margin-top: 2%;
    margin-left: 0.5%;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.set_btn {
  width: 120px;
  height: 45px;
}

.box-card {
  width: 96%;
  margin:auto;
  margin-bottom: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 0.5%;
}
</style>


<script>
import 'element-plus/es/components/message/style/css'
import {getD,postD} from '../../api'
import { ElCard,ElButton,ElSelect,ElOption,ElFormItem,ElCol,ElRow,ElText,ElSwitch,ElInput,ElTreeSelect } from 'element-plus'
import { Opportunity } from '@element-plus/icons-vue'
export default {
    data(){
        
        return{
            devices: [
                {
                    value: 'EEG',
                    label: 'EEG',
                    children: [
                        {
                            value: 'GTEC',
                            label: 'GTEC',
                        },
                        {
                            value: 'MindTooth',
                            label: 'MindTooth',
                        },
                        {
                            value: 'DSI_24',
                            label: 'DSI_24',
                        },
                    ]
                },
                {
                    value: 'Heart_Rate',
                    label: 'Heart_Rate',
                },
                {
                    value: 'GSR',
                    label: 'GSR',
                },
            ],
            
            breath_value: false,
            strip_value: false,
            main_value: false,
            audio_value:false,
            breathLightness:0,
            stripLightness:0,
            mainLightness:0,
            soundLevel:0,
            breathCycle:0,
            selectedItem:"",
            selectedDevice:"",
            com_data : "",
            url_com:{
				url_getCom:"/light/ports",
                url_setCom:"/light/setPort"
			},
            url_setBreath:"/light/control/breath",
                
            url_setStrip:"/light/control/strip",
            url_setMain:"/light/control/main",
            url_EEG:{
                url_getEEG:"/device/showEEGDevices",
                url_setEEG:"/device/selectEEGDevice",
            },
            url_setAudio:"", //音响接口路径  暂时未知
			params_com:{
                setPort: {
                    port: ""
                }	
			},
            params_device:{
                setEEG:{
                    device: ""
                }
            },
            params_light:{
                "minimumBrightness":0,
                "maximumBrightness":0,
                "breathsTimes":101
            },
            params_cycle:{
                "breathCycle":0
            },
            params_audio:{
                "minimumAudioLevel":0,
                "maximumAudioLevel":0,
            },
            eegDevices:"",
           
            // selected_path:""

        }
    },
    components:{
        ElCard,ElButton,ElSelect,ElOption,ElFormItem,ElRow,ElCol,ElText,ElSwitch,ElInput,Opportunity,ElTreeSelect
    },
    methods: {
		init() {

			getD(this.url_com.url_getCom) 
				.then(res => {
                    this.com_data = res.data.ports
					console.log(res.data)
				})
				.catch(err => {
					console.log(err)
				})
		},
        getEEG(){
            getD(this.url_EEG.url_getEEG)
            .then(res => {
                    // console.log("eeg device:" + res.data.devices)
                    this.eegDevices = res.data.devices
					console.log(res.data)
				})
				.catch(err => {
					console.log(err)
				})
        },
        select(item){

            console.log(item)
            this.params_com.setPort.port = item
            postD(this.url_com.url_setCom,this.params_com.setPort)
                .then(response => {
                    console.log(response);
                    // this.experiment_id = response.experiment_id
                    // console.log("my_experimentId:"+this.experiment_id)
                })
                .catch(error => {
                    console.log(error);
                });
        
        },
        selectEEGDevice(item){
            console.log(item)
            this.params_device.setEEG.device = item
            console.log(this.params_device.setEEG)
            postD(this.url_EEG.url_setEEG,this.params_device.setEEG)
                .then(response => {
                    console.log(response);
                    // this.experiment_id = response.experiment_id
                    // console.log("my_experimentId:"+this.experiment_id)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        switch_breath(item){
            
            // console.log(item)
            if (item == true){
                this.breathLightness = 2000
                this.breathCycle = 70
                this.params_light.maximumBrightness = 2000
                this.params_light.minimumBrightness = 0

            } else{
                this.breathLightness = 0
                this.breathCycle = 0
                this.params_light.maximumBrightness = 0
            }

            postD(this.url_setBreath,this.params_light)
        },
        switch_strip(item){
            console.log(item)
            if (item == true){
                this.stripLightness = 2000
                this.params_light.maximumBrightness = 2000
                this.params_light.minimumBrightness = 2000
            } else{
                this.stripLightness = 0
                this.params_light.maximumBrightness = 0
                this.params_light.minimumBrightness = 0
            }
            postD(this.url_setStrip,this.params_light)

        },
        switch_main(item){
            console.log(item)
            if (item == true){
                this.mainLightness = 2000
                this.params_light.maximumBrightness = 2000
                this.params_light.minimumBrightness = 2000
            } else{
                this.mainLightness = 0
                this.params_light.maximumBrightness = 0
                this.params_light.minimumBrightness = 0
            }
            postD(this.url_setMain,this.params_light)

        },
        switch_audio(item){
            console.log(item)
            if (item == true){
                this.soundLevel = 4095
                this.params_audio.minimumAudioLevel = 4095
                this.params_audio.maximumAudioLevel = 4095
            } else{
                this.soundLevel = 0
                this.params_light.maximumAudioLevel = 0
                this.params_light.minimumAudioLevel = 0
            }
            postD(this.url_setAudio,this.params_audio)
        },
        changeBreathLight(item){
            // console.log(item)
            this.breath_value = true
            this.params_light.maximumBrightness = item
            // console.log(this.breath_value)
            if (this.breathLightness == 0){
                this.breath_value = false
            }
            postD(this.url_setBreath,this.params_light)
        },
        changeStripLight(item){
            console.log(item)
            this.strip_value = true
            this.params_light.maximumBrightness = item
            this.params_light.minimumBrightness = item
            if (this.stripLightness == 0){
                this.strip_value = false
            }
            postD(this.url_setStrip,this.params_light)
        },
        changeMainLight(item){
            console.log(item)
            this.main_value = true
            this.params_light.maximumBrightness = item
            this.params_light.minimumBrightness = item
            if (this.mainLightness == 0){
                this.main_value = false
            }
            postD(this.url_setMain,this.params_light)
        },
        changeAudio(item){
            console.log(item)
            this.audio_value = true
            this.params_audio.maximumAudioLevel = item
            this.params_audio.minimumAudioLevel = item
            if (this.soundLevel == 0){
                this.audio_value = false
            }
            postD(this.url_setAudio,this.params_audio)
        },
        
        changeCycle(item){
            console.log(item)
            this.params_cycle.breathCycle = item
            postD(this.url_setBreath,this.params_cycle)
        }
    }
}
</script>

