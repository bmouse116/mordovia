<template>
    <div v-if="isLoading" class="loader-container">
        <div class="spinner"></div>
    </div>
    <div v-else class="info-container">
        <div class="point-info" v-if="tenantData">
            <div class="point-header">
                <button @click="toBack">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M57.4545 29.5307H12.6897L26.1629 16.2982C26.4061 16.0676 26.6 15.7917 26.7334 15.4867C26.8668 15.1817 26.937 14.8537 26.94 14.5217C26.9429 14.1898 26.8785 13.8606 26.7505 13.5533C26.6225 13.2461 26.4335 12.967 26.1945 12.7322C25.9555 12.4975 25.6713 12.3119 25.3585 12.1862C25.0456 12.0605 24.7104 11.9972 24.3725 12.0001C24.0345 12.003 23.7004 12.0719 23.3899 12.203C23.0793 12.334 22.7985 12.5244 22.5636 12.7632L4.74528 30.2632C4.26808 30.732 4 31.3678 4 32.0307C4 32.6936 4.26808 33.3294 4.74528 33.7982L22.5636 51.2982C23.0437 51.7536 23.6867 52.0056 24.3541 51.9999C25.0215 51.9942 25.66 51.7313 26.1319 51.2678C26.6039 50.8042 26.8716 50.1772 26.8774 49.5217C26.8832 48.8662 26.6266 48.2347 26.1629 47.7632L12.6897 34.5307H57.4545C58.1296 34.5307 58.7771 34.2673 59.2544 33.7985C59.7318 33.3296 60 32.6938 60 32.0307C60 31.3677 59.7318 30.7318 59.2544 30.263C58.7771 29.7941 58.1296 29.5307 57.4545 29.5307Z" fill="#ffffff"/>
                    </svg>
                    Назад
                </button>
                <h2>{{ tenantData?.title }}</h2>
            </div>
            <div class="point-body">
                <div class="gallery-wrapper" v-if="tenantData.images && tenantData.images.length > 0">
                    <div class="aside-bar" ref="asideBarRef">
                        <img
                          v-for="(image, index) in tenantData.images"
                          :key="index"
                          :src="getFullImagePath(image)"
                          :class="{ active: selectedImageIndex === index }"
                          @click="selectImage(index)"
                          alt="Миниатюра"
                        >
                        <div class="aside-next" v-if="tenantData.images.length > 1">
                            <button @click="selectNextImage">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.93775 13.9378C4.79806 14.0771 4.68723 14.2426 4.61161 14.4249C4.53599 14.6071 4.49707 14.8024 4.49707 14.9998C4.49707 15.1971 4.53599 15.3924 4.61161 15.5747C4.68723 15.7569 4.79806 15.9224 4.93775 16.0618L22.9378 34.0618C23.0771 34.2014 23.2426 34.3123 23.4248 34.3879C23.6071 34.4635 23.8024 34.5024 23.9998 34.5024C24.1971 34.5024 24.3924 34.4635 24.5746 34.3879C24.7569 34.3123 24.9224 34.2014 25.0618 34.0618L43.0618 16.0618C43.3434 15.7801 43.5016 15.3981 43.5016 14.9998C43.5016 14.6014 43.3434 14.2194 43.0618 13.9378C42.7801 13.6561 42.3981 13.4979 41.9998 13.4979C41.6014 13.4979 41.2194 13.6561 40.9378 13.9378L23.9998 30.8788L7.06175 13.9378C6.92242 13.7981 6.75689 13.6872 6.57465 13.6116C6.39242 13.536 6.19705 13.4971 5.99975 13.4971C5.80245 13.4971 5.60709 13.536 5.42485 13.6116C5.24262 13.6872 5.07709 13.7981 4.93775 13.9378Z" fill="#231F20"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="photo-preview">
                        <img :src="mainImageUrl" v-if="mainImageUrl" alt="Главное фото">
                        <button @click="openModal" v-if="mainImageUrl">Увеличить</button>
                    </div>
                </div>

                <div class="no-photos-placeholder" v-else>
                    <p>Фотографии отсутствуют</p>
                </div>
                
                <div class="point-description">
                    <p>{{ tenantData?.description }}</p>
                    <div class="point-position">
                        <h3>Расположение</h3>
                        <div class="position-details">
                            <div class="details">
                                <span>Корпус</span>
                                <h4>Основной</h4>
                            </div>
                            <div class="details" v-if="tenantData?.floor.name">
                                <span>Этаж</span>
                                <h4>{{tenantData?.floor.name}}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="point-trainers">
                        <h4>Тренерский состав</h4>
                        <div class="trainers-container">
                            <Card v-for="trainer in filteredTrainers" :key="trainer.id" :trainer="trainer"></Card>
                        </div>
                    </div>
                </div>
                <div class="point-controls">
                    <button>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.5 4C21.1962 4 12 13.098 12 24.281C12 38.1594 30.3455 58.5337 31.1266 59.3942C31.8602 60.2026 33.1411 60.2012 33.8734 59.3942C34.6545 58.5337 53 38.1594 53 24.281C52.9998 13.098 43.8036 4 32.5 4ZM32.5 34.4849C26.8128 34.4849 22.186 29.9075 22.186 24.281C22.186 18.6545 26.8129 14.0772 32.5 14.0772C38.1871 14.0772 42.8138 18.6546 42.8138 24.2811C42.8138 29.9076 38.1871 34.4849 32.5 34.4849Z" fill="#415AFF"/>
                        </svg>
                        Показать на карте
                    </button>
                    <button @click="drawRoute">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7798 13.8853L26.1132 23.2186C26.4398 23.5441 26.8452 23.7795 27.2898 23.9018C27.7345 24.024 28.2032 24.029 28.6504 23.9162C29.0975 23.8034 29.5078 23.5767 29.8413 23.2582C30.1748 22.9396 30.42 22.5401 30.5532 22.0986L34.5532 8.76527C34.6914 8.30414 34.7022 7.8142 34.5844 7.34742C34.4667 6.88065 34.2248 6.45445 33.8844 6.11406C33.544 5.77366 33.1178 5.53175 32.651 5.41401C32.1842 5.29626 31.6943 5.30706 31.2332 5.44527L17.8998 9.44527C17.4593 9.57971 17.061 9.82562 16.7434 10.1592C16.4258 10.4928 16.1998 10.9027 16.0871 11.3493C15.9744 11.7959 15.979 12.264 16.1004 12.7083C16.2217 13.1525 16.4558 13.558 16.7798 13.8853Z" fill="#ffffff"/>
                        <path d="M13.2269 21.752C8.67225 25.7546 8.02158 32.8666 11.7656 37.6666C15.5362 42.4986 22.4056 43.2853 27.1149 39.4213L40.1283 28.744C40.7119 28.2646 41.3859 27.9074 42.1104 27.6938C42.8348 27.4802 43.5948 27.4145 44.3452 27.5005C45.0955 27.5866 45.8209 27.8228 46.4781 28.1949C47.1354 28.567 47.711 29.0675 48.1709 29.6666C50.1682 32.2266 49.8162 36.0666 47.3896 38.2L44.6083 40.6426C43.5176 41.6026 43.3923 43.2826 44.3256 44.4026C45.2589 45.5226 46.9016 45.6506 47.9922 44.6906L50.7736 42.248C55.3283 38.2426 55.9816 31.1386 52.2323 26.3333C48.4669 21.5066 41.5869 20.7173 36.8829 24.5786L23.8696 35.256C23.2863 35.7361 22.6123 36.0939 21.8877 36.3079C21.1632 36.5219 20.403 36.5878 19.6524 36.5017C18.9018 36.4156 18.1763 36.1792 17.5191 35.8067C16.8618 35.4342 16.2863 34.9331 15.8269 34.3333C13.8349 31.7786 14.1842 27.9333 16.6082 25.8L18.0536 24.6933C19.1442 23.7333 19.2802 22.0533 18.3469 20.9333C18.1277 20.6678 17.8573 20.4491 17.5519 20.29C17.2465 20.131 16.9122 20.035 16.569 20.0076C16.2258 19.9803 15.8805 20.0222 15.5538 20.1308C15.227 20.2394 14.9255 20.4126 14.6669 20.64L13.2269 21.752Z" fill="#ffffff"/>
                        <path d="M26.666 50.6667C26.666 48.545 27.5089 46.5102 29.0092 45.0099C30.5095 43.5096 32.5443 42.6667 34.666 42.6667C36.7877 42.6667 38.8226 43.5096 40.3229 45.0099C41.8232 46.5102 42.666 48.545 42.666 50.6667C42.666 52.7885 41.8232 54.8233 40.3229 56.3236C38.8226 57.8239 36.7877 58.6667 34.666 58.6667C32.5443 58.6667 30.5095 57.8239 29.0092 56.3236C27.5089 54.8233 26.666 52.7885 26.666 50.6667Z" fill="#ffffff"/>
                        </svg>
                        Построить маршрут
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isModalVisible" class="image-modal" @click="closeModal">
        <button class="modal-close" @click="closeModal">×</button>
        <img :src="mainImageUrl" alt="Увеличенное изображение" @click.stop>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { Tenants } from '../types/types';
