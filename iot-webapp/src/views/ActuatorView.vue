<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import AlertDataRow from '@/components/AlertDataRow.vue';
import openDeleteActuatorModal from '@/assets/js/openDeleteActuatorModal'
import overrideActuator from '@/assets/js/overrideActuator'
import router from '@/router';
import { useUserStore } from '@/stores/user';
import getActuators from '@/assets/api/getActuators';
import { onMounted, ref } from 'vue';
import Loader from '@/components/Loader.vue';
import getZones from '@/assets/api/getZones';
import Swal from 'sweetalert2';

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const actuator = ref([]);
const zone = ref([]);
const loading = ref(true);

function getActuatorById(actuators: [], id: string) {
    return actuators.find((actuator) => actuator[0] === Number(id));
}

function getZoneById(zones: [], id: string) {
    return zones.find((zone) => zone[0] === id);
}

onMounted(async () => {
    const response = await getActuators();
    if (response) {
        const actuators = response;
        actuator.value = getActuatorById(actuators, router.currentRoute.value.params.id as string);

        const zones = await getZones();
        if (zones) {
            zone.value = getZoneById(zones, actuator.value[3]);
            console.log(zone.value);
            loading.value = false;
        }
    }

    if (loading.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: t('errors.fetch_data'),
        }).then(() => {
            router.push({ path: '/' });
        });
    }
});

</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section id="header">
            <SectionTitle :title="actuator[1]" />
            <div class="tools" v-if="useUserStore().isAdmin">
                <button class="danger" @click="overrideActuator(zone[0])">
                    <font-awesome-icon :icon="['fas', 'crosshairs']" /> {{ t('system.override') }}
                </button>
                <button class="danger" @click="openDeleteActuatorModal(router.currentRoute.value.params.id as string)">
                    <font-awesome-icon :icon="['fas', 'trash']" /> {{ t('system.remove_actuator') }}
                </button>
            </div>
            <div class="detector-info">
                <AlertDataRow :icon="['fas', 'robot']" label="ID" :data="actuator[0]" />
                <AlertDataRow :icon="['fas', 'location-dot']" :label="t('common.zone')"
                    :data="zone[1] + ' (ID: ' + zone[0] + ')'" />
            </div>
        </section>
    </main>
</template>

<style scoped>
.detector-info {
    display: flex;
    flex-direction: column;
    padding: 4rem;
    background-color: var(--white);
    box-shadow: 0 0 1rem var(--black);
    margin: 1rem;
    border-radius: 0.5rem;
    width: 60vw;
}

.tools {
    display: flex;
    justify-content: flex-end;
    margin: 1rem;
    justify-content: space-between;
}
</style>