import Swal from 'sweetalert2';
import sendOTP from './sendOTP';
import addUser from '../api/addUser';

function getUsername(new_user: { username: string; password: string; privileged: string; }) {
    return Swal.fire({
        icon: 'info',
        title: 'Set a new user',
        text: 'Please enter the username of the user. It will be used for login.',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value || !value.match(/[a-zA-A0-9]/)) return 'Invalid username, please check your input and try again.'
            else new_user.username = value;
        },
    })
}

function getPassword(new_user: { username: string; password: string; privileged: string; }) {
    return Swal.fire({
        icon: 'info',
        title: 'Set a new user',
        text: 'Please enter the password of the user. It will be used for login.',
        input: 'password',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 1,
        inputValidator: (value) => {
            if (!value || !value.match(/[\s\W]/)) return 'Invalid password, please check your input and try again.'
            else new_user.password = value;
        },
    })
}

function setPrivileged(new_user: { username: string; password: string; privileged: string; }) {
    return Swal.fire({
        icon: 'info',
        title: 'Set a new user',
        text: 'Do you want to give this user admin privileges?',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 2,
        input: 'checkbox',
        inputPlaceholder: 'Yes, give this user admin privileges',
        inputValidator: (value) => {
            new_user.privileged = value;
        },
    })
}

export default function openAddUserModal() {
    let new_user = {
        username: '',
        password: '',
        privileged: '',
    }
    getUsername(new_user).then((result) => {
        if (result.isConfirmed) {
            getPassword(new_user).then((result) => {
                if (result.isConfirmed) {
                    setPrivileged(new_user).then(async (result) => {
                        if (result.isConfirmed) {
                            const mfa = await sendOTP('134723339');
                            if (mfa) {
                                const res = await addUser(new_user.username, new_user.password, Boolean(new_user.privileged));
                                if (res) Swal.fire({
                                    icon: 'success',
                                    title: 'User added',
                                    text: 'The user has been added successfully.',
                                });
                                else Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'An error occurred while adding the user. Please try again later.',
                                });
                            } else Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'An error occurred while sending the OTP. Please try again later.',
                            })
                        }
                    });
                }
            });
        }
    })
}