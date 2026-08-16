import { landingContent } from './landing-content';
import { mockContent } from './mock-content';
import { previewContent } from './dev-fixtures';
import type { ContentField, ContentState, LandingContent } from './types';

/**
 * Where the page gets its copy.
 *
 *   mock      — placeholder copy so the full layout is visible (default today).
 *               ⚠️ Not real event information. See content/mock-content.ts.
 *   real      — only fields confirmed in content/landing-content.ts.
 *               This is what a public deployment must run.
 *   structure — bracketed [TOKEN] fixtures for layout review.
 *
 * Set with NEXT_PUBLIC_CONTENT_SOURCE.
 */
export type ContentSource = 'mock' | 'real' | 'structure';

const requested = process.env.NEXT_PUBLIC_CONTENT_SOURCE as ContentSource | undefined;
const legacyPreview = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === 'structure';

export const contentSource: ContentSource = legacyPreview ? 'structure' : (requested ?? 'mock');

export const isStructurePreview = contentSource === 'structure';
/** True whenever the visible copy is placeholder rather than confirmed. */
export const isPlaceholderContent = contentSource !== 'real';

export const content: LandingContent =
  contentSource === 'structure' ? previewContent : contentSource === 'real' ? landingContent : mockContent;

const allowedStates: ContentState[] = isStructurePreview ? ['confirmed', 'draft'] : ['confirmed'];

const isAllowed = (state: ContentState) => allowedStates.includes(state);

const isEmptyValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
};

/** Publishable value of a field, or null. Never returns a placeholder string. */
export function value<T>(field: ContentField<T> | undefined): T | null {
  if (!field || !isAllowed(field.state)) return null;
  if (isEmptyValue(field.value)) return null;
  return field.value as T;
}

/** Publishable text, trimmed. */
export function text(field: ContentField<string> | undefined): string | null {
  const resolved = value(field);
  return typeof resolved === 'string' ? resolved.trim() : null;
}

/** Publishable text taken from an already-unwrapped object property. */
export function line(input: string | undefined | null): string | null {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** Publishable list, filtered by each item's own state. */
export function list<T extends { state: ContentState }>(
  field: ContentField<T[]> | undefined,
): T[] {
  const resolved = value(field);
  if (!Array.isArray(resolved)) return [];
  return resolved.filter((item) => isAllowed(item.state));
}

/** Publishable list of items nested inside a field's object value. */
export function items<T extends { state: ContentState }>(input: T[] | undefined): T[] {
  if (!Array.isArray(input)) return [];
  return input.filter((item) => isAllowed(item.state));
}

/** Publishable list of plain strings nested inside a field's object value. */
export function lines(input: string[] | undefined): string[] {
  if (!Array.isArray(input)) return [];
  return input.map((entry) => entry?.trim()).filter((entry): entry is string => Boolean(entry));
}

/** A link is publishable only when both label and url exist. */
export function action(
  label: string | undefined | null,
  url: string | undefined | null,
): { label: string; url: string } | null {
  const resolvedLabel = line(label);
  const resolvedUrl = line(url);
  if (!resolvedLabel || !resolvedUrl) return null;
  return { label: resolvedLabel, url: resolvedUrl };
}

export type { ContentField, ContentState, LandingContent } from './types';
