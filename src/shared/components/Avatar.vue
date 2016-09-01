<script>
/**
 * @ignore  =====================================================================================
 * @fileoverview 对 https://github.com/eliep/vue-avatar.git 进行部分修改:
 *    使用字符串设置大小，这样就能灵活使用各种单位，比如rem，
 *    形状默认不为圆形,
 *    添加`borderRadius`和`margin`属性,
 *    只要src属性为空值即判断为非图片
 * @author  devinzhong@outlook.com
 * @version 0.4.0
 * @ignore  created in 2016-8-31
 * @ignore  =====================================================================================
 */

export default {
  props: {
    username: {
      type: String,
      default: '',
    },
    initials: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
      default: '2rem',
    },
    src: {
      type: String,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    borderRadius: {
      type: String,
      default: '.25rem',
    },
    margin: {
      type: String,
      required: false,
      default: '.25rem',
    },
    lighten: {
      type: Number,
      default: 80,
    },
  },

  data() {
    return {
      backgroundColors: [
        '#F44336', '#FF4081', '#9C27B0', '#673AB7',
        '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#CDDC39', /* '#FFEB3B' ,*/ '#FFC107',
        '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
    }
  },

  compiled() {
    this.$emit('avatar-initials', this.username, this.userInitial)
  },

  computed: {
    background() {
      return this.backgroundColor ||
              this.randomBackgroundColor(this.username.length, this.backgroundColors)
    },

    fontColor() {
      return this.color || this.lightenColor(this.background, this.lighten)
    },

    style() {
      const style = {
        flex: 'none',
        width: this.size,
        height: this.size,
        borderRadius: this.rounded ? '50%' : (this.borderRadius || 0),
        margin: this.margin,
      }

      const imgBackgroundAndFontStyle = {
        background: `url(${this.src}) 0% 0% / 100% 100% no-repeat content-box`,
      }

      const initialBackgroundAndFontStyle = {
        backgroundColor: this.background,
        fontSize: `${parseFloat(this.size) / 2}rem`,
        fontWeight: 'bold',
        color: this.fontColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }

      const backgroundAndFontStyle = this.src
        ? imgBackgroundAndFontStyle
        : initialBackgroundAndFontStyle

      Object.assign(style, backgroundAndFontStyle)

      return style
    },

    userInitial() {
      const initials = this.initials || this.initial(this.username)
      return initials
    },
  },

  methods: {
    initial(username) {
      const parts = username.split(/[ -]/)
      let initials = ''

      for (let i = 0; i < parts.length; i++) {
        initials += parts[i].charAt(0)
      }

      if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
        initials = initials.replace(/[a-z]+/g, '')
      }

      initials = initials.substr(0, 3).toUpperCase()

      return initials
    },

    randomBackgroundColor(seed, colors) {
      return colors[seed % (colors.length)]
    },

    lightenColor(hexRaw, amt) {
      // From https://css-tricks.com/snippets/javascript/lighten-darken-color/
      let hex = hexRaw
      let usePound = false

      if (hex[0] === '#') {
        hex = hex.slice(1)
        usePound = true
      }

      const num = parseInt(hex, 16)
      let r = (num >> 16) + amt

      if (r > 255) r = 255
      else if (r < 0) r = 0

      let b = ((num >> 8) & 0x00FF) + amt

      if (b > 255) b = 255
      else if (b < 0) b = 0

      let g = (num & 0x0000FF) + amt

      if (g > 255) g = 255
      else if (g < 0) g = 0

      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    },
  },
}
</script>


<template>
  <div class="avatar" :style="style">
    <span v-if="!src">{{ userInitial }}</span>
  </div>
</template>
