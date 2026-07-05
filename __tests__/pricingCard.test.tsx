/// <reference types="jest" />

import React from 'react'
import { render, screen } from '@testing-library/react'
import { type PricingPlan } from '../app/practice/module-2-agent-features/utils'
import { PricingCard, PricingGrid } from '../app/practice/module-2-agent-features/components'

describe('PricingCard Component', () => {
  const mockBasicPlan: any = {
    id: 'basic',
    name: 'Basic',
    price: 29,
    description: 'Perfect for individuals',
    features: ['10 projects', '5 GB storage', 'Email support'],
    cta: 'Get Started',
  }

  const mockProPlan: any = {
    id: 'pro',
    name: 'Pro',
    price: 79,
    description: 'Great for teams',
    features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'],
    isPopular: true,
    cta: 'Start Free Trial',
  }

  const noop = () => {}

  /* ==========================================
   * Rendering Tests
   * ========================================== */
  describe('Rendering', () => {
    it('should render plan name', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('Basic')).toBeInTheDocument()
    })

    it('should render plan description', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('Perfect for individuals')).toBeInTheDocument()
    })

    it('should render price with dollar sign', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('$29')).toBeInTheDocument()
    })

    it('should render /month text', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('/month')).toBeInTheDocument()
    })

    it('should render CTA button', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('should render all features', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('10 projects')).toBeInTheDocument()
      expect(screen.getByText('5 GB storage')).toBeInTheDocument()
      expect(screen.getByText('Email support')).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Popular Plan Badge
   * ========================================== */
  describe('Popular Plan Badge', () => {
    it('should display "Most Popular" badge for unselected popular plans', () => {
      render(<PricingCard plan={mockProPlan} isSelected={false} isDimmed={false} onSelect={noop} />)
      expect(screen.getByText('Most Popular')).toBeInTheDocument()
    })

    it('should not display badge for non-popular plans', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.queryByText('Most Popular')).not.toBeInTheDocument()
    })

    it('should have blue styling when selected', () => {
      const { container } = render(
        <PricingCard plan={mockBasicPlan} isSelected={true} isDimmed={false} onSelect={noop} />
      )
      const card = container.querySelector('[data-testid="pricing-card-basic"]')
      expect(card?.className).toContain('border-blue-500')
    })

    it('should have gray styling when not selected', () => {
      const { container } = render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      const card = container.querySelector('[data-testid="pricing-card-basic"]')
      expect(card?.className).toContain('border-gray-200')
    })

    it('should apply opacity when dimmed', () => {
      const { container } = render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={true} onSelect={noop} />
      )
      const card = container.querySelector('[data-testid="pricing-card-basic"]')
      expect(card?.className).toContain('opacity-40')
    })
  })

  /* ==========================================
   * Button Tests
   * ========================================== */
  describe('CTA Button', () => {
    it('should render button with correct text', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('should display different CTA for different plans', () => {
      const { rerender } = render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('Get Started')).toBeInTheDocument()

      rerender(
        <PricingCard plan={mockProPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    })

    it('should have data-testid for button', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByTestId('pricing-cta-basic')).toBeInTheDocument()
    })

    it('should have blue button when selected', () => {
      const { container } = render(
        <PricingCard plan={mockProPlan} isSelected={true} isDimmed={false} onSelect={noop} />
      )
      const button = container.querySelector('[data-testid="pricing-cta-pro"]')
      expect(button?.className).toContain('bg-blue-500')
    })

    it('should have gray button when not selected', () => {
      const { container } = render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      const button = container.querySelector('[data-testid="pricing-cta-basic"]')
      expect(button?.className).toContain('bg-gray-200')
    })

    it('should call onSelect when clicked', () => {
      const mockSelect = jest.fn()
      render(
        <PricingCard
          plan={mockBasicPlan}
          isSelected={false}
          isDimmed={false}
          onSelect={mockSelect}
        />
      )
      screen.getByTestId('pricing-cta-basic').click()
      expect(mockSelect).toHaveBeenCalledWith('basic')
    })
  })

  /* ==========================================
   * Features List Tests
   * ========================================== */
  describe('Features List', () => {
    it('should render all features with checkmarks', () => {
      const { container } = render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      const checkmarks = container.querySelectorAll('.text-green-500')
      expect(checkmarks.length).toBe(3)
    })

    it('should handle different number of features', () => {
      const planWithManyFeatures = {
        ...mockBasicPlan,
        features: Array.from({ length: 10 }, (_, i) => `Feature ${i + 1}`),
      }
      const { container } = render(
        <PricingCard
          plan={planWithManyFeatures}
          isSelected={false}
          isDimmed={false}
          onSelect={noop}
        />
      )
      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBe(10)
    })

    it('should handle single feature', () => {
      const planWithOneFeature = {
        ...mockBasicPlan,
        features: ['Single Feature'],
      }
      const { container } = render(
        <PricingCard
          plan={planWithOneFeature}
          isSelected={false}
          isDimmed={false}
          onSelect={noop}
        />
      )
      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBe(1)
    })

    it('should handle empty features list', () => {
      const planWithNoFeatures = {
        ...mockBasicPlan,
        features: [],
      }
      render(
        <PricingCard
          plan={planWithNoFeatures}
          isSelected={false}
          isDimmed={false}
          onSelect={noop}
        />
      )
      expect(screen.getByText('Basic')).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Price Display Tests
   * ========================================== */
  describe('Price Display', () => {
    it('should display prices correctly', () => {
      const { rerender } = render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('$29')).toBeInTheDocument()

      rerender(
        <PricingCard plan={mockProPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('$79')).toBeInTheDocument()
    })

    it('should handle large prices', () => {
      const expensivePlan = { ...mockBasicPlan, price: 9999 }
      render(
        <PricingCard plan={expensivePlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText('$9999')).toBeInTheDocument()
    })

    it('should handle zero price', () => {
      const freePlan = { ...mockBasicPlan, price: 0 }
      render(<PricingCard plan={freePlan} isSelected={false} isDimmed={false} onSelect={noop} />)
      expect(screen.getByText('$0')).toBeInTheDocument()
    })
  })

  /* ==========================================
   * Accessibility Tests
   * ========================================== */
  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(container.querySelector('h3')).toBeInTheDocument()
      expect(container.querySelector('ul')).toBeInTheDocument()
      expect(container.querySelector('button')).toBeInTheDocument()
    })

    it('should have proper heading hierarchy', () => {
      const { container } = render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      const heading = container.querySelector('h3')
      expect(heading?.textContent).toContain('Basic')
    })

    it('should have descriptive button text', () => {
      render(
        <PricingCard plan={mockBasicPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      const button = screen.getByTestId('pricing-cta-basic')
      expect(button.textContent).toBe('Get Started')
    })

    it('should have aria-pressed attribute', () => {
      const { container } = render(
        <PricingCard plan={mockBasicPlan} isSelected={true} isDimmed={false} onSelect={noop} />
      )
      const card = container.querySelector('[data-testid="pricing-card-basic"]')
      expect(card?.getAttribute('aria-pressed')).toBe('true')
    })
  })

  /* ==========================================
   * Edge Cases
   * ========================================== */
  describe('Edge Cases', () => {
    it('should handle very long plan names', () => {
      const longNamePlan = {
        ...mockBasicPlan,
        name: 'This is an extremely long plan name that goes on and on and on',
      }
      render(
        <PricingCard plan={longNamePlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText(/This is an extremely long plan name/)).toBeInTheDocument()
    })

    it('should handle very long descriptions', () => {
      const longDescPlan = {
        ...mockBasicPlan,
        description: 'A'.repeat(200),
      }
      render(
        <PricingCard plan={longDescPlan} isSelected={false} isDimmed={false} onSelect={noop} />
      )
      expect(screen.getByText(/A{200}/)).toBeInTheDocument()
    })

    it('should handle special characters in feature names', () => {
      const specialPlan = {
        ...mockBasicPlan,
        features: ['Feature @ 50% off', '$100 credit', 'API & Webhooks'],
      }
      render(<PricingCard plan={specialPlan} isSelected={false} isDimmed={false} onSelect={noop} />)
      expect(screen.getByText('Feature @ 50% off')).toBeInTheDocument()
    })
  })
})

describe('PricingGrid Component', () => {
  const mockPlans: any[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      description: 'For individuals',
      features: ['10 projects', '5 GB storage'],
      cta: 'Get Started',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 79,
      description: 'For teams',
      features: ['Unlimited projects', '100 GB storage'],
      isPopular: true,
      cta: 'Start Free Trial',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      description: 'For large orgs',
      features: ['Custom everything'],
      cta: 'Contact Sales',
    },
  ]

  /* ==========================================
   * Grid Rendering Tests
   * ========================================== */
  describe('Rendering', () => {
    it('should render all pricing cards', () => {
      render(<PricingGrid plans={mockPlans} />)
      expect(screen.getByText('Starter')).toBeInTheDocument()
      expect(screen.getByText('Pro')).toBeInTheDocument()
      expect(screen.getByText('Enterprise')).toBeInTheDocument()
    })

    it('should render empty grid with no plans', () => {
      const { container } = render(<PricingGrid plans={[]} />)
      const grid = container.querySelector('.grid')
      expect(grid?.children.length).toBe(0)
    })

    it('should have responsive grid layout', () => {
      const { container } = render(<PricingGrid plans={mockPlans} />)
      const grid = container.querySelector('.grid')
      expect(grid?.className).toContain('grid-cols-1')
      expect(grid?.className).toContain('md:grid-cols-3')
    })

    it('should render single plan', () => {
      const singlePlan = [mockPlans[0]]
      render(<PricingGrid plans={singlePlan} />)
      expect(screen.getByText('Starter')).toBeInTheDocument()
    })

    it('should render many plans', () => {
      const manyPlans = Array.from({ length: 10 }, (_, i) => ({
        ...mockPlans[0],
        id: `plan-${i}`,
        name: `Plan ${i + 1}`,
      }))
      const { container } = render(<PricingGrid plans={manyPlans} />)
      const cards = container.querySelectorAll('[data-testid^="pricing-card-"]')
      expect(cards.length).toBe(10)
    })
  })

  /* ==========================================
   * Spacing and Layout Tests
   * ========================================== */
  describe('Layout', () => {
    it('should have gap between cards', () => {
      const { container } = render(<PricingGrid plans={mockPlans} />)
      const grid = container.querySelector('.gap-6')
      expect(grid).toBeInTheDocument()
    })

    it('should have proper column distribution', () => {
      const { container } = render(<PricingGrid plans={mockPlans} />)
      const grid = container.querySelector('.grid')
      expect(grid?.className).toContain('lg:grid-cols-3')
    })
  })
})
