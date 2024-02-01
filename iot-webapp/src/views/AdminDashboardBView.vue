<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import UserCard from '@/components/UserCard.vue';

import openAddUserModal from '@/assets/js/openAddUserModal';
</script>

<template>
    <main>
        <section id="header">
            <SectionTitle title="Admin dashoboard" />
        </section>
        <section id="toolbar">
            <div class="toolbar" @click="openAddUserModal">
                <button>
                    <font-awesome-icon :icon="['fas', 'plus']" />
                    add user
                </button>
            </div>
        </section>
        <section id="users">
            <div class="users-list">
                <UserCard />
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