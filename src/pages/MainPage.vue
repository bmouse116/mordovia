<template>
    <div class="main-page">
        <NavBar @active-menu="switchMenu" @openSearch="handleOpenSearch"></NavBar>
        <div class="body-container">
            <Map v-if="activeMenu === 'nav'" :floors="floors"></Map>
            <Trainers v-if="activeMenu === 'team'" :trainers="trainers"></Trainers>
            <Services v-if="activeMenu === 'services'" :services="services"></Services>
        </div>
        <div class="search-overlay" v-if="searchVisible">
            <div class="search-container">
                <div class="search-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Поиск"
                    v-model="searchQuery"
                    @keyup.enter="performSearch"
                >
                <button 
                    class="clear-btn" 
                    @click="clearSearch"
                    v-if="searchQuery"
                >
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.8402 19.84C20.5902 19.0909 21.6068 18.6702 22.6669 18.6702C23.7269 18.6702 24.7435 19.0909 25.4935 19.84L32.0002 26.3413L38.5069 19.8346C39.2616 19.1064 40.2722 18.7037 41.321 18.7133C42.3698 18.7229 43.3728 19.144 44.1141 19.886C44.8554 20.628 45.2756 21.6314 45.2842 22.6802C45.2928 23.729 44.8892 24.7393 44.1602 25.4933L37.6589 32L44.1655 38.5066C44.8938 39.2614 45.2965 40.272 45.2869 41.3208C45.2773 42.3696 44.8562 43.3726 44.1142 44.1139C43.3722 44.8552 42.3687 45.2754 41.3199 45.284C40.2711 45.2926 39.2609 44.889 38.5069 44.16L32.0002 37.6586L25.4935 44.1653C24.7388 44.8936 23.7282 45.2963 22.6794 45.2867C21.6306 45.2771 20.6275 44.8559 19.8862 44.114C19.145 43.372 18.7248 42.3685 18.7161 41.3197C18.7075 40.2709 19.1112 39.2607 19.8402 38.5066L26.3415 32L19.8349 25.4933C19.0858 24.7433 18.665 23.7266 18.665 22.6666C18.665 21.6066 19.0858 20.59 19.8349 19.84" fill="#C3B6BE"/>
                    </svg>
                </button>
                </div>
                <div class="search-variants">
                    <div class="variant">
                        <div class="img">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.5605 3.5C40.8419 3.5 51.6222 14.0966 51.624 27.1865L51.6172 27.7588C51.4781 33.4799 49.259 38.6832 45.7031 42.7051L59.8193 56.5967L59.9727 56.7627C60.1173 56.9357 60.2356 57.1301 60.3232 57.3389L60.4004 57.5508C60.4665 57.7662 60.5001 57.9907 60.5 58.2168L60.4883 58.4424C60.4657 58.6668 60.4102 58.8871 60.3223 59.0957C60.2053 59.373 60.0335 59.6235 59.8184 59.834L59.8193 59.835C58.9738 60.6679 57.6364 60.7201 56.7295 59.9912L56.5547 59.835L42.3525 45.8594C38.2712 48.9963 33.1396 50.873 27.5605 50.873C14.2794 50.8728 3.50008 40.2763 3.5 27.1865C3.5 14.0967 14.2794 3.50024 27.5605 3.5ZM27.5605 8.06738C16.819 8.06762 8.125 16.635 8.125 27.1865C8.12508 37.738 16.8191 46.3054 27.5605 46.3057C38.3023 46.3057 46.997 37.7381 46.9971 27.1865C46.9971 16.6349 38.3023 8.06738 27.5605 8.06738Z" fill="#C3B6BE" stroke="#C3B6BE"/>
                            </svg>
                        </div>
                        <span>Взрослый бассейн</span>
                    </div>
                    <div class="variant">
                        <div class="img">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.5605 3.5C40.8419 3.5 51.6222 14.0966 51.624 27.1865L51.6172 27.7588C51.4781 33.4799 49.259 38.6832 45.7031 42.7051L59.8193 56.5967L59.9727 56.7627C60.1173 56.9357 60.2356 57.1301 60.3232 57.3389L60.4004 57.5508C60.4665 57.7662 60.5001 57.9907 60.5 58.2168L60.4883 58.4424C60.4657 58.6668 60.4102 58.8871 60.3223 59.0957C60.2053 59.373 60.0335 59.6235 59.8184 59.834L59.8193 59.835C58.9738 60.6679 57.6364 60.7201 56.7295 59.9912L56.5547 59.835L42.3525 45.8594C38.2712 48.9963 33.1396 50.873 27.5605 50.873C14.2794 50.8728 3.50008 40.2763 3.5 27.1865C3.5 14.0967 14.2794 3.50024 27.5605 3.5ZM27.5605 8.06738C16.819 8.06762 8.125 16.635 8.125 27.1865C8.12508 37.738 16.8191 46.3054 27.5605 46.3057C38.3023 46.3057 46.997 37.7381 46.9971 27.1865C46.9971 16.6349 38.3023 8.06738 27.5605 8.06738Z" fill="#C3B6BE" stroke="#C3B6BE"/>
                            </svg>
                        </div>
                        <span>Взрослый бассейн</span>
                    </div>
                </div>
                <div class="keyboard">
                <Keyboard @close="handleCloseSearch"></Keyboard>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import Map from '../components/Map.vue'
