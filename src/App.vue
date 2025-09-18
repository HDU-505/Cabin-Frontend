<template>
  <router-view></router-view>
</template>

<script>

import { getD } from './api'
import {provide} from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  components:{
 
  },
  // setup(){
  //   provide("echarts",echarts)
  //   provide("axios",axios)
  // }
  
}
</script>

<style>
body {
  margin: 0px;
}
</style>

