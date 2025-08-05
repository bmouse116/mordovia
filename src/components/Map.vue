<template>
  <div class="navigation" ref="navigationRef">
    <div class="first-floor" id="image-container" ref="containerRef" @pointerdown="onPointerDown">
      <img ref="imageRef" :style="imageStyle" :src="currentMapUrl" alt="План этажа" @load="onImageLoad">

      <div ref="pixiContainerRef" class="pixi-canvas-container" :style="pixiStyle">
      </div>
    </div>
    <div class="floor-switch">
      <div class="switch-controls">
        <button v-for="floor in floors" :key="floor.id" :class="{ active: currentFloor === floor.id }"
          @click="switchFloor(floor.id)">
          {{ floor.id }}
        </button>
      </div>
      <div class="navigation-zoom">
        <div class="zoom-controls">
          <div class="pluse" @click="handleZoomIn">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M24 0C24.5304 0 25.0391 0.210714 25.4142 0.585787C25.7893 0.96086 26 1.46957 26 2V22H46C46.5304 22 47.0391 22.2107 47.4142 22.5858C47.7893 22.9609 48 23.4696 48 24C48 24.5304 47.7893 25.0391 47.4142 25.4142C47.0391 25.7893 46.5304 26 46 26H26V46C26 46.5304 25.7893 47.0391 25.4142 47.4142C25.0391 47.7893 24.5304 48 24 48C23.4696 48 22.9609 47.7893 22.5858 47.4142C22.2107 47.0391 22 46.5304 22 46V26H2C1.46957 26 0.96086 25.7893 0.585787 25.4142C0.210714 25.0391 0 24.5304 0 24C0 23.4696 0.210714 22.9609 0.585787 22.5858C0.96086 22.2107 1.46957 22 2 22H22V2C22 1.46957 22.2107 0.96086 22.5858 0.585787C22.9609 0.210714 23.4696 0 24 0V0Z"
                fill="white" />
            </svg>
          </div>
          <div class="minus" @click="handleZoomOut">
            <svg width="48" height="4" viewBox="0 0 48 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0 2C0 1.46957 0.210714 0.96086 0.585787 0.585787C0.96086 0.210714 1.46957 0 2 0H46C46.5304 0 47.0391 0.210714 47.4142 0.585787C47.7893 0.96086 48 1.46957 48 2C48 2.53043 47.7893 3.03914 47.4142 3.41422C47.0391 3.78929 46.5304 4 46 4H2C1.46957 4 0.96086 3.78929 0.585787 3.41422C0.210714 3.03914 0 2.53043 0 2Z"
                fill="white" />
            </svg>
          </div>
        </div>
        <div class="navigation-geo" @click="navigateToTerminal">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M55.5207 8.48136C55.2909 8.25087 54.9975 8.09409 54.6782 8.03103C54.3588 7.96797 54.0279 8.00149 53.7277 8.1273L1.00618 30.2228C0.35024 30.4977 -0.0538059 31.1646 0.00580563 31.8738C0.0654171 32.583 0.575123 33.1729 1.26771 33.3342L24.238 38.6844C24.4556 38.735 24.6547 38.8454 24.8129 39.003C24.9712 39.1606 25.0824 39.3592 25.134 39.5766L30.6269 62.7251C30.712 63.0843 30.9158 63.4042 31.2053 63.6332C31.4948 63.8621 31.8531 63.9867 32.2223 63.9867C32.545 63.9865 32.8605 63.891 33.1292 63.7122C33.3979 63.5335 33.6078 63.2794 33.7327 62.9818L55.8718 10.2766C55.998 9.97628 56.032 9.64523 55.9695 9.32555C55.907 9.00587 55.7507 8.71201 55.5207 8.48136Z"
              fill="#ffffff" />
          </svg>
        </div>
      </div>
    </div>

    <div class="route-menu" v-if="routeVisible">
      <div class="route-title">
        <span>Основной корпус</span>
        <span>•</span>
        <span>1 этаж</span>
      </div>
      <div class="route-controls">
        <div class="route-qr">
          <button @click="openQrPopup">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.54547 24.3636C5.01821 24.3636 4 23.3454 4 21.8181V11.6363C4 7.30905 7.30905 4 11.6363 4H21.8181C23.3454 4 24.3636 5.01821 24.3636 6.54547C24.3636 8.07274 23.3454 9.09095 21.8181 9.09095H11.6363C10.1091 9.09095 9.09084 10.1092 9.09084 11.6364V21.8182C9.09095 23.3454 8.07274 24.3636 6.54547 24.3636ZM57.4544 24.3636C55.9272 24.3636 54.909 23.3454 54.909 21.8181V11.6363C54.909 10.1091 53.8907 9.09084 52.3635 9.09084H42.1817C40.6544 9.09084 39.6362 8.07263 39.6362 6.54537C39.6362 5.01811 40.6544 4 42.1817 4H52.3635C56.6907 4 59.9998 7.30905 59.9998 11.6363V21.8181C59.9999 23.3454 58.9817 24.3636 57.4544 24.3636ZM21.8181 59.9999H11.6363C7.30905 59.9999 4 56.6908 4 52.3636V42.1818C4 40.6545 5.01821 39.6363 6.54547 39.6363C8.07274 39.6363 9.09095 40.6545 9.09095 42.1818V52.3636C9.09095 53.8908 10.1092 54.9091 11.6364 54.9091H21.8182C23.3455 54.9091 24.3637 55.9273 24.3637 57.4545C24.3636 58.9817 23.3454 59.9999 21.8181 59.9999ZM52.3636 59.9999H42.1818C40.6545 59.9999 39.6363 58.9817 39.6363 57.4544C39.6363 55.9272 40.6545 54.909 42.1818 54.909H52.3636C53.8908 54.909 54.9091 53.8907 54.9091 52.3635V42.1817C54.9091 40.6544 55.9273 39.6362 57.4545 39.6362C58.9818 39.6362 60 40.6544 60 42.1817V52.3635C59.9999 56.6908 56.6908 59.9999 52.3636 59.9999Z"
                fill="#415AFF" />
              <path
                d="M26.9089 29.4544H16.7271C15.1999 29.4544 14.1816 28.4362 14.1816 26.909V16.7272C14.1816 15.1999 15.1999 14.1817 16.7271 14.1817H26.9089C28.4362 14.1817 29.4544 15.1999 29.4544 16.7272V26.909C29.4544 28.4362 28.4362 29.4544 26.9089 29.4544ZM19.2726 24.3635H24.3635V19.2725H19.2726V24.3635ZM26.9089 49.818H16.7271C15.1999 49.818 14.1816 48.7998 14.1816 47.2725V37.0908C14.1816 35.5635 15.1999 34.5453 16.7271 34.5453H26.9089C28.4362 34.5453 29.4544 35.5635 29.4544 37.0908V47.2725C29.4544 48.7998 28.4362 49.818 26.9089 49.818ZM19.2726 44.7271H24.3635V39.6361H19.2726V44.7271ZM47.2725 29.4544H37.0907C35.5634 29.4544 34.5452 28.4362 34.5452 26.909V16.7272C34.5452 15.1999 35.5634 14.1817 37.0907 14.1817H47.2725C48.7997 14.1817 49.818 15.1999 49.818 16.7272V26.909C49.818 28.4362 48.7997 29.4544 47.2725 29.4544ZM39.6362 24.3635H44.7271V19.2725H39.6362V24.3635ZM37.0907 42.1816C35.5634 42.1816 34.5452 41.1634 34.5452 39.6361V37.0907C34.5452 35.5634 35.5634 34.5452 37.0907 34.5452C38.618 34.5452 39.6362 35.5634 39.6362 37.0907V39.6361C39.6362 41.1635 38.618 42.1816 37.0907 42.1816ZM47.2725 39.6362H44.727C43.1997 39.6362 42.1815 38.618 42.1815 37.0908C42.1815 35.5635 43.1997 34.5453 44.727 34.5453H47.2725C48.7997 34.5453 49.818 35.5635 49.818 37.0908C49.818 38.618 48.7997 39.6362 47.2725 39.6362ZM47.2725 49.818H39.6362C38.1089 49.818 37.0907 48.7998 37.0907 47.2725C37.0907 45.7453 38.1089 44.7271 39.6362 44.7271H47.2725C48.7997 44.7271 49.818 45.7453 49.818 47.2725C49.818 48.7998 48.7997 49.818 47.2725 49.818Z"
                fill="#415AFF" />
            </svg>
            Поделится маршрутом
          </button>
        </div>
        <div class="route-cancel">
          <button @click="clearRoute">Отменить маршрут</button>
        </div>
      </div>
    </div>

    <PointPopup v-if="popupPointVisible && activeTenant" @draw="drawRoute" @openInfo="handleOpenInfo"
      @close="deactivateActiveObject" :tenants="activeTenant" :is-loading="isTenantLoading" />
    <QRPopup v-if="popupVisible" @close="closePopup" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, type CSSProperties, inject, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '../store/navigate';
