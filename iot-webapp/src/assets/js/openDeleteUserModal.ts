import Swal from 'sweetalert2'
import deleteUser from '@/assets/api/deleteUser';
import sendOTP from '@/assets/js/sendOTP';
import config from '@/config';

// @ts-ignore
import i18n from '@/config/i18n'
const { t } = i18n.global

export default function openDeleteUserModal(id: string) {
    Swal.fire({
        title: t('users.remove_user'),
        icon: 'info',
        text: t('users.remove_txt'),
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        showCancelButton: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            const mfa = await sendOTP(config.TELEGRAM_ADMIN_CHAT_ID);
            if (mfa) {
                const response = await deleteUser(id);
                if (response) {
                    Swal.fire(t('users.user_removed_title'), t('users.user_removed'), 'success');
                    location.reload();
                } else {
                    Swal.fire(t('users.user_error_title'), t('users.user_error'), 'error');
                }
            } else {
                Swal.fire(t('common.error'), t('common.wrong_otp'), 'error');
            }
        }
    });
}