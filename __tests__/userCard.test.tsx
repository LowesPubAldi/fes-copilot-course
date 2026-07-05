/// <reference types="jest" />

import React from 'react'
import { render, screen } from '@testing-library/react'
import { type User } from '../app/practice/module-2-agent-features/utils'
import { UserCard } from '../app/practice/module-2-agent-features/components'

describe('UserCard Component', () => {
  const mockActiveUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2024-01-15',
  }

  const mockInactiveUser: User = {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2024-01-10',
  }

  /* ==========================================
   * Rendering Tests
   * ========================================== */
  describe('Rendering', () => {
    it('should render user card with name and email', () => {
      render(<UserCard user={mockActiveUser} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })

    it('should display last login date', () => {
      render(<UserCard user={mockActiveUser} />)
      expect(screen.getByText(/Last login: 2024-01-15/)).toBeInTheDocument()
    })

    it('should render with correct structure', () => {
      const { container } = render(<UserCard user={mockActiveUser} />)
      expect(container.querySelector('.p-4')).toBeInTheDocument()
      expect(container.querySelector('.border')).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Status Display Tests
   * ========================================== */
  describe('Status Display', () => {
    it('should display "active" status for active users', () => {
      render(<UserCard user={mockActiveUser} />)
      expect(screen.getByText('active')).toBeInTheDocument()
    })

    it('should display "inactive" status for inactive users', () => {
      render(<UserCard user={mockInactiveUser} />)
      expect(screen.getByText('inactive')).toBeInTheDocument()
    })

    it('should apply green styling for active status', () => {
      const { container } = render(<UserCard user={mockActiveUser} />)
      const statusSpan = container.querySelector('.text-green-800')
      expect(statusSpan).toBeInTheDocument()
    })

    it('should apply gray styling for inactive status', () => {
      const { container } = render(<UserCard user={mockInactiveUser} />)
      const statusSpan = container.querySelector('.text-gray-800')
      expect(statusSpan).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Data Handling Tests
   * ========================================== */
  describe('Data Handling', () => {
    it('should handle user with special characters in name', () => {
      const userWithSpecialChars: User = {
        ...mockActiveUser,
        name: "O'Brien-Smith",
      }
      render(<UserCard user={userWithSpecialChars} />)
      expect(screen.getByText("O'Brien-Smith")).toBeInTheDocument()
    })

    it('should handle long email addresses', () => {
      const userWithLongEmail: User = {
        ...mockActiveUser,
        email: 'very.long.email.address@subdomain.example.co.uk',
      }
      render(<UserCard user={userWithLongEmail} />)
      expect(
        screen.getByText('very.long.email.address@subdomain.example.co.uk')
      ).toBeInTheDocument()
    })

    it('should handle long names', () => {
      const userWithLongName: User = {
        ...mockActiveUser,
        name: 'Alexander Christopher Benjamin Wellington III',
      }
      render(<UserCard user={userWithLongName} />)
      expect(screen.getByText('Alexander Christopher Benjamin Wellington III')).toBeInTheDocument()
    })

    it('should display different last login dates', () => {
      const userWithDifferentDate: User = {
        ...mockActiveUser,
        lastLogin: '2024-12-25',
      }
      render(<UserCard user={userWithDifferentDate} />)
      expect(screen.getByText(/Last login: 2024-12-25/)).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Accessibility Tests
   * ========================================== */
  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(<UserCard user={mockActiveUser} />)
      const heading = container.querySelector('h3')
      expect(heading).toBeInTheDocument()
      expect(heading?.className).toContain('font-semibold')
    })

    it('should have readable color contrast for active status', () => {
      const { container } = render(<UserCard user={mockActiveUser} />)
      const statusSpan = container.querySelector('.bg-green-100')
      expect(statusSpan).toBeInTheDocument()
    })

    it('should have readable color contrast for inactive status', () => {
      const { container } = render(<UserCard user={mockInactiveUser} />)
      const statusSpan = container.querySelector('.bg-gray-100')
      expect(statusSpan).toBeInTheDocument()
    })

    it('should have proper typography hierarchy', () => {
      const { container } = render(<UserCard user={mockActiveUser} />)
      const name = container.querySelector('h3')
      const email = container.querySelector('.text-sm')
      const lastLogin = container.querySelector('.text-xs')
      expect(name).toBeInTheDocument()
      expect(email).toBeInTheDocument()
      expect(lastLogin).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Edge Cases
   * ========================================== */
  describe('Edge Cases', () => {
    it('should handle user with minimal data', () => {
      const minimalUser: User = {
        id: 1,
        name: 'A',
        email: 'a@b.c',
        status: 'active',
        lastLogin: '2024-01-01',
      }
      render(<UserCard user={minimalUser} />)
      expect(screen.getByText('A')).toBeInTheDocument()
      expect(screen.getByText('a@b.c')).toBeInTheDocument()
    })

    it('should render multiple cards independently', () => {
      const { rerender } = render(<UserCard user={mockActiveUser} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()

      rerender(<UserCard user={mockInactiveUser} />)
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })

    it('should handle empty strings gracefully', () => {
      const userWithEmpty: User = {
        id: 1,
        name: '',
        email: '',
        status: 'active',
        lastLogin: '',
      }
      // Should not throw an error
      render(<UserCard user={userWithEmpty} />)
    })
  })
})
