import Swal from 'sweetalert2';

export default function openAddUserModal() {
    Swal.fire({
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
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const username = result.value;
            Swal.fire({
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
                    if (!value || value.match(/[\s\W]/)) return 'Invalid password, please check your input and try again.'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const password = result.value;
                    Swal.fire({
                        icon: 'info',
                        title: 'Set a new user',
                        text: 'Please, enter the OTP to complete the procedure.',
                        input: 'text',
                        showCancelButton: true,
                        confirmButtonText: 'Next &rarr;',
                        showLoaderOnConfirm: true,
                        cancelButtonText: 'Cancel',
                        progressSteps: ['1', '2', '3'],
                        currentProgressStep: 2,
                        inputValidator: (value) => {
                            if (!value || value.match(/[\s\W]/)) return 'Invalid OTP, please check your input and try again.'
                        },
                    })
                }
            });
        }
    })
}