<script setup lang="ts">
import router from '@/router';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

function openActuatorPage() {
    router.push('system/actuators/' + props.id);
}
</script>

<template>
    <div class="detector-card" :id="props.id" @click="openActuatorPage">
        <div class="header">
            <font-awesome-icon :icon="['fas', 'crosshairs']" />
        </div>
        <div class="data">
            <p>{{ props.name }}</p>
        </div>
    </div>
</template>

<style scoped>
.detector-card {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    color: var(--black);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 10rem;
    height: 10rem;
    margin: 1rem;

    .header {
        background-color: var(--primary-color);
        padding: 1rem;
        color: var(--white);
        text-align: center;
        font-size: 2rem;
        height: 2rem;
    }

    .data {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        height: 8rem;
        font-weight: bold;
    }
}

.detector-card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    cursor: pointer;
}
</style>