import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import addDevice from '../api/addDevice';
import getZones from '../api/getZones';

const modal_title = 'Set a new detector';
const detector_str = 'detector';

function getIdName(detector: { idname: string; passcode: string; zone: string; otp: number; }) {
    return Swal.fire({
        title: modal_title,
        text: 'Please enter the id of the detector',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value || value.match(/[\s\W]/)) return 'Invalid id, please check your input and try again.'
            else detector.idname = value;
        },
    })
}

function getPasscode(detector: { idname: string; passcode: string; zone: string; otp: number; }) {
    return Swal.fire({
        title: modal_title,
        text: 'Please enter the passcode of the detector',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 1,
        inputValidator: (value) => {
            if (!value || value.match(/[\s\W]/)) return 'Invalid passcode, please check your input and try again.'
            else detector.passcode = value;
        }
    })
}

async function getZone(detector: { idname: string; passcode: string; zone: string; otp: number; }) {
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
        text: 'Please select the zone of the detector',
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
            else detector.zone = value;
        }
    })
}

export default function openAddActuatorModal() {
    let new_detector = {
        idname: '',
        passcode: '',
        zone: '',
        otp: 0
    };
    getIdName(new_detector).then((result) => {
        if (result.isConfirmed) getPasscode(new_detector).then((result) => {
            if (result.isConfirmed) getZone(new_detector).then(async (result) => {
                if (result.isConfirmed) {
                    const mfa = await sendOTP('134723339')
                    if (mfa) {
                        const result = await addDevice(new_detector.idname, new_detector.passcode, new_detector.zone, detector_str);
                        if (result) Swal.fire({
                            title: 'Success!',
                            text: 'The detector has been added successfully!',
                            icon: 'success',
                            confirmButtonText: 'Cool!'
                        }).then(() => {
                            location.reload();
                        });
                        else Swal.fire({
                            title: 'Error!',
                            text: 'An error occured while adding the detector, please try again later.',
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