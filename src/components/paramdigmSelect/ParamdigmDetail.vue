<template>
    <el-dialog v-model="visible" width="50%" @close="resetData">
      <template #title>
        <span >{{ paradigm ? paradigm.name : '' }}</span>
      </template>
      <el-card v-if="paradigm" class="box-card">
        <div>
          <el-form label-position="top" :model="paradigm" label-width="120px">
            <el-form-item label="Description">
              <el-input v-model="paradigm.description" type="textarea" :rows="2" readonly></el-input>
            </el-form-item>
            <el-form-item label="Cover File">
              <img :src="coverFileUrl" alt="Cover Image" style="max-width: 100%; max-height: 200px;">
            </el-form-item>
            <el-form-item label="Paradigm Files">
              <div v-for="file in paradigmFiles" :key="file.name">
                <a :href="file.url" download>{{ file.name }}</a>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <template #footer>
        <el-button @click="sendParamdigm" type="primary">send</el-button>
        <el-button @click="visible = false">Close</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script>
  import { getParadigmFile } from '@/api/paradigm';
  
  export default {
    props: {
      paradigm: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        coverFileUrl: '',
        paradigmFiles: [],
        visible: false
      };
    },
    watch: {
      paradigm(newVal) {
        if (newVal) {
          this.fetchCoverFile(newVal.coverPath);
          this.fetchParadigmFiles(newVal.filePath);
        }
      }
    },
    methods: {
        openDialog(){
            this.visible = true;
        },
      fetchCoverFile(path) {
        getParadigmFile(path).then(response => {
          this.coverFileUrl = URL.createObjectURL(response);
        }).catch(error => {
          console.error('Failed to fetch cover file', error);
        });
      },
      //发送范式到touch screen
      sendParamdigm(){
        console.log("send paradigm to touch screen");
      },
      fetchParadigmFiles(paths) {
        getParadigmFile(paths).then(response => {
            this.paradigmFiles.push({
            name: this.extractFileName(paths),
            url: URL.createObjectURL(response)
            });
        }).catch(error => {
            console.error('Failed to fetch paradigm file', error);
        });
        
      },
      extractFileName(path) {
        return path.split('/').pop();
      },
      resetData() {
        this.coverFileUrl = '';
        this.paradigmFiles = [];
      }
    }
  };
  </script>
  
  <style scoped>
  .box-card {
    margin-bottom: 20px;
  }
  </style>
  