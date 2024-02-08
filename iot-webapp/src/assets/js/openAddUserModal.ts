import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import addUser from '../api/addUser';
import config from '@/config';

// @ts-ignore
import i18n from '@/config/i18n'
const { t } = i18n.global

function getUsername(new_user: { username: string; password: string; privileged: string; }) {
    return Swal.fire({
        icon: 'info',
        title: t('users.new_user'),
        text: t('users.new_user_lbl'),
        input: 'text',
        showCancelButton: true,
        confirmButtonText: t('common.next_btn'),
        showLoaderOnConfirm: true,
        cancelButtonText: t('common.cancel'),
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value || !value.match(/[a-zA-A0-9]/)) return t('users.invalid_username');
            else new_user.username = value;
        },
    })
}

function getPassword(new_user: { username: string; password: string; privileged: string; }) {
    return Swal.fire({
        icon: 'info',
        title: t('users.new_user'),
        text: t('users.new_user_psw'),
        input: 'password',
        showCancelButton: true,
        confirmButtonText: t('common.next_btn'),
        showLoaderOnConfirm: true,
        cancelButtonText: t('common.cancel'),
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 1,
        inputValidator: (value) => {
            if (!value || !value.match(/[\s\W]/)) return t('users.invalid_password');
            else new_user.password = value;
        },
    })
}

function setPrivileged(new_user: { username: string; password: string; privileged: string; }) {
    return Swal.fire({
        icon: 'info',
        title: t('users.new_user'),
        text: t('users.give_privileges'),
        showCancelButton: true,
        confirmButtonText: t('common.next_btn'),
        showLoaderOnConfirm: true,
        cancelButtonText: t('common.cancel'),
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 2,
        input: 'checkbox',
        inputPlaceholder: t('users.yes_give'),
        inputValidator: (value) => {
            new_user.privileged = value;
        },
    })
}

export default function openAddUserModal() {
    let new_user = {
        username: '',
        password: '',
        privileged: '',
    }
    getUsername(new_user).then((result) => {
        if (result.isConfirmed) {
            getPassword(new_user).then((result) => {
                if (result.isConfirmed) {
                    setPrivileged(new_user).then(async (result) => {
                        if (result.isConfirmed) {
                            const mfa = await sendOTP(config.TELEGRAM_ADMIN_CHAT_ID);
                            if (mfa) {
                                const res = await addUser(new_user.username, new_user.password, Boolean(new_user.privileged));
                                if (res) Swal.fire({
                                    icon: 'success',
                                    title: t('users.added_user_title'),
                                    text: t('users.added_user_txt'),
                                });
                                else Swal.fire({
                                    icon: 'error',
                                    title: t('common.error'),
                                    text: t('users.add_error')
                                });
                            } else Swal.fire({
                                icon: 'error',
                                title: t('common.error'),
                                text: t('common.wrong_otp'),
                            })
                        }
                    });
                }
            });
        }
    })
}