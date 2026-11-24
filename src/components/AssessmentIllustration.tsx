import type {AssessmentId} from '../types/assessment';

interface AssessmentIllustrationProps {
  id: AssessmentId;
}

export function AssessmentIllustration({id}: AssessmentIllustrationProps) {
  if (id === 'behaviour') {
    return (
      <svg
        className="card-illustration"
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="24"
          y="32"
          width="136"
          height="52"
          rx="26"
          fill="#F1F0EA"
          stroke="#151512"
          strokeWidth="2"
        />
        <rect
          x="68"
          y="72"
          width="148"
          height="52"
          rx="26"
          fill="#CBD8BC"
          stroke="#151512"
          strokeWidth="2"
        />
        <rect
          x="38"
          y="112"
          width="124"
          height="42"
          rx="21"
          fill="#F1F0EA"
          stroke="#151512"
          strokeWidth="2"
        />
        <path
          d="M34 134 L86 96 L136 108 L204 44"
          stroke="#151512"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="34" cy="134" r="5" fill="#D4FF4F" stroke="#151512" strokeWidth="2" />
        <circle cx="86" cy="96" r="5" fill="#F1F0EA" stroke="#151512" strokeWidth="2" />
        <circle cx="136" cy="108" r="5" fill="#F1F0EA" stroke="#151512" strokeWidth="2" />
        <circle cx="204" cy="44" r="6" fill="#D4FF4F" stroke="#151512" strokeWidth="2" />
      </svg>
    );
  }

  if (id === 'aptitude') {
    return (
      <svg
        className="card-illustration"
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="38"
          y="28"
          width="74"
          height="56"
          rx="12"
          fill="#F1F0EA"
          stroke="#151512"
          strokeWidth="2"
        />
        <circle cx="75" cy="56" r="14" fill="#F2E7B7" stroke="#151512" strokeWidth="2" />
        <rect
          x="128"
          y="28"
          width="74"
          height="56"
          rx="12"
          fill="#F1F0EA"
          stroke="#151512"
          strokeWidth="2"
        />
        <polygon
          points="165,41 180,69 150,69"
          fill="#F2E7B7"
          stroke="#151512"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect
          x="38"
          y="98"
          width="74"
          height="56"
          rx="12"
          fill="#F1F0EA"
          stroke="#151512"
          strokeWidth="2"
        />
        <rect
          x="62"
          y="113"
          width="26"
          height="26"
          rx="4"
          fill="#F2E7B7"
          stroke="#151512"
          strokeWidth="2"
        />
        <rect
          x="128"
          y="98"
          width="74"
          height="56"
          rx="12"
          fill="#D4FF4F"
          stroke="#151512"
          strokeWidth="2"
        />
        <path
          d="M153 126 L162 135 L178 117"
          stroke="#151512"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className="card-illustration"
      viewBox="0 0 240 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="120" cy="92" r="64" fill="#F1F0EA" stroke="#151512" strokeWidth="2" />
      <circle cx="120" cy="92" r="44" fill="#D9D0EC" stroke="#151512" strokeWidth="2" />
      <circle cx="120" cy="92" r="22" fill="#F1F0EA" stroke="#151512" strokeWidth="2" />
      <line x1="120" y1="22" x2="120" y2="162" stroke="#151512" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="50" y1="92" x2="190" y2="92" stroke="#151512" strokeWidth="1.5" strokeDasharray="4 4" />
      <polygon
        points="120,40 172,82 146,136 86,122 76,72"
        fill="#D4FF4F"
        fillOpacity="0.45"
        stroke="#151512"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="40" r="5" fill="#D4FF4F" stroke="#151512" strokeWidth="2" />
      <circle cx="172" cy="82" r="5" fill="#F1F0EA" stroke="#151512" strokeWidth="2" />
      <circle cx="146" cy="136" r="5" fill="#D4FF4F" stroke="#151512" strokeWidth="2" />
      <circle cx="86" cy="122" r="5" fill="#F1F0EA" stroke="#151512" strokeWidth="2" />
      <circle cx="76" cy="72" r="5" fill="#D4FF4F" stroke="#151512" strokeWidth="2" />
    </svg>
  );
}
