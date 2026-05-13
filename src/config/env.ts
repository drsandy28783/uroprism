/**
 * Centralized environment configuration
 *
 * This file provides a single source of truth for all environment variables
 * and feature flags. It uses Vite's import.meta.env for environment variables.
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },

  auth: {
    tokenKey: 'stoneCare_auth_token',
    refreshThreshold: 5 * 60 * 1000, // 5 minutes in milliseconds
  },

  features: {
    useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false', // true by default for dev
    enableAuditLogging: true,
    fileUploadEnabled: import.meta.env.VITE_FILE_UPLOAD_ENABLED === 'true', // false by default
  },

  compliance: {
    consentVersion: import.meta.env.VITE_CONSENT_VERSION || '1.0.0',
    dataRetentionDays: 2555, // 7 years (HIPAA minimum 6 years)
  },
} as const;

// Type-safe access to config
export type Config = typeof config;
