const BASE = `http://localhost:8000/api`

const ENDPOINTS = {
  QUESTIONS: () => `${BASE}/questions`,
  SURVEYS: () => `${BASE}/surveys`,
}

export default ENDPOINTS
