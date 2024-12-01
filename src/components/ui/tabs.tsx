import * as React from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '../../utils/cn';

interface TabsListProps {
  children: React.ReactNode;
}

interface TabProps {
  children: React.ReactNode;
  selected?: boolean;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof Tab.List>,
  TabsListProps
>(({ children, ...props }, ref) => (
  <Tab.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500',
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'
    )}
    {...props}
  >
    {children}
  </Tab.List>
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Tab>,
  TabProps
>(({ children, selected, ...props }, ref) => (
  <Tab
    ref={ref}
    className={({ selected }) =>
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        selected
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-900',
        selected
          ? 'bg-background text-foreground shadow-sm'
          : 'hover:bg-background/50 hover:text-foreground'
      )
    }
    {...props}
  >
    {children}
  </Tab>
));
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  React.ElementRef<typeof Tab.Panels>,
  { children: React.ReactNode }
>(({ children, ...props }, ref) => (
  <Tab.Panels
    ref={ref}
    className={cn('mt-2', 'mt-2')}
    {...props}
  >
    {children}
  </Tab.Panels>
));
TabsContent.displayName = 'TabsContent';

const Tabs = TabsPrimitive.Tab.Group;

export { Tabs, TabsList, TabsTrigger, TabsContent };
