import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import addDevice from '../api/addDevice';
import getZones from '../api/getZones';

const modal_title = 'Set a new actuator';
const actuator_str = 'actuator';

function getIdName(actuator: { idname: string; passcode: string; zone: string; otp: number; }) {
    return Swal.fire({
        title: modal_title,
        text: 'Please enter the id of the actuator',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value || value.match(/[\s\W]/)) return 'Invalid id, please check your input and try again.'
            else actuator.idname = value;
        },
    })
}

function getPasscode(actuator: { idname: string; passcode: string; zone: string; otp: number; }) {
    return Swal.fire({
        title: modal_title,
        text: 'Please enter the passcode of the actuator',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 1,
        inputValidator: (value) => {
            if (!value || value.match(/[\s\W]/)) return 'Invalid passcode, please check your input and try again.'
            else actuator.passcode = value;
        }
    })
}

async function getZone(actuator: { idname: string; passcode: string; zone: string; otp: number; }) {
    //const zones = await getZones();
    /* return Swal.fire({
        title: modal_title,
        html: `
<select id="swal-input1" class="swal2-input">
                ${zones.map((zone: any) => {
            return `<option value="${zone.id}">${zone.info}</option>`
        })}
            </select>
        `,
    }) */
    return Swal.fire({
        title: modal_title,
        text: 'Please select the zone of the actuator',
        input: 'select',
        inputOptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 2,
        inputValidator: (value) => {
            if (!value) return 'Invalid zone, please check your input and try again.'
            else actuator.zone = value;
        }
    })
}

export default function openAddActuatorModal() {
    let new_actuator = {
        idname: '',
        passcode: '',
        zone: '',
        otp: 0
    };
    getIdName(new_actuator).then((result) => {
        if (result.isConfirmed) getPasscode(new_actuator).then((result) => {
            if (result.isConfirmed) getZone(new_actuator).then(async (result) => {
                if (result.isConfirmed) {
                    const mfa = await sendOTP('134723339')
                    if (mfa) {
                        const result = await addDevice(new_actuator.idname, new_actuator.passcode, new_actuator.zone, actuator_str);
                        if (result) Swal.fire({
                            title: 'Success!',
                            text: 'The actuator has been added successfully!',
                            icon: 'success',
                            confirmButtonText: 'Cool!'
                        }).then(() => {
                            location.reload();
                        });
                        else Swal.fire({
                            title: 'Error!',
                            text: 'An error occured while adding the actuator, please try again later.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    } else Swal.fire({
                        title: 'Error!',
                        text: 'The OTP code is wrong, please try again later.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        });
    });
}