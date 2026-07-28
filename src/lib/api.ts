import { authSession } from './authSession'
import type {
  AlertRecord,
  AuthUser,
  Batch,
  BusinessVerification,
  Buyer,
  Collector,
  DashboardSummary,
  FacilityWallet,
  MaterialType,
  Organisation,
  Transaction,
} from './types'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

type ApiResponse<T> = {
  status: 'success' | 'error'
  data?: T
  message?: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type RequestOptions = RequestInit & {
  auth?: boolean
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth = false, headers, ...rest } = options
  const token = authSession.getToken()

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  let body: ApiResponse<T>
  try {
    body = (await response.json()) as ApiResponse<T>
  } catch {
    throw new ApiError('Unexpected server response', response.status)
  }

  if (response.status === 401 && auth) {
    authSession.clearSession()
    window.location.href = '/login'
    throw new ApiError('Session expired. Please sign in again.', 401)
  }

  if (!response.ok || body.status === 'error') {
    throw new ApiError(body.message || 'Request failed', response.status)
  }

  return body.data as T
}

export const authApi = {
  register(payload: {
    fullName: string
    email: string
    phone?: string
    password: string
  }) {
    return request<{ message: string; userId: string; email: string }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify(payload) }
    )
  },

  verifyOtp(payload: { email: string; otpCode: string }) {
    return request<{
      message: string
      token: string
      user: AuthUser
    }>('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  resendOtp(payload: { email: string }) {
    return request<{ message: string }>('/api/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  forgotPassword(payload: { email: string }) {
    return request<{ message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  resetPassword(payload: {
    email: string
    otpCode: string
    newPassword: string
  }) {
    return request<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  login(payload: { email: string; password: string }) {
    return request<{
      message: string
      token: string
      user: AuthUser
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}

export const entitiesApi = {
  getCollectors() {
    return request<{ collectors: Collector[] }>('/api/entities/collectors', { auth: true })
  },

  createCollector(payload: { name: string; phone: string; location?: string }) {
    return request<{ collector: Collector }>('/api/entities/collectors', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    })
  },

  getBuyers() {
    return request<{ buyers: Buyer[] }>('/api/entities/buyers', { auth: true })
  },

  createBuyer(payload: { name: string; phone: string; email?: string }) {
    return request<{ buyer: Buyer }>('/api/entities/buyers', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    })
  },

  getMaterials() {
    return request<{ materials: MaterialType[] }>('/api/entities/materials', { auth: true })
  },

  verifyBusiness(rcNumber: string) {
    const encoded = encodeURIComponent(rcNumber)
    return request<BusinessVerification>(`/api/entities/verify-business/${encoded}`, {
      auth: true,
    })
  },
}

export const organisationsApi = {
  getCurrent() {
    return request<{ organisation: Organisation; wallet: FacilityWallet | null }>(
      '/api/organisations/me',
      { auth: true }
    )
  },

  setupCompany(payload: {
    name: string
    rcNumber: string
    location: string
    businessType: string
    creditProgrammeData?: Record<string, unknown>
  }) {
    return request<{
      message: string
      organisation: Organisation
      wallet: FacilityWallet | null
    }>('/api/organisations/me', {
      method: 'PATCH',
      auth: true,
      body: JSON.stringify(payload),
    })
  },
}

export const operationsApi = {
  getBatches() {
    return request<{ batches: Batch[] }>('/api/operations/batches', { auth: true })
  },

  createBatch() {
    return request<{ batch: Batch }>('/api/operations/batches', {
      method: 'POST',
      auth: true,
    })
  },

  getBatch(batchId: string) {
    return request<{ batch: Batch }>(`/api/operations/batches/${batchId}`, { auth: true })
  },

  logPurchase(payload: {
    collectorId: string
    materialType: string
    weight: number
    price: number
    grossWeight?: number
    wasteWeight?: number
    costPerKg?: number
    date?: string
  }) {
    return request<{ batch: Batch; transaction: Transaction }>(
      '/api/operations/purchase',
      {
        method: 'POST',
        auth: true,
        body: JSON.stringify(payload),
      }
    )
  },

  logProcessing(payload: {
    batches: { batchId: string; weight: number }[]
    outputs: { materialType: string; weight: number }[]
    machine?: string
    startTime?: string
    endTime?: string
    date?: string
  }) {
    return request<{ batches: Batch[]; transactions: Transaction[] }>(
      '/api/operations/processing',
      {
        method: 'POST',
        auth: true,
        body: JSON.stringify(payload),
      }
    )
  },

  logSale(payload: {
    buyerId: string
    lines: { batchId: string; materialType: string; weight: number; unitPrice: number }[]
    date?: string
    approvePassport?: boolean
  }) {
    return request<{
      buyer: Buyer
      batches: Batch[]
      transactions: Transaction[]
      totalAmount: number
      totalWeight: number
    }>('/api/operations/sale', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    })
  },

  checkout(payload: {
    batchId: string
    amount: number
    pin: string
    reference?: string
  }) {
    return request<{
      wallet: {
        balance: number
        accountName: string
        accountNumber: string
        bankName: string
      }
      transaction: Transaction
      batch: Batch
    }>('/api/operations/checkout', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    })
  },
}

export const analyticsApi = {
  getDashboard() {
    return request<{ dashboard: DashboardSummary }>('/api/analytics/dashboard', {
      auth: true,
    })
  },

  getAlerts() {
    return request<{ alerts: AlertRecord[] }>('/api/analytics/alerts', { auth: true })
  },
}
