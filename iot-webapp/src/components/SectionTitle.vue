<script setup lang="ts">
const props = defineProps({
    title: String
})
</script>

<template>
    <div class="section-title">
        <h1>{{ props.title?.toUpperCase() }}</h1>
        <span class="liner" />
    </div>
</template>

<style scoped>
.section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.liner {
    display: flex;
    align-items: flex-start;
    text-align: left;
}

.liner:after {
    content: "";
    flex-grow: 1;
    height: 0.2rem;
    background: var(--primary-color);
    min-width: 20vw;
    margin: auto;
}
</style>