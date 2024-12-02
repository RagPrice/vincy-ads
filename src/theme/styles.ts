import { theme } from './index';

export const styles = {
  // Layout
  container: 'container mx-auto px-4',
  section: 'py-8',
  
  // Cards
  card: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
  cardBody: 'p-4',
  cardImage: 'h-48 w-full object-cover',
  
  // Buttons
  button: {
    base: 'rounded-lg font-medium transition-colors duration-200',
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    outline: 'border border-purple-600 text-purple-600 hover:bg-purple-50',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    },
  },
  
  // Forms
  input: 'w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500',
  select: 'w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500',
  label: 'block text-sm font-medium text-gray-700 mb-1',
  
  // Typography
  heading: {
    h1: 'text-3xl font-bold text-gray-800',
    h2: 'text-2xl font-bold text-gray-800',
    h3: 'text-xl font-semibold text-gray-800',
    h4: 'text-lg font-semibold text-gray-800',
  },
  text: {
    body: 'text-gray-600',
    small: 'text-sm text-gray-500',
  },
  
  // Grid
  grid: {
    base: 'grid gap-6',
    cols: {
      1: 'grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'xl:grid-cols-4',
      5: '2xl:grid-cols-5',
    },
  },
  
  // Flexbox
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
  },
  
  // Spacing
  spacing: {
    section: 'mb-8',
    element: 'mb-4',
    tight: 'mb-2',
  },
  
  // Icons
  icon: {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  },
  
  // States
  states: {
    hover: 'hover:bg-purple-50',
    active: 'active:bg-purple-100',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  
  // Animations
  animation: {
    spin: 'animate-spin',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
  },
  
  // Misc
  divider: 'border-b border-gray-200',
  badge: {
    primary: 'bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium',
    secondary: 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium',
  },
};
