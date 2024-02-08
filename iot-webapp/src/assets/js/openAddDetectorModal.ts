import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import addDevice from '../api/addDevice';
import getZones from '../api/getZones';
import router from '@/router';
import config from '@/config';

// @ts-ignore
import i18n from '@/config/i18n'
const { t } = i18n.global

const detector_str = 'detector';

function getIdName(detector: { idname: string; passcode: string; zone: string }) {
    return Swal.fire({
        title: t('forms.new_detector'),
        text: t('forms.request_id'),
        input: 'text',
        showCancelButton: true,
        confirmButtonText: t('common.next_btn'),
        showLoaderOnConfirm: true,
        cancelButtonText: t('common.cancel'),
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value || value.match(/[\s\W]/)) return t('forms.invalid_id');
            else detector.idname = value;
        },
    })
}

function getPasscode(detector: { idname: string; passcode: string; zone: string }) {
    return Swal.fire({
        title: t('forms.new_detector'),
        text: t('forms.request_passcode'),
        input: 'text',
        showCancelButton: true,
        confirmButtonText: t('common.next_btn'),
        showLoaderOnConfirm: true,
        cancelButtonText: t('common.cancel'),
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 1,
        inputValidator: (value) => {
            if (!value || value.match(/[\s\W]/)) return t('forms.invalid_passcode');
            else detector.passcode = value;
        }
    })
}

async function getZone(detector: { idname: string; passcode: string; zone: string }) {
    const zones = await getZones();
    console.log(zones);
    return Swal.fire({
        title: t('forms.new_detector'),
        html: `
            <select id="swal-input1" class="swal2-input">
                ${zones.map((zone: any) => {
            return `<option value="${zone[0]}">${zone[1]}</option>`
        })}
            </select>
        `,
        showCancelButton: true,
        confirmButtonText: t('common.next_btn'),
        showLoaderOnConfirm: true,
        cancelButtonText: t('common.cancel'),
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 2,
        preConfirm: () => {
            detector.zone = (document.getElementById('swal-input1') as HTMLInputElement).value;
        }
    })
}

export default function openAddActuatorModal() {
    let new_detector = {
        idname: '',
        passcode: '',
        zone: ''
    };
    getIdName(new_detector).then((result) => {
        if (result.isConfirmed) getPasscode(new_detector).then((result) => {
            if (result.isConfirmed) getZone(new_detector).then(async (result) => {
                if (result.isConfirmed) {
                    const mfa = await sendOTP(config.TELEGRAM_ADMIN_CHAT_ID)
                    if (mfa) {
                        const result = await addDevice(new_detector.idname, new_detector.passcode, new_detector.zone, detector_str);
                        if (result) Swal.fire({
                            title: t('common.success'),
                            text: t('forms.detector_added'),
                            icon: 'success',
                            confirmButtonText: t('common.ok')
                        }).then(() => {
                            router.go(0);
                        });
                        else Swal.fire({
                            title: t('common.error'),
                            text: t('forms.detector_error'),
                            icon: 'error',
                            confirmButtonText: t('common.ok')
                        });
                    } else Swal.fire({
                        title: t('common.error'),
                        text: t('common.wrong_otp'),
                        icon: 'error',
                        confirmButtonText: t('common.ok')
                    });
                }
            });
        });
    });
}