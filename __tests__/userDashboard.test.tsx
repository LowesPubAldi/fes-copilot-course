/// <reference types="jest" />

import {
  validateFilter,
  sanitizeSearchQuery,
  filterUsers,
  type User,
} from '../app/practice/module-2-agent-features/utils'

describe('User Dashboard Utilities', () => {
  /* ==========================================
   * validateFilter Tests
   * ========================================== */
  describe('validateFilter', () => {
    it('should accept "all" as valid filter', () => {
      expect(validateFilter('all')).toBe(true)
    })

    it('should accept "active" as valid filter', () => {
      expect(validateFilter('active')).toBe(true)
    })

    it('should accept "inactive" as valid filter', () => {
      expect(validateFilter('inactive')).toBe(true)
    })

    it('should reject invalid filter values', () => {
      expect(validateFilter('pending')).toBe(false)
    })

    it('should reject empty string as filter', () => {
      expect(validateFilter('')).toBe(false)
    })

    it('should reject uppercase filter values', () => {
      expect(validateFilter('ACTIVE')).toBe(false)
    })

    it('should reject filter with extra spaces', () => {
      expect(validateFilter('active ')).toBe(false)
    })

    it('should reject random strings', () => {
      expect(validateFilter('random')).toBe(false)
    })
  })

  /* ==========================================
   * sanitizeSearchQuery Tests
   * ========================================== */
  describe('sanitizeSearchQuery', () => {
    it('should trim whitespace from search query', () => {
      expect(sanitizeSearchQuery('  john  ')).toBe('john')
    })

    it('should limit search query to 100 characters by default', () => {
      const longQuery = 'a'.repeat(150)
      const result = sanitizeSearchQuery(longQuery)
      expect(result.length).toBe(100)
    })

    it('should respect custom max length parameter', () => {
      const query = 'a'.repeat(50)
      const result = sanitizeSearchQuery(query, 25)
      expect(result.length).toBe(25)
    })

    it('should handle empty string', () => {
      expect(sanitizeSearchQuery('')).toBe('')
    })

    it('should handle only whitespace', () => {
      expect(sanitizeSearchQuery('   ')).toBe('')
    })

    it('should preserve internal spaces', () => {
      expect(sanitizeSearchQuery('john doe')).toBe('john doe')
    })

    it('should handle special characters', () => {
      expect(sanitizeSearchQuery('john@example.com')).toBe('john@example.com')
    })

    it('should handle numbers', () => {
      expect(sanitizeSearchQuery('user123')).toBe('user123')
    })
  })

  /* ==========================================
   * filterUsers Tests
   * ========================================== */
  describe('filterUsers', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        status: 'active',
        lastLogin: '2024-01-15',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'inactive',
        lastLogin: '2024-01-10',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        status: 'active',
        lastLogin: '2024-01-16',
      },
    ]

    // Filter tests
    it('should return all users when filter is "all"', () => {
      const result = filterUsers(mockUsers, 'all', '')
      expect(result).toHaveLength(3)
    })

    it('should return only active users when filter is "active"', () => {
      const result = filterUsers(mockUsers, 'active', '')
      expect(result).toHaveLength(2)
      expect(result.every(user => user.status === 'active')).toBe(true)
    })

    it('should return only inactive users when filter is "inactive"', () => {
      const result = filterUsers(mockUsers, 'inactive', '')
      expect(result).toHaveLength(1)
      expect(result[0].status).toBe('inactive')
    })

    // Search tests
    it('should search by name (case insensitive)', () => {
      const result = filterUsers(mockUsers, 'all', 'john')
      expect(result).toHaveLength(2)
      expect(result.map(u => u.id).sort()).toEqual([1, 3])
    })

    it('should search by email (case insensitive)', () => {
      const result = filterUsers(mockUsers, 'all', 'jane@example.com')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(2)
    })

    it('should return empty array when no matches found', () => {
      const result = filterUsers(mockUsers, 'all', 'nonexistent')
      expect(result).toHaveLength(0)
    })

    // Combined filter + search tests
    it('should combine filter and search correctly', () => {
      const result = filterUsers(mockUsers, 'active', 'john')
      expect(result).toHaveLength(2)
      expect(result.every(user => user.status === 'active')).toBe(true)
      expect(result.every(user => user.name.toLowerCase().includes('john'))).toBe(true)
    })

    it('should return empty when search matches but filter does not', () => {
      const result = filterUsers(mockUsers, 'inactive', 'john')
      expect(result).toHaveLength(0)
    })

    it('should handle empty search query', () => {
      const result = filterUsers(mockUsers, 'active', '')
      expect(result).toHaveLength(2)
    })

    it('should be case insensitive for names', () => {
      const result1 = filterUsers(mockUsers, 'all', 'JOHN')
      const result2 = filterUsers(mockUsers, 'all', 'john')
      expect(result1).toEqual(result2)
    })

    it('should be case insensitive for emails', () => {
      const result1 = filterUsers(mockUsers, 'all', 'JANE@EXAMPLE.COM')
      const result2 = filterUsers(mockUsers, 'all', 'jane@example.com')
      expect(result1).toEqual(result2)
    })

    it('should handle empty user array', () => {
      const result = filterUsers([], 'active', 'john')
      expect(result).toHaveLength(0)
    })

    it('should search partial matches', () => {
      const result = filterUsers(mockUsers, 'all', 'Doe')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(1)
    })

    it('should search email partial matches', () => {
      const result = filterUsers(mockUsers, 'all', 'example.com')
      expect(result).toHaveLength(3)
    })
  })
})
