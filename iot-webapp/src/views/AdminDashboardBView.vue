<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import UserCard from '@/components/UserCard.vue';

import openAddUserModal from '@/assets/js/openAddUserModal';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import getUsers from '@/assets/api/getUsers';
import LoaderVue from '@/components/Loader.vue';
import Swal from 'sweetalert2';
import router from '@/router';

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const isAdmin = useUserStore().isAdmin;
const users = ref([]);
const loading = ref(true);

onMounted(async () => {
    const response = await getUsers();
    if (response) {
        users.value = response;
        loading.value = false;
    }

    if (loading.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: t('errors.fetch_data'),
        }).then(() => {
            router.push({ path: '/' });
        });
    }
});
</script>

<template>
    <LoaderVue v-if="loading" />
    <main v-else>
        <section id="header">
            <SectionTitle :title="t('users.title')" />
        </section>
        <section id="toolbar">
            <div class="toolbar" @click="openAddUserModal" v-if="isAdmin">
                <button>
                    <font-awesome-icon :icon="['fas', 'plus']" />
                    {{ t('users.add_user') }}
                </button>
            </div>
        </section>
        <section id="users">
            <div class="users-list">
                <UserCard v-for="user in users" :id="user[0]" :username="user[1]" :admin="user[3]" />
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    flex-direction: column;
}

.toolbar {
    display: flex;
}

.users-list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    width: 70vw;
    min-height: 50vh;
    max-height: 70vh;
}
</style>