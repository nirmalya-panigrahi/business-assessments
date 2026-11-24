import type {AssessmentTool} from '../types/assessment';

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

/**
 * Validates that a string is a well-formed HTTP or HTTPS URL.
 * Rejects dangerous protocols (e.g. javascript:, data:), empty strings, and malformed URLs.
 */
export function isValidHttpUrl(rawUrl: unknown): rawUrl is string {
  if (typeof rawUrl !== 'string') {
    return false;
  }
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return ALLOWED_PROTOCOLS.has(parsed.protocol) && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

/**
 * Sanitizes and validates a single assessment record.
 * Returns null when required fields are missing, empty, or unsafe.
 */
export function normalizeAssessment(tool: AssessmentTool | null | undefined): AssessmentTool | null {
  if (!tool || typeof tool !== 'object') {
    return null;
  }

  const name = typeof tool.name === 'string' ? tool.name.trim() : '';
  const description = typeof tool.description === 'string' ? tool.description.trim() : '';
  const indexLabel = typeof tool.indexLabel === 'string' ? tool.indexLabel.trim() : '';
  const guidePrompt = typeof tool.guidePrompt === 'string' ? tool.guidePrompt.trim() : '';
  const tintColor = typeof tool.tintColor === 'string' ? tool.tintColor.trim() : '';

  if (!name || !description || !indexLabel || !guidePrompt || !isValidHttpUrl(tool.url)) {
    return null;
  }

  return {
    ...tool,
    indexLabel,
    name,
    description,
    guidePrompt,
    url: tool.url.trim(),
    tintColor: tintColor || 'var(--surface)',
  };
}

/**
 * Filters and normalizes a list of assessment records, throwing if the input is not an array.
 */
export function validateAssessments(tools: unknown): AssessmentTool[] {
  if (!Array.isArray(tools)) {
    throw new Error('Assessment catalogue data must be an array.');
  }

  return tools
    .map((item) => normalizeAssessment(item as AssessmentTool))
    .filter((item): item is AssessmentTool => item !== null);
}

/**
 * Finds the index of the card whose left edge is closest to the track's left edge.
 */
export function getClosestCardIndex(cardLeftOffsets: number[], trackLeftOffset: number): number {
  if (!Array.isArray(cardLeftOffsets) || cardLeftOffsets.length === 0) {
    return 0;
  }

  const origin = Number.isFinite(trackLeftOffset) ? trackLeftOffset : 0;
  let closestIdx = 0;
  let minDistance = Infinity;

  cardLeftOffsets.forEach((leftOffset, idx) => {
    if (!Number.isFinite(leftOffset)) {
      return;
    }
    const distance = Math.abs(leftOffset - origin);
    if (distance < minDistance) {
      minDistance = distance;
      closestIdx = idx;
    }
  });

  return closestIdx;
}

/**
 * Clamps a carousel target index safely within valid card bounds.
 */
export function clampCardIndex(index: number, totalCards: number): number {
  if (!Number.isFinite(totalCards) || totalCards <= 0) {
    return 0;
  }
  if (!Number.isFinite(index) || index < 0) {
    return 0;
  }
  const rounded = Math.floor(index);
  return Math.min(rounded, totalCards - 1);
}
