import { SVGProps } from 'react';

const CarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 8.5h12l1.5 5h1a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-1M6 8.5L4.5 13.5h-1A1.5 1.5 0 0 0 2 15v2a1.5 1.5 0 0 0 1.5 1.5h1M6 8.5l1-3h10l1 3M7 17.5h2M15 17.5h2"
    />
    <circle cx="8" cy="15.5" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="15.5" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CarIcon;
