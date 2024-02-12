import Swal from 'sweetalert2';
import OTP from '../api/models/OTP';
import config from '@/config';

import i18n from '@/config/i18n'
const { t } = i18n.global

async function sendToUser(user_id: string, otp: number | string) {
    const message = `
    🕜 <b>${t('otp.otp_code')}</b>

    ${t('otp.your_otp')}
    <code>${otp}</code>

    <b>${t('otp.note')}</b>: ${t('otp.expires')} 3 ${t('otp.minutes')}.
    `;
    const url = 'https://api.telegram.org/bot' + config.TELEGRAM_BOT_TOKEN + '/sendMessage';
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'chat_id': user_id,
            'text': message,
            'parse_mode': 'HTML'
        })
    });
    if (response.ok) return otp;
    return null;
}

function showErrorMessage() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: t('otp.otp_error')
    });
}

export default async function sendOTP(user_id: string,) {
    let res = false;
    const otp_code = new OTP();
    otp_code.generate();
    const response = await sendToUser(user_id, otp_code.get() as number);
    if (response == null) showErrorMessage();
    else {
        const swal = await Swal.fire({
            title: t('otp.otp_title'),
            text: t('otp.otp_text'),
            input: 'text',
            showCancelButton: true,
            confirmButtonText: t('common.confirm'),
            showLoaderOnConfirm: true,
            cancelButtonText: t('common.cancel'),
            timer: config.MAX_TIME_OTP,
            timerProgressBar: true,
            toast: true
        });
        if (swal.isConfirmed && otp_code.is_equal(swal.value)) res = true;
    }
    return res;
}