import { storeToRefs } from 'pinia';
import { Application, Assets, Graphics, Container, Sprite, Text, TextStyle, Texture } from 'pixi.js';
import gsap from 'gsap';
import PointPopup from './PointPopup.vue';
import QRPopup from './QRPopup.vue';
import type { Tenants, Area, PointArea, Floor as FloorType, Node } from '../types/types';
import axios from 'axios';


const fullRoutePath = ref<Node[] | null>(null);

const { terminal, areas, tenants, nodes } = storeToRefs(useStore());
const API_URL = inject('API_URL') as string;

const props = defineProps({
  floors: {
    type: Array as () => FloorType[],
    required: true
  },
});

let app: Application;
let iconsContainer: Container;
let routeContainer: Container;
let areasContainer: Container;
let delayTime = 0;
let colorWay: string | number = '#00ABEB';
let ACTIVE_ICON_COLOR_PIXI: number = 0x415AFF;
const DEFAULT_ICON_BG_COLOR = 0xA8BBFF;
const DEFAULT_ICON_TINT = 0xFFFFFF;
const ACTIVE_ICON_TINT = 0xFFFFFF;
const DEFAULT_AREA_FILL = 0x415AFF;
const ACTIVE_AREA_FILL = 0xEB4F27;
const DEFAULT_AREA_ALPHA = 0.3;
const ACTIVE_AREA_ALPHA = 0.5;
const AREA_BORDER_COLOR = 0xFFFFFF;

const navigationRef = ref<HTMLDivElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const pixiContainerRef = ref<HTMLElement | null>(null);
const currentFloor = ref(1);
const popupVisible = ref(false);
const popupPointVisible = ref(false);
const activeTenant = ref<Tenants | null>(null)
const routeVisible = ref(false);
const routeToBuild = ref<string | null>(null);
const router = useRouter();
const route = useRoute();
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const isDragging = ref(false);
const lastPointerPosition = ref({ x: 0, y: 0 });
const imageNaturalDimensions = ref({ width: 0, height: 0 });
const containerDimensions = ref({ width: 0, height: 0 });
const transitionStyle = ref('transform 0.3s ease');
const isPinching = ref(false);
const lastPinchDistance = ref(0);

let activeObject: Container | Graphics | null = null;

const TERMINAL_LOCATION = computed(() => {
  if (terminal.value?.points?.x !== undefined && terminal.value?.points?.y !== undefined) {
    return { x: terminal.value.points.x, y: terminal.value.points.y };
  }
  return null;
});

const currentMapUrl = computed(() => {
  const floorData = props.floors.find(f => f.id === currentFloor.value);
  if (!floorData || !floorData.mapImage) return undefined;
  const baseUrl = API_URL.replace('top/api', 'top');
  return `${baseUrl}${floorData.mapImage}`;
});

const imageStyle = computed((): CSSProperties => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  transformOrigin: '0 0', willChange: 'transform', userSelect: 'none', transition: transitionStyle.value,
}));

const pixiStyle = computed((): CSSProperties => ({
  ...imageStyle.value,
  width: `${imageNaturalDimensions.value.width}px`, height: `${imageNaturalDimensions.value.height}px`,
}));

const initializePixi = async () => {
  if (app || !pixiContainerRef.value || !imageNaturalDimensions.value.width) return;
  app = new Application();
  await app.init({
    width: imageNaturalDimensions.value.width,
    height: imageNaturalDimensions.value.height,
    backgroundAlpha: 0,
    preserveDrawingBuffer: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1
  });
  pixiContainerRef.value?.appendChild(app.canvas);
  areasContainer = new Container();
  iconsContainer = new Container();
  routeContainer = new Container();
  app.stage.addChild(areasContainer, iconsContainer, routeContainer);
  app.stage.eventMode = 'passive';
  app.stage.hitArea = app.screen;
};

async function redrawAllObjects() {
  if (!app || !tenants.value?.length || !areas.value?.length) return;
  await drawMapIcons();
  drawMapAreas();
  setTerminal();
}

// function transformBackendPoint(point: { x: number; y: number }): { x: number; y: number } {
//   return {
//     x: (point.x * COORD_SCALE) + COORD_OFFSET_X,
//     y: (point.y * COORD_SCALE) + COORD_OFFSET_Y,
//   };
// }

