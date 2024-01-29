<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, LineElement, PointElement, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const barData = {
    labels: ['Detector 1', 'Detector 2', 'Detector 3', 'Detector 4', 'Detector 5', 'Detector 6'],
    datasets: [{
        label: 'Detections',
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

const pieData = {
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
    maintainAspectRatio: true
}

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Detections',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
        }
    ]
}

const lineOptions = {
    responsive: false,
    maintainAspectRatio: true
}
</script>

<template>
    <main>
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