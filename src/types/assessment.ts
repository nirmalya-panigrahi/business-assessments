export type AssessmentId = 'behaviour' | 'aptitude' | 'personality';

export interface AssessmentTool {
  id: AssessmentId;
  indexLabel: string;
  name: string;
  description: string;
  guidePrompt: string;
  url: string;
  tintColor: string;
}

export type CatalogueStatus = 'loading' | 'ready' | 'empty' | 'error';

export interface UseAssessmentsOptions {
  initialTools?: AssessmentTool[];
  initialStatus?: CatalogueStatus;
  initialError?: string | null;
}

export interface UseAssessmentsResult {
  tools: AssessmentTool[];
  status: CatalogueStatus;
  errorMessage: string | null;
  retry: () => void;
}
