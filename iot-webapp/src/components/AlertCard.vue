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
    },
    time: {
        type: String,
        required: true
    },
});

function openAlertOverview() {
    router.push({ path: '/alerts/' + props.id });
}
</script>

<template>
    <div class="alert-card" id="" @click="openAlertOverview()">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
        </div>
        <div class="content">
            <p>[{{ props.time }}] Bird
                detected @ Detector "{{ props.name }}"'s zone</p>
        </div>
    </div>
</template>

<style scoped>
.alert-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--white);
    margin: 0.5rem;

    .icon {
        background-color: var(--primary-color);
        color: var(--white);
        font-size: 2rem;
        padding: 1rem;
    }

    .content {
        padding: 0.5rem;
        font-size: 1rem;
        justify-content: center;
    }
}

.alert-card:hover {
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--white);
}
</style>