import Trainers from '../components/Trainers.vue'
import Services from '../components/Services.vue'
import Keyboard from '../components/UI/Keyboard.vue';
const activeMenu = ref('nav')
const searchVisible = ref(false)

interface Trainer {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  image: string,
  position: string,
  phone: string
}
interface Services {
  id: number,
  title: string,
  type: string,
  price: number,
  periodPrice: number
}
interface Floors {
  id: number,
  name: string,
  mapImage: string
}

defineProps({
  trainers: {
    type: Array as () => Trainer[],
    required: true
  },
  services: {
    type: Array as () => Services[],
    required: true
  },
  floors: {
    type: Array as () => Floors[],
    required: true
  }
})


const switchMenu = (active: 'nav' | 'team' | 'services') => {
    activeMenu.value = active
}

const handleOpenSearch = () => {
    searchVisible.value = true
}

const handleCloseSearch = () => {
    searchVisible.value = false
}

const searchQuery = ref('');

const clearSearch = () => {
  searchQuery.value = '';
};

const performSearch = () => {
  // Логика поиска
  console.log('Searching for:', searchQuery.value);
};

</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;
.main-page {
    display: flex;
    flex-direction: column;
    gap: 40px;
    position: relative;

    .search-overlay{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        display: flex;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
        .search-container {
            margin-top: 80px;
            max-width: 1820px;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            animation: slideIn 0.5s ease-out;
            gap: 40px;
            .search-input-wrapper {
                position: relative;
                width: 100%;

                input {
                    width: 100%;
                    height: 151px;
                    border-radius: 70px;
                    outline: none;
                    font-size: 40px;
                    padding-left: 40px;
                    padding-right: 80px;
                    font-weight: bold;
                }

                .clear-btn {
                    position: absolute;
                    right: 40px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    width: 64px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.2s ease;

                    &:hover {
                    opacity: 0.8;
                    }

                    svg {
                    width: 100%;
                    height: 100%;
                    }
                }
            }
            .search-variants {
                width: 100%;
                border-radius: 70px;
                padding: 40px;
                background: $white-color;
                display: flex;
                flex-direction: column;
                gap: 20px;
                .variant {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    span {
                        font-size: 40px;
                        font-weight: bold;
                    }
                    .img {
                        background: $block-color;
                        border-radius: 30px;
                        padding: 29px;
                    }
                }
            }
            .keyboard {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                ::v-deep(.keyboard) {
                    position: absolute;
                    bottom: 288px;
                    animation: slideUp 0.4s ease-out;
                }
                ::v-deep(.cancel) {
                    position: absolute;
                    bottom: 120px;
                    animation: slideUp 0.4s ease-out;
                }
            }
        }
    }
}
.body-container {
    max-width: 3680px;
    width: 100%;
    height: 1842px;
    border-top-left-radius: 70px;
    border-top-right-radius: 70px;
    background-color: $white-color;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>