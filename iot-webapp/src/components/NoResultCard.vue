<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        required: true
    },
})
</script>

<template>
    <div class="no-results">
        <p>{{ props.label }}</p>
    </div>
</template>

<style scoped>
.no-results {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    color: var(--secondary-color);
    font-size: 2rem;
    padding: 2rem;
}
</style>