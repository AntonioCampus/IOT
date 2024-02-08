<script setup lang="ts">

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps<{
    id: string;
}>();
</script>

<template>
    <div class="fault-card">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
        </div>
        <div class="content">
            <p>{{ t('common.device') }} {{ props.id }} {{ t('faults.no_report') }}</p>
        </div>
    </div>
</template>

<style scoped>
.fault-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--white);
    margin: 0.5rem;
    border-radius: 0.5rem;
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