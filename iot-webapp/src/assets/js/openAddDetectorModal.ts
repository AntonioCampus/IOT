import Swal from 'sweetalert2';

export default function openAddActuatorModal() {
    Swal.fire({
        title: 'Set a new detector',
        text: 'Please enter the name of the detector',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2', '3'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value || value.match(/[\s\W]/)) return 'Invalid name, please check your input and try again.'
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const actuatorName = result.value;
            Swal.fire({
                title: 'Set a new detector',
                text: 'Please enter the description of the detector',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Next &rarr;',
                showLoaderOnConfirm: true,
                cancelButtonText: 'Cancel',
                progressSteps: ['1', '2', '3'],
                currentProgressStep: 1,
                inputValidator: (value) => {
                    if (!value) return 'You need to write something!'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const actuatorDescription = result.value;
                    Swal.fire({
                        title: 'Set a new actuator',
                        text: 'Be ready to press the button on the detector to bind it to the webserver',
                        showLoaderOnConfirm: true,
                        showCancelButton: true,
                        confirmButtonText: 'Let\s do it!',
                        cancelButtonText: 'Cancel',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            ;
                        }
                    })
                }
            })
        }
    })
}