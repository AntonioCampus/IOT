<script setup lang="ts">
// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
    <main>
        <div class="container">
            <div class="content">
                <h1>OH NO! </h1>
                <h2>{{ t('no_page.message') }}</h2>
                <h3>{{ t('no_page.submessage') }}</h3>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    background-image: url('../assets/images/404bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    height: 100vh;
}


.container {
    display: flex;
    flex-direction: column;

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 1rem;
        padding: 2rem;
        color: var(--white);
        width: 100%;
        background-color: rgba(10, 10, 10, 0.5);

        h1 {
            font-size: 3rem;
        }

        h2 {
            font-size: 2rem;
        }

        h3 {
            font-size: 1.5rem;
        }
    }
}
</style>