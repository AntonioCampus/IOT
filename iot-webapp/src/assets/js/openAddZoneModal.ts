import Swal from 'sweetalert2'
import addZone from '../api/addZone';
import sendOTP from './sendOTP';
import config from '@/config';

// @ts-ignore
import i18n from '@/config/i18n'
import router from '@/router';
const { t } = i18n.global

export default function openAddZoneModal() {
    let description: String;
    Swal.fire({
        title: t('forms.new_zone'),
        text: t('forms.zone_description'),
        input: 'text',
        inputAttributes: {
            autocapitalize: 'false'
        },
        showCancelButton: true,
        confirmButtonText: t('common.next_btn'),
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value) return t('forms.invalid_description');
            else description = value;
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            const mfa = await sendOTP(config.TELEGRAM_ADMIN_CHAT_ID);
            if (mfa) {
                const res = await addZone(description);
                if (res) {
                    Swal.fire({
                        title: t('common.success'),
                        text: t('forms.zone_added'),
                        icon: 'success',
                        confirmButtonText: t('common.ok'),
                    }).then(() => {
                        router.go(0);
                    });
                } else {
                    Swal.fire({
                        title: t('common.error'),
                        text: t('errors.fetch_data'),
                        icon: 'error',
                        confirmButtonText: t('common.ok'),
                    });
                }
            }
        }
    });
}