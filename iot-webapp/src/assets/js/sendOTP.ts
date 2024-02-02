import Swal from 'sweetalert2';
import OTP from '../api/models/OTP';

const time = 1000 * 60 * 3;

async function sendToUser(user_id: string, otp: number | string) {
    const message = `
    🕜 <b>OTP code</b>

    Your OTP code is:
    <code>${otp}</code>

    <b>Note</b>: it will expires in 3 minutes.
    `;
    const url = 'https://api.telegram.org/bot6710606204:AAF7zQglSskTxsq3ItcAdPZSZhNM2R260ys/sendMessage';
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
        text: 'Something went wrong!'
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
            title: 'Set a new detector',
            text: 'Please enter the OTP sent to your phone',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Next &rarr;',
            showLoaderOnConfirm: true,
            cancelButtonText: 'Cancel',
            progressSteps: ['1', '2', '3'],
            currentProgressStep: 3,
            timer: time,
            timerProgressBar: true,
            toast: true
        });
        if (swal.isConfirmed && otp_code.is_equal(swal.value)) res = true;
    }
    return res;
}