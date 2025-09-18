<template>
    <!-- 条件查询区域 -->
    <el-row class="searchDiv">
        <el-col :span="24"  class="searchDiv-right">
            <div class="searchDiv-right-inputDiv">
                <el-form :inline="true" :label-position="right" label-width="70px" :model="searchForm">
                    <el-form-item label="范式id">
                        <el-input
                        placeholder="请输入范式id"
                        v-model="searchForm.id"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="范式名称">
                        <el-input
                        placeholder="请输入范式名称"
                        v-model="searchForm.name"
                        clearable>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="searchDiv-right-button">
                <el-button-group style="margin-right: 5px">
                    <el-button type="primary" round  @click="searchExperiment"><el-icon style="margin-right: 5px;"><Search /></el-icon>查询</el-button>
                    <el-button type="warning" round plain @click="resetSearch">
                        <el-icon style="margin-right: 5px;" ><Refresh /></el-icon>重置
                    </el-button>
                </el-button-group>
                <el-button type="danger" style="background-color: #ffa4a4;color:white;margin-right: 5px;" plain @click="delParamdigmByIds"><el-icon style="margin-right: 5px;"><Failed /></el-icon>批量删除</el-button>

                <el-button-group>
                    <el-button type="primary" round style="background-color: #ffba00; border-color: #ffba00;"  @click="uploadParamdigm()"><el-icon style="margin-right: 5px;"><Upload /></el-icon>导入</el-button>
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
            <el-card class="paramdigmCard" shadow="hover" v-for="(item,index) in cardDatas" :key = "item.id" @click="openDetail(item.id)">
                <div class="paramdigmCard-selectDiv" @click.stop="selectCard(index)">
                    <el-icon v-if="item.isSelect === 1"><Check /></el-icon>
                </div>
                <div class="paramdigmCard-top">
                    <el-image :src="item.img" style="width: 190px; height: 182px;"></el-image>
                </div>
                <div class="paramdigmCard-bottom">
                    <div class="paramdigmCard-bottom-1">
                        <span style="color:#444">ID：</span><span>{{item.id}}</span>
                    </div>
                    <div class="paramdigmCard-bottom-2">
                        <span style="color:#444">名称：</span><span>{{ item.name }}</span>
                    </div>
                    <div class="paramdigmCard-bottom-3">
                        <span style="color:#444">创建时间：</span><span>{{item.createTime}}</span>
                    </div>
                </div>
            </el-card>
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

    <UploadParamdigm ref="uploadParamigm"></UploadParamdigm>
    <ParamdigmDetailVue ref="openParamigmDetial" :paradigm="paradigm"></ParamdigmDetailVue>
    
</template>

<script>
import 'element-plus/es/components/message/style/css'
import { ElCard,ElButton,ElCol,ElRow,ElInput,ElPagination } from 'element-plus'
import * as Icons from '@element-plus/icons-vue';  
import StartMainCard from '../experimentStart/StartMainCard.vue'
import {eventBus} from '../../hooks/eventBus'
import {getD, postD} from '../../api'
import emitter from '../../public'
import { getParadgims,getParadigmById,getParadigmFile,deleteParadigmById} from '@/api/paradigm.js'
import UploadParamdigm from './uploadParamdigm.vue';
import ParamdigmDetailVue from './ParamdigmDetail.vue';
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
        cardDatas:[
            
            ],
        paradigm: null, 
        selectedCards:[],
    };
  },
  created(){
       
  },
  mounted(){
    this.searchExperiment()
  },
 
  components:{
      ElCard,ElButton,ElCol,ElRow,ElInput,ElPagination,StartMainCard,eventBus,UploadParamdigm,ParamdigmDetailVue
  },
  methods:{

    openDetail(id){
        this.fetchParadigmInfo(id);
        this.$refs.openParamigmDetial.openDialog();
    },
    fetchParadigmInfo(id) {
        getParadigmById(id).then(response => {
            this.paradigm = response.data.paradigm;
        }).catch(error => {
            console.error('Failed to fetch paradigm info', error);
        });
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
        getParadgims(this.currentPage,this.pageSize,this.searchForm).then(resp => {
            //将结果更新到卡片中
            console.log(resp)
            this.totalSize = resp.data.total
            this.cardDatas = []
            resp.data.rows.forEach(row => {
                // 获取图片
                console.log(row.coverPath)
                getParadigmFile(row.coverPath).then(resp => {
                    // 更新图片
                    // 确保 response.data 是 Blob 类型
                    console.log(resp)
                    if (resp instanceof Blob) {
                        const url = window.URL.createObjectURL(resp);
                        this.imageUrl = url;
                    } else {
                        console.error('获取的不是有效的Blob对象');
                    }
                    this.cardDatas.push({
                        id: row.id,
                        name: row.name,
                        createTime: row.createTime,
                        img: URL.createObjectURL(resp),
                        isSelect: 0
                    });
                    console.log(resp)
                }).catch(e => {
                    console.log(e)
                })
            });

        }).catch(e => {
            console.log(e)
        })
    },
    
    //批量删除试验信息
    delParamdigmByIds(){
        console.log("删除选中的卡片")
        console.log(this.selectedCards)
        //发起批量删除请求
        deleteParadigmById(this.selectedCards).then(resp => {
            if (resp.success){
                //删除成功
                this.$message({
                    message: resp.message,
                    type: 'success'
                });
            }else {
                //删除失败
                this.$message({
                    message: resp.message,
                    type: 'error'
                });
            }
            this.searchExperiment()
            this.selectedCards = []
        }).catch(e=>{
            console.log(e.response.data.message)
            console.log(e)
        })
    },
    //上传范式
    uploadParamdigm(){
        console.log("上传范式")
        // this.$router.push(`/paramdigm/upload`);
        this.$refs.uploadParamigm.openDialog()
    },

    selectCard(val){
        console.log("选择了第"+val+"个卡片")
        if (this.cardDatas[val].isSelect == 0){
            this.cardDatas[val].isSelect = 1
            this.selectedCards.push(this.cardDatas[val].id)
        }else {
            this.cardDatas[val].isSelect = 0
            const index = this.selectedCards.findIndex(item => item == this.cardDatas[val].id);
            console.log(index)
            if (index > -1){
                this.selectedCards.splice(index,1)
            }
            
        }
        console.log("选中的卡片")
        console.log(this.selectedCards)
    },
    //表格选择改变
    handleSelectionChange(value){
        this.selectedRow = value
    },
    downExperiment(index,row){
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
    padding-right: 50px;
    text-align: right;
    
}

.mainDiv >>> .el-card__body{
    height: 100%;
}

.paramdigmCard{
    width: 200px;
    height: 280px;
    position: relative;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
}

.paramdigmCard >>> .el-card__body{
    /* width: 100%; */
    height: 100%;
    padding: 5px 5px;
}

.paramdigmCard-top{
    width: 100%;
    height: 68%;
    /* border: 1px solid red; */
    /* z-index: 1; */
    
}

.paramdigmCard-bottom{
    width: 100%;
    height: 27%;
    /* border: 1px solid rgb(34, 172, 190); */
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;
    color: #666;
    line-height: 25px;
    z-index: 1;
}

.paramdigmCard-selectDiv{
    z-index: 10;
    width: 20px;
    height: 20px;
    position: absolute;
    border: 1px solid rgb(121, 122, 120);
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

.paramdigmCard-bottom-1{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.paramdigmCard-bottom-2{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.paramdigmCard-bottom-3{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
 