import Card from '../components/UI/Card.vue';
import axios from 'axios';
const API_URL = inject('API_URL') as string;
const router = useRouter()
const route = useRoute()
const pointId = ref(route.query.id as string | undefined)
const tenantData = ref<Tenants | null>(null)
const isLoading = ref(false)

const selectedImageIndex = ref(0)
const isModalVisible = ref(false)
const asideBarRef = ref<HTMLElement | null>(null);
const isAsideScrollable = ref(false);

interface Trainer {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  image: string,
  position: string,
  phone: string,
  tenant?: {
    icon?: string;
    node: number;
    area?: number;
  };
}

const props = defineProps<{
  trainers: Trainer[];
}>();

const toBack = () => {
    router.push('/home')
}

const drawRoute = () => {
    const destinationPointId = tenantData.value?.id.toString();

    if (destinationPointId) {
        router.push({ 
            path: '/home', 
            query: { 
                pointId: destinationPointId 
            } 
        });
    }
};

const getFullImagePath = (imageObj: { image: string } | undefined): string | undefined => {
  if (!imageObj?.image) return undefined;
  const basePath = API_URL.replace("top/api", "top");
  return `${basePath}${imageObj.image}`;
};

const mainImageUrl = computed((): string | undefined => {
  if (tenantData.value?.images && tenantData.value.images.length > 0) {
    const imageObject = tenantData.value.images[selectedImageIndex.value];
    return getFullImagePath(imageObject);
  }
  return undefined;
});

