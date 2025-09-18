<template>
  <!-- <p>HTML的video标签</p> -->
    <video :src="base_path + path" id="eee" controls="controls" class="myPara">
        您的浏览器不支持视频播放标签
    </video>
    <!-- <a href=""> {{route.query?.p}} </a> -->

    <!-- <p>vue-vedio-player插件</p>
    <div class="demo">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player>
    </div> -->


</template>

<script>

import emitter from '../../public'
// import { useRoute } from 'vue-router';
// const route = useRoute()
export default {
//   components: {
//     videoPlay
//   },
  mounted(){
      //  emitter.on("path_123", (val) => {
      //       // console.log("EEG", val);
      //       console.log(val);
      //       this.aaa = val
      //       console.log("111"+val);
      //       console.log(this.aaa);
      //       // console.log(this.page_msg)
      //       let id = document.getElementById("eee")
      //       id.src = "http://localhost:8088/" + val 
      //   });
  },
  // beforeCreate(){
  //   emitter.on("film_path", (val) => {
  //       // console.log("EEG", val);
  //       // console.log(val);
  //       console.log("111"+val);
  //       this.aaa = val
  //       console.log(this.aaa);
  //       // console.log(this.page_msg)
  //     });
  // },
  data() {
    return {
      path: this.$route.query.path,
      base_path:"http://localhost:8088",
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: 'video/mp4',
            //url地址
            src: 'http://localhost:8088/media/playFilm/4',
            // src: require('../../assets/video/movie.mp4'),
          },
        ],
        //你的封面地址
        poster:
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn21%2F762%2Fw1000h562%2F20180815%2Fb5f2-hhtfwqr8860663.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611738381&t=da92135b776dafe17ac486dc2b7dbe30',
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true, //当前时间和持续时间的分隔符
          durationDisplay: true, //显示持续时间
          remainingTimeDisplay: false, //是否显示剩余时间功能
          fullscreenToggle: true, //全屏按钮
        },
      },
    }
  },


}
</script>


<style scoped>
.demo {
  display: inline-block;
  width: 100%;
  height: 338px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
 
.demo:hover {
  display: block;
}
.myPara{
  height: 80%;
  width:80%;
  margin-left: 7%;
  margin-top: 3%;
  border: 1px solid #333;
}
</style>