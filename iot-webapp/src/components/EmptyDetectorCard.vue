<script setup lang="ts">
import { vTooltip } from 'floating-vue'
import openAddDetectorModal from '@/assets/js/openAddDetectorModal';
// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    enabled: Boolean,
});
</script>

<template>
    <div class="empty-detector-card" v-tooltip="t('system.add_detector')" v-if="enabled" @click="openAddDetectorModal">
        <div class="content">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
    </div>
    <div class="empty-detector-card-disabled" v-tooltip="t('system.no_zones_configured')" v-else>
        <div class="content">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
    </div>
</template>

<style scoped>
.empty-detector-card {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    color: var(--black);
    border: 0.2rem dashed var(--primary-color);
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
    width: 10rem;
    height: 10rem;
    margin: 1rem;
    justify-content: center;
    align-items: center;

    .content {
        padding: 0.5rem;
        font-size: 2rem;
        color: var(--primary-color);
        justify-content: center;
    }
}

.empty-detector-card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    cursor: pointer;
}

.empty-detector-card-disabled {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    color: var(--black);
    border: 0.2rem dashed var(--disabled-color);
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
    width: 10rem;
    height: 10rem;
    margin: 1rem;
    justify-content: center;
    align-items: center;

    .content {
        padding: 0.5rem;
        font-size: 2rem;
        color: var(--disabled-color);
        justify-content: center;
    }
}
</style>