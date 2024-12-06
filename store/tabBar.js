import { defineStore } from 'pinia'
import tabBar from '@/mock/tabbar.js' //引入tabbar文件。
export const useTabBarStore = defineStore('tabBar', {
    state: () => ({
        role: 'tab1',
    }),
    getters: {
        tabBarList: (state) => tabBar[state.role],
    },
    actions: {
        setTab(tab) {
            this.role = tab
        }
    },
    persist: true
})
