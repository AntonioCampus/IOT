<script setup lang="ts">
function openDetectorPage() {
    window.open('/system/detectors/1', '_blank');
}
</script>

<template>
    <div class="detector-card" id="" @click="openDetectorPage">
        <div class="header">
            <font-awesome-icon :icon="['fas', 'camera']" />
        </div>
        <div class="data">
            <p>Detector #1</p>
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