function drawMapAreas() {
  if (!app || !areasContainer || !Array.isArray(areas.value)) return;
  areasContainer.removeChildren();
  const terminalAreaId = terminal.value?.area;
  const floorAreas: Area[] = areas.value
    .filter(area => {
      if (area.floor !== currentFloor.value) return false;
      if (terminalAreaId && area.id === terminalAreaId) return false;
      return true;
    });

  floorAreas.forEach(areaData => {
    const polygonPoints = areaData.points.flatMap(p => [p.x, p.y]);
    if (polygonPoints.length < 6) return;

    const areaShape = new Graphics();
    areaShape.lineStyle(8, AREA_BORDER_COLOR, 1);
    areaShape.beginFill(DEFAULT_AREA_FILL, DEFAULT_AREA_ALPHA);
    areaShape.drawPolygon(polygonPoints);
    areaShape.endFill();
    areaShape.eventMode = 'static';
    areaShape.cursor = 'pointer';
    (areaShape as any).areaData = areaData;
    areaShape.on('pointertap', (event) => {
      event.stopPropagation();
      if (activeObject === areaShape) {
        deactivateActiveObject();
      } else {
        // Находим иконку, связанную с областью
        const iconToActivate = iconsContainer.children.find(
          (child) => (child as any).areaId === areaData.id
        ) as Container | undefined;
        activateObject(areaShape, iconToActivate);
      }
    });
    areasContainer.addChild(areaShape);
  });
}

async function drawMapIcons() {
  if (!app || !iconsContainer || !Array.isArray(tenants.value) || !Array.isArray(areas.value)) return;

  iconsContainer.removeChildren();
  const floorTenants = tenants.value.filter(tenant => tenant.floor.id === currentFloor.value);

  for (const tenantData of floorTenants) {
    const tenantArea = areas.value.find(area => area.id === tenantData.area);
    if (!tenantArea || tenantArea.points.length === 0) continue;

    const iconPosition = getPolygonCenter(tenantArea.points);

    let iconTexture: Texture | null = null;

    if (tenantData.icon) {
      try {
        const proxiedIconUrl = `/image_proxy${tenantData.icon}`;
        console.log(tenantData.icon)
        const loadedAsset = await Assets.load(proxiedIconUrl);
        if (loadedAsset instanceof Texture) {
          iconTexture = loadedAsset;
        }
      } catch (error) {
        console.warn(`Ошибка при загрузке иконки для "${tenantData.title}" по адресу ${tenantData.icon}:`, error);
      }
    }

    if (!iconTexture) {
      iconTexture = Texture.WHITE;
    }

    const iconContainer = new Container();
    iconContainer.x = iconPosition.x;
    iconContainer.y = iconPosition.y;
    (iconContainer as any).tenantData = tenantData;
    (iconContainer as any).areaId = tenantArea.id; // Сохраняем ID области
    const iconBgSize = 140;
    const iconBgRadius = 36;
    const iconBg = new Graphics().beginFill(DEFAULT_ICON_BG_COLOR).drawRoundedRect(-iconBgSize / 2, -iconBgSize / 2, iconBgSize, iconBgSize, iconBgRadius).endFill();

    const iconSprite = new Sprite(iconTexture);
    iconSprite.anchor.set(0.5);
    iconSprite.width = 80;
    iconSprite.height = 80;
    iconSprite.tint = DEFAULT_ICON_TINT;
    iconContainer.addChild(iconBg, iconSprite);
    iconContainer.eventMode = 'none'; // Отключаем события на иконке
    (iconContainer as any).iconBg = iconBg;
    (iconContainer as any).iconSprite = iconSprite;
    (iconContainer as any).bgParams = { size: iconBgSize, radius: iconBgRadius };

    const elementsContainer = new Container();
    elementsContainer.x = iconPosition.x;
    elementsContainer.y = iconPosition.y;
    elementsContainer.visible = false;
    const tooltipPadding = 20;
    const tooltipTextStyle = new TextStyle({ fontSize: 40, fill: '#ffffff', fontWeight: 'bold', wordWrap: true, wordWrapWidth: 300 });
    const tooltipText = new Text({ text: tenantData.title, style: tooltipTextStyle });
    tooltipText.anchor.set(0.5);
    const tooltipBg = new Graphics().beginFill(ACTIVE_ICON_COLOR_PIXI).drawRoundedRect(-tooltipText.width / 2 - tooltipPadding, -tooltipText.height / 2 - tooltipPadding, tooltipText.width + tooltipPadding * 2, tooltipText.height + tooltipPadding * 2, 30).endFill();
    const tooltipArrow = new Graphics().moveTo(0, 0).lineTo(-15, -15).lineTo(15, -15).closePath().beginFill(ACTIVE_ICON_COLOR_PIXI).endFill();
    tooltipArrow.y = tooltipBg.height - (tooltipPadding + 10);
    const bottomArrow = new Graphics().moveTo(0, 0).lineTo(-15, -15).lineTo(15, -15).closePath().beginFill(ACTIVE_ICON_COLOR_PIXI).endFill();
    bottomArrow.y = iconBgSize / 2 + 10;
    const bottomDot = new Graphics().lineStyle(4, 0xffffff).beginFill(ACTIVE_ICON_COLOR_PIXI).drawCircle(0, 0, 10).endFill();
    bottomDot.y = bottomArrow.y + 25;
    elementsContainer.addChild(bottomArrow, bottomDot);
    (iconContainer as any).elementsContainer = elementsContainer;
    iconsContainer.addChild(iconContainer, elementsContainer);
  }
}

