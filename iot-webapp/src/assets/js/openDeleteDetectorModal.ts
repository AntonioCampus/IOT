import Swal from 'sweetalert2';
import sendOTP from './sendOTP';

export default function openDeleteDetectorModal() {
    Swal.fire({
        title: "Are you sure?",
        text: "The detector will be deleted forever (of course many birds will be happy)!!",
        imageUrl: "../../src/assets/images/delete_detector.jpeg",
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "delete_detector",
        confirmButtonText: "Yes, I know what I'm doing!",
        confirmButtonColor: "#f27474",
        showCancelButton: true,
        cancelButtonText: "Keep it!",
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            const otp = Math.floor(Math.random() * 1000000);
            sendOTP('134723339', otp);
            Swal.fire({
                title: "Just a moment...",
                text: "It is better to be sure you are not a bird... please, enter the OTP code you received in app.",
                icon: "info",
                input: "text",
                confirmButtonText: "Confirm my identity",
                confirmButtonColor: "#f27474",
                timer: 1000 * 60 * 3, // 3 minutes
                showCancelButton: true,
                cancelButtonText: "Cancel",
                allowOutsideClick: false,
                timerProgressBar: true,
                toast: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "At least you have to write something...";
                    }
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    if (result.value == otp) {
                        Swal.fire({
                            title: "Detector deleted!",
                            text: "The detector is now deleted (and many birds are happy).",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Wrong OTP!",
                            text: "The detector is safe (fortunatelly).",
                            icon: "error"
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: "Operation cancelled!",
                        text: "The detector is safe (fortunatelly).",
                        icon: "info"
                    });
                } else if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        title: "Time expired!",
                        text: "The detector is safe (fortunatelly).",
                        icon: "info"
                    });
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Operation cancelled!",
                text: "The detector is safe (fortunatelly).",
                icon: "info"
            });
        }
    });

}