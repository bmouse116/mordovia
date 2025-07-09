<template>
	<div
		:class="['map2d', { isTransition: isTransition }]"
		
		id="screen2d"
	>
		<div
			ref="pixiContainer"
			:style="{
				transform: ` translateX(${-translateX}px) translateY(${-translateY}px)`,
				backgroundImage: `url('/src/assets/img/first floor.png')`,
			}"
			class="pixi"
		>
			<!-- <Transition name="news">
				<img :src="url + mapUrl" alt="" :key="mapUrl" />
			</Transition> -->
		</div>
		<!-- <div class="btnclick" @click="takeScreenshot"></div>
		<img :src="srcImg ? srcImg : ''" alt="none" class="imgscreen" /> -->
	</div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
//import { useStore } from '@/shared/stores/store'
//import { storeToRefs } from 'pinia'
//import { axiosInstance, url } from '@/shared/api/axiosInstance'
import * as PIXI from 'pixi.js'
import gsap from 'gsap'

// const {

// } = storeToRefs(useStore())

export type PointWay2D = {
	point: PIXI.Graphics | PIXI.Text
	building: string
	floor: string
}

const pixiContainer = ref<HTMLElement>()
let app: PIXI.Application<PIXI.Renderer>
let delayTime = 0 // начальное время задержки появления первого элемента
let areasOnScene: PIXI.Graphics[] = [] // области на 2д карте
let wayOnScene: PointWay2D[] = [] // маршрут и подсказки на 2д карте
let pulseCirle: PIXI.Graphics // терминал на 2д карте
let redCirle: PIXI.Graphics // терминал на 2д карте
const redBtn = ref(false) // кнопка отменить маршрут показывается или нет
const colorWay = '#00ABEB' // цвет 2д маршрута

const initialDistanceTouches = ref(0) // начальное расстояние между 2 touch
const startPositionX = ref(0) // переменные для перемещения 2д карты
const startPositionY = ref(0)
const translateX = ref(0)
const translateY = ref(0)
const isFirst = ref(true)
const deltaX = ref()
const deltaY = ref()

let isMoving = false // проверка для того чтобы при нажатии на область не открывалась модалка если идет движение
// const mystyles = {
// 	'--bg': `url(${url + mapUrl.value})`,
// }
onMounted(async () => {
	app = new PIXI.Application()
	await app.init({
		width: 4340,
		height: 2500,
		backgroundAlpha: 0,
		preserveDrawingBuffer: true,
	})
	pixiContainer.value?.appendChild(app.canvas)

	// let canvas2d = pixiContainer.value!.getElementsByTagName('canvas')[0]
	// canvas2d.style.backgroundImage = `url(${url + mapUrl.value})`
	// console.log(canvas2d)
	// console.log(`url(${url + mapUrl})`)

	//let imgsrc = url + mapUrl.value // Укажите URL вашего изображения
	//console.log(imgsrc)
	buildWay()
	// setAreas()
	// setTerminal()
	// setVisabilityTerminal()
})

// onBeforeUnmount(() => {
// 	// очистка 2д графики
// 	if (app != undefined && redCirle != undefined) {
// 		clearAreas()
// 		pulseCirle.destroy()
// 		redCirle.destroy()
// 		app.stage.removeChildren()
// 		app.destroy()
// 	}
// })

// watch([currentFloor, currentBuilding], () => {
// 	// проверяем если этаж или корпус меняются то меняем активные области кабинетов
// 	if (areas.value?.length) {
// 		clearAreas()
// 		setAreas()
// 	}
// 	// проверяем если этаж или корпус меняются то меняем точку терминала где находимся
// 	if (pulseCirle && redCirle) {
// 		setVisabilityTerminal()
// 	}
// 	if (wayOnScene.length > 0) {
// 		checkWay()
// 	}
// })

