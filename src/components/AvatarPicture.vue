<template>
  <span :style="avatarStyle" v-bind="$attrs" />
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    size: { type: [Number, String], default: 48 },
    rounded: { type: [Number, String], default: 0 },
    toyNumber: {
      type: [Number, String],
      default: 1,
      validator: value => value >= 1 && value <= 18,
    },
  },
  setup(props) {
    const rows = 3
    const cols = 6
    const spriteUrl =
      "url('https://user-images.githubusercontent.com/58827166/184355357-0b278997-c163-45cf-a575-19f532b07864.jpg')"

    const posX = computed(() => (props.toyNumber - 1) % cols)
    const posY = computed(() => Math.floor((props.toyNumber - 1) / cols))

    const avatarStyle = computed(() => ({
      display: 'inline-block',
      width: props.size + 'px',
      height: props.size + 'px',
      backgroundImage: spriteUrl,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${props.size * cols}px ${props.size * rows}px`,
      backgroundPositionX: `-${posX.value * props.size}px`,
      backgroundPositionY: `-${posY.value * props.size}px`,
      borderRadius: props.rounded + 'px',
      cursor: 'pointer',
      transition: 'border 0.2s',
    }))

    return { avatarStyle }
  },
})
</script>
