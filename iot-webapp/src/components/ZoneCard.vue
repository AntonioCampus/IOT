<script setup lang="ts">
import Swal from 'sweetalert2';
const props = defineProps({
    id: String,
    description: String
});

function openDescriptionModal() {
    Swal.fire({
        title: 'Zone description',
        text: props.description,
        icon: 'info',
        confirmButtonText: 'OK'
    });
}
</script>

<template>
    <div class="zone-card" id="" @click="openDescriptionModal">
        <div class="header">
            <font-awesome-icon :icon="['fas', 'location-dot']" />
        </div>
        <div class="data">
            <p>{{ props.id }}</p>
        </div>
    </div>
</template>

<style scoped>
.zone-card {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    color: var(--black);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 10rem;
    height: 10rem;
    margin: 1rem;

    .header {
        background-color: var(--primary-color);
        padding: 1rem;
        color: var(--white);
        text-align: center;
        font-size: 2rem;
        height: 2rem;
    }

    .data {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        height: 8rem;
        font-weight: bold;
    }
}

.zone-card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    cursor: pointer;
}
</style>