const selectImage = (index: number) => {
  selectedImageIndex.value = index;
};

const selectNextImage = () => {
  if (tenantData.value?.images && tenantData.value.images.length > 0) {
    const nextIndex = (selectedImageIndex.value + 1) % tenantData.value.images.length;
    selectedImageIndex.value = nextIndex;
  }
};

const openModal = () => {
  if (mainImageUrl.value) {
    isModalVisible.value = true;
  }
};
const closeModal = () => {
  isModalVisible.value = false;
};

const fetchTenant = async(id: string) => {
    if(!id) return
    isLoading.value = true
    try {
        const response = await axios.get(`${API_URL}/tenants/${id}`)
        tenantData.value = response.data;
    }
    catch(error) {
        console.log(error)
    }
    finally {
        isLoading.value = false
    }
}

const filteredTrainers = computed(() => {
  if (!tenantData.value) {
    return [];
  }

  const currentNodeId = tenantData.value.node;

  return props.trainers.filter(trainer => {
    return trainer.tenant?.node === currentNodeId;
  });
});

watch(
  () => tenantData.value?.images,
  async () => {
    await nextTick(); 
    const el = asideBarRef.value;
    if (el) {
      isAsideScrollable.value = el.scrollHeight > el.clientHeight;
    }
  },
  { deep: true }
);

