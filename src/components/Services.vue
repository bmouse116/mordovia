<template>
  <div class="services">
    <div class="grid-container">
      <div class="section" v-for="(section, index) in sections" :key="index">
        <h2 class="section-title">{{ section.title }}</h2>

        <div v-if="section.cards.length > 0" class="cards">
          <div class="card" v-for="(card, cardIndex) in section.cards" :key="cardIndex">
            <h3 class="card-title">{{ card.title }}</h3>
            <div class="card-cost">
              <div class="cost">
                <h3>{{ card.cost }}₽</h3>
              </div>
              <div class="time">
                <span v-if="card.period == 60 && card.period != null">/ час</span>
                <span v-else-if="card.period && card.period != null">/ {{card.period}} минут</span>
                <span v-else></span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="no-services-message">
          Нет доступных услуг
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Service {
  id: number;
  title: string;
  type: string;
  price: number | string;
  periodPrice: number;
}

interface Section {
  title: string;
  cards: {
    title: string;
    cost: string;
    period: number;
  }[];
}

const props = defineProps<{
  services: Service[];
}>();

const sections = computed<Section[]>(() => {
  const allSections: Record<string, Section> = {
    rental: { title: 'Прокат', cards: [] },
    rent: { title: 'Аренда', cards: [] },
  };

  props.services.forEach(service => {
    const type = service.type;
    if (allSections[type]) {
      allSections[type].cards.push({
        title: service.title,
        cost: String(service.price),
        period: service.periodPrice
      });
    }
  });

  return Object.values(allSections);
});
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: calc(3568px + 90px);
  width: 100%;
  height: 100%;
  padding: 0px 20px 40px 40px;
  margin-top: 40px;
  overflow-y: auto;
  height: 1746px;
  &::-webkit-scrollbar {
    width: 32px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #f0eeef;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .section {
    display: flex;
    flex-direction: column;
    .section-title {
      font-size: 80px;
      margin-bottom: 32px;
      color: $main-text;
      font-weight: 900;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
      .card {
        background: $button-color-4;
        border-radius: 64px;
        padding: 48px;
        text-align: left;
        max-width: 697px;
        width: 100%;
        height: 322px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .card-title {
          font-size: 48px;
          color: $main-text;
          font-weight: 400;
        }
        .card-cost {
          display: flex;
          gap: 10px;
          .cost {
            font-size: 80px;
            color: $button-active;
            line-height: 1;
          }
          .time {
            font-size: 48px;
            color: $text-color-4;
          }
        }
      }
    }
    .no-services-message {
      font-size: 40px;
      color: $text-color-4;
      padding: 48px;
      background: $button-color-4;
      border-radius: 64px;
      text-align: center;
      max-width: 100%; 
    }
  }
}
</style>