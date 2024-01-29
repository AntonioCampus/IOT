<script setup lang="ts">
const props = defineProps({
    icon: {
        type: Array,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="alert-data-row">
        <div class="icon">
            <font-awesome-icon :icon="props.icon" />
        </div>
        <div class="label">
            <p>{{ props.label }}</p>
        </div>
        <div class="data">
            <p>{{ props.data }}</p>
        </div>
    </div>
</template>

<style scoped>
.alert-data-row {
    display: flex;
    flex-direction: row;

    .icon {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        margin: 1rem;
        color: var(--primary-color);
        width: 10%;
    }

    .label {
        display: flex;
        align-items: center;
        font-size: 1rem;
        margin: 1rem;
        font-weight: bold;
        color: var(--secondary-color);
        width: 20%;
    }

    .data {
        display: flex;
        align-items: center;
        font-size: 1rem;
        margin: 1rem;
    }
}
</style>