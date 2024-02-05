<script setup lang="ts">
import Swal from 'sweetalert2';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    name: {
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
        title: 'Alert details',
        icon: 'info',
        html: `
            <p><strong>ID:</strong> ${props.id}</p>
            <p><strong>Date:</strong> ${props.date}</p>
            <p><strong>Detector:</strong> ${props.detector}</p>
            <p><strong>Status:</strong> ${props.status ? 'Detected' : 'Unchecked'}</p>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Close'
    });
};
</script>

<template>
    <div class="alert-card" :id="props.id" @click="openAlertDetails">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" v-if="props.status" />
            <font-awesome-icon :icon="['fas', 'thumbs-up']" v-else />
        </div>
        <div class="data">
            <h3>Detection by: {{ props.name }}</h3>
            <p>{{ props.date + ' - ' + props.detector }}</p>
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
    width: 90%;

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