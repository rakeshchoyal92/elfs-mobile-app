import Constants from 'expo-constants'

const BASE = Constants.manifest.extra.API_HOST || `http://localhost:8000/api`

console.log({ BASE })

const ENDPOINTS = {
  QUESTIONS: () => `${BASE}/questions`,
  SURVEYS: () => `${BASE}/surveys`,
  GENERATE_PASSWORD: (data) =>
    `${BASE}/auth/participant/${data}/generatePassword`,
  LOGIN_OTP: () => `${BASE}/auth/participant/loginOTP`,
  LOGOUT: () => `${BASE}/auth/logout`,
}

export default ENDPOINTS
