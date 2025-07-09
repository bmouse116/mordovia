<template>
    <div class="card" v-if="trainersPage === false">
        <img src="/src/assets/img/image.png" alt="">
        <div class="header">
            <div class="phone">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M52.3465 42.9768C48.9635 40.0834 45.5302 38.3307 42.1888 41.2198L40.1935 42.9659C38.7336 44.2334 36.0194 50.1559 25.5251 38.0837C15.033 26.0269 21.2767 24.1497 22.7387 22.8931L24.7449 21.1447C28.0689 18.2491 26.8145 14.6039 24.4171 10.8515L22.9704 8.57872C20.5621 4.83514 17.9396 2.37657 14.6069 5.26785L12.8061 6.84133C11.3332 7.91436 7.21588 11.4023 6.21716 18.0284C5.01519 25.9788 8.80685 35.0832 17.4938 45.0726C26.1698 55.0664 34.6644 60.0863 42.7111 59.9989C49.3984 59.9268 53.437 56.3383 54.7001 55.0337L56.5075 53.458C59.8314 50.5689 57.7662 47.6274 54.3811 44.7273L52.3465 42.9768Z" fill="#ffffff"/>
                </svg>
                <span>+8 (906) 379 08-95</span>
            </div>
        </div>
        <div class="footer">
            <div class="name">
                <h2>Спиркин Александр</h2>
                <span>Обучение катанию на коньках</span>
            </div>
        </div>
    </div>
    <div class="card" v-else>
        <img :src="fullImageUrl" alt="">
         <div class="header">
            <div class="phone">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M52.3465 42.9768C48.9635 40.0834 45.5302 38.3307 42.1888 41.2198L40.1935 42.9659C38.7336 44.2334 36.0194 50.1559 25.5251 38.0837C15.033 26.0269 21.2767 24.1497 22.7387 22.8931L24.7449 21.1447C28.0689 18.2491 26.8145 14.6039 24.4171 10.8515L22.9704 8.57872C20.5621 4.83514 17.9396 2.37657 14.6069 5.26785L12.8061 6.84133C11.3332 7.91436 7.21588 11.4023 6.21716 18.0284C5.01519 25.9788 8.80685 35.0832 17.4938 45.0726C26.1698 55.0664 34.6644 60.0863 42.7111 59.9989C49.3984 59.9268 53.437 56.3383 54.7001 55.0337L56.5075 53.458C59.8314 50.5689 57.7662 47.6274 54.3811 44.7273L52.3465 42.9768Z" fill="#ffffff"/>
                </svg>
                <span>{{ trainer.phone }}</span>
            </div>
        </div>
        <div class="footer">
            <div class="name">
                <h2>{{ trainer.surname }} {{ trainer.name }}</h2>
                <span>{{ trainer.position }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
const API_URL = inject('API_URL') as string;
interface Trainer {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  image: string,
  position: string,
  phone: string
}
const props = defineProps({
    trainersPage: {
        type: Boolean,
        default: false
    },
    trainer: {
        type: Object as () => Trainer,
        required: true
    }
})
const fullImageUrl = computed(() => `${API_URL.replace('top/api', 'top')}${props.trainer.image}`)
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;
.card {
    max-width: 697px;
    width: 100%;
    height: 861px;
    border-radius: 64px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        border-radius: 64px;
    }
    .header {
        position: absolute;
        width: 100%;
        height: 157px;
        top: 0;
        border-top-left-radius: 64px;
        border-top-right-radius: 64px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        .phone {
            background: #FFFFFF40;
            max-width: 346px;
            width: 100%;
            height: 53px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            span {
                color: $white-color;
                font-size: 32px;
                font-weight: 700;
                max-width: 274px;
                width: 100%;
                height: 37px;
                text-align: center;
            }
            svg {
                width: 32px;
                height: 32px;
            }
        }
    }
    .footer {
        position: absolute;
        width: 100%;
        height: 158px;
        bottom: 0;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
        border-bottom-left-radius: 64px;
        border-bottom-right-radius: 64px;
        .name {
            color: $white-color;
            text-align: center;
            display: flex;
            flex-direction: column;
            height: 106px;
            justify-content: center;
            padding-top: 12px;
            gap: 10px;
            h2 {
                font-size: 48px;
                font-weight: 700;
                line-height: 100%;
                height: 68px;
            }
            span {
                font-size: 24px;
                font-weight: 700;
                line-height: 100%;
            }
        }
    }
}
</style>