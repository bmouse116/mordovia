<template>
  <div class="keyboard">
    <div class="keyboard-row">
      <button v-for="key in firstRow" :key="key" @click="emitKey(key)" class="key">
        {{ (isCapsLock && isLetterLayout) ? key.toUpperCase() : key.toLowerCase() }}
      </button>
    </div>

    <div class="keyboard-row">
      <div class="keyboard-spacer"></div>
      <button v-for="key in secondRow" :key="key" @click="emitKey(key)" class="key">
        {{ (isCapsLock && isLetterLayout) ? key.toUpperCase() : key.toLowerCase() }}
      </button>
      <div class="keyboard-spacer"></div>
    </div>

    <div class="keyboard-row">
      <button 
        @click="toggleCapsLock" 
        class="key key--capslock" 
        :class="{ 'key--active': isCapsLock && isLetterLayout, 'key--disabled': !isLetterLayout }"
        :disabled="!isLetterLayout"
      >
        <svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0724 18.485V30.4983H24.9261V18.485H32.7481L18.9999 4.28845L5.25186 18.485H13.0724ZM18.2822 1.00427C18.6751 0.598838 19.3249 0.598838 19.7176 1.00427L37.7161 19.5897C38.3308 20.2244 37.8815 21.2869 36.9984 21.2869H27.7249V32.2995C27.7249 32.8521 27.2773 33.3002 26.7253 33.3002H11.2732C10.7212 33.3002 10.2737 32.8521 10.2737 32.2995V21.2869H1.00137C0.118475 21.2869 -0.33078 20.2244 0.283926 19.5897L18.2822 1.00427Z" fill="black"/>
        </svg>
      </button>
      
      <button v-for="key in thirdRow" :key="key" @click="emitKey(key)" class="key">
        {{ (isCapsLock && isLetterLayout) ? key.toUpperCase() : key.toLowerCase() }}
      </button>
      
      <button @click="emitBackspace" class="key key--utility">
        <svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.4287 12.0503C20.843 11.4645 20.843 10.5148 21.4287 9.92896C22.0146 9.34314 22.9644 9.34314 23.55 9.92896L28.5 14.8788L33.4497 9.92896C34.0354 9.34314 34.9851 9.34314 35.571 9.92896C36.1567 10.5146 36.1567 11.4645 35.571 12.0503L30.6211 17L35.571 21.9498C36.1567 22.5355 36.1567 23.4854 35.571 24.071C34.9851 24.6569 34.0354 24.6569 33.4497 24.071L28.5 19.1213L23.55 24.071C22.9644 24.6569 22.0146 24.6569 21.429 24.071C20.843 23.4852 20.843 22.5355 21.429 21.9497L26.3787 17.0001L21.4287 12.0503Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2427 1.75732L0 17L15.2427 32.2427C16.3679 33.3679 17.894 34 19.4854 34H40C43.3137 34 46 31.3137 46 28V6C46 2.68628 43.3137 0 40 0H19.4854C17.894 0 16.3679 0.632202 15.2427 1.75732ZM40 31.4H19.4854C18.5835 31.4 17.7188 31.0417 17.0811 30.4042L3.677 17L17.0811 3.59583C17.7188 2.95825 18.5835 2.59998 19.4854 2.59998H40C41.8777 2.59998 43.3999 4.12219 43.3999 6V28C43.3999 29.8778 41.8777 31.4 40 31.4Z" fill="black"/>
        </svg>
      </button>
    </div>

    <div class="keyboard-row">
        <button @click="toggleSymbols" class="key key--number">
          <template v-if="isLetterLayout">
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="27" viewBox="0 0 76 27" fill="none">
              <path d="M9.34625 26.288C7.64225 26.288 6.13025 26.012 4.81025 25.46C3.49025 24.908 2.44625 24.14 1.67825 23.156C0.91025 22.172 0.52625 21.032 0.52625 19.736C0.52625 18.608 0.77825 17.576 1.28225 16.64C1.78625 15.704 2.59025 14.804 3.69425 13.94C4.79825 13.052 6.25025 12.14 8.05025 11.204C9.51425 10.436 10.6543 9.764 11.4703 9.188C12.3103 8.612 12.8983 8.072 13.2343 7.568C13.5943 7.04 13.7743 6.476 13.7743 5.876C13.7743 5.06 13.4863 4.4 12.9103 3.896C12.3343 3.368 11.5063 3.104 10.4263 3.104C9.29825 3.104 8.41025 3.392 7.76225 3.968C7.13825 4.52 6.82625 5.252 6.82625 6.164C6.82625 6.62 6.89825 7.064 7.04225 7.496C7.21025 7.904 7.49825 8.372 7.90625 8.9C8.33825 9.404 8.95025 10.052 9.74225 10.844L23.0623 24.092L21.1183 26.396L6.97025 12.32C6.13025 11.48 5.47025 10.736 4.99025 10.088C4.51025 9.416 4.16225 8.768 3.94625 8.144C3.73025 7.52 3.62225 6.884 3.62225 6.236C3.62225 5.108 3.89825 4.124 4.45025 3.284C5.02625 2.42 5.81825 1.76 6.82625 1.304C7.85825 0.823999 9.05825 0.583999 10.4263 0.583999C11.6983 0.583999 12.8023 0.799999 13.7383 1.232C14.6743 1.64 15.3943 2.24 15.8983 3.032C16.4263 3.8 16.6903 4.736 16.6903 5.84C16.6903 6.8 16.4503 7.688 15.9703 8.504C15.5143 9.32 14.7703 10.112 13.7383 10.88C12.7063 11.648 11.3143 12.476 9.56225 13.364C8.12225 14.108 6.99425 14.804 6.17825 15.452C5.36225 16.076 4.77425 16.7 4.41425 17.324C4.07825 17.948 3.91025 18.632 3.91025 19.376C3.91025 20.168 4.13825 20.876 4.59425 21.5C5.07425 22.1 5.73425 22.568 6.57425 22.904C7.43825 23.24 8.43425 23.408 9.56225 23.408C11.1703 23.408 12.6223 23.06 13.9183 22.364C15.2143 21.668 16.2943 20.624 17.1583 19.232C18.0463 17.84 18.6943 16.112 19.1023 14.048L21.8743 14.948C21.3943 17.372 20.5663 19.424 19.3903 21.104C18.2383 22.784 16.8103 24.068 15.1063 24.956C13.4023 25.844 11.4823 26.288 9.34625 26.288ZM28.4721 26V2.24L30.0201 3.932H22.7841V0.799998H32.0361V26H28.4721ZM37.1523 26V23.552L47.4123 13.652C48.3243 12.788 48.9963 12.032 49.4283 11.384C49.8843 10.712 50.1843 10.1 50.3283 9.548C50.4963 8.972 50.5803 8.42 50.5803 7.892C50.5803 6.596 50.1243 5.576 49.2123 4.832C48.3003 4.088 46.9683 3.716 45.2163 3.716C43.8723 3.716 42.6603 3.944 41.5803 4.4C40.5003 4.832 39.5643 5.516 38.7723 6.452L36.3243 4.328C37.2843 3.104 38.5683 2.168 40.1763 1.52C41.8083 0.848 43.5963 0.512 45.5403 0.512C47.2923 0.512 48.8163 0.8 50.1123 1.376C51.4083 1.928 52.4043 2.732 53.1003 3.788C53.8203 4.844 54.1803 6.092 54.1803 7.532C54.1803 8.348 54.0723 9.152 53.8563 9.944C53.6403 10.736 53.2323 11.576 52.6323 12.464C52.0323 13.352 51.1683 14.348 50.0403 15.452L40.8963 24.272L40.0323 22.868H55.2603V26H37.1523ZM65.9242 26.288C64.1482 26.288 62.4202 26.012 60.7402 25.46C59.0842 24.908 57.7282 24.164 56.6722 23.228L58.3282 20.384C59.1682 21.176 60.2602 21.824 61.6042 22.328C62.9482 22.832 64.3882 23.084 65.9242 23.084C67.7962 23.084 69.2482 22.688 70.2802 21.896C71.3362 21.08 71.8642 19.988 71.8642 18.62C71.8642 17.3 71.3602 16.244 70.3522 15.452C69.3682 14.636 67.7962 14.228 65.6362 14.228H63.6202V11.708L71.1082 2.492L71.6122 3.932H57.8242V0.799998H74.4562V3.248L67.0042 12.428L65.1322 11.312H66.3202C69.3682 11.312 71.6482 11.996 73.1602 13.364C74.6962 14.732 75.4642 16.472 75.4642 18.584C75.4642 20 75.1162 21.296 74.4202 22.472C73.7242 23.648 72.6682 24.584 71.2522 25.28C69.8602 25.952 68.0842 26.288 65.9242 26.288Z" fill="#0E0C0D"/>
            </svg>
          </template>
          <template v-else>
            {{ previousLetterLayout === 'ru' ? 'АБВ' : 'ABC' }}
          </template>
        </button>
        
        <button @click="emitSpace" class="key key--space">
          Пробел
        </button>
        
        <button 
          @click="toggleLanguage" 
          class="key key--language" 
          :class="{ 'key--disabled': !isLetterLayout }"
          :disabled="!isLetterLayout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <g clip-path="url(#clip0_89_1531)">
            <path d="M40.9705 7.02947C36.4375 2.49638 30.4106 0 24 0C17.5894 0 11.5624 2.49638 7.02947 7.02938C2.49638 11.5624 0 17.5894 0 24C0 30.4106 2.49638 36.4375 7.02947 40.9705C11.5624 45.5035 17.5894 47.9999 24 47.9999C30.4107 47.9999 36.4375 45.5035 40.9706 40.9704C45.5035 36.4375 48 30.4105 48 23.9999C48 17.5893 45.5035 11.5624 40.9705 7.02947ZM9.02025 9.02025C11.1307 6.90984 13.6082 5.30016 16.3086 4.2495C15.5893 5.14744 14.9163 6.17953 14.2995 7.34034C13.5832 8.68847 12.9651 10.1691 12.4503 11.7505C10.667 11.4546 9.01463 11.0906 7.53844 10.6635C8.00398 10.0908 8.49857 9.54233 9.02025 9.02025ZM5.83397 13.0861C7.56056 13.6389 9.53512 14.1052 11.6897 14.4744C11.0897 17.0212 10.7365 19.7618 10.6523 22.5923H2.86275C3.084 19.1955 4.10419 15.9536 5.83397 13.0861ZM5.68069 34.6536C4.04428 31.8505 3.07734 28.7022 2.86266 25.4077H10.6576C10.7497 28.1573 11.0958 30.8199 11.6755 33.3001C9.47672 33.6565 7.45256 34.1109 5.68069 34.6536ZM9.02025 38.9798C8.4269 38.3861 7.86873 37.7583 7.34859 37.0996C8.87887 36.6753 10.5896 36.3159 12.4312 36.0277C12.9496 37.6312 13.5743 39.1313 14.2994 40.4961C14.9716 41.761 15.7106 42.8725 16.5035 43.8247C13.7275 42.7763 11.1814 41.1407 9.02025 38.9798ZM22.5922 44.8233C20.454 44.2243 18.4312 42.2717 16.7858 39.1749C16.2102 38.0919 15.7047 36.9104 15.2717 35.6512C17.5901 35.396 20.0572 35.2451 22.5922 35.2097V44.8233ZM22.5922 32.3941C19.7809 32.4324 17.0407 32.609 14.4744 32.9104C13.9084 30.5703 13.5678 28.0374 13.4743 25.4077H22.5923V32.3941H22.5922ZM22.5922 22.5922H13.469C13.5544 19.8891 13.9004 17.2855 14.4841 14.8859C17.0339 15.2047 19.7684 15.3985 22.5922 15.454V22.5922ZM22.5922 12.6383C20.0473 12.587 17.5857 12.421 15.2837 12.1503C15.7141 10.9042 16.2157 9.73453 16.7858 8.66138C18.4312 5.56462 20.454 3.612 22.5922 3.01303V12.6383ZM42.2547 13.2356C43.9304 16.0662 44.9198 19.2543 45.1374 22.5922H37.3479C37.2646 19.7944 36.9182 17.0845 36.3307 14.5628C38.4995 14.2126 40.4985 13.767 42.2547 13.2356ZM38.9797 9.02025C39.5404 9.58158 40.0698 10.1734 40.5653 10.7931C39.0585 11.2045 37.3805 11.5538 35.5775 11.8348C35.0573 10.2216 34.4297 8.71247 33.7006 7.34034C33.0838 6.17953 32.4108 5.14744 31.6915 4.2495C34.3917 5.30016 36.8693 6.90984 38.9797 9.02025ZM25.4077 25.4077H34.5258C34.4317 28.0579 34.0865 30.6099 33.5123 32.9651C30.9629 32.6482 28.2296 32.4561 25.4077 32.4021V25.4077ZM25.4077 22.5922V15.4634C28.2207 15.4265 30.9631 15.2514 33.5317 14.9512C34.106 17.3327 34.4464 19.9135 34.531 22.5922H25.4077ZM25.4076 3.01303H25.4077C27.5459 3.612 29.5687 5.56462 31.2142 8.66138C31.7933 9.75141 32.3018 10.9412 32.7367 12.2096C30.4151 12.4639 27.9453 12.6136 25.4076 12.6478V3.01303ZM25.4077 44.8233V35.2178C27.9502 35.2677 30.41 35.4322 32.7112 35.7012C32.2819 36.9417 31.782 38.1063 31.2142 39.1749C29.5688 42.2717 27.546 44.2243 25.4077 44.8233ZM38.9797 38.9798C36.8186 41.1408 34.2725 42.7762 31.4964 43.8246C32.2893 42.8724 33.0283 41.761 33.7005 40.4961C34.4149 39.1516 35.0316 37.6753 35.5455 36.0986C37.3703 36.3998 39.0586 36.7723 40.5625 37.2104C40.0678 37.8288 39.5393 38.4194 38.9797 38.9798ZM42.2443 34.7821C40.4973 34.2204 38.4943 33.7478 36.3075 33.3749C36.8978 30.8737 37.2495 28.1849 37.3426 25.4077H45.1375C44.9193 28.7526 43.9265 31.9471 42.2443 34.7821Z" fill="#0E0C0D"/>
            </g>
            <defs>
            <clipPath id="clip0_89_1531">
            <rect width="48" height="48" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </button>
    </div>
</div>
<div class="cancel" @click="emit('close')">
<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M53.6667 26.9997C53.6667 41.7273 41.7276 53.6663 27 53.6663C12.2724 53.6663 0.333374 41.7273 0.333374 26.9997C0.333374 12.2721 12.2724 0.333008 27 0.333008C41.7276 0.333008 53.6667 12.2721 53.6667 26.9997ZM18.919 18.9187C19.7001 18.1377 20.9664 18.1377 21.7475 18.9187L27 24.1712L32.2524 18.9188C33.0334 18.1377 34.2998 18.1377 35.0808 18.9188C35.8619 19.6998 35.8619 20.9662 35.0808 21.7472L29.8284 26.9996L35.0808 32.252C35.8618 33.0331 35.8618 34.2994 35.0808 35.0805C34.2997 35.8615 33.0334 35.8615 32.2523 35.0805L27 29.8281L21.7475 35.0805C20.9665 35.8615 19.7002 35.8615 18.9191 35.0805C18.1381 34.2995 18.1381 33.0331 18.9191 32.2521L24.1715 26.9996L18.919 21.7472C18.138 20.9661 18.138 19.6998 18.919 18.9187Z" fill="black"/>
</svg>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits(['keypress', 'backspace', 'capslock', 'close']);

type Layout = 'ru' | 'en' | 'symbols';

const isCapsLock = ref(false);
const currentLayout = ref<Layout>('ru');
const previousLetterLayout = ref<Layout>('ru'); 

const layouts = {
  ru: {
    first: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    second: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    third: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
  },
  en: {
    first: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    second: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    third: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
  },
  symbols: {
    first: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    second: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    third: ['~', '`', '/', '\\', '?', '<', '>', ':', '"'],
  }
};

const currentRows = computed(() => layouts[currentLayout.value]);
const firstRow = computed(() => currentRows.value.first);
const secondRow = computed(() => currentRows.value.second);
const thirdRow = computed(() => currentRows.value.third);

const isLetterLayout = computed(() => currentLayout.value !== 'symbols');

const emitKey = (key: string) => {
  const value = (isCapsLock.value && isLetterLayout.value) 
    ? key.toUpperCase() 
    : key.toLowerCase();
  emit('keypress', value);
};

const emitBackspace = () => {
  emit('backspace');
};

const emitSpace = () => {
  emit('keypress', ' ');
};

const toggleCapsLock = () => {
  if (!isLetterLayout.value) return; 

  isCapsLock.value = !isCapsLock.value;
  emit('capslock', isCapsLock.value);
};

const toggleLanguage = () => {
  if (!isLetterLayout.value) return;

  if (currentLayout.value === 'ru') {
    currentLayout.value = 'en';
  } else if (currentLayout.value === 'en') {
    currentLayout.value = 'ru';
  }
  previousLetterLayout.value = currentLayout.value;
};

const toggleSymbols = () => {
  if (isLetterLayout.value) {
    currentLayout.value = 'symbols';
    if (isCapsLock.value) {
      isCapsLock.value = false; 
      emit('capslock', false);
    }
  } else {
    currentLayout.value = previousLetterLayout.value;
  }
};
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;
.keyboard {
  background-color: white;
  padding: 8px;
  border-radius: 72px;
  width: 100%;
  max-width: 1820px;
  height: 528px;
  margin: 0 auto;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: all;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
}

.keyboard-spacer {
  width: 28px;
}

.key {
  background-color: #fafafa;
  border-radius: 16px;
  border: none;
  height: 96px;
  max-width: 130px;
  width: 100%;
  margin: 0 8px;
  font-size: 36px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s;
  color: black;
  font-family: Arial;
  box-shadow: 0px 2px 0px 0px #0000004D;
  outline: none;
  
  &:active {
    transform: translateY(2px) scale(0.98);
    box-shadow: none;
  }
  
  &:focus {
    outline: none;
    border-radius: 16px;
  }

  &--disabled {
    opacity: 0.6;
    cursor: default;
    &:active {
      transform: none;
      box-shadow: 0px 2px 0px 0px #0000004D;
    }
  }
}

.cancel {
    max-width: 176px;
    width: 100%;
    height: 112px;
    background-color: $white-color;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
    cursor: pointer;
}

.key--utility {
  background-color: #e6e4e4;
  max-width: 197px;
  width: 100%;
}

.key--capslock {
  background-color: #e6e4e4;
  max-width: 197px;
  width: 100%;

  &.key--active {
    background-color: #b0b0b0;
    svg path {
      fill: white;
    }
  }
}

.key--space {
  flex-grow: 1;
  max-width: 1132px;
} 

.key--number {
    max-width: 280px;
    width: 100%;
    background-color: #e6e4e4;
}
.key--language {
    max-width: 280px;
    width: 100%;
    background-color: #e6e4e4;
}

</style>