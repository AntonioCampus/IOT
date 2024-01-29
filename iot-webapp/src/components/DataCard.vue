<script setup lang="ts">
const props = defineProps({
    icon: Array,
    number: Number,
    label: String
})
</script>

<template>
    <div class="data-card">
        <div class="icon">
            <font-awesome-icon :icon="props.icon" />
        </div>
        <div class="title">
            <h1 class="number">{{ props.number?.toString() }}</h1>
            <h1 class="label">{{ props.label }}</h1>
        </div>
    </div>
</template>

<style scoped>
.data-card {
    display: flex;
    background-color: var(--white);
    box-shadow: 0 0 1rem var(--black);
    min-height: 7rem;
    min-width: 25rem;
    margin: 1rem;

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-color);
        color: var(--white);
        padding: 1rem;
        font-size: 4rem;
        width: 7rem;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        row-gap: 1rem;
        padding: 2rem;
        color: var(--black);
        width: 100%;

        .number {
            font-size: 3rem;
        }

        .label {
            font-size: 1rem;
            color: var(--secondary-color);
        }
    }
}

.data-card:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
}
</style>