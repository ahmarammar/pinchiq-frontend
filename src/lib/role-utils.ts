import { UserRole } from '@/types/auth.types';

export const ROLES = {
  BROKER: 'broker' as const,
  PROVIDER: 'provider' as const,
} as const;

export function isBroker(role: UserRole): boolean {
  return role === ROLES.BROKER;
}

export function isProvider(role: UserRole): boolean {
  return role === ROLES.PROVIDER;
}

export function canAccessBrokerRoutes(role: UserRole): boolean {
  return isBroker(role);
}

export function canAccessProviderRoutes(role: UserRole): boolean {
  return isProvider(role);
}
