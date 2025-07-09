import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Area, Terminal, Tenants, Node } from '../types/types'


export const useStore = defineStore('store', () => {
    const terminal = ref<Terminal | undefined>()
    const areas = ref<Area[]>([])
    const tenants = ref<Tenants[]>([])
    const nodes = ref<Node[]>([])
    return {
        terminal,
        areas,
        tenants,
        nodes
}})
