<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, LineElement, PointElement, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import { onMounted, ref } from 'vue';
import getDashboard from '@/assets/api/getDashboard';
import getOverrides from '@/assets/api/getOverrides';
import getZones from '@/assets/api/getZones';
import Loader from '@/components/Loader.vue';
import Swal from 'sweetalert2';
import NoResultCard from '@/components/NoResultCard.vue';

// @ts-ignore
import { useI18n } from 'vue-i18n';
import router from '@/router';
const { t } = useI18n();

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const detectors = ref([])
const overrides = ref([])
const zones = ref([])
const loading = ref(true);
let detectors_names: Array<String> = [];
let today_detections: any = [];
let detections_per_month: any = [];
let actuators_on = 0;

const barData = ref({})
const pieData = ref({})
const lineData = ref({})
const barData2 = ref({})

function countStatusTrue(iterable: any) {
    /**
     * Count the number of activations 
     */
    return iterable.filter((detection: any) => detection[3] == 1).length;
}

function getDistinctDetectors(detectors: any): any {
    return Array.from(new Set(detectors.map((detector: any) => detector[1])));
}

function getTodayDetections(detections: any): any {
    /**
     * Get the alerts per detector for today
     */
    let today_detections = Array(detectors.value.length).fill(0);
    for (let i = 0; i < detections.length; i++) {
        if (detections[i][3] == 1) {
            if (new Date(detections[i][4]).toDateString() == new Date().toDateString()) {
                let detector = detectors.value.indexOf(detections[i][1]);
                today_detections[detector] += 1;
            }
        }
    }
    return today_detections;
}

function getDetectionsForMonths(detections: any): any {
    /**
     * Get the total number of detections for each month
     */
    let detections_per_month = Array(12).fill(0);
    for (let i = 0; i < detections.length; i++) {
        if (detections[i][3] == 1) {
            let month = new Date(detections[i][4]).getMonth();
            let year = new Date(detections[i][4]).getFullYear();
            if (year == new Date().getFullYear())
                detections_per_month[month] += 1;
        }
    }
    return detections_per_month;
}

function getAlertsPerZone(zones: any, detections: any): any {
    let alerts_per_zone = Array(zones.length).fill(0);
    for (let i = 0; i < detections.length; i++) {
        let zone = detections[i][1];
        if (detections[i][3] == 1)
            alerts_per_zone[zone - 1] += 1;
    }
    return alerts_per_zone;
}

onMounted(async () => {
    const res = await getDashboard();
    if (res != null) {
        detectors.value = getDistinctDetectors(res);
        for (let i = 0; i < detectors.value.length; i++) {
            detectors_names.push(String('Det. ' + detectors.value[i]));
        }
        today_detections = getTodayDetections(res)
        detections_per_month = getDetectionsForMonths(res)
        actuators_on = countStatusTrue(res)

        barData.value = { // Detections today per detector
            labels: detectors_names,
            datasets: [{
                label: t('statistics.detections'),
                data: today_detections,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }]
        }

        lineData.value = { // Detections per month
            labels: [t('statistics.months.jan'), t('statistics.months.feb'), t('statistics.months.mar'), t('statistics.months.apr'), t('statistics.months.may'), t('statistics.months.jun'), t('statistics.months.jul'), t('statistics.months.aug'), t('statistics.months.sep'), t('statistics.months.oct'), t('statistics.months.nov'), t('statistics.months.dec')],
            datasets: [
                {
                    label: t('statistics.detections'),
                    backgroundColor: '#f87979',
                    data: detections_per_month
                }
            ]
        }

        const resOverrides = await getOverrides();
        if (resOverrides != null) {
            overrides.value = resOverrides;
            pieData.value = { // Actuators activations/month
                labels: [t('statistics.options_automatic'), t('statistics.options_override')],
                datasets: [
                    {
                        backgroundColor: ['#008DBA', '#777777'],
                        data: [actuators_on, overrides.value.length]
                    }
                ]
            }

            const resZones = await getZones();
            if (resZones != null) {
                zones.value = resZones;
                let alerts_per_zone = getAlertsPerZone(zones.value, res);
                barData2.value = {
                    labels: zones.value.map((zone: any) => zone[1]),
                    datasets: [{
                        label: t('statistics.zones'),
                        data: alerts_per_zone,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1
                    }]
                }
                loading.value = false;
            }
        }
    }

    if (loading.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: t('common.error'),
        }).then(() => {
            router.push({ path: '/' });
        });
    }
})

const pieOptions = {
    responsive: false,
    maintainAspectRatio: true,
}

const lineOptions = {
    responsive: false,
    maintainAspectRatio: true
}

</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section id="statistics">
            <SectionTitle :title="t('statistics.title')" />
            <NoResultCard v-if="detectors.length == 0" :label="t('statistics.no_data')" />
            <div v-else>
                <div class="chart-list">
                    <div class="content">
                        <div class="chart">
                            <h3>{{ t('statistics.detections_today') }}</h3>
                            <Bar :data="barData" />
                        </div>
                    </div>
                    <div class="content">
                        <div class="chart">
                            <h3>{{ t('statistics.activations_month') }}</h3>
                            <Pie :data="pieData" :options="pieOptions" />
                        </div>
                    </div>
                    <div class="content">
                        <div class="chart">
                            <h3>{{ t('statistics.detections_month') }}</h3>
                            <Line :data="lineData" :options="lineOptions" />
                        </div>
                    </div>
                    <div class="content">
                        <div class="chart">
                            <h3>{{ t('statistics.alerts_zone') }}</h3>
                            <Bar :data="barData2" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.chart-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--white);
    padding: 2rem;
    margin: 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    min-height: 70vh;

    .chart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: 2rem;
    }
}
</style>