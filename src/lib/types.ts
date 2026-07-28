export type AuthUser = {
  id: string
  email: string
  fullName: string
  organisationId: string
}

export type Collector = {
  id: string
  name: string
  phone: string
  location?: string | null
  createdAt: string
}

export type Buyer = {
  id: string
  name: string
  phone: string
  email?: string | null
  createdAt: string
}

export type Batch = {
  id: string
  batchNumber: string
  status: 'INBOUND' | 'PROCESSED' | 'SOLD' | 'VERIFIED' | 'LOCKED_FOR_VERRA_AUDIT'
  createdAt: string
  latitude?: number | null
  longitude?: number | null
  digitalPassportId?: string | null
  immutableSettlementHash?: string | null
  inboundEvent?: {
    materialType?: string | null
    weight?: number | null
  } | null
  processingEvent?: {
    materialType?: string | null
    weight?: number | null
  } | null
}

export type AlertRecord = {
  id: string
  type: string
  severity: 'INFO' | 'WARNING' | 'CRITICAL'
  message: string
  impactNaira?: number | null
  batchId?: string | null
  createdAt: string
}

export type DashboardSummary = {
  stockOnHand: number
  todaysMargin: number
}

export type Organisation = {
  id: string
  name: string
  businessType: 'AGGREGATOR' | 'RECYCLER' | 'BOTH'
  rcNumber?: string | null
  location: string
  creditProgrammeData?: Record<string, unknown> | null
}

export type FacilityWallet = {
  id: string
  balance: number
  accountNumber?: string | null
  bankName?: string | null
  accountName?: string | null
  provisioningStatus: 'PENDING' | 'ACTIVE' | 'FAILED' | 'MOCK'
  provisioningError?: string | null
}

export type BusinessVerification = {
  success: boolean
  message: string
  companyName?: string | null
  registrationDate?: string | null
  status?: string
  address?: string | null
  demo?: boolean
  code?: string
}

export type Transaction = {
  id: string
  type: 'PURCHASE' | 'PROCESSING' | 'SALE' | 'DEPOSIT' | 'PAYOUT'
  weight: number
  price?: number | null
  materialType?: string | null
  batchId?: string | null
  counterpartyId?: string | null
  date: string
}

export type MaterialType = {
  id: string
  name: string
  category: string
  defaultPrice?: number | null
}
