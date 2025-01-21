<script setup lang="ts">
    import { ref } from 'vue';

    const emit = defineEmits(['selectYear']);

    const showYear = ref(false);
    const timelineRef = ref<HTMLElement | null>(null);
    const year = ref(2025)
    const mouseX = ref(0)
    const isLocked = ref(false)

    const getYear = (event: MouseEvent): void => {

        if (!isLocked.value) {
            if (timelineRef.value) {
                
                const rect = timelineRef.value.getBoundingClientRect();
                
                mouseX.value = event.clientX;
                const relativeX = mouseX.value - rect.left;
                
                year.value = Math.round(((relativeX - 0) * (2025 - 1900)) / (rect.width - 0) + 1900);
            }
        }
    }

    const lockYear = (): void => {
        //isLocked.value = true;
        emit('selectYear', year.value);
    }

    const handleMouseLeave = () => {
    if (!isLocked.value) {
        showYear.value = false;
    }
};
</script>

<template>
        <div class="timeline-container">
            <h1>1900</h1>
            <div ref="timelineRef" class="timeline" @mouseover="showYear = true" @mouseleave="handleMouseLeave" @mousemove="getYear" @click="lockYear"></div>
            <h1>2025</h1>
        </div>
        <h1 class="year" v-show="showYear" :style="{ left: mouseX + 'px' }" >{{ year }}</h1>
</template>

<style scoped>
    .timeline-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .timeline {
        height: 8px;
        border-radius: 4px;
        background-color: #fff;
        width: 70vw;
        margin: 16px;
    }

    .year {
        position: fixed;
        transform: translateX(-50%);
    }
</style>