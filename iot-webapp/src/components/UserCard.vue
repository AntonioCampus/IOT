<script setup lang="ts">
import Swal from 'sweetalert2'
import deleteUser from '@/assets/api/deleteUser';
import { useUserStore } from '@/stores/user';
import sendOTP from '@/assets/js/sendOTP';
import config from '@/config';

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps<{
    id: string;
    username: string;
    admin: string;
}>();

function deleteUserModal() {
    Swal.fire({
        title: t('users.remove_user'),
        icon: 'info',
        text: t('users.remove_text'),
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        showCancelButton: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            const mfa = await sendOTP(config.TELEGRAM_ADMIN_CHAT_ID);
            if (mfa) {
                const response = await deleteUser(props.id);
                if (response) {
                    Swal.fire(t('users.user_removed_title'), t('users.user_removed'), 'success');
                    location.reload();
                } else {
                    Swal.fire(t('users.user_error_title'), t('users.user_error'), 'error');
                }
            } else {
                Swal.fire(t('common.error'), t('common.wrong_otp'), 'error');
            }
        }
    });
}

</script>

<template>
    <div class="user-card notallowed" v-tooltip="t('users.no_remove')"
        v-if="useUserStore().userId === props.id && useUserStore().isAdmin">
        <div class="icon">
            <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <div class="data">
            <h1>{{ props.username }}</h1>
            <p>{{ (props.admin ? t('users.privileged') : t('users.standard')) }}</p>
        </div>
    </div>
    <div class="user-card allowed" @click="deleteUserModal" v-tooltip="t('users.remove_tooltip')"
        v-if="useUserStore().userId !== props.id && useUserStore().isAdmin">
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