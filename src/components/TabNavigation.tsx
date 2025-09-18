import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const TabNavigation = ({ className = '' }) => {
  const location = useLocation();
  
  const navigationItems = [
    {
      label: 'Leads',
      path: '/lead',
      icon: 'Users'
    },
    {
      label: 'Opportunities',
      path: '/opportunity',
      icon: 'Target'
    }
  ];

  const isActive = (path: string): boolean => {
    return location?.pathname === path;
  };

  return (
    <nav className={`border-b border-border bg-background ${className}`} role="navigation" aria-label="Main navigation">
      <div className="flex">
        {navigationItems?.map((item) => {
          const active = isActive(item?.path);
          
          return (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-smooth
                hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                ${active 
                  ? 'text-primary border-b-2 border-primary bg-muted/50' :'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
                }
              `}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${item?.path?.replace('/', '')}`}
            >
              <Icon 
                name={item?.icon} 
                size={16} 
                className="flex-shrink-0"
              />
              <span>{item?.label}</span>
              {active && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-smooth"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default TabNavigation;