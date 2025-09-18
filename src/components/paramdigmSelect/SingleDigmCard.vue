<template>
<el-row>
    <el-row>
        <el-card class="digmCard">
            <slot></slot>
        </el-card>
    </el-row>
        
    
</el-row>


</template>

<script>
import 'element-plus/es/components/message/style/css'
import { ElCard } from 'element-plus'
export default {
    components:{
        ElCard
    }

}
</script>

<style>
.digmCard{
    height: 95%;
    width: 90%;
    margin-top:2%;
}

</style>