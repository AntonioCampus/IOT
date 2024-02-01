<script setup lang="ts">
import AlertCard from "@/components/AlertCard.vue"
import DetectionCard from "@/components/DetectionCard.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import DataCard from "@/components/DataCard.vue";
import Loader from '@/components/Loader.vue';
import NoResultCard from "@/components/NoResultCard.vue";

import { ref } from "vue";
import { onMounted } from "vue";
import getDashboard from "@/assets/api/getDashboard";

const loading = ref(true);
const detections_list = ref([]);
const alerts_list = ref([]);
const dashboard = ref([]);
const active_detectors = ref(0);
const detections_today = ref(0);

function countUnique(iterable: any) {
  return new Set(iterable).size;
}

function getDetectionsDay(iterable: any) {
  return iterable.filter((detection: any) => detection[3].split(" ")[0] == new Date().toISOString().split("T")[0]);
}

onMounted(async () => {
  const response = await getDashboard();
  if (response != null) {
    detections_list.value = response;
    alerts_list.value = detections_list.value.filter((detection) => detection[2] == 1);
    active_detectors.value = countUnique(detections_list.value.map((detection) => detection[1]));
    detections_today.value = getDetectionsDay(detections_list.value).length;
    loading.value = false;
  }

});
</script>

<template>
  <Loader v-if="loading" />
  <main v-else>
    <div class="container">
      <section id="overview">
        <SectionTitle title="Overview" />
        <div class="cards-list">
          <DataCard :icon="['fas', 'triangle-exclamation']" :number=0 label="Unchecked alerts" />
          <DataCard :icon="['fa', 'clock']" :number=detections_today label="Detections/24h" />
          <DataCard :icon="['fas', 'crow']" :number=0 label="Manual overrides today" />
          <DataCard :icon="['fas', 'camera']" :number=active_detectors label="Active detectors" />
          <DataCard :icon="['fa', 'bug']" :number=0 label="Fault detected" />
        </div>
      </section>
      <section id="alerts-history">
        <SectionTitle title="Alerts history" />
        <NoResultCard v-if="alerts_list.length == 0" label="No alerts found" />
        <div class="alerts-list" v-else>
          <AlertCard v-for="alert in alerts_list" :id="alert[0]" :time="alert[3]" :name="alert[1]" />
        </div>
      </section>
      <section id="detections-history">
        <SectionTitle title="Last detections" />
        <NoResultCard v-if="detections_list.length == 0" label="No detections found" />
        <div class="alerts-list" v-else>
          <DetectionCard v-for="detection in detections_list" :id="detection[0]" :time="detection[3]"
            :name="detection[1]" />
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
