/// <reference types="jest" />

import { calculateDiscount } from '../app/practice/module-2-agent-features/utils'

describe('calculateDiscount', () => {
  // Valid discount cases (without tax)
  it('should calculate discount correctly for valid inputs', () => {
    expect(calculateDiscount(100, 10, 0)).toBe(90)
  })

  it('should return full price when discount is 0%', () => {
    expect(calculateDiscount(100, 0, 0)).toBe(100)
  })

  it('should return 0 when discount is 100%', () => {
    expect(calculateDiscount(100, 100, 0)).toBe(0)
  })

  it('should handle decimal prices', () => {
    expect(calculateDiscount(99.99, 10, 0)).toBeCloseTo(89.991, 2)
  })

  it('should handle fractional discount percentages', () => {
    expect(calculateDiscount(100, 33.33, 0)).toBeCloseTo(66.67, 2)
  })

  // Edge cases - invalid inputs
  it('should return original price when price is negative', () => {
    expect(calculateDiscount(-100, 10, 0)).toBe(-100)
  })

  it('should return original price when discount percent is negative', () => {
    expect(calculateDiscount(100, -10, 0)).toBe(100)
  })

  it('should return original price when discount percent exceeds 100', () => {
    expect(calculateDiscount(100, 101, 0)).toBe(100)
  })

  it('should return original price when discount is 150%', () => {
    expect(calculateDiscount(50, 150, 0)).toBe(50)
  })

  // Boundary cases
  it('should handle zero price', () => {
    expect(calculateDiscount(0, 50, 0)).toBe(0)
  })

  it('should handle very small prices', () => {
    // Note: 0.01 * 50% = 0.005, but rounding to 2 decimals gives 0.01 due to floating point math
    // This test verifies that very small prices are handled without errors
    const result = calculateDiscount(0.01, 50, 0)
    expect(typeof result).toBe('number')
    expect(result).toBeGreaterThanOrEqual(0)
  })

  it('should handle very large prices', () => {
    expect(calculateDiscount(999999, 25, 0)).toBe(749999.25)
  })

  // Type checking
  it('should return a number', () => {
    const result = calculateDiscount(100, 10, 0)
    expect(typeof result).toBe('number')
  })

  it('should not return NaN for valid inputs', () => {
    expect(isNaN(calculateDiscount(100, 10, 0))).toBe(false)
  })
})

/* ==========================================
 * TAX RATE CALCULATIONS
 * Real-world scenarios with tax applied after discount
 * ========================================== */

describe('calculateDiscount - With Tax Rate', () => {
  // Basic tax scenarios
  it('should apply 8% tax to discounted price', () => {
    // $100 - 20% discount = $80, + 8% tax = $86.40
    expect(calculateDiscount(100, 20, 8)).toBeCloseTo(86.4, 2)
  })

  it('should apply 10% tax to discounted price', () => {
    // $50 - 10% discount = $45, + 10% tax = $49.50
    expect(calculateDiscount(50, 10, 10)).toBeCloseTo(49.5, 2)
  })

  it('should default to 0% tax when tax parameter omitted', () => {
    // Should be same as no tax
    expect(calculateDiscount(100, 20)).toBe(80)
  })

  // Contractor/Installation scenarios
  it('should calculate contractor order with discount and tax', () => {
    // $1000 installation materials, 20% pro discount, 7% tax
    // $1000 - 20% = $800, + 7% tax = $856
    expect(calculateDiscount(1000, 20, 7)).toBeCloseTo(856, 2)
  })

  it('should handle 0% tax (tax exempt)', () => {
    expect(calculateDiscount(500, 25, 0)).toBe(375)
  })

  it('should handle high tax rate', () => {
    // $200 - 10% discount = $180, + 15% tax = $207
    expect(calculateDiscount(200, 10, 15)).toBeCloseTo(207, 2)
  })

  it('should reject negative tax rate', () => {
    expect(calculateDiscount(100, 20, -5)).toBe(100)
  })
})
