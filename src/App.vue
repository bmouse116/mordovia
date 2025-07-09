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
const floors = ref<Floors[]>([])
const services = ref<Services[]>([])
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

// Получаем тип возвращаемого значения из useInactivity
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