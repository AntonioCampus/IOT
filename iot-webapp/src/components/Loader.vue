<script setup lang="ts"></script>

<template>
    <div class="loader-space">
        <span class="loader" />
    </div>
</template>

<style scoped>
.loader-space {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    width: 5rem;
    height: 5rem;
    border: 0.3rem solid var(--white);
    border-radius: 50%;
    display: inline-block;
    position: relative;
    -webkit-animation: rotation 1s linear infinite;
    animation: rotation 1s linear infinite;
}

.loader:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 0.3rem solid;
    border-color: var(--primary-color) transparent;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>