// function convertPointsHelper(first: NavigatePoint, second: NavigatePoint) {
// 	// из всех точек маршрута делаем точки где будут распологаться подсказки для навигации
// 	if (first.buildingName != second.buildingName) {
// 		pointsHelper.value.push({
// 			label: 'Выйти на улицу',
// 			x: second.x,
// 			y: second.y,
// 			fromBuilding: first.buildingName,
// 			toBuilding: second.buildingName,
// 			build: first.buildingName,
// 			floor: first.floorName,
// 		})
// 	}
// 	if (
// 		first.buildingName == second.buildingName &&
// 		first.floorName != second.floorName
// 	) {
// 		pointsHelper.value.push({
// 			label: 'Подняться выше',
// 			x: first.x,
// 			y: first.y,
// 			build: first.buildingName,
// 			floor: first.floorName,
// 			toFloor: second.floorName,
// 		})
// 	}
// }

// function drawHelper() {
// 	//рисуем подсказки на 2д карте
// 	if (pointsHelper.value.length > 0) {
// 		pointsHelper.value.forEach((el) => {
// 			// задний фон
// 			const bg = new PIXI.Graphics()
// 			app.stage.addChild(bg)
// 			bg.roundRect(el.x - 300, el.y, el.toBuilding ? 580 : 620, 180, 50).fill(
// 				colorWay,
// 			)
// 			bg.interactive = true

// 			// надпись
// 			const label = new PIXI.Text({
// 				text: el.label,
// 				style: { fill: 'white', fontSize: 70 },
// 				position: { x: el.x + 30 - 300, y: el.y + 55 },
// 			})
// 			label.interactive = true // делаем кликабельной подсказку
// 			app.stage.addChild(label)

// 			// по умолчанию скрываем подсказку
// 			label.alpha = 0
// 			label.scale = 0
// 			bg.alpha = 0
// 			bg.scale = 0
// 			if (el.floor != currentFloor.value && el.build != currentBuilding.value) {
// 			}

// 			// если подсказка соотвествует этажу и корпусу то делаем видимой
// 			gsap.to(label, {
// 				alpha:
// 					el.floor != currentFloor.value && el.build != currentBuilding.value
// 						? 0
// 						: 1,
// 				scale: 1,
// 				duration: 0.7,
// 				ease: 'power1.out',
// 				delay: 0.1 + delayTime,
// 			})
// 			gsap.to(bg, {
// 				alpha:
// 					el.floor != currentFloor.value && el.build != currentBuilding.value
// 						? 0
// 						: 1,
// 				scale: 1,
// 				duration: 0.7,
// 				ease: 'power1.out',
// 				delay: 0.1 + delayTime,
// 			})

// 			wayOnScene.push(
// 				{ building: el.build, floor: el.floor, point: label },
// 				{ building: el.build, floor: el.floor, point: bg },
// 			) // добавляем в массив маршурта, чтобы можно было очистить
// 			bg.on('touchstart', () => {
// 				helperNavigation(el)
// 			})
// 			label.on('touchstart', () => {
// 				helperNavigation(el)
// 			})
// 		})
// 	}
// }

// function helperNavigation(el: PointsHelper) {
// 	if (el.toFloor) {
// 		console.log(wayOnScene)
// 		// если поле toFloor есть переключаем на этаж с терминалом
// 		floorsRef.value.changeFloor(el.toFloor as unknown as Number)
// 	}
// 	if (el.toBuilding) {
// 		// если поле есть toBuilding переключаем на 3D карту и строим маршрут до нужного здания
// 		currentD.value = '3d'
// 		if (map3dRef.value.objectsToRemove.length < 1) {
// 			// если на 3д карте еще не построен маршрут то строим
// 			map3dRef.value.wayFromToBuilding(el.fromBuilding, el.toBuilding)
// 		}
// 	}
// }

// function setTerminal() {
// 	// установка терминала на 2д карту, точка где находимся
// 	const coordinates = nodeTerminal.value!.points

// 	pulseCirle = new PIXI.Graphics()
// 	app.stage.addChild(pulseCirle)
// 	pulseCirle.circle(coordinates.x, coordinates.y, 98).fill('#ffe7e7')
// 	pulseCirle.pivot.set(coordinates.x, coordinates.y)
// 	pulseCirle.position.set(coordinates.x, coordinates.y)
// 	pulseCirle.zIndex = 1

