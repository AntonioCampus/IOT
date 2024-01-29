import Swal from 'sweetalert2';

export default function openAddActuatorModal() {
    Swal.fire({
        title: 'Set a new actuator',
        text: 'Please enter the name of the actuator',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const actuatorName = result.value;
            Swal.fire({
                title: 'Set a new actuator',
                text: 'Please enter the description of the actuator',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Next &rarr;',
                showLoaderOnConfirm: true,
                cancelButtonText: 'Cancel',
                progressSteps: ['1', '2'],
                currentProgressStep: 1,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const actuatorDescription = result.value;
                    Swal.fire({
                        title: 'Set a new actuator',
                        text: 'Please enter the type of the actuator',
                        input: 'text',
                        showCancelButton: true,
                        confirmButtonText: 'Add actuator',
                        showLoaderOnConfirm: true,
                        cancelButtonText: 'Cancel',
                        progressSteps: ['1', '2', '3'],
                        currentProgressStep: 2,
                        inputValidator: (value) => {
                            if (!value) {
                                return 'You need to write something!'
                            }
                        },
                    })
                }
            })
        }
    })
}