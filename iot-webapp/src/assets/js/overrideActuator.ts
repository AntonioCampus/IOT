import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import override from '../api/override';
import config from '@/config';

import i18n from '@/config/i18n'
const { t } = i18n.global

export default async function overrideActuator(zone_id: string) {
    Swal.fire({
        title: t('forms.are_you_sure'),
        text: t('overrides.override_actuator'),
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        showLoaderOnConfirm: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            const mfa = await sendOTP(config.TELEGRAM_ADMIN_CHAT_ID);
            if (mfa) {
                const result = await override(zone_id);
                if (result) {
                    Swal.fire({
                        title: t('overrides.override_title'),
                        text: t('overrides.override_txt'),
                        icon: 'success',
                        confirmButtonText: t('common.ok'),
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        title: t('common.error'),
                        text: t('overrides.override_error'),
                        icon: 'error',
                        confirmButtonText: t('common.ok'),
                    });
                }
            } else {
                Swal.fire({
                    title: t('common.error'),
                    text: t('common.wrong_otp'),
                    icon: 'error',
                    confirmButtonText: t('common.ok'),
                });
            }
        }
    });
}