// 	redCirle = new PIXI.Graphics()
// 	app.stage.addChild(redCirle)
// 	redCirle.circle(coordinates.x, coordinates.y, 53.3).fill('#DB3833')
// 	redCirle.zIndex = 2

// 	let scaleDirection = 1
// 	const scaleSpeed = 0.01
// 	const maxScale = 1
// 	const minScale = 0.5

// 	app.ticker.add(() => {
// 		if (pulseCirle.scale.x <= minScale || pulseCirle.scale.x >= maxScale) {
// 			scaleDirection *= -1
// 		}
// 		pulseCirle.scale.x += scaleDirection * scaleSpeed
// 		pulseCirle.scale.y += scaleDirection * scaleSpeed
// 	})
// }

// function setVisabilityTerminal() {
// 	// проверка если этаж и корпус совпадают с терминалом то он отображается
// 	if (
// 		currentBuilding.value == nodeTerminal.value?.buildingName &&
// 		currentFloor.value == nodeTerminal.value?.floorName
// 	) {
// 		pulseCirle.alpha = 1
// 		redCirle.alpha = 1
// 	} else {
// 		pulseCirle.alpha = 0
// 		redCirle.alpha = 0
// 	}
// }

// function setAreas() {
// 	// установка областей кабинетов на 2д карте
// 	let currentAreas = areas.value?.filter(
// 		(el) =>
// 			el.floorName == currentFloor.value &&
// 			el.building == currentBuilding.value,
// 	)
// 	if (currentAreas) {
// 		for (let c = 0; c < currentAreas.length; c++) {
// 			const area = new PIXI.Graphics()
// 			app.stage.addChild(area)
// 			area.poly(currentAreas[c].points).fill({ alpha: 0.1, color: colorWay })
// 			area.interactive = true

// 			area.on('touchstart', () => {
// 				isMoving = false // Сброс флага движения
// 			})

// 			area.on('touchmove', (event) => {
// 				const touch = event.client
// 				const deltaX = touch.x - startPositionX.value
// 				const deltaY = touch.y - startPositionY.value

// 				// Проверка, если движение превышает порог
// 				if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
// 					isMoving = true // Установить флаг движения
// 				}
// 			})

// 			area.on('touchend', () => {
// 				if (!isMoving) {
// 					axiosInstance
// 						.get(`/api/cabinets/${currentAreas[c].cabinet}`)
// 						.then((res) => {
// 							cabinet.value = res.data
// 						})
// 						.then(() => {
// 							modalOpen.value = true
// 						})
// 				}
// 			})
// 			areasOnScene.push(area)
// 		}
// 	}
// }

// function clearAreas() {
// 	// сброс областей на 2д карте
// 	areasOnScene.forEach((el) => {
// 		app.stage.removeChild(el)
// 		el.destroy()
// 	})
// 	areasOnScene.length = 0
// }

