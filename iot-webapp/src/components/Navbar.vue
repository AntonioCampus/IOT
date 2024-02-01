<script setup lang="ts">
import router from '@/router';
</script>

<template>
    <div class="navbar" v-if="router.currentRoute.value.path != '/'">
        <div class="logo">
            <img alt="BirdBuster logo" class="logo" src="@/assets/images/logo.jpeg" />
        </div>
        <div class="navbar-list">
            <ul>
                <li @click="router.push({ path: '/dashboard' })"
                    :class="{ 'active': router.currentRoute.value.path == '/dashboard' }">DASHBOARD</li>
                <li @click="router.push({ path: '/alerts' })"
                    :class="{ 'active': router.currentRoute.value.path == '/alerts' }">ALERTS</li>
                <li @click="router.push({ path: '/statistics' })"
                    :class="{ 'active': router.currentRoute.value.path == '/statistics' }">STATISTICS</li>
                <li @click="router.push({ path: '/system' })"
                    :class="{ 'active': router.currentRoute.value.path == '/system' }">SYSTEM</li>
                <li @click="router.push({ path: '/admin' })"
                    :class="{ 'active': router.currentRoute.value.path == '/admin' }">ADMIN</li>
                <li>LOGOUT</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    background-color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    .logo {
        width: 25%;
    }

    .navbar-list {

        ul {
            display: flex;
            justify-content: space-between;

            li {
                list-style: none;
                color: var(--white);
                margin: 1rem;
                padding: 0.5rem;
                border: 0.1rem solid transparent;
            }

            li:hover {
                cursor: pointer;
                border: 0.1rem solid var(--white);
            }

            li.active {
                text-decoration: underline;
            }
        }
    }
}
</style>