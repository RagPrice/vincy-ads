export const theme = {
  colors: {
    primary: {
      600: '#7C3AED', // Purple-600 - Main brand color
      700: '#6D28D9', // Purple-700 - Hover state
      500: '#8B5CF6', // Purple-500 - Lighter variant
      50: '#F5F3FF',  // Purple-50 - Background hover
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    white: '#FFFFFF',
  },
  
  spacing: {
    container: {
      padding: '1rem',  // px-4
      maxWidth: '1280px', // max-w-7xl
    },
    
    layout: {
      navHeight: '4rem',     // h-16
      sectionPadding: '2rem', // py-8
      gap: {
        small: '0.5rem',  // gap-2
        medium: '1rem',   // gap-4
        large: '2rem',    // gap-8
      },
    },
  },
  
  borderRadius: {
    sm: '0.25rem',   // rounded
    md: '0.375rem',  // rounded-md
    lg: '0.5rem',    // rounded-lg
    full: '9999px',  // rounded-full
  },
  
  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // text-xs
      sm: '0.875rem',   // text-sm
      base: '1rem',     // text-base
      lg: '1.125rem',   // text-lg
      xl: '1.25rem',    // text-xl
      '2xl': '1.5rem',  // text-2xl
      '3xl': '1.875rem' // text-3xl
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  
  layout: {
    card: {
      padding: '1rem',
      gap: '0.5rem',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      hoverShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    
    sidebar: {
      width: '16rem', // w-64
      padding: '1.5rem',
    },
    
    grid: {
      columns: {
        mobile: 1,
        tablet: 2,
        desktop: 3,
        wide: 5,
      },
      gap: '1.5rem',
    },
  },
  
  transitions: {
    default: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  components: {
    button: {
      base: 'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      },
      variants: {
        primary: 'bg-purple-600 text-white hover:bg-purple-700',
        secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        outline: 'border border-purple-600 text-purple-600 hover:bg-purple-50',
      },
    },
    
    input: {
      base: 'w-full rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500',
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-4 py-3 text-lg',
      },
    },
  },
};