function buildWay() {
	// if (!coordinatesWay.value) return
	// clearWay()

	// redBtn.value = true
	// const coordinates = coordinatesWay.value
	const coordinates = [{x: 10, y: 10}, {x: 50, y: 50}, {x:200,y:200}, {x:3000, y:1000}]
	for (let c = 0; c < coordinates.length - 1; c++) {
		let start = coordinates[c]
		let end = coordinates[c + 1]
		let widthDottedLine = 6 // толщина пунктирной линии
		let lengthDottedLine = 20 // длина пунктирной линии
		let radiusDottedLine = 6 // радиус скругления у прямоугольников из которых состоих пунктирная линия
		let gapDottedLine = 5 // расстояние между пунктирами

		const distance = Math.sqrt(
			// расстояние одного отрезка
			Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2),
		)
		const dottedCount = Math.floor(
			// кол-во пунктирных линий на отрезке
			distance / (lengthDottedLine + gapDottedLine),
		)

		const dx = (end.x - start.x) / distance
		const dy = (end.y - start.y) / distance
		const timeOneSegment = 4 / coordinates.length / dottedCount // время на всю анимацию 4 секунды

		for (let j = 0; j < dottedCount; j++) {
			const x =
				start.x +
				(lengthDottedLine + gapDottedLine) * j * dx +
				(lengthDottedLine / 2) * dx
			const y =
				start.y +
				(lengthDottedLine + gapDottedLine) * j * dy +
				(lengthDottedLine / 2) * dy

			let pointDottedLine = new PIXI.Graphics()
			app.stage.addChild(pointDottedLine)
			pointDottedLine // рисуем прямоугольник со скругленными углами
				.roundRect(x, y, widthDottedLine, lengthDottedLine, radiusDottedLine)
				.fill(colorWay)
			// wayOnScene.push({
			// 	point: pointDottedLine,
			// 	building: start.buildingName,
			// 	floor: start.floorName,
			// })
			let angle = Math.atan2(dy, dx)

			pointDottedLine.pivot.set(
				x + widthDottedLine / 2,
				y + lengthDottedLine / 2,
			)
			pointDottedLine.position.set(x, y)
			pointDottedLine.rotation = angle + Math.PI / 2

			pointDottedLine.alpha = 0 // делаем прозрачным пунктир
			pointDottedLine.scale = 0 // уменьшаем размер пунктира до 0
			gsap.to(pointDottedLine, {
				// анимация появления за счет установки начальных параметров
				// если точка не совпадает с выбранным этажом и корпусом то прозрачность 0
				alpha: 1,
					// start.buildingName == currentBuilding.value &&
					// start.floorName == currentFloor.value
						// : 0,
				scale: 1,
				duration: 0.7,
				ease: 'power1.out',
				delay: 0.1 + delayTime,
			})
			delayTime += timeOneSegment // после каждого появления пунктира увеличиваем время для появления следующего

			if (j + 1 == dottedCount && c < coordinates.length - 2) {
				// если последний элемент в цикле, то в конец добавляем пунктир, чтобы не оставалось пробела до след точки
				const x1 = end.x
				const y1 = end.y
				lengthDottedLine = 15 // длина линии последнего дополнительного пунктира

				let pointDottedLine = new PIXI.Graphics()
				app.stage.addChild(pointDottedLine)
				pointDottedLine
					.roundRect(
						x1,
						y1,
						widthDottedLine,
						lengthDottedLine,
						radiusDottedLine,
					)
					.fill(colorWay)
				// wayOnScene.push({
				// 	point: pointDottedLine,
				// 	building: start.buildingName,
				// 	floor: start.floorName,
				// })
				let angle = Math.atan2(dy, dx)
				pointDottedLine.pivot.set(x1, y1)
				pointDottedLine.position.set(
					x1 + (widthDottedLine / 2) * dy,
					y1 - (widthDottedLine / 2) * dx,
				)
				pointDottedLine.rotation = angle + Math.PI / 2

				pointDottedLine.alpha = 0
				pointDottedLine.scale = 0
				gsap.to(pointDottedLine, {
					alpha: 1,
						// start.buildingName == currentBuilding.value &&
						// start.floorName == currentFloor.value
							
							//: 0,
					scale: 1,
					duration: 0.7,
					ease: 'power1.out',
					delay: 0.1 + delayTime,
				})

				const rect = new PIXI.Graphics() // добавляем в каждую точку по квадрату, чтобы не было скругления на пунктирах на их пересечении
				app.stage.addChild(rect)
				rect
					.rect(
						end.x - widthDottedLine / 2,
						end.y - widthDottedLine / 2,
						widthDottedLine,
						widthDottedLine,
					)
					.fill(colorWay)
				// wayOnScene.push({
				// 	point: rect,
				// 	building: start.buildingName,
				// 	floor: start.floorName,
				// })
				rect.alpha = 0
				rect.scale = 0
				gsap.to(rect, {
					alpha: 1,
						// start.buildingName == currentBuilding.value &&
						// start.floorName == currentFloor.value
							
							//: 0,
					scale: 1,
					duration: 0.7,
					ease: 'power1.out',
					delay: 0.1 + delayTime,
				})

				delayTime += timeOneSegment
			}

			if (j + 1 == dottedCount && c == coordinates.length - 2) {
				// добавляем стрелочку в конец

				const x1 = end.x
				const y1 = end.y
				lengthDottedLine = 20 // длина линии последнего дополнительного пунктира

				let pointDottedLine = new PIXI.Graphics()
				app.stage.addChild(pointDottedLine)
				// wayOnScene.push({
				// 	point: pointDottedLine,
				// 	building: start.buildingName,
				// 	floor: start.floorName,
				// })
				pointDottedLine
					.roundRect(
						x1,
						y1,
						widthDottedLine,
						lengthDottedLine,
						radiusDottedLine,
					)
					.fill(colorWay)
				pointDottedLine.pivot.set(
					x1 + widthDottedLine / 2,
					y1 + widthDottedLine / 2,
				)
				pointDottedLine.position.set(x1, y1)
				pointDottedLine.rotation = angle + Math.PI / 2

				pointDottedLine.alpha = 0
				pointDottedLine.scale = 0
				gsap.to(pointDottedLine, {
					alpha: 1,
						// start.buildingName == currentBuilding.value &&
						// start.floorName == currentFloor.value
							
						//	: 0,
					scale: 1,
					duration: 0.7,
					ease: 'power1.out',
					delay: 0.1 + delayTime,
				})
				lengthDottedLine = 25
				// правая

				let pointDottedLine1 = new PIXI.Graphics()
				app.stage.addChild(pointDottedLine1)
				// wayOnScene.push({
				// 	point: pointDottedLine1,
				// 	building: start.buildingName,
				// 	floor: start.floorName,
				// })
				pointDottedLine1
					.roundRect(
						x1,
						y1,
						widthDottedLine,
						lengthDottedLine,
						radiusDottedLine,
					)
					.fill(colorWay)
				pointDottedLine1.pivot.set(
					x1 + widthDottedLine / 2,
					y1 + widthDottedLine / 2,
				)
				pointDottedLine1.position.set(x1, y1)
				pointDottedLine1.rotation = angle + (Math.PI / 180) * 45

				pointDottedLine1.alpha = 0
				pointDottedLine1.scale = 0
				gsap.to(pointDottedLine1, {
					alpha: 1,
						// start.buildingName == currentBuilding.value &&
						// start.floorName == currentFloor.value
							
							//: 0,
					scale: 1,
					duration: 0.7,
					ease: 'power1.out',
					delay: 0.1 + delayTime,
				})

				//левая
				let pointDottedLine2 = new PIXI.Graphics()
				app.stage.addChild(pointDottedLine2)
				// wayOnScene.push({
				// 	point: pointDottedLine2,
				// 	building: start.buildingName,
				// 	floor: start.floorName,
				// })
				pointDottedLine2
					.roundRect(
						x1,
						y1,
						widthDottedLine,
						lengthDottedLine,
						radiusDottedLine,
					)
					.fill(colorWay)
				pointDottedLine2.pivot.set(
					x1 + widthDottedLine / 2,
					y1 + widthDottedLine / 2,
				)
				pointDottedLine2.position.set(x1, y1)
				pointDottedLine2.rotation = angle + (Math.PI / 180) * 135

				pointDottedLine2.alpha = 0
				pointDottedLine2.scale = 0
				gsap.to(pointDottedLine2, {
					alpha: 1,
						// start.buildingName == currentBuilding.value &&
						// start.floorName == currentFloor.value
							
							//: 0,
					scale: 1,
					duration: 0.7,
					ease: 'power1.out',
					delay: 0.1 + delayTime,
				})
			}
			// convertPointsHelper(start, end)
			// drawHelper()
		}
	}
}

