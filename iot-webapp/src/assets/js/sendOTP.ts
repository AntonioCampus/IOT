export default async function sendOTP(user_id: string, otp: number) {
    const message = `
    🕜 <b>OTP code</b>

    Your OTP code is:
    <code>${otp}</code>

    <b>Note</b>: it will expires in 3 minutes.
    `;
    const url = 'https://api.telegram.org/bot6710606204:AAF7zQglSskTxsq3ItcAdPZSZhNM2R260ys/sendMessage';
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'chat_id': user_id,
            'text': message,
            'parse_mode': 'HTML'
        })
    });
    if (response.ok) return otp;
    return null;
}