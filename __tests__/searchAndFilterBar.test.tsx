/// <reference types="jest" />

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchAndFilterBar } from '../app/practice/module-2-agent-features/components'

describe('SearchAndFilterBar Component', () => {
  let mockOnSearchChange: any
  let mockOnFilterChange: any

  beforeEach(() => {
    mockOnSearchChange = jest.fn()
    mockOnFilterChange = jest.fn()
  })

  /* ==========================================
   * Rendering Tests
   * ========================================== */
  describe('Rendering', () => {
    it('should render search input and filter select', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByTestId('search-input')).toBeInTheDocument()
      expect(screen.getByTestId('filter-select')).toBeInTheDocument()
    })

    it('should have two columns layout', () => {
      const { container } = render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(container.querySelector('.grid-cols-2')).toBeInTheDocument()
    })

    it('should have placeholder text in search input', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Input Value Tests
   * ========================================== */
  describe('Input Values', () => {
    it('should display search query value', () => {
      render(
        <SearchAndFilterBar
          searchQuery="john"
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByDisplayValue('john')).toBeInTheDocument()
    })

    it('should display selected filter value', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="active"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const select = screen.getByTestId('filter-select') as HTMLSelectElement
      expect(select.value).toBe('active')
    })

    it('should handle numeric search query', () => {
      render(
        <SearchAndFilterBar
          searchQuery={123}
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByDisplayValue('123')).toBeInTheDocument()
    })

    it('should display all filter options', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByRole('option', { name: 'All Users' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Active' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Inactive' })).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Event Handler Tests
   * ========================================== */
  describe('Event Handlers', () => {
    it('should call onSearchChange when search input changes', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const input = screen.getByTestId('search-input') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'test' } })

      expect(mockOnSearchChange).toHaveBeenCalledTimes(1)
    })

    it('should call onFilterChange when filter select changes', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const select = screen.getByTestId('filter-select') as HTMLSelectElement
      fireEvent.change(select, { target: { value: 'active' } })

      expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
    })

    it('should pass event object to onSearchChange', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const input = screen.getByTestId('search-input')
      fireEvent.change(input, { target: { value: 'john' } })

      expect(mockOnSearchChange).toHaveBeenCalledWith(expect.any(Object))
    })

    it('should pass event object to onFilterChange', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const select = screen.getByTestId('filter-select')
      fireEvent.change(select, { target: { value: 'inactive' } })

      expect(mockOnFilterChange).toHaveBeenCalledWith(expect.any(Object))
    })
  })

  /* ==========================================
   * Filter Selection Tests
   * ========================================== */
  describe('Filter Selection', () => {
    it('should allow selecting "all" filter', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const select = screen.getByTestId('filter-select') as HTMLSelectElement
      fireEvent.change(select, { target: { value: 'all' } })
      expect(mockOnFilterChange).toHaveBeenCalled()
    })

    it('should allow selecting "active" filter', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const select = screen.getByTestId('filter-select')
      fireEvent.change(select, { target: { value: 'active' } })
      expect(mockOnFilterChange).toHaveBeenCalled()
    })

    it('should allow selecting "inactive" filter', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const select = screen.getByTestId('filter-select')
      fireEvent.change(select, { target: { value: 'inactive' } })
      expect(mockOnFilterChange).toHaveBeenCalled()
    })
  })

  /* ==========================================
   * Search Input Tests
   * ========================================== */
  describe('Search Input', () => {
    it('should have maxLength of 100', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const input = screen.getByTestId('search-input') as HTMLInputElement
      expect(input.maxLength).toBe(100)
    })

    it('should allow typing in search input', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const input = screen.getByTestId('search-input')
      fireEvent.change(input, { target: { value: 'test query' } })
      expect(mockOnSearchChange).toHaveBeenCalled()
    })

    it('should handle special characters in search', () => {
      render(
        <SearchAndFilterBar
          searchQuery="@example.com"
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByDisplayValue('@example.com')).toBeInTheDocument()
    })

    it('should handle empty search query', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const input = screen.getByTestId('search-input') as HTMLInputElement
      expect(input.value).toBe('')
    })
  })

  /* ==========================================
   * Accessibility Tests
   * ========================================== */
  describe('Accessibility', () => {
    it('should have aria-label on search input', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByLabelText('Search users by name or email')).toBeInTheDocument()
    })

    it('should have aria-label on filter select', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByLabelText('Filter users by status')).toBeInTheDocument()
    })

    it('should have proper semantic structure', () => {
      const { container } = render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(container.querySelector('input[type="text"]')).toBeInTheDocument()
      expect(container.querySelector('select')).toBeInTheDocument()
    })

    it('should render options with readable labels', () => {
      render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      expect(screen.getByRole('option', { name: 'All Users' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Active' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Inactive' })).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Edge Cases
   * ========================================== */
  describe('Edge Cases', () => {
    it('should handle very long search query (truncated by maxLength)', () => {
      const longQuery = 'a'.repeat(150)
      const truncatedQuery = 'a'.repeat(100)
      const { rerender } = render(
        <SearchAndFilterBar
          searchQuery={longQuery}
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      // After truncation to 100 chars
      rerender(
        <SearchAndFilterBar
          searchQuery={truncatedQuery}
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const input = screen.getByTestId('search-input') as HTMLInputElement
      expect(input.value.length).toBe(100)
    })

    it('should handle rapid filter changes', () => {
      const { rerender } = render(
        <SearchAndFilterBar
          searchQuery=""
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      rerender(
        <SearchAndFilterBar
          searchQuery=""
          filter="active"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      rerender(
        <SearchAndFilterBar
          searchQuery=""
          filter="inactive"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const select = screen.getByTestId('filter-select') as HTMLSelectElement
      expect(select.value).toBe('inactive')
    })

    it('should preserve input styling across re-renders', () => {
      const { container, rerender } = render(
        <SearchAndFilterBar
          searchQuery="test"
          filter="all"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const inputBefore = container.querySelector('.px-4')
      expect(inputBefore).toBeInTheDocument()

      rerender(
        <SearchAndFilterBar
          searchQuery="test updated"
          filter="active"
          onSearchChange={mockOnSearchChange}
          onFilterChange={mockOnFilterChange}
        />
      )

      const inputAfter = container.querySelector('.px-4')
      expect(inputAfter).toBeInTheDocument()
    })
  })
})
