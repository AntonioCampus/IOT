import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import deleteActuator from '../api/deleteDevice';
import router from '@/router';
import config from '@/config';

// @ts-ignore
import i18n from '@/config/i18n'
const { t } = i18n.global

const actuator_str = 'actuator'

export default function openDeleteActuatorModal(id: string) {
    Swal.fire({
        title: t('forms.are_you_sure'),
        text: t('forms.remove_detector'),
        imageUrl: "../../src/assets/images/delete_actuator.jpeg",
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "delete_actuator",
        confirmButtonText: t('common.confirm'),
        confirmButtonColor: "#f27474",
        showCancelButton: true,
        cancelButtonText: t('common.cancel'),
        allowOutsideClick: false,
    }).then(async (result) => {
        if (result.isConfirmed) {
            const mfa = await sendOTP(config.TELEGRAM_ADMIN_CHAT_ID)
            if (mfa) {
                const res = await deleteActuator(id, actuator_str);
                if (res) {
                    Swal.fire({
                        title: t('forms.deleted_actuator'),
                        text: t('forms.deleted_actuator_txt'),
                        icon: "success"
                    });
                    router.push({ name: "system" });
                } else {
                    Swal.fire({
                        title: t('common.error'),
                        text: t('forms.actuator_error_remove'),
                        icon: "error"
                    });
                }
            } else {
                Swal.fire({
                    title: t('common.error'),
                    text: t('common.wrong_otp'),
                    icon: "error"
                });
            }
        }
    });
}