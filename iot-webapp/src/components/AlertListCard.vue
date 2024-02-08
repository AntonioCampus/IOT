<script setup lang="ts">
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const tooltip = ref('');
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    detector: {
        type: String,
        required: true
    }
});

const openAlertDetails = () => {
    Swal.fire({
        title: t('alert_card.title'),
        icon: 'info',
        html: `
            <p><strong>ID:</strong> ${props.id}</p>
            <p><strong>${t('common.date')}:</strong> ${props.date}</p>
            <p><strong>Detector:</strong> ${props.detector}</p>
            <p><strong>${t('common.zone')}:</strong> ${props.zone}</p>
            <p><strong>Status:</strong> ${props.status ? t('common.detected') : t('common.no_detected')}</p>
        `,
        showConfirmButton: true,
        confirmButtonText: t('common.close')
    });
};

onMounted(() => {
    tooltip.value = props.status ? 'Bird detected' : 'No detection';
});
</script>

<template>
    <div class="alert-card" :id="props.id" @click="openAlertDetails" v-tooltip="tooltip">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" v-if="props.status" />
            <font-awesome-icon :icon="['fas', 'thumbs-up']" v-else />
        </div>
        <div class="data">
            <h3>Detector {{ props.detector }}</h3>
            <p>{{ props.date + ' - ' + t('common.zone') + ':' + props.zone }}</p>
        </div>
    </div>
</template>

<style scoped>
.alert-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--white);
    color: var(--black);
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
    margin: 1rem;
    width: 60vw;

    .icon {
        font-size: 2rem;
        background-color: var(--primary-color);
        color: var(--white);
        padding: 2rem;
    }

    .data {
        display: flex;
        align-items: last baseline;
        flex-direction: column;
        row-gap: 1rem;
        margin: 1rem;
        font-weight: bold;
        color: var(--black);

        h3 {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--black);
        }

        p {
            font-size: 0.8rem;
            font-weight: bold;
            color: var(--secondary-color);
        }
    }
}

.alert-card:hover {
    cursor: pointer;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
}
</style>