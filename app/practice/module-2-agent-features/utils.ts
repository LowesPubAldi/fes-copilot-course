/* ==========================================
 * UTILITY FUNCTIONS & TYPES
 * Extracted for testability and reusability
 * ========================================== */

export interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
  lastLogin: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  isPopular?: boolean
  cta: string
}

// Discount calculation with optional tax rate
export const calculateDiscount = (
  price: number,
  discountPercent: number,
  taxRate: number = 0
): number => {
  // Validation: return original price for invalid inputs
  if (price < 0 || discountPercent < 0 || discountPercent > 100 || taxRate < 0) {
    return price
  }
  const discounted = price * (1 - discountPercent / 100)
  const withTax = discounted * (1 + taxRate / 100)
  // Round to 2 decimal places for currency, but avoid precision issues
  return Math.round(withTax * 100) / 100
}

// Validation function for filter values
export const validateFilter = (value: string): value is 'all' | 'active' | 'inactive' => {
  return ['all', 'active', 'inactive'].includes(value)
}

// Sanitization function for search queries
export const sanitizeSearchQuery = (query: string, maxLength: number = 100): string => {
  return query.slice(0, maxLength).trim()
}

// User filtering logic - can be tested independently
export const filterUsers = (users: User[], filterValue: string, searchQuery: string): User[] => {
  return users.filter(user => {
    const matchesFilter = filterValue === 'all' || user.status === filterValue
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })
}
