<script setup lang="ts">
    import type { s } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';
import { ref } from 'vue';

    const props = defineProps<{
        correctYear: number
    }>()

    const emit = defineEmits(['selectYear']);

    const showYearGuess = ref(false);
    const timelineRef = ref<HTMLElement | null>(null);
    const yearGuess = ref(2025)
    const mouseX = ref(0)
    const timelineSectionLeft = ref(0)
    const timelineSectionRight = ref(0)
    const timelineSectionWidth = ref(0)
    const isLocked = ref(false)
    const useRight = ref(false)
    const transitionX = ref(false)
    const posXCorrectYear = ref(0)
    const animatedYear = ref(yearGuess.value);

    const getYear = (event: MouseEvent): void => {

        if (!isLocked.value) {
            if (timelineRef.value) {
                
                const rect = timelineRef.value.getBoundingClientRect();
                
                mouseX.value = event.clientX;
                const relativeX = mouseX.value - rect.left;

                posXCorrectYear.value = mouseX.value
                
                yearGuess.value = Math.round(((relativeX - 0) * (2025 - 1900)) / (rect.width - 0) + 1900);
                animatedYear.value = yearGuess.value;
            }
        }
    }



    const animateYear = () => {
        const duration = 2000;
        const startTimestamp = performance.now();
        const startYear = yearGuess.value;
        const endYear = props.correctYear;

        const step = (timestamp: number) => {
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            animatedYear.value = Math.round(startYear + (endYear - startYear) * progress);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                animatedYear.value = endYear; // Stellt sicher, dass das Endjahr exakt erreicht wird
            }
        };

        requestAnimationFrame(step);
    };

    const lockYear = (): void => {
        isLocked.value = true;
        //emit('selectYear', yearGuess.value);

        if (yearGuess.value != props.correctYear) {
            if (timelineRef.value) {
                const rect = timelineRef.value.getBoundingClientRect();
                
                const xPosYearGuess = Math.round(((yearGuess.value - 1900) * (rect.width - 0) / (2025 - 1900)) + 0);
                const xPosCorrectYear = Math.round(((props.correctYear - 1900) * (rect.width - 0) / (2025 - 1900)) + 0);

                animateYear();
                transitionX.value = true
                
                if (xPosYearGuess < xPosCorrectYear) {
                    useRight.value = false
                    timelineSectionWidth.value = xPosCorrectYear - xPosYearGuess;
                    timelineSectionLeft.value = xPosYearGuess;
                    posXCorrectYear.value = rect.left + xPosCorrectYear;
                }
                else if ( xPosYearGuess > xPosCorrectYear) {
                    useRight.value = true
                    timelineSectionWidth.value = xPosYearGuess - xPosCorrectYear;
                    timelineSectionRight.value = rect.width - xPosYearGuess;
                    posXCorrectYear.value = rect.left + xPosCorrectYear;
                }
            }
        }
    }

    const handleMouseLeave = () => {
    if (!isLocked.value) {
        showYearGuess.value = false;
    }
};
</script>

<template>
        <h1 class="year-correct" :style="transitionX ? {left: posXCorrectYear + 'px', transition: '2s' } : {visibility: 'hidden', left: posXCorrectYear + 'px' }" >{{ animatedYear }}</h1>
        <div class="timeline-container">
            <h1>1900</h1>
            <div ref="timelineRef" class="timeline" @mouseover="showYearGuess = true" @mouseleave="handleMouseLeave" @mousemove="getYear" @click="lockYear">
                <div class="timeline-section" :style="useRight ? { right: timelineSectionRight + 'px', width: timelineSectionWidth + 'px'} : { left: timelineSectionLeft + 'px', width: timelineSectionWidth + 'px'}"></div>
            </div>
            <h1>2025</h1>
        </div>
        <h1 class="year-guess" v-show="showYearGuess" :style="{ left: mouseX + 'px' }" >{{ yearGuess }}</h1>
</template>

<style scoped>
    .timeline-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .timeline {
        position: relative;
        height: 8px;
        border-radius: 4px;
        background-color: #fff;
        width: 70vw;
        margin: 16px;
    }

    .timeline-section {
        position: absolute;
        height: 100%;
        background-color: red;
        transition: width 2s;
    }

    .year-guess {
        position: fixed;
        transform: translateX(-50%);
    }

    .year-correct {
        position: fixed;
        transform: translateX(-50%);
    }
</style>