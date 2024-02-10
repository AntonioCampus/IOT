<script setup lang="ts">
// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    id: String,
    user: String,
    date: String,
    zone: String,
});
</script>

<template>
    <div class="override-card" :id="props.id">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'crosshairs']" />
        </div>
        <div class="content">
            <h2>[{{ props.date }}] {{ t('overrides.override_lbl') }} {{ props.zone }}</h2>
            <p>{{ t('overrides.issued_by') }}: {{ props.user }}</p>
        </div>
    </div>
</template>

<style scoped>
.override-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--white);
    margin: 0.5rem;
    box-shadow: 0 0 0.5rem var(--black);
    transition: box-shadow 0.3s ease-in-out;

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
</style>