<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import OverrideCard from "@/components/OverrideCard.vue";
import getOverrides from "@/assets/api/getOverrides";
import getUsers from "@/assets/api/getUsers";
import { ref, onMounted } from "vue";
import Loader from "@/components/Loader.vue";
import Swal from "sweetalert2";
import router from "@/router";
import NoResultCard from "@/components/NoResultCard.vue";

const loading = ref(true);
const overrides = ref([]);
const users = ref([]);

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

function getUserById(id: string) {
    let username: string = '';
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i][0] == id) {
            username = users.value[i][1];
        }
    }
    return username;
}

onMounted(async () => {
    const responseOverrides = await getOverrides();
    if (responseOverrides != null) {
        let tmp = responseOverrides;

        const responseUsers = await getUsers();
        if (responseUsers != null) {
            users.value = responseUsers;

            // substitute user id with username
            for (let i = 0; i < tmp.length; i++) {
                for (let j = 0; j < users.value.length; j++) {
                    if (tmp[i][1] == users.value[j][0]) {
                        tmp[i][1] = getUserById(String(tmp[i][1]));
                        break;
                    }
                }
            }
            overrides.value = tmp;
            loading.value = false;
        }
    }

    if (loading.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while fetching the data",
        }).then(() => {
            router.push({ path: '/' });
        });
    }
});
</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section id="header">
            <SectionTitle :title="t('overrides.title')" />
        </section>
        <section id="overrides">
            <NoResultCard :label="t('overrides.no_overrides')" v-if="overrides.length == 0" />
            <div class="overrides-list" v-else>
                <OverrideCard v-for="override in overrides" :id="override[0]" :date="override[3]" :user="override[1]"
                    :zone="override[2]" />
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
}

.overrides-list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    min-height: 50vh;
    padding: 3rem;
    min-height: 70vh;
    width: 70vw;
}
</style>