<script setup lang="ts">
import AlertCard from "@/components/AlertCard.vue"
import DetectionCard from "@/components/DetectionCard.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import DataCard from "@/components/DataCard.vue";
import Loader from '@/components/Loader.vue';
import NoResultCard from "@/components/NoResultCard.vue";
import Swal from "sweetalert2";
import { ref } from "vue";
import { onMounted } from "vue";
import getDashboard from "@/assets/api/getDashboard";
import getZones from "@/assets/api/getZones";
import Config from "@/config";
import getOverrides from "@/assets/api/getOverrides";
import router from "@/router";

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const loading = ref(true);
const detections_list = ref([]);
const alerts_list = ref([]);
const active_detectors = ref(0);
const detections_today = ref(0);
const zones = ref([]);
const faults = ref(0);
const overrides = ref([]);

function countUnique(iterable: any) {
  return new Set(iterable.map((detection: any) => detection[1])).size;
}

function getFaulty(iterable: any) {
  /* 
    A device is faulty when it has not sent a detection
    in the configured time interval.

    This function returns the devices that are faulty.
  */

  // get unique devices
  let unique_devices = new Set(iterable.map((detection: any) => detection[1]));

  // get the last detection for each device
  let last_detections = Array.from(unique_devices).map((device: any) => {
    let detections = iterable.filter((detection: any) => detection[1] == device);
    return detections.reduce((a: any, b: any) => {
      return a[4] > b[4] ? a : b;
    });
  });
  // get the faulty devices
  let faulty_devices = last_detections.filter((detection: any) => {
    const lastDetection = new Date(detection[4]);
    const now = new Date();
    return (now.getTime() - lastDetection.getTime()) > Config.MAX_TIME_BEFORE_FAULT;
  });

  return faulty_devices;

}

function getDetectionsDay(iterable: any) {
  /**
   * Get all detections from today where status is 1
   */
  let detections = iterable.filter((detection: any) => detection[4].split(" ")[0] == new Date().toISOString().split("T")[0]);
  return detections.filter((detection: any) => detection[3] == 1);
}

onMounted(async () => {
  const response = await getDashboard();
  if (response != null) {
    detections_list.value = response;
    alerts_list.value = detections_list.value.filter((detection) => detection[3] == 1);
    active_detectors.value = countUnique(detections_list.value.map((detection) => detection[1]));
    detections_today.value = getDetectionsDay(detections_list.value).length;
    faults.value = getFaulty(detections_list.value).length;

    const responseZones = await getZones();
    if (responseZones != null) {
      zones.value = responseZones;

      const responseOverrides = await getOverrides();
      if (responseOverrides != null) {
        overrides.value = responseOverrides;
        loading.value = false;
      }
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

function openFaultsPage() {
  router.push({ name: 'faults' });
}

function openOverridesPage() {
  router.push({ name: 'overrides' });
}

function openSystemPage() {
  router.push({ name: 'system' });
}

function openAlertsPage() {
  router.push({ name: 'alerts' });
}
</script>

<template>
  <Loader v-if="loading" />
  <main v-else>
    <div class="container">
      <section id="overview">
        <SectionTitle :title="t('dashboard.overview')" />
        <div class="cards-list">
          <DataCard :icon="['fas', 'location-dot']" :number=zones.length :label="t('dashboard.active_zones')"
            @click="openSystemPage" />
          <DataCard :icon="['fa', 'clock']" :number=detections_today :label="t('dashboard.detections_day')"
            @click="openAlertsPage" />
          <DataCard :icon="['fas', 'crow']" :number=overrides.length :label="t('dashboard.manual_overrides')"
            @click="openOverridesPage()" />
          <DataCard :icon="['fas', 'camera']" :number=active_detectors :label="t('dashboard.active_detectors')"
            @click="openSystemPage" />
          <DataCard :icon="['fa', 'bug']" :number=faults :label="t('dashboard.possible_faults')"
            @click="openFaultsPage()" />
        </div>
      </section>
      <section id="alerts-history">
        <SectionTitle :title="t('dashboard.alerts_history')" />
        <NoResultCard v-if="alerts_list.length == 0" :label="t('dashboard.no_alerts')" />
        <div class="alerts-list" v-else>
          <AlertCard v-for="alert in alerts_list" :id="alert[0]" :date="alert[4]" :device="alert[2]" :zone="alert[3]" />
        </div>
      </section>
      <section id="detections-history">
        <SectionTitle :title="t('dashboard.last_detections')" />
        <NoResultCard v-if="detections_list.length == 0" :label="t('dashboard.no_detections')" />
        <div class="alerts-list" v-else>
          <DetectionCard v-for="detection in detections_list" :id="detection[0]" :date="detection[4]"
            :device="detection[2]" :zone="detection[3]" />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
main {
  align-items: unset;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .alerts-list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 50vh;
    padding: 3rem;
    margin: 1rem;
  }

  .cards-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 3rem;
  }

}
</style>
