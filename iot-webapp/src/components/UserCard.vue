<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import openDeleteUserModal from '@/assets/js/openDeleteUserModal';

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps<{
    id: string;
    username: string;
    admin: string;
}>();

</script>

<template>
    <div class="user-card notallowed" v-tooltip="t('users.no_remove')"
        v-if="useUserStore().userId == props.id && useUserStore().isAdmin">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <div class="data">
            <h1>{{ props.username }}</h1>
            <p>{{ (props.admin ? t('users.privileged') : t('users.standard')) }}</p>
        </div>
    </div>
    <div class="user-card allowed" @click="openDeleteUserModal(props.id)" v-tooltip="t('users.remove_tooltip')"
        v-if="useUserStore().userId != props.id && useUserStore().isAdmin">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <div class="data">
            <h1>{{ props.username }}</h1>
            <p>{{ (props.admin ? t('users.privileged') : t('users.standard')) }}</p>
        </div>
    </div>
    <div class="user-card" v-if="!useUserStore().isAdmin">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <div class="data">
            <h1>{{ props.username }}</h1>
            <p>{{ (props.admin ? t('users.privileged') : t('users.standard')) }}</p>
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
    background-color: var(--primary-color);
    color: var(--white);
}

.notallowed {
    cursor: not-allowed;
}

.allowed {
    cursor: pointer;
}
</style>