// function checkWay() {
// 	// проверка маршурта и подсказок на соотвествие этажу и корпусу
// 	wayOnScene.forEach((el) => {
// 		if (
// 			el.building == currentBuilding.value &&
// 			el.floor == currentFloor.value
// 		) {
// 			el.point.alpha = 1
// 		} else {
// 			el.point.alpha = 0
// 		}
// 	})
// }

// function clearWay() {
// 	// очищаем путь и убираем подсказки навигации
// 	delayTime = 0
// 	wayOnScene.forEach((el) => {
// 		app.stage.removeChild(el.point)
// 	})
// 	pointsHelper.value.length = 0
// 	wayOnScene.length = 0
// 	redBtn.value = false

// 	if (map3dRef.value.objectsToRemove.length > 0) {
// 		map3dRef.value.deleteWay()
// 	}
// }

// function touchCanvas(e: TouchEvent) {
// 	if (e.touches.length === 1) {
// 		startPositionX.value = e.changedTouches[0].clientX
// 		startPositionY.value = e.changedTouches[0].clientY
// 	}
// 	if (e.touches.length === 2) {
// 		initialDistanceTouches.value = getDistance(e.touches)
// 	}
// }

// function moveCanvas(e: TouchEvent) {
// 	//перемещение если 1 касание
// 	if (e.touches.length === 1) {
// 		// ограничение по X 1400 Y 800 максимальное расстояние перемещние
// 		if (isFirst.value) {
// 			translateX.value = Math.max(
// 				-1400,
// 				Math.min(
// 					1400,
// 					((startPositionX.value - e.changedTouches[0].clientX) * 0.5) /
// 						scaleMap.value,
// 				),
// 			)
// 			translateY.value = Math.max(
// 				-800,
// 				Math.min(
// 					800,
// 					((startPositionY.value - e.changedTouches[0].clientY) * 0.5) /
// 						scaleMap.value,
// 				),
// 			)
// 		} else {
// 			translateX.value = Math.max(
// 				-1400,
// 				Math.min(
// 					1400,
// 					deltaX.value +
// 						((startPositionX.value - e.changedTouches[0].clientX) * 0.5) /
// 							scaleMap.value,
// 				),
// 			)

