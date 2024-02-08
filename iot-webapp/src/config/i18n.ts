import { createI18n } from 'vue-i18n'
import messages from '@/config/strings';
import config from '@/config';

export default createI18n({
    locale: config.APP_DEFAULT_LANGUAGE,
    messages,
    legacy: false,
});