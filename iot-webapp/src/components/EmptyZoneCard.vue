<script setup lang="ts">
import { vTooltip } from 'floating-vue'
import openAddZoneModal from '@/assets/js/openAddZoneModal';
// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>

<template>
    <div class="empty-zone-card" @click="openAddZoneModal" v-tooltip="t('system.add_zone')">
        <div class="content">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
    </div>
</template>

<style scoped>
.empty-zone-card {
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

.empty-zone-card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    cursor: pointer;
}
</style>