// 			translateY.value = Math.max(
// 				-800,
// 				Math.min(
// 					800,
// 					deltaY.value +
// 						((startPositionY.value - e.changedTouches[0].clientY) * 0.5) /
// 							scaleMap.value,
// 				),
// 			)
// 		}
// 	}
// 	// масштабирование если двойное касание
// 	if (e.touches.length === 2) {
// 		const currentDistance = getDistance(e.touches)
// 		if (currentDistance > initialDistanceTouches.value) {
// 			if (scaleMap.value > 1.5) {
// 				return
// 			} else {
// 				scaleMap.value += 0.1
// 			}
// 		}
// 		if (currentDistance < initialDistanceTouches.value) {
// 			if (scaleMap.value < 0.7) {
// 				return
// 			} else {
// 				scaleMap.value -= 0.1
// 			}
// 		}
// 	}
// }

// function touchEnd() {
// 	isFirst.value = false
// 	deltaX.value = translateX.value
// 	deltaY.value = translateY.value
// }

// function getDistance(touches: any) {
// 	// расстояние между двумя касаниями
// 	const dx = touches[0].clientX - touches[1].clientX
// 	const dy = touches[0].clientY - touches[1].clientY
// 	return Math.sqrt(dx * dx + dy * dy)
// }



const isTransition = ref(false)

// watch(mapUrl, () => {
// 	if (mapUrl.value) {
// 		isTransition.value = true
// 		setTimeout(() => {
// 			isTransition.value = false
// 		}, 300)
// 	}
// })

//const srcImg = ref('')


//	backgroundImage: `url(${url + mapUrl})`,
// backgroundImage: `url('bg.png')`,


</script>
<style scoped lang="scss">
.imgscreen {
	position: absolute;
	left: 400px;
	bottom: 100px;
	width: 600px;
	height: 600px;
	object-fit: contain;
}
.btnclick {
	position: absolute;
	left: 100px;
	bottom: 100px;
	width: 200px;
	height: 200px;
	background: teal;
	border-radius: 100%;
}
.isTransition {
	scale: 0.8;
	filter: blur(20px);
	opacity: 0.5;
}

.map2d {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	transition: all 0.3s ease-out;

	.btn {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 40px;
		width: 576px;
		background: var(--red);
	}

	.pixi {
		// border: solid red 1px;
		transition:
			scale ease 1s,
			background-image ease 0.5s;
		// transition: scale ease 1s;
		position: relative;
		background-repeat: no-repeat;

		img {
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
		}
	}

	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
