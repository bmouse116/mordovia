<template>
    <div class="popup-overlay" @click.self="closePopup">
        <div class="popup">
            <div class="popup-title">
                <h1>Получить маршрут</h1>
                <span>Сканируйте QR-код для получения маршрута</span>
            </div>
            <div class="popup-content">
                <img src="/src/assets/img/QR.png" alt="">
            </div>
            <button class="popup-close" @click="closePopup">Закрыть</button>
        </div>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['close'])

const closePopup = () => {
    emit('close')
}
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
}

.popup {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 1199px;
    height: 879px;
    padding: 80px 40px;
    position: relative;
    animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 92px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    .popup-title {
        display: flex;
        flex-direction: column;
        gap: 20px;
        text-align: center;
        h1 {
            font-size: 64px;
            font-weight: 900;
        }
        span {
            font-size: 32px;
        }
    }
    .popup-content {
        max-width: 348px;
        width: 100%;
        height: 348px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .popup-close {
        max-width: 348px;
        width: 100%;
        height: 144px;
        border-radius: 52px;
        background-color: $button-active;
        font-size: 40px;
        font-weight: bold;
        color: $white-color;
        border: none;
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        opacity: 0;
        transform: translateY(20px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 600px) {
    .popup {
        width: 95%;
        padding: 20px;
    }
}

</style>