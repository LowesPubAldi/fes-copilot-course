'use client'

import React from 'react'
import { type User, type PricingPlan } from './utils'

/* ==========================================
 * USER CARD COMPONENT
 * Extracted for reusability and testing
 * ========================================== */
export const UserCard = ({ user }: { user: User }) => {
  const statusColor =
    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <span className={`px-2 py-1 rounded text-sm ${statusColor}`}>{user.status}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Last login: {user.lastLogin}</p>
    </div>
  )
}

/* ==========================================
 * SEARCH AND FILTER BAR COMPONENT
 * Extracted for reusability and testing
 * ========================================== */
export const SearchAndFilterBar = ({
  searchQuery,
  filter,
  onSearchChange,
  onFilterChange,
}: {
  searchQuery: string | number
  filter: 'all' | 'active' | 'inactive'
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={onSearchChange}
        maxLength={100}
        className="px-4 py-2 border rounded"
        aria-label="Search users by name or email"
        data-testid="search-input"
      />
      <select
        aria-label="Filter users by status"
        value={filter}
        onChange={onFilterChange}
        className="px-4 py-2 border rounded"
        data-testid="filter-select"
      >
        <option value="all">All Users</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  )
}

/* ==========================================
 * PRICING CARD COMPONENT
 * ========================================== */
export const PricingCard = ({
  plan,
  isSelected,
  isDimmed,
  onSelect,
}: {
  plan: PricingPlan
  isSelected: boolean
  isDimmed: boolean
  onSelect: (id: string) => void
}) => {
  return (
    <div
      onClick={() => onSelect(plan.id)}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(plan.id)}
      className={`rounded-lg border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300 shadow-lg'
          : 'border-gray-200 bg-white'
      } ${isDimmed ? 'opacity-40 scale-95' : 'opacity-100'}`}
      data-testid={`pricing-card-${plan.id}`}
    >
      {/* Selected Badge */}
      {isSelected && (
        <div className="mb-4 inline-block bg-blue-500 px-3 py-1 text-xs font-semibold text-white rounded-full">
          {plan.isPopular ? 'Most Popular ✓' : 'Selected ✓'}
        </div>
      )}
      {!isSelected && plan.isPopular && (
        <div className="mb-4 inline-block bg-gray-400 px-3 py-1 text-xs font-semibold text-white rounded-full">
          Most Popular
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold">${plan.price}</span>
        <span className="text-gray-500 ml-2">/month</span>
      </div>

      {/* Features List */}
      <ul className="space-y-3 mb-6">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-center text-sm text-gray-700">
            <span className="text-green-500 mr-3 font-bold">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
          isSelected
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        data-testid={`pricing-cta-${plan.id}`}
        onClick={e => {
          e.stopPropagation()
          onSelect(plan.id)
        }}
      >
        {plan.cta}
      </button>
    </div>
  )
}

/* ==========================================
 * PRICING GRID COMPONENT
 * ========================================== */
export const PricingGrid = ({ plans }: { plans: PricingPlan[] }) => {
  const [selectedId, setSelectedId] = React.useState<string | null>(
    plans.find(p => p.isPopular)?.id ?? null
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {plans.map(plan => (
        <PricingCard
          key={plan.id}
          plan={plan}
          isSelected={selectedId === plan.id}
          isDimmed={selectedId !== null && selectedId !== plan.id}
          onSelect={setSelectedId}
        />
      ))}
    </div>
  )
}
