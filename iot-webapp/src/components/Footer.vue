<script setup lang="ts">
import Config from '@/config';
import { ref } from 'vue';

// @ts-ignore
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="footer">
        <h4>{{ t('footer.title') }}</h4>
        <h5>{{ t('footer.university') }} - {{ t('footer.year') }}</h5>
        <p>{{ t('footer.version') }} {{ Config.APP_VERSION }}</p>
        <div class="options">
            <select v-model="$i18n.locale">
                <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    color: var(--white);
    background-color: var(--primary-color);

    select {
        padding: 0.5rem;
        border-radius: 0.5rem;
    }

    .options {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
    }
}
</style>