function setTerminal() {
  if (!app) return;
  const oldTerminal = app.stage.children.find(c => (c as any).isTerminal);
  if (oldTerminal) {
    app.stage.removeChild(oldTerminal);
    oldTerminal.destroy({ children: true });
  }

  if (!TERMINAL_LOCATION.value || terminal.value?.floor !== currentFloor.value) {
    return;
  }

  const TERMINAL_DIAMETER = 75;
  const TEXT_PADDING = 20;
  const redCircleRadius = TERMINAL_DIAMETER / 2;
  const TERMINAL_TEXT = "Вы здесь";
  const TERMINAL_TEXT_STYLE = new TextStyle({ fontSize: 48, fontWeight: 'bold', fill: '#000000', align: 'center' });
  const terminalContainer = new Container();
  (terminalContainer as any).isTerminal = true;
  terminalContainer.position.set(TERMINAL_LOCATION.value.x, TERMINAL_LOCATION.value.y);
  terminalContainer.sortableChildren = true;
  app.stage.addChild(terminalContainer);
  const pulseCirle = new Graphics().beginFill(0xecefff).drawCircle(0, 0, 65).endFill();
  pulseCirle.zIndex = 1;
  const redCirle = new Graphics().beginFill(0x415aff).drawCircle(0, 0, redCircleRadius).endFill();
  redCirle.zIndex = 2;
  const text = new Text({ text: TERMINAL_TEXT, style: TERMINAL_TEXT_STYLE });
  text.anchor.set(0.5, 0);
  text.y = redCircleRadius + TEXT_PADDING;
  text.zIndex = 3;
  terminalContainer.addChild(pulseCirle, redCirle, text);

  gsap.to(pulseCirle.scale, {
    x: 1.5,
    y: 1.5,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

function deactivateActiveObject() {
  if (!activeObject) return;
  iconsContainer.children.forEach(icon => {
    const bg = (icon as any).iconBg as Graphics;
    const sprite = (icon as any).iconSprite as Sprite;
    const params = (icon as any).bgParams;
    const elements = (icon as any).elementsContainer as Container;
    if (bg && sprite && params) {
      bg.clear().beginFill(DEFAULT_ICON_BG_COLOR).drawRoundedRect(-params.size / 2, -params.size / 2, params.size, params.size, params.radius).endFill();
      sprite.tint = DEFAULT_ICON_TINT;
    }
    if (elements) elements.visible = false;
  });
  areasContainer.children.forEach(areaShape => {
    const areaData = (areaShape as any).areaData as Area;
    if (areaData && areaShape instanceof Graphics) {
      const polygonPoints = areaData.points.flatMap(p => [p.x, p.y]);
      areaShape.clear().lineStyle(8, AREA_BORDER_COLOR, 1).beginFill(DEFAULT_AREA_FILL, DEFAULT_AREA_ALPHA).drawPolygon(polygonPoints).endFill();
    }
  });
  activeObject = null;
  popupPointVisible.value = false;
  activeTenant.value = null;
}

function activateObject(areaShape: Graphics, iconContainer?: Container) {
  if (isTenantLoading.value && activeTenant.value?.id === (iconContainer as any)?.tenantData?.id) {
    return;
  }

  deactivateActiveObject();
  activeObject = areaShape;

  let tenantFromList: Tenants | undefined;
  let tenantId: number | undefined;

  const areaId = (areaShape as any).areaData.id;
  tenantFromList = tenants.value.find(t => t.area === areaId);
  if (tenantFromList) {
    tenantId = tenantFromList.id;
  }

  if (tenantFromList && tenantId !== undefined) {
    // Активируем область
    const areaData = (areaShape as any).areaData as Area;
    const polygonPoints = areaData.points.flatMap(p => [p.x, p.y]);
    areaShape.clear().lineStyle(12, AREA_BORDER_COLOR, 1).beginFill(ACTIVE_AREA_FILL, ACTIVE_AREA_ALPHA).drawPolygon(polygonPoints).endFill();

    // Активируем иконку, если она передана
    if (iconContainer) {
      const bg = (iconContainer as any).iconBg as Graphics;
      const sprite = (iconContainer as any).iconSprite as Sprite;
      const params = (iconContainer as any).bgParams;
      const elements = (iconContainer as any).elementsContainer as Container;
      if (bg && sprite && params) {
        bg.clear().beginFill(ACTIVE_ICON_COLOR_PIXI).drawRoundedRect(-params.size / 2, -params.size / 2, params.size, params.size, params.radius).endFill();
        sprite.tint = ACTIVE_ICON_TINT;
      }
      if (elements) elements.visible = true;
    }

    activeTenant.value = tenantFromList;
    popupPointVisible.value = true;

    fetchTenantDetails(tenantId);
  } else {
    console.warn("Не удалось определить ID арендатора для активации.");
  }
}

function getPolygonCenter(points: PointArea[]): { x: number; y: number; } {
  const totalPoints = points.length;
  if (totalPoints === 0) return { x: 0, y: 0 };
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / totalPoints, y: sum.y / totalPoints };
}

function findShortestPath(startNodeId: number, endNodeId: number, graph: Node[]): number[] {
  const distances: { [key: number]: number } = {};
  const prev: { [key: number]: number | null } = {};
  const pq: { [key: string]: number } = {};
  const graphMap = new Map(graph.map(node => [node.id, node]));
  for (const node of graph) {
    distances[node.id] = Infinity;
    prev[node.id] = null;
    pq[node.id] = Infinity;
  }
  distances[startNodeId] = 0;
  pq[startNodeId] = 0;
  while (Object.keys(pq).length > 0) {
    const u = Object.keys(pq).reduce((a, b) => pq[a] < pq[b] ? a : b);
    const uId = parseInt(u);
    delete pq[u];
    if (uId === endNodeId) {
      const path: number[] = [];
      let current: number | null = endNodeId;
      while (current !== null) {
        path.unshift(current);
        current = prev[current];
      }
      return path;
    }
    const uNode = graphMap.get(uId);
    if (!uNode) continue;
    for (const vId of uNode.nodes) {
      const vNode = graphMap.get(vId);
      if (!vNode) continue;
      const weight = Math.hypot(vNode.point.x - uNode.point.x, vNode.point.y - uNode.point.y);
      const alt = distances[uId] + weight;
      if (alt < distances[vId]) {
        distances[vId] = alt;
        prev[vId] = uId;
        pq[vId] = alt;
      }
    }
  }
  return [];
}

const drawRoute = () => {
  if (!app || !activeObject) return;

  let endNodeId: number | undefined;

  if ((activeObject as any).tenantData) {
    endNodeId = (activeObject as any).tenantData.node;
  } else if ((activeObject as any).areaData) {
    const areaId = (activeObject as any).areaData.id;
    const tenant = tenants.value.find(t => t.area === areaId);
    if (tenant) {
      endNodeId = tenant.node;
    }
  }

  const startNodeId = terminal.value?.node;

  if (startNodeId && endNodeId && nodes.value.length > 0) {
    const pathIds = findShortestPath(startNodeId, endNodeId, nodes.value);

    if (pathIds.length > 0) {
      const pathNodes = pathIds.map(id => nodes.value.find(n => n.id === id)).filter((n): n is Node => !!n);
      fullRoutePath.value = pathNodes;
    } else {
      clearRoute();
    }
  } else {
    console.error("Невозможно построить маршрут: отсутствует начальный или конечный узел, или не загружен граф.");
  }
};

function buildWay(nodes: Node[]) {
  if (!app || !routeContainer || nodes.length < 2) return;

  const widthDottedLine = 6;
  const lengthDottedLine = 20;
  const radiusDottedLine = 6;
  const gapDottedLine = 5;
  delayTime = 0;

  for (let c = 0; c < nodes.length - 1; c++) {
    const start = nodes[c].point;
    const end = nodes[c + 1].point;

    const distance = Math.hypot(end.x - start.x, end.y - start.y);
    const dottedCount = Math.floor(distance / (lengthDottedLine + gapDottedLine));

    const dx = (end.x - start.x) / distance;
    const dy = (end.y - start.y) / distance;
    const timeOneSegment = 4 / nodes.length / dottedCount;

    for (let j = 0; j < dottedCount; j++) {
      const x = start.x + (lengthDottedLine + gapDottedLine) * j * dx + (lengthDottedLine / 2) * dx;
      const y = start.y + (lengthDottedLine + gapDottedLine) * j * dy + (lengthDottedLine / 2) * dy;

      const pointDottedLine = new Graphics();
      routeContainer.addChild(pointDottedLine);
      pointDottedLine
        .roundRect(x, y, widthDottedLine, lengthDottedLine, radiusDottedLine)
        .fill(colorWay);

      const angle = Math.atan2(dy, dx);
      pointDottedLine.pivot.set(x + widthDottedLine / 2, y + lengthDottedLine / 2);
      pointDottedLine.position.set(x, y);
      pointDottedLine.rotation = angle + Math.PI / 2;

      pointDottedLine.alpha = 0;
      pointDottedLine.scale.set(0);
      gsap.to(pointDottedLine, {
        alpha: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power1.out',
        delay: 0.1 + delayTime,
      });
      delayTime += timeOneSegment;

      if (j + 1 === dottedCount && c < nodes.length - 2) {
        const x1 = end.x;
        const y1 = end.y;
        const finalLengthDottedLine = 15;

        const pointDottedLine = new Graphics();
        routeContainer.addChild(pointDottedLine);
        pointDottedLine
          .roundRect(x1, y1, widthDottedLine, finalLengthDottedLine, radiusDottedLine)
          .fill(colorWay);

        pointDottedLine.pivot.set(x1 + widthDottedLine / 2, y1 + widthDottedLine / 2);
        pointDottedLine.position.set(x1, y1);
        pointDottedLine.rotation = angle + Math.PI / 2;

        pointDottedLine.alpha = 0;
        pointDottedLine.scale.set(0);
        gsap.to(pointDottedLine, {
          alpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power1.out',
          delay: 0.1 + delayTime,
        });

        const rect = new Graphics();
        routeContainer.addChild(rect);
        rect
          .rect(end.x - widthDottedLine / 2, end.y - widthDottedLine / 2, widthDottedLine, widthDottedLine)
          .fill(colorWay);

        rect.alpha = 0;
        rect.scale.set(0);
        gsap.to(rect, {
          alpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power1.out',
          delay: 0.1 + delayTime,
        });

        delayTime += timeOneSegment;
      }

      if (j + 1 === dottedCount && c === nodes.length - 2) {
        const x1 = end.x;
        const y1 = end.y;
        const finalLengthDottedLine = 20;

        const pointDottedLine = new Graphics();
        routeContainer.addChild(pointDottedLine);
        pointDottedLine
          .roundRect(x1, y1, widthDottedLine, finalLengthDottedLine, radiusDottedLine)
          .fill(colorWay);

        pointDottedLine.pivot.set(x1 + widthDottedLine / 2, y1 + widthDottedLine / 2);
        pointDottedLine.position.set(x1, y1);
        pointDottedLine.rotation = angle + Math.PI / 2;

        pointDottedLine.alpha = 0;
        pointDottedLine.scale.set(0);
        gsap.to(pointDottedLine, {
          alpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power1.out',
          delay: 0.1 + delayTime,
        });

        const arrowLength = 25;

        const pointDottedLine1 = new Graphics();
        routeContainer.addChild(pointDottedLine1);
        pointDottedLine1
          .roundRect(x1, y1, widthDottedLine, arrowLength, radiusDottedLine)
          .fill(colorWay);
        pointDottedLine1.pivot.set(x1 + widthDottedLine / 2, y1 + widthDottedLine / 2);
        pointDottedLine1.position.set(x1, y1);
        pointDottedLine1.rotation = angle + (Math.PI / 180) * 45;

        pointDottedLine1.alpha = 0;
        pointDottedLine1.scale.set(0);
        gsap.to(pointDottedLine1, {
          alpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power1.out',
          delay: 0.1 + delayTime,
        });

        const pointDottedLine2 = new Graphics();
        routeContainer.addChild(pointDottedLine2);
        pointDottedLine2
          .roundRect(x1, y1, widthDottedLine, arrowLength, radiusDottedLine)
          .fill(colorWay);
        pointDottedLine2.pivot.set(x1 + widthDottedLine / 2, y1 + widthDottedLine / 2);
        pointDottedLine2.position.set(x1, y1);
        pointDottedLine2.rotation = angle + (Math.PI / 180) * 135;

        pointDottedLine2.alpha = 0;
        pointDottedLine2.scale.set(0);
        gsap.to(pointDottedLine2, {
          alpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power1.out',
          delay: 0.1 + delayTime,
        });

        delayTime += timeOneSegment;
      }
    }
  }
}

function drawStairIcon(node: Node, targetFloorId: number) {
  if (!app || !routeContainer) return;

  const targetFloor = props.floors.find(f => f.id === targetFloorId);
  const textContent = targetFloor ? `на ${targetFloor.name.toLowerCase()}` : `Переход`;

  const stairContainer = new Container();
  stairContainer.position.set(node.point.x, node.point.y);
  routeContainer.addChild(stairContainer);

  const style = new TextStyle({
    fontSize: 36,
    fontWeight: 'bold',
    fill: 0xffffff,
    stroke: { color: '#000000', width: 4 },
  });
  const text = new Text({ text: textContent, style });
  text.anchor.set(0.5);

  const bg = new Graphics()
    .roundRect(0, 0, text.width + 40, text.height + 20, 20)
    .fill(colorWay);
  bg.pivot.set(bg.width / 2, bg.height + 10);

  stairContainer.addChild(bg, text);
  stairContainer.alpha = 0;
  stairContainer.scale.set(0);

  gsap.to(stairContainer, {
    alpha: 1,
    scale: 1,
    duration: 0.5,
    delay: delayTime + 0.2,
    ease: 'back.out(1.7)',
  });
}

function drawVisibleRoute() {
  routeContainer.removeChildren();
  if (!fullRoutePath.value) {
    routeVisible.value = false;
    return;
  }

  routeVisible.value = true;
  const path = fullRoutePath.value;

  const nodesOnCurrentFloor = path.filter(node => node.point.floor === currentFloor.value);
  if (nodesOnCurrentFloor.length > 0) {
    buildWay(nodesOnCurrentFloor);
  }

  for (let i = 0; i < path.length - 1; i++) {
    const currentNode = path[i];
    const nextNode = path[i + 1];

    if (currentNode.point.floor === currentFloor.value && nextNode.point.floor !== currentFloor.value) {
      drawStairIcon(currentNode, nextNode.point.floor);
    }
  }
}

const clearRoute = () => {
  fullRoutePath.value = null;
  if (routeContainer) routeContainer.removeChildren();
  routeVisible.value = false;
  if (!activeObject) popupPointVisible.value = false;
};

const pendingFocusTenant = ref<Tenants | null>(null);

const onImageLoad = async () => {
  if (imageRef.value) {
    imageNaturalDimensions.value = { width: imageRef.value.naturalWidth, height: imageRef.value.naturalHeight };
  }
  initializeMapState();
  await initializePixi();
  redrawAllObjects();
  if (routeToBuild.value) {
    buildRouteToPoint(routeToBuild.value);
    routeToBuild.value = null;
  }
  
  // ДОБАВЛЕНО: Проверяем, есть ли ожидающий фокус после смены этажа
  if (pendingFocusTenant.value) {
    // Копируем значение, чтобы избежать гонки состояний, если пользователь кликнет еще раз
    const tenantToFocus = pendingFocusTenant.value; 
    pendingFocusTenant.value = null; // Сразу очищаем

    setTimeout(() => {
        performFocus(tenantToFocus); // Передаем сохраненное значение
    }, 100); 
  }
};

const switchFloor = (floor: number) => {
  if (currentFloor.value === floor) return;
  currentFloor.value = floor;
  deactivateActiveObject();
  //redrawAllObjects();
};

const triggerFocusById = (tenantId: string) => {
  const targetTenant = tenants.value.find(t => t.id.toString() === tenantId);
  if (targetTenant) {
    focusOnTenant(targetTenant);
  } else {
    console.warn(`Арендатор с ID ${tenantId} не найден в текущем списке tenants.`);
  }
};

const handleNavigationActions = () => {
  const focusId = route.query.focusOnId as string | undefined;
  const routeId = route.query.pointId as string | undefined;

  if (focusId) {
    // Очищаем URL
    router.replace({ query: { ...route.query, focusOnId: undefined } });

    // Если данные уже есть, фокусируемся сразу
    if (tenants.value.length > 0) {
      triggerFocusById(focusId);
    } else {
      // Если данных нет, ставим одноразовый 'watch'
      const unwatch = watch(tenants, (newTenants) => {
        if (newTenants.length > 0) {
          triggerFocusById(focusId);
          unwatch(); // Отключаем наблюдатель после первого срабатывания
        }
      }, { deep: true });
    }
  }

  if (routeId) {
    router.replace({ query: { ...route.query, pointId: undefined } });

    if (tenants.value.length > 0 && app) {
      buildRouteToPoint(routeId);
    } else {
      const unwatch = watch(tenants, (newTenants) => {
        if (newTenants.length > 0 && app) {
          buildRouteToPoint(routeId);
          unwatch();
        }
      }, { deep: true });
    }
  }
};

const performFocus = (tenant: Tenants) => {
    if (!containerRef.value || !areas.value) {
        return;
    }

    const targetArea = areas.value.find(area => area.id === tenant.area);
    if (!targetArea) {
        return;
    }

    const targetCoords = getPolygonCenter(targetArea.points);
    if (!targetCoords) return;

    // --- НАЧАЛО ИЗМЕНЕНИЙ ---

    // 1. Получаем актуальные размеры контейнера и карты
    const cW = containerRef.value.clientWidth;
    const cH = containerRef.value.clientHeight;
    const iW = imageNaturalDimensions.value.width;
    const iH = imageNaturalDimensions.value.height;

    if (cW === 0 || iW === 0) {
        setTimeout(() => performFocus(tenant), 100);
        return;
    }

    // 2. Вычисляем параметры для двух состояний
    
    // Состояние "ОТДАЛЕНИЕ" (карта видна целиком)
    const resetScale = Math.min(cW / iW, cH / iH) * 0.95; // 0.95 для небольших полей
    const resetX = (cW - iW * resetScale) / 2;
    const resetY = (cH - iH * resetScale) / 2;

    // Состояние "ПРИБЛИЖЕНИЕ" (фокус на точке)
    const targetScale = 1; // Ваш желаемый уровень зума
    const targetX = (cW / 2) - (targetCoords.x * targetScale);
    const targetY = (cH / 2) - (targetCoords.y * targetScale);

    // 3. Создаем и запускаем временную шкалу (timeline) GSAP
    
    transitionStyle.value = 'none'; // Отключаем CSS-переходы на время анимации

    const tl = gsap.timeline({
        onComplete: () => {
            // По завершении всей анимации возвращаем CSS-переходы
            transitionStyle.value = 'transform 0.3s ease';
            
            // И активируем попап для точки
            const targetAreaShape = areasContainer.children.find(
                (child) => (child as any).areaData?.id === tenant.area
            ) as Graphics | undefined;
            const targetIcon = iconsContainer.children.find(
                (child) => (child as any).areaId === tenant.area
            ) as Container | undefined;

            if (targetAreaShape) {
                activateObject(targetAreaShape, targetIcon);
            }
        }
    });

    // Переменная для анимации
    const view = { 
        scale: scale.value, 
        translateX: translateX.value, 
        translateY: translateY.value 
    };

    // Добавляем шаги в timeline
    tl.to(view, {
        // Шаг 1: Анимация "отдаления"
        scale: resetScale,
        translateX: resetX,
        translateY: resetY,
        duration: 0.4, // Длительность отдаления
        ease: 'power2.inOut',
        onUpdate: () => {
            // Обновляем реальные ref'ы в каждом кадре
            scale.value = view.scale;
            translateX.value = view.translateX;
            translateY.value = view.translateY;
            applyBoundaryConstraints();
        }
    })
    .to(view, {
        // Шаг 2: Анимация "приближения"
        scale: targetScale,
        translateX: targetX,
        translateY: targetY,
        duration: 2, // Длительность приближения
        ease: 'power2.inOut',
        onUpdate: () => {
            scale.value = view.scale;
            translateX.value = view.translateX;
            translateY.value = view.translateY;
            applyBoundaryConstraints();
        }
    }, ">-0.2"); // ">-0.2" означает, что этот шаг начнется за 0.2с до конца предыдущего, создавая плавный переход
    
    // --- КОНЕЦ ИЗМЕНЕНИЙ ---
};


// ДОБАВЛЕНО: Главный метод, который будет вызываться из родителя
const focusOnTenant = (tenant: Tenants) => {
    // Если арендатор находится не на текущем этаже
    if (tenant.floor.id !== currentFloor.value) {
        // Сохраняем его в "ожидание"
        pendingFocusTenant.value = tenant;
        // И переключаем этаж. Остальное сделает `onImageLoad`
        switchFloor(tenant.floor.id);
    } else {
        // Если мы уже на нужном этаже, просто выполняем фокусировку
        performFocus(tenant);
    }
};

// ... остальной код ...

// ДОБАВЛЕНО В КОНЦЕ <script setup>:
// "Открываем" метод focusOnTenant для доступа из родительского компонента
defineExpose({
    focusOnTenant
});

const onPointerDown = (event: PointerEvent) => {
  deactivateActiveObject();
  if (event.button !== 0) return;
  isDragging.value = true;
  lastPointerPosition.value = { x: event.clientX, y: event.clientY };
  (event.target as HTMLElement).setPointerCapture(event.pointerId);
  if (containerRef.value) containerRef.value.style.cursor = 'grabbing';
  transitionStyle.value = 'none';
};
const onPointerMove = (event: PointerEvent) => {
  if (!isDragging.value || isPinching.value) return;
  const deltaX = event.clientX - lastPointerPosition.value.x;
  const deltaY = event.clientY - lastPointerPosition.value.y;
  translateX.value += deltaX; translateY.value += deltaY;
  lastPointerPosition.value = { x: event.clientX, y: event.clientY };
  applyBoundaryConstraints();
};
const onPointerUp = (event: PointerEvent) => {
  if (!isDragging.value) return;
  isDragging.value = false;
  (event.target as HTMLElement).releasePointerCapture(event.pointerId);
  if (containerRef.value) containerRef.value.style.cursor = 'grab';
  transitionStyle.value = 'transform 0.3s ease';
};
const onTouchStart = (event: TouchEvent) => {
  if (event.touches.length === 2) {
    isPinching.value = true; isDragging.value = false;
    lastPinchDistance.value = Math.hypot(event.touches[1].clientX - event.touches[0].clientX, event.touches[1].clientY - event.touches[0].clientY);
    transitionStyle.value = 'none';
  }
};
const onTouchMove = (event: TouchEvent) => {
  if (isPinching.value && event.touches.length === 2) {
    const rect = containerRef.value?.getBoundingClientRect(); if (!rect) return;
    const currentDistance = Math.hypot(event.touches[1].clientX - event.touches[0].clientX, event.touches[1].clientY - event.touches[0].clientY);
    const zoomFactor = currentDistance / lastPinchDistance.value;
    const focalX = (event.touches[0].clientX + event.touches[1].clientX) / 2 - rect.left;
    const focalY = (event.touches[0].clientY + event.touches[1].clientY) / 2 - rect.top;
    doZoom(zoomFactor, focalX, focalY);
    lastPinchDistance.value = currentDistance;
  }
};
const onTouchEnd = (event: TouchEvent) => {
  if (event.touches.length < 2) {
    if (isPinching.value) transitionStyle.value = 'transform 0.3s ease';
    isPinching.value = false; lastPinchDistance.value = 0;
  }
};
const doZoom = (zoomFactor: number, focalPointX: number, focalPointY: number) => {
  if (!containerDimensions.value.width) return;
  const newScale = Math.max(0.4, Math.min(4, scale.value * zoomFactor));
  if (newScale === scale.value) return;
  const imageFocalX = (focalPointX - translateX.value) / scale.value;
  const imageFocalY = (focalPointY - translateY.value) / scale.value;
  scale.value = newScale;
  translateX.value = focalPointX - imageFocalX * scale.value;
  translateY.value = focalPointY - imageFocalY * scale.value;
  applyBoundaryConstraints();
};
const handleZoomIn = () => {
  if (!containerRef.value) return;
  doZoom(1.2, containerDimensions.value.width / 2, containerDimensions.value.height / 2);
};
const handleZoomOut = () => {
  if (!containerRef.value) return;
  doZoom(1 / 1.2, containerDimensions.value.width / 2, containerDimensions.value.height / 2);
};
const navigateToTerminal = () => {
  if (!containerRef.value || !TERMINAL_LOCATION.value) return;

  if (terminal.value && terminal.value.floor !== currentFloor.value) {
    switchFloor(terminal.value.floor);
  }

  const { width: cW, height: cH } = containerDimensions.value;
  const targetScale = 1;
  const targetX = (cW / 2) - (TERMINAL_LOCATION.value.x * targetScale);
  const targetY = (cH / 2) - (TERMINAL_LOCATION.value.y * targetScale);
  transitionStyle.value = 'none';
  gsap.to({ scale: scale.value, translateX: translateX.value, translateY: translateY.value }, {
    duration: 1.2, ease: "power2.inOut", scale: targetScale, translateX: targetX, translateY: targetY,
    onUpdate() {
      scale.value = this.targets()[0].scale; translateX.value = this.targets()[0].translateX; translateY.value = this.targets()[0].translateY;
      applyBoundaryConstraints();
    },
    onComplete: () => { transitionStyle.value = 'transform 0.3s ease'; }
  });
};
const initializeMapState = () => {
  if (containerRef.value) containerDimensions.value = { width: containerRef.value.clientWidth, height: containerRef.value.clientHeight };
  const { width: cW, height: cH } = containerDimensions.value;
  const { width: iW, height: iH } = imageNaturalDimensions.value;
  if (!cW || !iW) return;
  const iScale = Math.min(cW / iW, cH / iH);
  scale.value = iScale;
  translateX.value = (cW - iW * iScale) / 2;
  translateY.value = (cH - iH * iScale) / 2;
  applyBoundaryConstraints();
};
const applyBoundaryConstraints = () => {
  if (!containerDimensions.value.width || !imageNaturalDimensions.value.width) return;
  const { width: cW, height: cH } = containerDimensions.value;
  const scaledW = imageNaturalDimensions.value.width * scale.value;
  const scaledH = imageNaturalDimensions.value.height * scale.value;
  translateX.value = (scaledW < cW) ? (cW - scaledW) / 2 : Math.max(cW - scaledW, Math.min(0, translateX.value));
  translateY.value = (scaledH < cH) ? (cH - scaledH) / 2 : Math.max(cH - scaledH, Math.min(0, translateY.value));
};
const buildRouteToPoint = (pointId: string) => {
  const targetTenant = tenants.value.find(t => t.id.toString() === pointId);
  if (!targetTenant) {
    return;
  }

  if (targetTenant.floor.id !== currentFloor.value) {
    switchFloor(targetTenant.floor.id);
  }

  setTimeout(() => {
    const targetArea = areasContainer.children.find(
      (child) => (child as any).areaData?.id === targetTenant.area
    ) as Graphics | undefined;
    const targetIcon = iconsContainer.children.find(
      (child) => (child as any).areaId === targetTenant.area
    ) as Container | undefined;
    if (targetArea) {
      activateObject(targetArea, targetIcon);
      drawRoute();
    } else {
      console.error(`Область для арендатора с ID "${pointId}" не найдена на этаже ${currentFloor.value}.`);
    }
  }, 100);
};
const openQrPopup = () => { popupVisible.value = true; };
const closePopup = () => { popupVisible.value = false; };
const handleOpenInfo = () => {
  if (activeTenant.value) {
    router.push(`/point-info?id=${activeTenant.value.id}`);
  }
};

const isTenantLoading = ref(false);

const fetchTenantDetails = async (tenantId: number) => {
  isTenantLoading.value = true;
  try {
    const response = await axios.get(`${API_URL}/tenants/${tenantId}`);

    if (activeTenant.value && activeTenant.value.id === tenantId) {
      activeTenant.value = { ...activeTenant.value, ...response.data };
    }

  } catch (error) {
    console.error(`Ошибка при загрузке детальной информации для арендатора ${tenantId}:`, error);
  } finally {
    if (activeTenant.value && activeTenant.value.id === tenantId) {
      isTenantLoading.value = false;
    }
  }
};

onMounted(() => {
  if (navigationRef.value) {
    const color = getComputedStyle(navigationRef.value).getPropertyValue('--button-active-color').trim();
    if (color) ACTIVE_ICON_COLOR_PIXI = parseInt(color.slice(1), 16);
  }

  if (terminal.value) {
    currentFloor.value = terminal.value.floor;
  }

  watch([tenants, areas, terminal, nodes], () => {
    redrawAllObjects();
    drawVisibleRoute();
  }, { deep: true });

  watch([fullRoutePath, currentFloor], drawVisibleRoute, { deep: true });

  watch(() => route.query.pointId, (id) => {
    if (typeof id === 'string') {
      routeToBuild.value = id;
      router.replace({ query: { ...route.query, pointId: undefined } });
      if (app) {
        buildRouteToPoint(routeToBuild.value);
        routeToBuild.value = null;
      }
    }
  }, { immediate: true });

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', initializeMapState);
  const cont = containerRef.value;
  if (cont) {
    cont.addEventListener("touchstart", onTouchStart, { passive: true });
    cont.addEventListener("touchmove", onTouchMove, { passive: true });
    cont.addEventListener("touchend", onTouchEnd, { passive: true });
    cont.addEventListener("touchcancel", onTouchEnd, { passive: true });
  }
  handleNavigationActions();
  if (imageRef.value?.complete) onImageLoad();
});

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
  window.removeEventListener('pointercancel', onPointerUp);
  window.removeEventListener('resize', initializeMapState);
  const cont = containerRef.value;
  if (cont) {
    cont.removeEventListener("touchstart", onTouchStart);
    cont.removeEventListener("touchmove", onTouchMove);
    cont.removeEventListener("touchend", onTouchEnd);
    cont.removeEventListener("touchcancel", onTouchEnd);
  }
  if (app) app.destroy(true, { children: true, texture: false });
});
</script>

