const BASE = `http://localhost:8000/api`

const ENDPOINTS = {
  QUESTIONS: () => `${BASE}/questions`,
  SURVEYS: () => `${BASE}/surveys`,
  GENERATE_PASSWORD: (data) =>
    `${BASE}/auth/participant/${data}/generatePassword`,
  LOGIN_OTP: () => `${BASE}/auth/participant/loginOTP`,
  LOGOUT: () => `${BASE}/auth/logout`,
}

export default ENDPOINTS
