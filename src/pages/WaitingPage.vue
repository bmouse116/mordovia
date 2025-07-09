<template>
    <div class="waiting" @click="stopWaiting">
        <div class="waiting-stop">
            <span class="bouncing-text">Коснитесь экрана, чтобы продолжить</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import axios from 'axios';
import { inject, onMounted } from 'vue';
import { useStore } from '../store/navigate';
import { storeToRefs } from 'pinia'
const { terminal, areas, tenants, nodes } = storeToRefs(useStore())
const terminalId = inject('TERMINAL_ID')
const router = useRouter()
const API_URL = inject('API_URL') as string;
const stopWaiting = () => {
    router.push('/')
}

const fetchTerminals = async () => {
    try {
        const response = await axios.get(`${API_URL}/terminals/${terminalId}`)
        terminal.value = response.data
        console.log(terminal.value)
    }
    catch(error) {
        console.log(error)
    }
}

const fetchAreas = async () => {
    try {
        const response = await axios.get(`${API_URL}/areas`)
        areas.value = response.data
        console.log(areas.value)
    }
    catch(error) {
        console.log(error)
    }
}

const fetchTenants = async () => {
    try {
        const response = await axios.get(`${API_URL}/tenants`)
        tenants.value = response.data
        console.log("Точки интереса", tenants.value)
    }
    catch(error){
        console.log(error)
    }
}

const fetchNodes = async () => {
    try {
        const response = await axios.get(`${API_URL}/nodes`)
        nodes.value = response.data
        console.log("Nodes", nodes.value)
    }
    catch(error){
        console.log(error)
    }
}

onMounted(() => {
    fetchTerminals()
    fetchAreas()
    fetchTenants()
    fetchNodes()
})
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
        span {
            font-size: 80px;
            color: $white-color;
            animation: bounce 1.5s infinite ease-in-out;
        }
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