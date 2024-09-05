import IUser from "../IUser"

export default interface AuthResponse {
    error_code: number,
    error_message: string,
    data: {
        token: string,
    }
    profiling: string,
    timings: number
}