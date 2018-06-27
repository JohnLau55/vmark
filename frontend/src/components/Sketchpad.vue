<template>
  <div class="vmark-page" :style="{lineHeight: `${windowHeight}px`, fontWeight: 'bolder'}">
    <div class="vmark-page-arrow vmark-page-left" :style="disableArrowLeftStyle" @click="onChangePage('pre')"><i class="el-icon-arrow-left"></i></div>
    <el-button type="primary" class="vmark-save-btn" size="small">保存</el-button>
    <div class="vmark-sketchpad" :style="cursorStyle">
      <v-stage ref="stage" :config="configKonva" style="box-shadow: 5px 5px 10px #999;">
        <v-layer ref="layer">
          <v-image v-if="configImage.image"
            @mousedown="onMarkStart"
            @mousemove="onMarkMove"
            @mouseup="onMarkEnd" :config="configImage"></v-image>
          <v-rect v-if="configImage.image" v-for="(rect, index) in configRects" :key="'layer_rect_' + index" :ref="'layer_rect_' + index"
            @mouseover="onRectMouseOver(index)"
            @mouseout="onRectMouseOut(index)" :config="rect"></v-rect>
          <v-text v-if="configImage.image" v-for="(text, index) in configTexts" :key="'layer_text_' + index" :ref="'layer_text_' + index"
            :config="text"></v-text>
        </v-layer>
      </v-stage>
    </div>
    <div class="vmark-page-arrow vmark-page-right" :style="disableArrowRightStyle" @click="onChangePage('next')"><i class="el-icon-arrow-right"></i></div>
    <edit-attribute-dlg :visable="true"></edit-attribute-dlg>
    <global-events
      @keydown.left="onChangePage('pre')"
      @keydown.right="onChangePage('next')"
    />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import GlobalEvents from 'vue-global-events'
import editAttributeDlg from '@/components/editAttributeDlg'

