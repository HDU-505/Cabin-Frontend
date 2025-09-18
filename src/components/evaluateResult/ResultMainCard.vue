<template>
    <!-- 条件查询区域 -->
    <el-row class="searchDiv">
        <el-col :span="24"  class="searchDiv-right">
            <div class="searchDiv-right-inputDiv">
                <el-form :inline="true" :label-position="right" label-width="70px" :model="searchForm">
                    <el-form-item label="实验id">
                        <el-input
                        placeholder="请输入实验id"
                        v-model="searchForm.id"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="被试姓名">
                        <el-input
                        placeholder="请输入被试者姓名"
                        v-model="searchForm.name"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input-number v-model="searchForm.age"  :min="1" :max="100" label="年龄"></el-input-number>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="searchForm.gender" label="1" value="1">男</el-radio>
                        <el-radio v-model="searchForm.gender" label="0" value="0">女</el-radio>
                    </el-form-item>
                    <el-form-item label="实验时间范围" label-width="100px">
                        <div class="block">
                            <el-date-picker
                            v-model="searchForm.date"
                            type="datetimerange"
                            range-separator="To"
                            start-placeholder="Start date"
                            end-placeholder="End date"
                            />
                        </div>
                    </el-form-item>
                </el-form>
            </div>

            <div class="searchDiv-right-button">
                <el-button-group style="margin-right: 5px">
                    <el-button type="primary" round  @click="searchExperiment"><el-icon style="margin-right: 5px;"><Search /></el-icon>查询</el-button>
                    <el-button type="warning" round plain @click="resetSearch">
                        <el-icon style="margin-right: 5px;"><Refresh /></el-icon>重置
                    </el-button>
                </el-button-group>
                <el-button type="danger" style="background-color: #ffa4a4;color:white;margin-right: 5px;" plain @click="delExperimentByIds"><el-icon style="margin-right: 5px;"><Failed /></el-icon>批量删除</el-button>

                <el-button-group>
                    <el-button type="primary" round style="background-color: #ffba00; border-color: #ffba00;"><el-icon style="margin-right: 5px;"><Upload /></el-icon>导入</el-button>
                    <el-button type="primary" round>
                        <el-icon style="margin-right: 5px;"><Download /></el-icon>导出
                    </el-button>
                </el-button-group>
            </div>
            
        </el-col>
    </el-row>
    <!-- 数据展示区域 -->
    <el-row class="mainDiv">
        <el-card style="width:100%;height:100%">
            <el-table :data="tableData" stripe style="width: 1600px;" :fit="true" table-layout="auto" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="id" label="ID" width="200" />
                <el-table-column prop="name" label="Name" width="200" />
                <el-table-column prop="gender" label="Gender" width="100">
                    <template #default="scope">
                        <p v-if="scope.row.gender == 1">男</p>
                        <p v-if="scope.row.gender == 0">女</p>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="Age" width="100"/>
                <el-table-column prop="createTime" label="StratTime" width="250"/>
                <el-table-column prop="endTime" label="EndTime" width="250"/>
                <el-table-column fixed="right" label="Operations" width="400">
                    <template #default="scope" >
                        <el-button-group>
                            <el-button type="primary" round color="#13ce66" :dark="isDark" @click="openDetail(scope.$index, scope.row)"><el-icon><Edit /></el-icon></el-button>
                            <el-button type="primary" round color="#1890ff" :dark="isDark" @click="downExperiment(scope.$index,scope.row)"><el-icon><Download /></el-icon></el-button>
                            <el-button type="primary" round color="#ff4949" :dark="isDark" @click="delExperiment(scope.$index,scope.row)"><el-icon><DocumentDelete /></el-icon></el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-row>
    <!-- 分页区域 -->
    <el-row class="pageDiv">
        <div class="demo-pagination-block">
            <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[1, 5, 10, 12]"
            :small="false"
            :disabled="false"
            :background="false"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
        </div>
    </el-row>

</template>

