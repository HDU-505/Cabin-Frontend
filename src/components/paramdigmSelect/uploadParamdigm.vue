<template>
  <el-dialog v-model="visible" title="Upload Form" center :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" @submit.native.prevent>
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="Cover File" prop="coverFile">
        <el-upload
          class="upload-demo"
          list-type="picture-card"
          :file-list="form.coverFile"
          :on-change="handleCoverFileChange"
          :before-upload="beforeCoverFileUpload"
          :on-remove="handleCoverFileRemove"
          action="http://localhost:8080/paradigm/uploadCoverFile"
          :limit="1"
          :auto-upload="true"
        >
          <div class="upload-content">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or click to upload</div>
          </div>
        </el-upload>

      </el-form-item>
      <div class="el-upload__tip">Suggested size: 190x180px, Max size: 5MB</div>
      <el-form-item label="Paradigm File (zip)" prop="paradigmFile">
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/paradigm/uploadParadigmFile"
          :file-list="form.paradigmFile"
          :on-change="handleParadigmFileChange"
          :before-upload="beforeParadigmFileUpload"
          :on-remove="handleParadigmFileRemove"
          :auto-upload="true"
          :limit="1"
          accept=".zip"
        >
          <div class="upload-content">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or click to upload</div>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Submit</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {uploadParadgims} from '@/api/paradigm.js'

export default {
  name: 'ModalForm',
  data() {
    return {
      visible: false,
      form: {
        name: '',
        description: '',
        coverFile: [],
        paradigmFile: [],
      },
      coverPreview: '',
      rules: {
        name: [
          { required: true, message: 'Please input the name', trigger: 'blur' },
        ],
        coverFile: [
          { required: true, message: 'Please upload the cover file', trigger: 'change' },
        ],
        paradigmFile: [
          { required: true, message: 'Please upload the paradigm file', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    openDialog() {
      this.visible = true;
    },
    handleCoverFileChange(file, fileList) {
      this.form.coverFile = fileList;
      if (fileList.length > 0) {
        this.coverPreview = URL.createObjectURL(file.raw);
      } else {
        this.coverPreview = '';
      }
    },
    beforeCoverFileUpload(file) {
      console.log("封面文件类型检测")
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error('The file size should be less than 5MB.');
      }
      return isLt5M;
    },
    handleCoverFileRemove(file, fileList) {
      this.form.coverFile = fileList;
      this.coverPreview = '';
    },
    handleParadigmFileChange(file, fileList) {
      this.form.paradigmFile = fileList;
    },
    beforeParadigmFileUpload(file) {
      console.log("范式文件类型检查")
      const fileName = file.name;
      const fileExtension = fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
      const isZip = fileExtension === 'zip';
      if (!isZip) {
        this.$message.error('You can only upload zip files.');
      }
      return isZip;
    },

    handleParadigmFileRemove(file, fileList) {
      this.form.paradigmFile = fileList;
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // Create FormData object
          let formData = new FormData();
          // Append form data
          formData.append('name', this.form.name);
          formData.append('description', this.form.description);
          // Append cover file
          if (this.form.coverFile.length > 0) {
            formData.append('file1', this.form.coverFile[0].raw);
          }
          // Append paradigm file
          if (this.form.paradigmFile.length > 0) {
            formData.append('file2', this.form.paradigmFile[0].raw);
          }
          // Append other paradigm data (if needed)
          formData.append('paradigm', JSON.stringify(this.form.paradigm));

          // Send FormData to backend
          
          uploadParadgims(this.form).then(response => {
              console.log('Upload success', response);
              this.visible = false;
            })
            .catch(error => {
              console.error('Upload failed', error);
            });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.upload-demo .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  background-color: #fafafa;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
}
.upload-demo .el-upload:hover {
  border-color: #409EFF;
}
.upload-content {
  text-align: center;
}
.el-input {
  width: 50%;
}
.dialog-footer {
  text-align: center;
}
.dialog-footer >>> .el-button {
  width: 150px;
}
.el-upload__tip {
  margin-top: 0px;
  font-size: 12px;
  color: #999;
  margin-left: 120px;
}

</style>
