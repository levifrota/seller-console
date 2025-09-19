import React from 'react';

type NavigationContainerProps = {
  children: React.ReactNode;
  className?: string;
  responsive?: boolean;
};

const NavigationContainer = ({ 
  children, 
  className = '',
  responsive = true 
}: NavigationContainerProps) => {
  return (
    <div className={`
      w-full bg-background border-b border-border
      ${responsive ? 'lg:static' : ''}
      ${className}
    `}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <svg
                    className="h-5 w-5 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    Mini Seller Console
                  </h1>
                </div>
              </div>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Notifications"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v2.25l2.25 2.25v.75H2.25v-.75L4.5 12V9.75a6 6 0 0 1 6-6z" />
                </svg>
              </button>
              
              <div className="h-6 w-px bg-border" />
              
              <button
                type="button"
                className="flex items-center space-x-2 rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">U</span>
                </div>
                <span className="hidden sm:block text-blue-500">User</span>
              </button>
            </div>
          </div>
          
          {/* Navigation Content */}
          <div className="px-4 lg:px-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationContainer;