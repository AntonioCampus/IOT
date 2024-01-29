<script setup lang="ts">
import AlertCard from "@/components/AlertCard.vue"
import DetectionCard from "@/components/DetectionCard.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import DataCard from "@/components/DataCard.vue";
import Loader from '@/components/Loader.vue';

import { ref } from "vue";
import { onMounted } from "vue";

const loading = ref(true);
const detections_list = ref([]);
const alerts_list = ref([]);

onMounted(async () => {
  const response = await fetch("https://65b2b4d29bfb12f6eafe4e4f.mockapi.io/detections");
  if (response.ok) {
    detections_list.value = await response.json();
    alerts_list.value = detections_list.value.filter((detection) => detection["status"] === true);
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
          <DataCard :icon="['fa', 'clock']" :number=0 label="Detections/24h" />
          <DataCard :icon="['fas', 'crow']" :number=0 label="Manual overrides today" />
          <DataCard :icon="['fas', 'camera']" :number=1 label="Active detectors" />
          <DataCard :icon="['fa', 'bug']" :number=0 label="Fault detected" />
        </div>
      </section>
      <section id="alerts-history">
        <SectionTitle title="Alerts history" />
        <div class="alerts-list">
          <AlertCard v-for="alert in alerts_list" :id="alert['id']" :time="alert['time']" :name="alert['name']" />
        </div>
      </section>
      <section id="detections-history">
        <SectionTitle title="Last detections" />
        <div class="alerts-list">
          <DetectionCard v-for="detection in detections_list" :id="detection['id']" :time="detection['time']"
            :name="detection['name']" />
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
