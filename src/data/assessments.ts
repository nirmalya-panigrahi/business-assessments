import type {AssessmentTool} from '../types/assessment';

export const STUDIO_ALL_TOOLS_URL = 'https://nirmalya-panigrahi.github.io/';

export const ASSESSMENTS_CATALOGUE: AssessmentTool[] = [
  {
    id: 'behaviour',
    indexLabel: '01',
    name: 'Behaviour Assessments',
    description: 'Psychometric framework analytics.',
    guidePrompt: 'Understand how people behave at work',
    url: 'https://behaviour-assessments.vercel.app/',
    tintColor: 'var(--tint-behaviour)',
  },
  {
    id: 'aptitude',
    indexLabel: '02',
    name: 'Aptitude Assessments',
    description: 'Structured talent evaluation platforms.',
    guidePrompt: 'Evaluate candidates in a structured way',
    url: 'https://interview-assessments.vercel.app/',
    tintColor: 'var(--tint-aptitude)',
  },
  {
    id: 'personality',
    indexLabel: '03',
    name: 'Personality Assessments',
    description: 'Advanced behavioral profiling analytics.',
    guidePrompt: 'Build a behavioural profile',
    url: 'https://personality-assessments-seven.vercel.app/',
    tintColor: 'var(--tint-personality)',
  },
];
