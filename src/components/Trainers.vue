<template>
    <div class="trainers">
        <div class="content-wrapper">
            <div class="card-container">
                <Card v-for="trainer in trainers" :key="trainer.id" :trainer="trainer" :trainersPage="trainersPage"></Card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from './UI/Card.vue';
const trainersPage = ref(true)
interface Trainer {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  image: string,
  position: string,
  phone: string
}

defineProps<{
  trainers: Trainer[];
}>();

</script>
<style scoped lang="scss">
.trainers {
  max-width: calc(3568px + 50px);
  width: 100%;
  height: 1746px;
  margin: 0 auto;
  margin-top: 40px;
  margin-left: 40px;
  position: relative;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 32px;
    background: transparent;
    margin-top: 30px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 32px;
    margin-left: 0;
    margin-right: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #f0eeef;
    border-radius: 30px;
    border: 10px solid #f0eeef;
    background-clip: content-box;
  }
}

.content-wrapper {
  width: 3568px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
}
</style>