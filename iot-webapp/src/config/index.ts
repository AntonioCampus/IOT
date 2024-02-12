export default {
    /**
     * GENERAL SETTINGS
     */
    APP_NAME: 'BirdBuster',
    APP_VERSION: '1.0.0',
    APP_DEFAULT_LANGUAGE: 'en',

    /**
     * API SETTINGS
     */
    API_URL: 'https://7e29-78-209-219-248.ngrok-free.app' + '/api',
    //API_URL: 'http://localhost:5000/api',

    /**
     * TELEGRAM SETTINGS
     */
    TELEGRAM_BOT_TOKEN: '6710606204:AAF7zQglSskTxsq3ItcAdPZSZhNM2R260ys',
    TELEGRAM_BOT_CHAT_ID: '6710606204',
    TELEGRAM_ADMIN_CHAT_ID: '134723339',

    /**
     * APPLICATION SETTINGS
     */
    MAX_TIME_BEFORE_FAULT: 1000 * 60 * 60, // 1 hour
    MAX_TIME_OTP: 1000 * 60 * 3, // 3 minutes
}