export default {
  props: ['imageInfo', 'rects'],
  components: {
    GlobalEvents,
    editAttributeDlg
  },
  data () {
    return {
      isMarking: false,
      isShowEditDlg: false,
      // rectsLocal: [],

      configImage: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        image: null
      }
    }
  },
  watch: {
    imageInfo () {
      this.initImage()
    }
  },
  computed: {
    ...mapState('Mark', ['total', 'data', 'current']),
    configKonva () {
      return {
        width: this.canvasWidth,
        height: this.canvasHeight
      }
    },
    cursorStyle () {
      return this.isMarking ? {cursor: 'crosshair'} : {cursor: 'default'}
    },
    windowWidth () {
      return parseInt(window.innerWidth)
    },
    windowHeight () {
      return parseInt(window.innerHeight)
    },
    canvasWidth () {
      return this.configImage.width
    },
    canvasHeight () {
      return this.configImage.height
    },
    sketchpadHeight () {
      return this.windowHeight - 61
    },
    configRects () {
      return this.rectsLocal.map(rect => {
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          stroke: '#FFFF00',
          strokeWidth: 1
        }
      })
    },
    configTexts () {
      return this.rectsLocal.map(rect => {
        return {
          x: rect.x,
          y: rect.y,
          fontSize: 0,
          text: `name: ${rect.name}, pose: ${rect.pose}`,
          fill: '#FF6666'
        }
      })
    },
    disableArrowLeftStyle () {
      if (this.current.index <= 0) {
        return {
          cursor: 'not-allowed',
          backgroundColor: 'rgba(255, 255, 255, .65)'
        }
      }
    },
    disableArrowRightStyle () {
      if (this.current.index >= this.total - 1) {
        return {
          cursor: 'not-allowed',
          backgroundColor: 'rgba(255, 255, 255, .65)'
        }
      }
    },
    rectsLocal () {
      return this.rects.slice()
    }
  },
  methods: {
    ...mapActions('Mark', ['GET_XML']),
    initImage () {
      this.configImage.image = null
      var image = new Image()
      image.onload = function () {
        var imageHeight = parseInt(image.height)
        var imageWidth = parseInt(image.width)
        if (imageHeight > this.sketchpadHeight) {
          var diff = imageHeight - this.sketchpadHeight
          this.imageInfo.scale = 1 - diff / imageHeight
          this.imageInfo.w = this.imageInfo.scale * imageWidth
          this.imageInfo.h = this.imageInfo.scale * imageHeight
        } else {
          this.imageInfo.w = imageWidth
          this.imageInfo.h = imageHeight
        }
        this.imageInfo.image = image
        this.imageInfo.width = imageWidth
        this.imageInfo.height = imageHeight

        this.configImage.width = this.imageInfo.w
        this.configImage.height = this.imageInfo.h
        this.configImage.image = this.imageInfo.image
      }.bind(this)
      image.src = this.imageInfo.url
    },
    onChangePage (status) {
      if (status === 'next') {
        if (this.current.index < this.total - 1) {
          this.current.index++
        }
      } else {
        if (this.current.index > 0) {
          this.current.index--
        }
      }
    },
    onRectMouseOver (refIndex) {
      this.$refs['layer_rect_' + refIndex][0].getStage().setStroke('#FF0000')
      this.$refs['layer_rect_' + refIndex][0].getStage().draw()
      this.$refs['layer_text_' + refIndex][0].getStage().setFontSize(14)
      this.$refs['layer_text_' + refIndex][0].getStage().draw()
    },
    onRectMouseOut (refIndex) {
      this.$refs['layer_rect_' + refIndex][0].getStage().setStroke('#FFFF00')
      this.$refs['layer_rect_' + refIndex][0].getStage().draw()
      this.$refs['layer_text_' + refIndex][0].getStage().setFontSize(0)
      this.$refs['layer_text_' + refIndex][0].getStage().draw()
      this.$refs.layer.getStage().draw()
    },
    onMarkStart (vueComponent, event) {
      const mousePos = this.$refs.stage.getStage().getPointerPosition()
      const x = mousePos.x
      const y = mousePos.y
      this.rectsLocal.unshift({
        x: x,
        y: y,
        width: 0,
        height: 0,
        name: 'name1',
        pose: 'pose1'
      })
      this.isMarking = true
      // this.$refs.layer.getStage().draw()
      // this.$refs.stage.getStage().draw()
      // console.log(this.rectsLocal, this.configRects)
      console.log('Start => x: ' + x + ', y: ' + y)
    },
    onMarkMove (vueComponent, event) {
      if (!this.isMarking) {
        return
      }
      const mousePos = this.$refs.stage.getStage().getPointerPosition()
      const x = mousePos.x
      const y = mousePos.y
      const startX = this.$refs['layer_rect_0'][0].getStage().getX()
      const startY = this.$refs['layer_rect_0'][0].getStage().getY()
      this.rectsLocal[0].width = x - startX
      this.rectsLocal[0].height = y - startY
    },
    onMarkEnd (vueComponent, event) {
      const mousePos = this.$refs.stage.getStage().getPointerPosition()
      const x = mousePos.x
      const y = mousePos.y
      this.isMarking = false
      this.isShowEditDlg = true
      console.log('End => x: ' + x + ', y: ' + y)
    }
  },
  created () {
    this.initImage()
    // this.rectsLocal = this.rects.slice()
  }
}
</script>
<style scoped>
.vmark-sketchpad {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vmark-page {
  display: flex;
  justify-content: space-between;
  /* position: relative; */
}
.vmark-page-arrow {
  width: 55px;
  background-color: rgba(255, 255, 255, .99);
  text-align: center;
  font-size: 22px;
  color: #000;
}
.vmark-page-arrow:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, .85);
}
.vmark-save-btn {
  position: absolute;
  /* float: right; */
  right: 105px;
  /* bottom: 10px; */
  top: 70px;
}
</style>
