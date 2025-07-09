<template>
  <button :class="{ active: isActive }" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  isActive: Boolean,
});

defineEmits(['click']);
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;

button {
  border-radius: 64px;
  width: 100%;
  height: 100%;
  outline: none;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  transition: color 0.4s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    background-color: $button-active;
    width: 100%;
    height: 100%;
    border-radius: 64px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  &.active {
    color: $white-color;

    &::before {
      transform: translate(-50%, -50%) scale(1);
    }
  }
}
</style>