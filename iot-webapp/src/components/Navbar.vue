<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import config from '@/config';

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
    <div class="navbar" v-if="router.currentRoute.value.path != '/'">
        <div class="logo">
            <img :alt="config.APP_NAME + ' logo'" class="logo" src="@/assets/images/logo.jpeg" />
        </div>
        <div class="navbar-list">
            <ul>
                <li @click="router.push({ path: '/dashboard' })"
                    :class="{ 'active': router.currentRoute.value.path == '/dashboard' }">{{ t('navbar.dashboard') }}</li>
                <li @click="router.push({ path: '/alerts' })"
                    :class="{ 'active': router.currentRoute.value.path == '/alerts' }">{{ t('navbar.alerts') }}</li>
                <li @click="router.push({ path: '/statistics' })"
                    :class="{ 'active': router.currentRoute.value.path == '/statistics' }">{{ t('navbar.statistics') }}</li>
                <li @click="router.push({ path: '/system' })"
                    :class="{ 'active': router.currentRoute.value.path == '/system' }">{{ t('navbar.system') }}</li>
                <li @click="router.push({ path: '/admin' })"
                    :class="{ 'active': router.currentRoute.value.path == '/admin' }" v-if="useUserStore().isAdmin">{{
                        t('navbar.admin') }}
                </li>
                <li @click="router.push({ path: '/logout' })">{{ t('navbar.logout') }}</li>
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