<style scoped lang="scss">
@use '/src/assets/styles/root.scss' as *;

.navigation {
  --button-active-color: #{$button-active};

  width: 100%;
  height: 1842px;
  overflow: hidden;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
  position: relative;

  .floor-switch {
    position: absolute;
    top: 156px;
    right: 40px;
    max-width: 152px;
    width: 100%;
    height: 851px;
    border-radius: 64px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    background-color: transparent;
    z-index: 10;

    .switch-controls {
      max-width: 152px;
      width: 100%;
      height: 416px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: $white-color;
      box-shadow: 0px 0px 32px 0px #4E031B26;
      padding: 20px;
      align-items: center;
      border-radius: 64px;

      button {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        width: 112px;
        height: 112px;
        border-radius: 44px;
        font-size: 48px;
        background: transparent;
        border: none;
        color: $button-active;
        outline: none;
        font-weight: bold;
        transition: color 0.4s ease-in-out;
        transform: transform 0.1s ease-in-out;

        &:active {
          transform: scale(1);
        }

        &::before {
          content: '';
          position: absolute;
          z-index: -1;
          background: $button-active;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        &.active {
          color: $white-color;

          &::before {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      }
    }

    .navigation-zoom {
      height: 395px;
      width: 100%;
      border-radius: 64px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      background-color: $white-color;

      .zoom-controls {
        background-color: $button-active;
        height: 223px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 44px;

        .minus,
        .pluse {
          width: 112px;
          height: 112px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.1s ease-in-out;
          border-radius: 44px;

          &:active {
            transform: scale(0.8);
          }
        }
      }

      .navigation-geo {
        background-color: $button-active;
        width: 112px;
        height: 112px;
        border-radius: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.1s ease-in-out;

        &:active {
          transform: scale(0.8);
        }
      }
    }
  }

  .route-menu {
    position: absolute;
    display: flex;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 2004px;
    width: 100%;
    height: 184px;
    box-shadow: 0px 0px 32px 0px #4E031B26;
    border-radius: 94px;
    gap: 120px;
    padding: 20px;
    align-items: center;
    background-color: $white-color;
    z-index: 10;

    .route-title {
      font-size: 40px;
      display: flex;
      gap: 20px;
      align-items: center;
      margin-left: 20px;
      font-weight: bold;
    }

    .route-controls {
      display: flex;
      gap: 20px;
      max-width: 1287px;
      width: 100%;
      align-items: center;

      .route-qr {
        max-width: 724px;
        width: 100%;
        height: 144px;
        border-radius: 72px;
        display: flex;
        align-items: center;

        button {
          color: $button-active;
          border: none;
          width: 100%;
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: center;
          border-radius: 72px;
          height: 100%;
          background-color: $button-color-4;
          font-size: 40px;
          font-weight: bold;
          outline: none;
        }
      }

      .route-cancel {
        max-width: 543px;
        width: 100%;
        height: 144px;

        button {
          background-color: $button-active;
          border-radius: 72px;
          width: 100%;
          height: 100%;
          border: none;
          font-size: 40px;
          color: $white-color;
          font-weight: bold;
          outline: none;
        }
      }
    }
  }
}

.first-floor {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  cursor: grab;
  user-select: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
}

.first-floor img {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  pointer-events: auto;
  max-width: none;
}

.pixi-canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;

  &>canvas {
    pointer-events: auto;
  }
}
</style>