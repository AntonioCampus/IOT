<script setup lang="ts"></script>

<template>
    <div class="user-card">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <div class="data">
            <h1>USER #1</h1>
            <p>Standard user</p>
        </div>
    </div>
</template>

<style scoped>
.user-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--white);
    margin: 0.5rem;

    .icon {
        background-color: var(--primary-color);
        color: var(--white);
        font-size: 2rem;
        padding: 1rem;
    }

    .data {
        padding: 0.5rem;
        font-size: 1rem;
        justify-content: center;
    }
}

.user-card:hover {
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--white);
}
</style>