import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import addDetector from '../api/addDetector';
import getZones from '../api/getZones';

export default function openAddActuatorModal() {
    let idname: String;
    let passcode: String;
    let zones: [];
    let zone: String;
    let otp: Number;
    Swal.fire({
        title: 'Set a new detector',
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
        },
    }).then((result) => {
        if (result.isConfirmed) {
            idname = result.value;
            Swal.fire({
                title: 'Set a new detector',
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
                    else passcode = value;
                },
                preConfirm: async () => {
                    zones = await getZones();
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Set a new detector',
                        html: `
                        <select id="swal-input1" class="swal2-input">
                            ${zones.map((zone: any) => {
                            return `<option value="${zone.id}">${zone.info}</option>`
                        })}
                        </select>
                        `,
                        preConfirm: () => {
                            zone = (<HTMLInputElement>document.getElementById('swal-input1')).value;
                            otp = Math.floor(100000 + Math.random() * 900000);
                            sendOTP('134723339', otp as number);
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: 'Set a new detector',
                                text: 'Please enter the OTP sent to your phone',
                                input: 'text',
                                showCancelButton: true,
                                confirmButtonText: 'Next &rarr;',
                                showLoaderOnConfirm: true,
                                cancelButtonText: 'Cancel',
                                progressSteps: ['1', '2', '3'],
                                currentProgressStep: 3,
                                timer: 1000 * 60 * 3,
                                timerProgressBar: true,
                                toast: true
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    if (result.value == otp) {
                                        const status = await addDetector(idname as String, passcode as String, zone as String);
                                        if (status) {
                                            Swal.fire({
                                                title: 'Success!',
                                                text: 'The detector has been added successfully!',
                                                icon: 'success',
                                                confirmButtonText: 'Cool!'
                                            }).then(() => {
                                                location.reload();
                                            });
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'An error occured while adding the detector, please try again later.',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            });
                                        }
                                    } else {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: 'The OTP you entered is incorrect, please try again.',
                                            icon: 'error',
                                            confirmButtonText: 'Ok'
                                        });
                                    }
                                } else {
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'You did not enter the OTP in time, please try again.',
                                        icon: 'error',
                                        confirmButtonText: 'Ok'
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}