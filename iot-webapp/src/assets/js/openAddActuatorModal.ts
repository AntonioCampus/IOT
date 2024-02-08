import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import addDevice from '../api/addDevice';
import getZones from '../api/getZones';
import router from '@/router';
import config from '@/config';

// @ts-ignore
import i18n from '@/config/i18n'
const { t } = i18n.global

const actuator_str = 'actuator';

function getIdName(actuator: { idname: string; passcode: string; zone: string }) {
    return Swal.fire({
        title: t('forms.new_actuator'),
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
            else actuator.idname = value;
        },
    })
}

function getPasscode(actuator: { idname: string; passcode: string; zone: string }) {
    return Swal.fire({
        title: t('forms.new_actuator'),
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
            else actuator.passcode = value;
        }
    })
}

async function getZone(actuator: { idname: string; passcode: string; zone: string }) {
    const zones = await getZones();
    console.log(zones);
    return Swal.fire({
        title: t('forms.new_actuator'),
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
            actuator.zone = (document.getElementById('swal-input1') as HTMLInputElement).value;
        }
    })
}

export default function openAddActuatorModal() {
    let new_actuator = {
        idname: '',
        passcode: '',
        zone: ''
    };
    getIdName(new_actuator).then((result) => {
        if (result.isConfirmed) getPasscode(new_actuator).then((result) => {
            if (result.isConfirmed) getZone(new_actuator).then(async (result) => {
                if (result.isConfirmed) {
                    const mfa = await sendOTP(config.TELEGRAM_ADMIN_CHAT_ID)
                    if (mfa) {
                        const result = await addDevice(new_actuator.idname, new_actuator.passcode, new_actuator.zone, actuator_str);
                        if (result) Swal.fire({
                            title: t('common.success'),
                            text: t('forms.actuator_added'),
                            icon: 'success',
                            confirmButtonText: t('common.ok')
                        }).then(() => {
                            router.go(0);
                        });
                        else Swal.fire({
                            title: t('common.error'),
                            text: t('forms.actuator_error'),
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