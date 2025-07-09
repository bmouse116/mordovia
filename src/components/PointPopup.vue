<template>
    <div class="popup-container">
        <div class="popup">
            <div class="popup-content">
                <img src="/src/assets/img/gym.png" alt="">
                <div class="content-description">
                    <h2>Тренажерный зал</h2>
                </div>
                <div class="description-text">
                    <p>Тренажерный зал заполнен тренажерами на все группы мышц. В фитнес зале проходят тренировки по фитнессу, степ тренировки, джампинг, соревнования по амреслингу, висит боксерская груша для отработки ударов, имеется необходимый инвентарь мячи обручи, скакалки, гантели и прочее</p>
                </div>
                <div class="content-position">
                    <h2>Расположение</h2>
                    <div class="position-description">
                        <div class="description">
                            <span>Корпус</span>
                            <h2>Основной</h2>
                        </div>
                        <div class="description">
                            <span>Этаж</span>
                            <h2>Цокольный</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="popup-controls">
                <button @click="openInfo">Узнать подробнее</button>
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
</template>

<script setup lang="ts">

const emit = defineEmits(['draw', 'openInfo'])

const drawRoute = () => {
    emit('draw')
}

const openInfo = () => {
    emit('openInfo')
}
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;
.popup-container {
    position: absolute;
    max-width: 890px;
    width: 100%;
    height: 1729px;
    background: $white-color;
    box-shadow: 0px 0px 64px 0px #4E031B26;
    bottom: 73px;
    left: 40px;
    border-radius: 64px;
    padding: 40px;
    .popup {
        display: flex;
        flex-direction: column;
        gap: 40px;
        .popup-content {
            max-width: 810px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 45px;
            img {
                width: 100%;
                height: 810px;
                border-radius: 64px;
            }
            .content-description {
                display: flex;
                flex-direction: column;
                gap: 20px;
                height: auto;
                h2 {
                    font-size: 40px;
                    font-weight: bold;
                }
            }
            .description-text {
                overflow-y: scroll;
                height: 140px;
                p {
                    font-size: 24px; 
                    line-height: 100%;
                    width: 800px;             
                }
            }
            .content-position {
                width: 100%;
                height: 185px;
                display: flex;
                flex-direction: column;
                gap: 20px;

                h2 {
                    font-size: 40px;
                    font-weight: bold;
                }

                .position-description {
                    width: 100%;
                    display: flex;
                    gap: 20px;
                    .description {
                        background: $block-bg;
                        border-radius: 64px;
                        width: 50%;
                        height: 120px;
                        display: flex;
                        flex-direction: column;
                        align-items: left;
                        justify-content: center;
                        padding-left: 48px;
                        gap: 12px;
                        span {
                            font-size: 24px;
                            color: $text-color-3;
                        }

                        h2 {
                            font-size: 28px;
                            font-weight: 700;
                        }
                    }
                }
            }
        }
        .popup-controls {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 20px;
            button {
                width: 100%;
                height: 144px;
                border-radius: 64px;
                border: none;
                font-size: 40px;
                font-weight: bold;
                outline: none;
            }
            button:first-child {
                background: $button-color-4;
                color: $button-active;
            }
            button:last-child {
                background: $button-active;
                display: flex;
                gap: 20px;
                align-items: center;
                justify-content: center;
                color: $white-color;
            }
        }
    }
}
</style>