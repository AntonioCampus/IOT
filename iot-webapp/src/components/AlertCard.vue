<script setup lang="ts">
// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import Swal from 'sweetalert2';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    device: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    }
});

function openAlertOverview() {
    Swal.fire({
        title: t('alert_card.title'),
        icon: 'info',
        html: `
            <p><strong>ID:</strong> ${props.id}</p>
            <p><strong>${t('common.date')}:</strong> ${props.date}</p>
            <p><strong>Detector:</strong> ${props.device}</p>
            <p><strong>${t('common.zone')}:</strong> ${props.zone}</p>
        `,
        showConfirmButton: true,
        confirmButtonText: t('common.close')
    });
}
</script>

<template>
    <div class="alert-card" id="" @click="openAlertOverview()">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
        </div>
        <div class="content">
            <p>[{{ props.date }}] {{ t('alert_card.bird_detected') }} @ Detector "{{ props.device }}"</p>
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