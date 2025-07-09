<template>
  <div class="nav-container">
    <div class="nav">
      <Button
        :isActive="activeButton === 'nav'"
        @click="setActiveButton('nav')"
      >
        Навигация
      </Button>
      <Button
        :isActive="activeButton === 'team'"
        @click="setActiveButton('team')"
      >
        Тренерский состав
      </Button>
      <Button
        :isActive="activeButton === 'services'"
        @click="setActiveButton('services')"
      >
        Услуги
      </Button>
    </div>
    <div class="search-btn" @click="$emit('openSearch')">
      <div class="search">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.5605 3.5C40.8419 3.5 51.6222 14.0966 51.624 27.1865L51.6172 27.7588C51.4781 33.4799 49.259 38.6832 45.7031 42.7051L59.8193 56.5967L59.9727 56.7627C60.1173 56.9357 60.2356 57.1301 60.3232 57.3389L60.4004 57.5508C60.4665 57.7662 60.5001 57.9907 60.5 58.2168L60.4883 58.4424C60.4657 58.6668 60.4102 58.8871 60.3223 59.0957C60.2053 59.373 60.0335 59.6235 59.8184 59.834L59.8193 59.835C58.9738 60.6679 57.6364 60.7201 56.7295 59.9912L56.5547 59.835L42.3525 45.8594C38.2712 48.9963 33.1396 50.873 27.5605 50.873C14.2794 50.8728 3.50008 40.2763 3.5 27.1865C3.5 14.0967 14.2794 3.50024 27.5605 3.5ZM27.5605 8.06738C16.819 8.06762 8.125 16.635 8.125 27.1865C8.12508 37.738 16.8191 46.3054 27.5605 46.3057C38.3023 46.3057 46.997 37.7381 46.9971 27.1865C46.9971 16.6349 38.3023 8.06738 27.5605 8.06738Z"
            fill="#ffffff"
            stroke="none"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './UI/Button.vue';

const emit = defineEmits(['active-menu', 'openSearch'])

const activeButton = ref<string | null>('nav');
const setActiveButton = (button: string) => {
  activeButton.value = button;
  emit('active-menu', activeButton.value)
};
</script>


<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;
.nav-container {
    background-color: $white-color;
    max-width: 3680px;
    width: 100%;
    height: 278px;
    padding: 80px 40px 40px 40px;
    border-bottom-left-radius: 70px;
    border-bottom-right-radius: 70px;
    display: flex;
    gap: 40px;
    align-items: center;
    .nav {
        background-color: $block-bg;
        max-width: 3402px;
        width: 100%;
        height: 158px;
        display: flex;
        border-radius: 64px;
        button {
           width: 1134px;
           height: 158px;
           background-color: transparent;
           font-size: 40px;
           font-weight: 700;
           border: none;
           transition: all 0.1s ease-in-out;
           &:active {
            transform: scale(1);
          }
        }
    }
    .search-btn {
        max-width: 158px;
        height: 158px;
        width: 100%;
        .search {
            background-color: $button-active;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 64px;
        }
    }
}
</style>