<template>
  <div class="app-container">
    <mark-slider class="left-container" :list="data"></mark-slider>
    <div class="content-container">
      <mark-header class="header"></mark-header>
      <sketch-pad v-if="imageInfo" :image-info="imageInfo" :rects="rects" class="sketch-pad"></sketch-pad>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MarkHeader from '@/components/Header'
import MarkSlider from '@/components/Slider'
import SketchPad from '@/components/Sketchpad'

export default {
  components: {
    MarkHeader,
    MarkSlider,
    SketchPad
  },
  computed: {
    ...mapState('Mark', ['data', 'current']),
    imageInfo () {
      return this.data && this.data[this.current.index]
    },
    rects () {
      var result = []
      result = this.imageInfo.xml2json.annotation.object.reduce((preVal, currentRect) => {
        var r = currentRect
        if (currentRect.part) {
          var rs = currentRect.part.map(r => {
            return {
              x: parseInt(r.bndbox.xmin),
              y: parseInt(r.bndbox.ymin),
              width: parseInt(r.bndbox.xmax) - parseInt(r.bndbox.xmin),
              height: parseInt(r.bndbox.ymax) - parseInt(r.bndbox.ymin),
              name: r.name,
              pose: r.pose
            }
          })
          // preVal.concat(rs)
          preVal.push.apply(preVal, rs)
        }
        preVal.push({
          x: parseInt(r.bndbox.xmin),
          y: parseInt(r.bndbox.ymin),
          width: parseInt(r.bndbox.xmax) - parseInt(r.bndbox.xmin),
          height: parseInt(r.bndbox.ymax) - parseInt(r.bndbox.ymin),
          name: r.name,
          pose: r.pose
        })
        return preVal
      }, [])
      return result

      // return this.imageInfo.xml2json.annotation.object.map(rect => {
      //   var r = rect
      //   var obj = {}
      //   if (rect.part) {
      //     r = rect.part
      //     obj = {
      //       x: parseInt(r.bndbox.xmin),
      //       y: parseInt(r.bndbox.ymin),
      //       width: parseInt(r.bndbox.xmax) - parseInt(r.bndbox.xmin),
      //       height: parseInt(r.bndbox.ymax) - parseInt(r.bndbox.ymin),
      //       name: r.name,
      //       pose: r.pose
      //     }
      //   } else {
      //     obj = {
      //       x: parseInt(r.bndbox.xmin),
      //       y: parseInt(r.bndbox.ymin),
      //       width: parseInt(r.bndbox.xmax) - parseInt(r.bndbox.xmin),
      //       height: parseInt(r.bndbox.ymax) - parseInt(r.bndbox.ymin),
      //       name: r.name,
      //       pose: r.pose
      //     }
      //   }

      // })
    }
  },
  methods: {
    getRects (obj) {
      if (typeof obj === 'object') {
        if (obj.bndbox) {
          return obj.bndbox
        }
      }
    }
  },
  data () {
    return {
      dataList: null
    }
  },
  created () {
    // console.log(this.scale, this.data)
  }
}
</script>
<style scoped>
.app-container{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.left-container{
  display: flex;
  flex-direction: column;
  flex: none;
  background-color: antiquewhite;
}
.content-container{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 5 0 auto;
}
.header {
  background-color: burlywood;
  height: 61px;
}
.sketch-pad{
  display: flex;
  background-color:#ebebeb;
}
</style>
