export default class OTP {
    private _otp: number | undefined;

    public generate() {
        this._otp = Math.floor(100000 + Math.random() * 900000);
    }

    public get(): number | undefined {
        return this._otp;
    }

    public is_equal(otp: string): boolean {
        return this._otp == Number(otp);
    }
}