<template>
    <el-button circle style="margin-right: 1%">
        <el-icon ref="off" class="icon1" @click="changeIcon1()" style="display: block"><Mute /></el-icon>
        <el-icon ref="on" class="icon2" @click="changeIcon2()" style="display: none"><Microphone /></el-icon>
    </el-button>
</template>

<script>
import { Opportunity,VideoCamera,Microphone,Mute } from '@element-plus/icons-vue'
import {ElButton} from 'element-plus'
import {ref} from 'vue'
import { getD } from '../../api'
export default {
    components:{
        Microphone,Mute,ref,ElButton
    },
    data(){
        return {
            url_startmicro:"/camera/startMicro",
            url_stopmicro:"/camera/stopMicro",
        }
    },
    methods:{

        // changeIcon1(){
        //     console.log("1");
        //     this.$refs.on.style.display = "block";
        //     this.$refs.off.style.display = "none";
        // },
        // changeIcon2(){
        //     console.log("2");
        //     this.$refs.on.style.display = "none";
        //     this.$refs.off.style.display = "block";
        // }

        changeIcon1(){
            console.log("1");
            // this.$refs.on.style.display = "block";
            // this.$refs.off.style.display = "none";
            var elems = document.getElementsByClassName('icon1');
            for (var i=0;i<elems.length;i+=1){
            elems[i].style.display = 'none';
            }
            var elems = document.getElementsByClassName('icon2');
            for (var i=0;i<elems.length;i+=1){
            elems[i].style.display = 'block';
            }
            getD(this.url_startmicro)
                    .then(response => {
                        // resolve(response)
                        console.log(response)
                    })
                    .catch(err => {
                        reject(err)
                    })
        },
        
        changeIcon2(){
            console.log("2");
            // this.$refs.on.style.display = "none";
            // this.$refs.off.style.display = "block";
            var elems = document.getElementsByClassName('icon2');
            for (var i=0;i<elems.length;i+=1){
            elems[i].style.display = 'none';
            }
            var elems = document.getElementsByClassName('icon1');
            for (var i=0;i<elems.length;i+=1){
            elems[i].style.display = 'block';
            }
            getD(this.url_stopmicro)
        }
    }
}
</script>