<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import AlertDataRow from "@/components/AlertDataRow.vue";
</script>

<template>
    <main>
        <section id="overview">
            <SectionTitle title="Alert overview" />
            <div class="container">
                <AlertDataRow :icon="['fas', 'robot']" label="ID" data="ADU37483nccius838" />
                <AlertDataRow :icon="['fas', 'clock-rotate-left']" label="Date" data="11:40:21" />
                <AlertDataRow :icon="['fas', 'camera']" label="Detector" data="Crow detector" />
                <AlertDataRow :icon="['fas', 'eye']" label="Status" data="Detected" />
            </div>
        </section>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: var(--white);
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem var(--black);
    min-width: 50vw;
}
</style>