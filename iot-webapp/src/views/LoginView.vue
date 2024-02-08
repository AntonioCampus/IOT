<script setup lang="ts">
import router from '@/router';
import doLogin from '@/assets/api/doLogin';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import Config from '@/config';
// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const username = ref('');
const password = ref('');

async function login() {
    let res = await doLogin(username.value, password.value)
    if (res) {
        router.push({ path: '/dashboard' });
    } else
        Swal.fire({
            title: "Oh no!!",
            text: t('login.wrong_credentials'),
            imageUrl: "src/assets/images/hacker_pidgeon.jpg",
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: t('login.image_alt'),
            confirmButtonText: t('login.confirm_btn'),
        });
}
</script>

<template>
    <main>
        <div class="login-container">
            <div class="logo-container">
                <img src="@/assets/images/logo.jpeg" alt="logo" />
            </div>
            <div class="form-container">
                <div class="header">
                    <h1>{{ Config.APP_NAME }} &copy;</h1>
                </div>
                <div class="form">
                    <input v-model="username" type="text" placeholder="Username" @keyup.enter="login" />
                    <input v-model="password" type="password" placeholder="Password" @keyup.enter="login" />
                    <button @click="login">{{ t('login.login_btn') }}</button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.login-container {
    display: flex;
    background-color: var(--white);
    border: 0.3rem solid var(--black);
    border-radius: 1rem;
    box-shadow: 0 0 1rem var(--black);

    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: var(--primary-color);
        border-radius: 0.5rem 0 0 0.5rem;

        img {
            width: 50%;
            height: 100%;
            object-fit: contain;
        }
    }

    .form-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 1rem;

            h1 {
                font-size: 2rem;
                font-weight: 700;
                color: var(--black);
            }
        }

        .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            input {
                padding: 1rem;
                margin-bottom: 1rem;
                border: 0.1rem solid var(--black);
                border-radius: 0.5rem;
                font-size: 1rem;
                font-weight: 700;
                color: var(--black);
            }
        }
    }
}
</style>@/stores/user