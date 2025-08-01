<template>
    <div class="waiting" @click="stopWaiting">
        <div 
            class="slide" 
            :style="currentSlideStyle"
            :class="{ visible: isSlideVisible }">
        </div>
        <div 
            class="slide" 
            :style="previousSlideStyle"
            :class="{ visible: !isSlideVisible }">
        </div>

        <div class="waiting-stop">
            <span class="bouncing-text">Коснитесь экрана, чтобы продолжить</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { inject } from 'vue';
import { useStore } from '../store/navigate';
import { storeToRefs } from 'pinia';
import type { Ad } from '../types/types';

const { terminal, areas, tenants, nodes } = storeToRefs(useStore());
const terminalId = inject('TERMINAL_ID');
const router = useRouter();
const API_URL = inject('API_URL') as string;

const ad = ref<Ad[]>([]);
const currentAdIndex = ref(0);
const previousAdIndex = ref<number | null>(null);
const isSlideVisible = ref(true);
let timerId: number | undefined;

const getImagePath = (index: number | null) => {
    if (index === null || !ad.value[index]) return null;
    const image = ad.value[index].image;
    const basePath = API_URL.replace("top/api", "top");
    return `${basePath}${image}`;
};

const currentSlideStyle = computed(() => ({
    backgroundImage: `url(${getImagePath(isSlideVisible.value ? currentAdIndex.value : previousAdIndex.value)})`
}));

const previousSlideStyle = computed(() => ({
    backgroundImage: `url(${getImagePath(!isSlideVisible.value ? currentAdIndex.value : previousAdIndex.value)})`
}));

const scheduleNextSlide = () => {
    clearTimeout(timerId);
    if (ad.value.length <= 1) return;

    const currentAd = ad.value[currentAdIndex.value];
    if (!currentAd) return;

    const duration = currentAd.duration * 1000;

    timerId = setTimeout(() => {
        previousAdIndex.value = currentAdIndex.value;
        currentAdIndex.value = (currentAdIndex.value + 1) % ad.value.length;
        isSlideVisible.value = !isSlideVisible.value;
        scheduleNextSlide();
    }, duration);
};

const stopWaiting = () => {
    clearTimeout(timerId);
    router.push('/home');
};

const fetchWaiting = async () => {
    try {
        const response = await axios.get(`${API_URL}/ad`);
        ad.value = response.data.data || response.data;
        if (ad.value.length > 0) {
            currentAdIndex.value = 0;
            previousAdIndex.value = 0;
            isSlideVisible.value = true;
            scheduleNextSlide();
        }
    } catch (error) {
        console.error("Ошибка при загрузке рекламы:", error);
    }
};

const fetchTerminals = async () => {
    try {
        const response = await axios.get(`${API_URL}/terminals/${terminalId}`);
        terminal.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

const fetchAreas = async () => {
    try {
        const response = await axios.get(`${API_URL}/areas`);
        areas.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

const fetchTenants = async () => {
    try {
        const response = await axios.get(`${API_URL}/tenants`);
        tenants.value = response.data;
        console.log(tenants.value)
    } catch (error) {
        console.log(error);
    }
};

const fetchNodes = async () => {
    try {
        const response = await axios.get(`${API_URL}/nodes`);
        nodes.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchTerminals();
    fetchAreas();
    fetchTenants();
    fetchNodes();
    fetchWaiting();
});

onUnmounted(() => {
    clearTimeout(timerId);
});
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;

.waiting {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100vh;
    background-image: url('/src/assets/img/waiting.png');
    background-size: cover;
    background-position: center;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1s ease-in-out;
}

.slide.visible {
    opacity: 1;
}

.waiting-stop {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    box-shadow: 0px 4px 4px 0px #00000040;
    z-index: 2;
    
    span {
        font-size: 80px;
        color: $white-color;
        animation: bounce 1.5s infinite ease-in-out;
    }
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-5px) scale(1.02);
    }
}
</style>