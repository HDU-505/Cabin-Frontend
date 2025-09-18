<template>
  <div ref="eegChart" class="EEGChart"></div>
</template>

<script>
import * as echarts from 'echarts'
import { ref, watch, onUnmounted } from 'vue';
export default {
    components: {
        
    },
    props: {
        eegdata:{
            type:Object,
            required: true
        }
    },
    data(){
        return{
            dataA:[],
            date:[],
            idx:[],
            xnum : 0,    
            eegEcharts: null, //图表对象
            smoothedData:null,  //平滑后的数据
            window:[],  //滑动窗口
            windowSize:25,   //滑动窗口大小
            updateInterval: 100, //每200ms更新一次
            sampleIntervalId: null, //采样更新数据的intervalid
        }
    },
    watch: {
        eegdata: {
            handler(newVal) {
                // 将新的数据加入窗口
                this.window.push(newVal.rtdata);

                // 保持窗口大小
                if (this.window.length > this.windowSize) {
                    this.window.shift();
                }
            },
            deep: true
        }
    },
    
    methods: {
        // addData(shift){
        //     this.idx.push(this.xnum++);
        //     this.dataA.push(this.eegdata.rtdata)
        //     if (shift) {
        //         this.idx.shift();
        //         this.dataA.shift();
        //     }
        // }, 
        addData(shift,data){
            this.idx.push(this.xnum++);
            this.dataA.push(data)
            if (shift) {
                this.idx.shift();
                this.dataA.shift();
            }
        }, 
        updateChart(smoothedData){
            this.addData(true,smoothedData);
            this.eegEcharts.setOption({
                xAxis: {
                    data: this.idx
                },
                series: [
                {
                    name: '脑电',
                    data: this.dataA
                }
                ],
                tooltip:{
                    axisPointer:{
                        type:"cross"
                    }
                },
            });
        },
        startSampling() {
        this.sampleIntervalId = setInterval(() => {
            if (this.window.length > 0) {
                // 计算滑动窗口的平均值
                const sum = this.window.reduce((acc, val) => acc + val, 0);
                const avg = sum / this.window.length;
                // 更新平滑后的数据
                this.smoothedData = avg;
                this.updateChart(this.smoothedData);
            }
            }, this.updateInterval);
        },
        stopSampling() {
            clearInterval(this.sampleIntervalId);
        }
    },
    // watch: {
    //     eegdata: {
    //     handler() {
    //         console.log("变化了")
    //         this.updateChart();
    //     },
    //     deep: true
    //     }
    // },
    mounted(){
        console.log("脑电正常加载")
        this.eegEcharts = echarts.init(this.$refs.eegChart)
        for (var i = 1; i < 200; i++) {
            this.addData(false,0);
        }
        let option = {
            color:['#2D4356'],
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: this.idx,
                show:false,
            },
            yAxis: {
                type: "value",
                show: true,
                boundaryGap:[0,'50%'],
                name:this.eegdata.name,
                nameLocation:"middle",
                nameTextStyle:{
                    fontSize:10,     
                },
                axisLabel:{
                    show:false
                },
                nameRotate:-360,
                nameGap:20,
                min: function (value) {
                    return value.min;
                },
                max:function (value) {
                    return value.max;
                },
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
                    name: "脑电",
                    type: "line",
                    stack: "a",
                    data: this.dataA,
                    smooth:true,
                    symbol: 'none',
                    markLine:{
                    },
                    lineStyle:{
                        width:1
                    },
                    emphasis: {
                        focus: "series"
                    }
                },
    
            ],
            
        };
        // setInterval(() => {
        //     this.addData(true);
        //     eegEcharts.setOption({
        //         xAxis: {
        //             data: this.idx
        //         },
        //         series: [
        //         {
        //             name: '脑电',
        //             data: this.dataA
        //         }
        //         ],
        //         tooltip:{
        //             axisPointer:{
        //                 type:"cross"
        //             }
        //         },
        //     });
        // }, 30);

        option && this.eegEcharts.setOption(option);    

        window.addEventListener("resize", () => {
            this.eegEcharts.resize()
        })
        this.startSampling(); // 开始采样更新数据
    },
    beforeUnmount() {
        this.stopSampling() //在组件卸载前停止采样
    }

}
</script>

<style scoped>
.EEGChart{
    width: 100%;
    height:80px;
    /* margin-top: -2%; */
    /* border: 1px solid rgba(74, 72, 197, 0.623); */
    /* margin-left: 10%; */
}

</style>