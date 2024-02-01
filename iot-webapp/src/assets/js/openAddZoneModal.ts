import Swal from 'sweetalert2'
import addZone from '../api/addZone';

export default function openAddZoneModal() {
    let description: String;
    Swal.fire({
        title: 'Set a new zone',
        text: 'Please enter the description of the new zone',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'false'
        },
        showCancelButton: true,
        confirmButtonText: 'Next &rarr;',
        cancelButtonText: 'Cancel',
        progressSteps: ['1', '2'],
        currentProgressStep: 0,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            description = result.value
            Swal.fire({
                title: 'Set a new zone',
                html: `
                    Do you want to set the new zone with the following values?<br>
                    <pre>Description: <code>${description}</code></pre>
                `,
                showCancelButton: true,
                confirmButtonText: 'Add',
                cancelButtonText: 'Cancel',
                progressSteps: ['1', '2'],
                currentProgressStep: 1,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return addZone(description).then(response => {
                        if (!response) return Swal.showValidationMessage(`Error adding zone!`);
                    })
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Set a new zone',
                        text: 'The new zone has been set!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        progressSteps: ['1', '2'],
                        currentProgressStep: 2,
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
        }
    });
}