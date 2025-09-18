<template>
  <!-- 心率图表容器 -->
  <div ref="heartChart" class="myChart"></div>
</template>

<script>
import * as echarts from 'echarts';
import i18n from '../../language';

export default {
  props: {
    eData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataA: [], // 存储心率数据
      idx: [],   // 存储时间索引
      xnum: 0,   // 索引计数器
      myEcharts:null  //图表对象
    }
  },
  methods: {
    // 添加新数据点
    addData(shift) {
      console.log("更新数据")
      const now = new Date().getSeconds(); // 以秒为单位的时间戳
      this.idx.push(this.xnum++);          // 增加时间索引
      this.dataA.push(this.eData.data);    // 添加心率数据
      if (shift) {
        this.idx.shift();                // 移除最旧的时间索引
        this.dataA.shift();              // 移除最旧的心率数据
      }

    },
    // 用于调试输出心率数据
    getType() {
      console.log(this.eData.data);
    },
    updateChart(){
      this.addData(true);
      this.myEcharts.setOption({
        xAxis: {
          data: this.idx
        },
        series: [{
          name: '心率',
          type: 'line',
          data: this.dataA
        }]
      });
    }
  },
  watch: {
    eData: {
      handler() {
        console.log("变化了")
        this.updateChart();
      },
      deep: true
    }
  },
  mounted() {
    console.log("心率图表正常加载");

    this.$nextTick(() => {
      // 确保心率图表容器已挂载并且有尺寸
      const chartDom = this.$refs.heartChart;
      if (!chartDom) {
        console.error("心率图表容器未挂载");
        return;
      }

      // 检查容器的宽度和高度是否正确设置
      if (chartDom.clientWidth === 0 || chartDom.clientHeight === 0) {
        console.error("心率图表容器的尺寸不正确");
        return;
      }

      // 初始化 ECharts 实例
      this.myEcharts = echarts.init(chartDom);

      // 初始化图表数据
      for (let i = 0; i < 50; i++) {
        this.addData(false);
      }

      // 配置图表选项
      let option = {
        color: ['#9491b3'], // 图表颜色
        title: {
          text: i18n.global.t('signal.heartRate'), // 图表标题
          left: "center"
        },
        xAxis: {
          type: "category", // X轴类型
          boundaryGap: false, // 边界间隙
          data: this.idx, // X轴数据
          show: false // 隐藏X轴
        },
        yAxis: {
          type: "value", // Y轴类型
          min: function (value) {
            return value.min;
          },
          max:function (value) {
            return value.max;
          },
          show: true // 显示Y轴
        },
        tooltip: {
          axisPointer: {
            type: "cross" // 提示框的类型
          }
        },
        grid: {
          left: "10%",
          right: "10%",
          top: "20%",
          bottom: "20%"
        },
        series: [
          {
            name: "心率",
            type: "line", // 数据系列类型
            stack: "a",
            data: this.dataA, // 数据系列
            smooth: true, // 平滑曲线
            symbol: 'none', // 数据点标记
            emphasis: {
              focus: "series"
            }
          },
        ],
      };

      
      // 每秒更新一次图表数据
      // setInterval(() => {
      //   this.addData(true);
      //   myEcharts.setOption({
      //     xAxis: {
      //       data: this.idx
      //     },
      //     series: [{
      //       name: '心率',
      //       data: this.dataA
      //     }]
      //   });
      // }, 1000);
      // 设置图表选项
      this.myEcharts.setOption(option);
      // 监听窗口大小变化，自动调整图表大小
      window.addEventListener("resize", () => {
        this.myEcharts.resize();
      });
    });
  }
}
</script>

<style scoped>
.myChart {
  width: 100%;
  height: 190px;
  /* 可以选择添加边框样式 */
  /* border: 1px solid rgba(74, 72, 197, 0.623); */
}
</style>