onMounted(() => {
    if(pointId.value) {
        fetchTenant(pointId.value)
    }
    console.log("Тренеры", props.trainers)
})
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;
.info-container {
    padding: 80px 0;
    .point-info {
        display: flex;
        flex-direction: column;
        gap: 40px;
        .point-header {
            display: flex;
            gap: 40px;
            align-items: center;
            button {
                display: flex;
                gap: 20px;
                align-items: center;
                justify-content: center;
                max-width: 363px;
                width: 100%;
                height: 144px;
                border: none;
                outline: none;
                background: $button-active;
                border-radius: 72px;
                font-size: 40px;
                color: $white-color;
                font-weight: bold;
            }
            h2 {
                font-size: 80px;
                font-weight: 900;
            }
        }
        .point-body {
            width: 100%;
            height: 1816px;
            border-radius: 112px;
            background-color: $white-color;
            padding: 40px 0;
            display: flex;
            align-items: center;
            gap: 40px;
            position: relative;
            
            .gallery-wrapper {
                display: flex;
                gap: 40px;
                flex-shrink: 0; 
            }

            .no-photos-placeholder {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1820px;
                height: 1684px;
                border-radius: 72px;               
                p {
                    font-size: 48px;
                    font-weight: bold;
                    color: #a0a0a0;
                }
            }
            .aside-bar {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 50px;
                max-width: 280px;
                width: 100%;
                height: 1636px;
                overflow-y: auto;
                direction: rtl;
                text-align: right;
                padding-left: 80px;
                overflow-x:hidden;
                margin-top: 20px;
                img {
                    width: 200px;
                    height: 200px;
                    border-radius: 48px;
                    object-fit: contain;
                    border: 6px solid transparent;
                    transition: border-color 0.3s;
                    cursor: pointer;

                    &.active {
                      border-color: $button-active;
                    }
                }
                    &::-webkit-scrollbar {
                        width: 12px;
                        margin-top: 10px;
                    }

                    &::-webkit-scrollbar-track {
                        background: transparent;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: #007bff;
                        border: none;
                    }
                    scrollbar-color: #007bff #f0f0f0;
                    scrollbar-width: thin;
                .aside-next {
                    position: fixed;
                    bottom: 167px;
                    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
                    display: flex;
                    align-items: center;
                    width: 280px;
                    pointer-events: none;
                    height: 100px;
                
                    button {
                        width: 96px;
                        height: 96px;
                        border-radius: 1000px;
                        background-color: $white-color;
                        border: none;
                        outline: none;
                        margin-right: 52px;
                        box-shadow: 6px 12px 24px 0px #00000033;
                        position: absolute;
                        bottom: 26px;
                        pointer-events: auto;
                    }
                }
            }
            .photo-preview {
                height: 1684px;
                max-width: 1500px;
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 40px;
                align-items: center;
                img {
                    width: 1500px;
                    height: 1500px;
                    border-radius: 72px;
                    object-fit: contain;
                }
                button {
                    width: 372px;
                    height: 144px;
                    background: transparent;
                    border: 4px solid $main-text;
                    border-radius: 72px;
                    font-size: 40px;
                    font-weight: bold;
                    outline: none;
                }
            }
            .point-description {
                max-width: 1860px;
                width: 100%;
                height: 1736px;
                padding: 40px 26px;
                display: flex;
                flex-direction: column;
                gap: 48px;
                p {
                    font-size: 40px;
                    height: 184px;
                }
                .point-position {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                    h3 {
                        font-size: 48px;
                        font-weight: bold;
                    }
                    .position-details {
                        width: 100%;
                        display: flex;
                        gap: 20px;

                        .details {
                            width: 50%;
                            height: 143px;
                            border-radius: 70px;
                            background-color: $button-color-4;
                            display: flex;
                            flex-direction: column;
                            gap:  12px;
                            justify-content: center;
                            padding-left: 48px;
                            span {
                                font-size: 32px;
                                color: $text-color-4;
                            }
                            h4 {
                                font-size: 40px;
                                font-weight: bold;
                            }
                        }
                    }
                }
                .point-trainers {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                    h4 {
                        font-size: 48px;
                    }
                    .trainers-container {
                        max-width: 1780px;
                        width: 100%;
                        display: flex;
                        gap: 20px;
                        padding-bottom: 20px;
                        overflow-x: auto;
                        overflow-y: hidden;
                        scrollbar-width: none;
                        scrollbar-color: #007bff #f0f0f0;
                        ::v-deep(.card) {
                            flex: 0 0 auto;
                        }
                    }
                    .trainers-container::-webkit-scrollbar {
                        display: none;
                    }
                }
            }
            .point-controls {
                position: absolute;
                bottom: 66px;
                right: 40px;
                display: flex;
                gap: 20px;
                button {
                    width: 603px;
                    height: 144px;
                    border: none;
                    outline: none;
                    border-radius: 72px;
                    font-size: 40px;
                    font-weight: bold;
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    justify-content: center;
                }

                button:first-child {
                    background-color: $button-color-4;
                    color: $button-active;
                }
                button:last-child {
                    background-color: $button-active;
                    color: $white-color;
                }
            }
        }
    }
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;

  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 16px;
    cursor: default;
  }
  
  .modal-close {
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 80px;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    line-height: 1;
    padding: 0;
  }
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh; 
}

.spinner {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 16px solid #f3f3f3;
  border-top: 16px solid $button-active;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
}
</style>