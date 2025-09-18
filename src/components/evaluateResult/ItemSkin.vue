<template>
  <div ref="skinChart" class="myChart"></div>
  <!-- <button @click="getType">click</button> -->
</template>

<script>
import * as echarts from 'echarts'
import i18n from '../../language'
// import {roma} from '../assets/index'
export default {

    components: {
        
    },
    props: {
       
        skinData:{
            type:Object
        }
    },
    data(){
        return{
            dataA:[],
            date:[],
            idx:[],
            xnum : 0,
            // hh : new Date().getHours(),
            // mf : new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes(),
            // ss : new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds(),
            // ms : new Date().getMilliseconds()<10 ? '0'+ new Date().getMilliseconds() : new Date().getMilliseconds(),
            // now : [this.mf,this.ss,this.ms]/join(':'),
        }
    },
    methods: {
        addData(shift){
            var hh = new Date().getHours();
            var mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            var ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            // var ms = new Date().getMilliseconds()<10 ? '0'+ new Date().getMilliseconds() : new Date().getMilliseconds();
            var now = ss;
            // console.log(now)
            this.idx.push(this.xnum++);
            this.dataA.push(this.skinData.data)

            // console.log(this.skinData.data)
            if (shift) {
                this.idx.shift();
                this.dataA.shift();
            }
        },
        getType(){
            console.log(this.eData.data)
        }
        
    },


    mounted(){
        
            console.log(this.skinData.eType)
             let skinEcharts = echarts.init(this.$refs.skinChart)
        
            for (var i = 1; i < 100; i++) {
                this.addData();
            }

            let option = {
                color:['#4A55A2'],
                title:{
                    text:i18n.global.t('signal.gsr'),
                    left:"center"

                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.idx,
                    show:false
                },
                yAxis: {
                    type: "value",
                    show: false,
                    
                    min: function (value) {
                        return value.min;
                    },
                    max:function (value) {
                        return value.max;
                    },
                    // min: 0.8,
                    // max: 1.0,
                    // inverse:true
                },
                tooltip:{
                    axisPointer:{
                        type:"cross"
                    }
                },
                grid: {
                    left:"10%",
                    right:"10%",
                    top:"20%",
                    bottom:"20%"
                },
                series: [
                    {
                        name: "皮肤电",
                        type: "line",
                        stack: "a",
                        data: this.dataA,
                        smooth:true,
                        symbol: 'none',
                        // areaStyle: {
                        //     color:'#3F2E3E'
                        // },
                        emphasis: {
                            focus: "series"
                        },
                        // markLine:{

                        // },
                    },
        
                ],
                // dataZoom:[
                //     {
                //         type:"slider",
                //         xAxisIndex: 0,
                //         filterMode:"none"
                //     },
                //     {
                //         type:"slider",
                //         yAxisIndex: 0,
                //         filterMode:"none"
                //     }
                // ],
            };
            setInterval(() => {
                this.addData(true);
                skinEcharts.setOption({
                    xAxis: {
                        data: this.idx
                    },
                    series: [
                    {
                        name: '皮肤电',
                        data: this.dataA
                    }
                    ],
                    tooltip:{
                        axisPointer:{
                            type:"cross"
                        }
                    },
                });

            }, 200);

        option && skinEcharts.setOption(option);    
        

        window.addEventListener("resize", () => {
            skinEcharts.resize()
        })
        
       

            
    }

}
</script>

<style scoped>
.myChart{
    width: 100%;
    height: 190px;
    /* border: 1px solid rgba(74, 72, 197, 0.623); */
    /* margin-left: 10%; */
}

</style>