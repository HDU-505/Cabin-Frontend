<template>
  <el-card style="width:90%" shadow="hover">
        <el-descriptions :title="$t('homepage.singleResult')">
            <el-descriptions-item :label="$t('subjectInfo.name')" label-align="right" width="200px">{{this.subject_msg.name}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.gender')">{{gender_change}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.age')">{{this.subject_msg.age}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.uuid')">{{this.subject_msg.experiment_id}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.idCard')">{{this.subject_msg.identity}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.phoneNumber')">{{this.subject_msg.phone}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.height')">{{this.subject_msg.height}} cm</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.weight')">{{this.subject_msg.weight}} kg</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.startTime')">{{this.subject_msg.start_time}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
            <el-descriptions-item :label="$t('subjectInfo.endTime')">{{this.subject_msg.end_time}}</el-descriptions-item>
        </el-descriptions>
        <el-row>
            <el-col :span="5">
                <el-button type="primary" style="margin-left:30%">{{$t('subjectInfo.exportData')}}</el-button>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" style="margin-left:60%" @click="resultDetail" disabled>{{$t('subjectInfo.detail')}}</el-button>
            </el-col>
        </el-row>
  
    </el-card>
</template>

<script>
import 'element-plus/es/components/message/style/css'
import { ElCard,ElDescriptions } from 'element-plus'
export default {
    data(){
        return{
            // subject_msg: {
            //     end_time: "2023_07_29",
            //     experiment_id: "12", //
            //     gender: 0, //
            //     has_report: 0,
            //     height:100.0, //
            //     identity: "230", //
            //     name: "欧阳瑜", //
            //     phone: "123", //
            //     start_time: "2023_07_29",
            //     weight: 100.0, //
            //     age: 23
            // },
            gender_demo:""
        }
    },
    props:{
        subject_msg: {
            type: Object
        }
    },
    methods:{
        resultDetail(){
            this.$router.push('/result/details')
        }
    },

    components:{
        ElCard,ElDescriptions
    },
    computed:{
        gender_change(){
            return this.subject_msg.gender == 1 ? "男" : "女"
        }
    }

}
</script>

<style>

</style>