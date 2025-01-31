<script setup lang="ts">
    import { ref, watch } from 'vue';

    const props = defineProps<{
        correctYear: number
        currentRound: number
    }>()

    //resets variables if next round is started
    watch(() => props.currentRound, () => {
        showDifference.value = false
        isLocked.value = false
        showYearGuess.value = false

        transitionX.value = false
        useRight.value = false
        timelineSectionWidth.value = 0;
        timelineSectionLeft.value = 0;
    })

    const emit = defineEmits(['selectYear']);

    const showYearGuess = ref(false);
    const showDifference = ref(false);
    const timelineRef = ref<HTMLElement | null>(null);
    const yearGuess = ref(2025);
    const posXYearGuess = ref(0);
    const timelineSectionLeft = ref(0);
    const timelineSectionRight = ref(0);
    const timelineSectionWidth = ref(0);
    const isLocked = ref(false);
    const useRight = ref(false);
    const transitionX = ref(false);
    const posXCorrectYear = ref(0);
    const animatedYear = ref(yearGuess.value);

    //calculates the current selected year based on width of the timeline
    const getYear = (event: MouseEvent): void => {
        if (!isLocked.value) {
            if (timelineRef.value) {
                
                const rect = timelineRef.value.getBoundingClientRect();

                if (rect.width === 0) {
                    return; 
                }
                
                posXYearGuess.value = event.clientX - rect.left;

                posXCorrectYear.value = posXYearGuess.value;
                
                yearGuess.value = Math.round(((posXYearGuess.value - 0) * (2025 - 1900)) / (rect.width - 0) + 1900);
                animatedYear.value = yearGuess.value;
            }
        }
    }


    // revealing animation of the actual year of publication
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
                animatedYear.value = endYear;
            }
        };

        requestAnimationFrame(step);
    };

    // locks the guessed year, when the user clicks on the timeline
    const lockYear = (): void => {
        isLocked.value = true;
        emit('selectYear', yearGuess.value);

        // if the guessed year is not the actual year of publication
        if (yearGuess.value != props.correctYear) {
            if (timelineRef.value) {
                showDifference.value = true;
                const rect = timelineRef.value.getBoundingClientRect();
                
                const xPosYearGuess = Math.round(((yearGuess.value - 1900) * (rect.width - 0) / (2025 - 1900)) + 0);
                const xPosCorrectYear = Math.round(((props.correctYear - 1900) * (rect.width - 0) / (2025 - 1900)) + 0);

                animateYear();
                transitionX.value = true;
                
                // if the guessed year comes before the actual year of publication
                if (xPosYearGuess < xPosCorrectYear) {
                    useRight.value = false;
                    timelineSectionWidth.value = xPosCorrectYear - xPosYearGuess;
                    timelineSectionLeft.value = xPosYearGuess;
                    posXCorrectYear.value = xPosCorrectYear;
                }

                // if the guessed year comes after the actual year of publication
                else if ( xPosYearGuess > xPosCorrectYear) {
                    useRight.value = true;
                    timelineSectionWidth.value = xPosYearGuess - xPosCorrectYear;
                    timelineSectionRight.value = rect.width - xPosYearGuess;
                    posXCorrectYear.value = xPosCorrectYear;
                }
            }
        }
    }

    // hides the year guess, while the cursor is not hovering over the timeline
    const handleMouseLeave = () => {
        if (!isLocked.value) {
            showYearGuess.value = false;
        }
    };

    // for testing purposes
    defineExpose({
    yearGuess,
    getYear,
    lockYear,
    isLocked,
    showDifference,
    showYearGuess,
    })
</script>

<template>
    <div class="timeline-container">
        <h1>1900</h1>
        <div ref="timelineRef" class="timeline" @mouseover="showYearGuess = true" @mouseleave="handleMouseLeave" @mousemove="getYear" @click="lockYear">
            <h1 class="year-correct" :style="transitionX ? {left: posXCorrectYear + 'px', transition: '2s' } : {visibility: 'hidden', left: posXCorrectYear + 'px' }" >{{ animatedYear }}</h1>
            <div class="timeline-difference" 
            :style="useRight 
                ? (showDifference ? { right: timelineSectionRight + 'px', width: timelineSectionWidth + 'px'} : {visibility: 'hidden', right: timelineSectionRight + 'px', width: timelineSectionWidth + 'px'}) 
                : (showDifference ? { left: timelineSectionLeft + 'px', width: timelineSectionWidth + 'px'} : {visibility: 'hidden', left: timelineSectionLeft + 'px', width: timelineSectionWidth + 'px'})"
            ></div>
            <h1 class="year-guess" v-show="showYearGuess" :style="{ left: posXYearGuess + 'px' }" >{{ yearGuess }}</h1>
        </div>
        <h1>2025</h1>
    </div>
</template>

<style scoped>
    .timeline-container {
        width: 100%;
        margin-top: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .timeline {
        position: relative;
        flex-grow: 1;
        height: 8px;
        border-radius: 4px;
        background-color: #fff;
        width: 70vw;
        margin: 16px;
    }

    .timeline-difference {
        position: absolute;
        height: 100%;
        background-color: red;
        transition: width 2s;
    }

    .year-guess {
        position: absolute;
        top: 16px;
        transform: translateX(-50%);
    }

    .year-correct {
        position: absolute;
        bottom: 16px;
        transform: translateX(-50%);
    }
</style>