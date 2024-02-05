<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, LineElement, PointElement, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import { onMounted, ref } from 'vue';
import getDashboard from '@/assets/api/getDashboard';
import Loader from '@/components/Loader.vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const detectors = ref([])
const loading = ref(true);
let detectors_names: Array<String> = [];
let today_detections: any = [];
let detections_per_month: any = [];


function getDistinctDetectors(detectors: any): any {
    return Array.from(new Set(detectors.map((detector: any) => detector[1])));
}

function getTodayDetections(detections: any): any {
    return detections.filter((detection: any) => detection[3].split(" ")[0] == new Date().toISOString().split("T")[0]);
}

function getDetectionsForMonths(detections: any): any {
    /**
     * Get the total number of detections for each month
     */
    let detections_per_month = Array(12).fill(0);
    for (let i = 0; i < detections.length; i++) {
        let month = new Date(detections[i][3]).getMonth();
        let year = new Date(detections[i][3]).getFullYear();
        if (year == new Date().getFullYear())
            detections_per_month[month] += 1;
    }
    return detections_per_month;
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
        console.log(detections_per_month)
    }
    loading.value = false;
})

const barData = { // Detections today per detector
    labels: detectors_names,
    datasets: [{
        label: 'Detections',
        data: getTodayDetections(detectors.value),
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

const pieData = { // Actuators activations/month
    labels: ['Automatic', 'Override'],
    datasets: [
        {
            backgroundColor: ['#008DBA', '#777777'],
            data: [80, 20]
        }
    ]
}

const pieOptions = {
    responsive: false,
    maintainAspectRatio: true,
}

const lineData = { // Detections per month
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Detections',
            backgroundColor: '#f87979',
            data: getDetectionsForMonths(detectors.value)
        }
    ]
}

const lineOptions = {
    responsive: false,
    maintainAspectRatio: true
}

const barData2 = {
    labels: ['Detector 1', 'Detector 2', 'Detector 3', 'Detector 4', 'Detector 5', 'Detector 6'],
    datasets: [{
        label: 'Faults',
        data: [12, 19, 3, 5, 2, 3],
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
</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section id="statistics">
            <SectionTitle title="Statistics" />
            <div class="chart-list">
                <div class="content">
                    <div class="chart">
                        <h3>Today detections per detector</h3>
                        <Bar :data="barData" />
                    </div>
                </div>
                <div class="content">
                    <div class="chart">
                        <h3>Actuators activations/month</h3>
                        <Pie :data="pieData" :options="pieOptions" />
                    </div>
                </div>
                <div class="content">
                    <div class="chart">
                        <h3>Detections per month</h3>
                        <Line :data="lineData" :options="lineOptions" />
                    </div>
                </div>
                <div class="content">
                    <div class="chart">
                        <h3>Monthly faults per detector</h3>
                        <Bar :data="barData2" />
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