<script>
import 'element-plus/es/components/message/style/css'
import { ElCard,ElButton,ElCol,ElRow,ElInput,ElPagination } from 'element-plus'
import * as Icons from '@element-plus/icons-vue';  
import StartMainCard from '../experimentStart/StartMainCard.vue'
import {eventBus} from '../../hooks/eventBus'
import {getD, postD} from '../../api'
import MsgCard from './MsgCard.vue'
import emitter from '../../public'
import { getExperiments,delExperimentByIds,downExperimentById} from '@/api/experiment.js'
import { ElLoading } from 'element-plus';
export default {
  

  data() {
    return {
        searchForm:{
            id:null,
            name:null,
            gender:"",
            age:null,
            date:[]
        },
        currentPage:1,
        pageSize:12,
        totalSize:100,
        tableData:[           
        ],
        selectedRow:[],
    };
  },
  created(){
       
  },
  mounted(){
    this.searchExperiment()
  },
 
  components:{
      ElCard,ElButton,ElCol,ElRow,ElInput,ElPagination,StartMainCard,eventBus,MsgCard
  },
  methods:{
    openDetail(index,row){
        this.$router.push(`/result/detail/${row.id}`);
    },
    //重置搜索条件
    resetSearch(){
        this.searchForm.age = null
        this.searchForm.gender = ""
        this.searchForm.id = ""
        this.searchForm.name = ""
        this.searchForm.date = []

        this.searchExperiment()
    },

    //条件查询实验信息
    searchExperiment() {
        console.log("进行条件查询")
        //进行查询
        getExperiments(this.currentPage,this.pageSize,this.searchForm).then(resp => {
            console.log(resp)
            // 将结果更新到表格中
            this.totalSize = resp.data.total
            this.tableData = resp.data.rows
        }).catch(e=>{
            console.log(e)
        })
    },
    
    //批量删除试验信息
    delExperimentByIds(){
        var ids = []
        this.selectedRow.forEach((element) => {
            console.log(element);
            ids.push(element.id)
        });
        //发起批量删除请求
        delExperimentByIds(ids).then(resp => {
            console.log("删除成功")
            this.getExperiments()
        }).catch(e=>{
            console.log(e)
        })
    },

    delExperiment(index,row){
        var ids = []
        ids.push(row.id)
        delExperimentByIds(ids).then(resp => {
            console.log("删除成功")
            this.getExperiments()
        }).catch(e=>{
            console.log(e)
        })
    },
    //表格选择改变
    handleSelectionChange(value){
        this.selectedRow = value
    },
    downExperiment(index,row){
        const loadingInstance = ElLoading.service()
        downExperimentById(row.id).then(response => {
            // 从响应头中获取文件名
            // 从响应头中获取文件名
            // const fileName = response.headers['content-disposition'].split('filename=')[1];
            const fileName = "data-"+row.id+".zip"
            // 创建一个临时链接并触发下载
            const url = window.URL.createObjectURL(new Blob([response]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            loadingInstance.close()

            // 清理临时链接
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        }).catch(error => {
            console.error('Error downloading the file:', error);
            alert("Error downloading the file");
        });
    },
    handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.searchExperiment()
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.searchExperiment()
    },
  }
}   
</script>

<style scoped>


.searchDiv{
    width:96%;
    height:10%;
    margin-left:2%; 
    /* border: 1px solid red; */
}

.searchDiv-right{
    /* border: 1px solid blue; */
}

.searchDiv-right  .el-input{
    width: 150px;
}

.searchDiv-right .el-form-item{
    width: 220px;
    margin-right: 0px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.searchDiv-right-inputDiv{
    /* border: 1px solid green; */
    /* text-align: right; */
    
}


.searchDiv-right-inputDiv .el-radio{
    margin-right: 15px;        
}

.searchDiv-right-inputDiv >>> .el-form-item__content{
    width: 100px;
    /* border: 1px solid red; */
}

.searchDiv-right-button{
    /* border: 1px solid blue; */
    text-align: right;
    margin-right: 50px;
}

.mainDiv{
    width:96%;
    height:75%;
    margin-left:2%;
}

.mainDiv >>> .cell{
    text-align: center;
}

.pageDiv{
    width:96%;
    margin-left:2%;
    margin-top: 5px;
    /* border: 1px solid red; */
}


</style>
 