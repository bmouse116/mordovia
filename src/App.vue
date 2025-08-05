<template>
  <div class="container">
    <router-view 
    :trainers="trainers"
    :services="services"
    :floors="floors"
    ></router-view>
  </div>
</template>

<script setup lang="ts">
import { provide, inject, onMounted, onUnmounted, ref } from 'vue'
import { useInactivity } from './config/useInActivity'
import axios from 'axios';
import type { Floor, Service } from './types/types';

const API_URL = inject('API_URL') as string;
interface Trainers {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  image: string,
  position: string,
  phone: string
}

const floors = ref<Floor[]>([])
const services = ref<Service[]>([])
const trainers = ref<Trainers[]>([])
const fetchTrainers = async () => {
  try {
    const response = await axios.get(`${API_URL}/trainers`)
    trainers.value = response.data
  }
  catch(error) {
    console.log(error)
  }
}

const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/services`)
    services.value = response.data
  }
  catch(error) {
    console.log(error)
  }
}

const fetchFloors = async () => {
  try {
    const response = await axios.get(`${API_URL}/floors`)
    floors.value = response.data
  }
  catch(error) {
    console.log(error)
  }
}

type InactivityComposable = ReturnType<typeof useInactivity>;

const inactivity = useInactivity()
provide<InactivityComposable>('inactivity', inactivity)

onMounted(() => {
  inactivity.inactivityTime()
  fetchTrainers()
  fetchServices()
  fetchFloors()
})

onUnmounted(() => inactivity.clearInactiveTime())
</script>

<style scoped lang="scss">

</style>