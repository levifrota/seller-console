import Button from '../../../components/Button';
import Icon from '../../../components/AppIcon';

interface EmptyStateProps {
  type?: 'no-leads' | 'no-results' | 'loading-error';
  searchTerm?: string;
  statusFilter?: string;
  onClearFilters?: () => void;
}

const EmptyState = ({ 
  type = 'no-leads',
  searchTerm = '',
  statusFilter = 'all',
  onClearFilters 
}: EmptyStateProps) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: 'Search',
          title: 'No leads found',
          description: `No leads match your current search and filter criteria.`,
          action: {
            label: 'Clear Filters',
            onClick: onClearFilters,
            variant: 'outline' as const
          }
        };
      
      case 'no-leads':
        return {
          icon: 'Users',
          title: 'No leads available',
          description: 'There are currently no leads in your pipeline. New leads will appear here once they are added to the system.',
          action: null
        };
      
      case 'loading-error':
        return {
          icon: 'AlertCircle',
          title: 'Unable to load leads',
          description: 'There was an error loading your leads. Please try refreshing the page or contact support if the problem persists.',
          action: {
            label: 'Retry',
            onClick: () => window.location?.reload(),
            variant: 'default' as const
          }
        };
      
      default:
        return {
          icon: 'HelpCircle',
          title: 'Something went wrong',
          description: 'An unexpected error occurred. Please try again.',
          action: null
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="bg-card rounded-lg border border-border p-12">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon 
            name={content?.icon} 
            size={32} 
            className="text-muted-foreground" 
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {content?.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {content?.description}
        </p>

        {/* Active Filters Info */}
        {type === 'no-results' && (searchTerm || statusFilter !== 'all') && (
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
            <h4 className="text-sm font-medium text-foreground mb-2">Current filters:</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              {searchTerm && (
                <div className="flex items-center gap-2">
                  <Icon name="Search" size={14} />
                  <span>Search: "{searchTerm}"</span>
                </div>
              )}
              {statusFilter !== 'all' && (
                <div className="flex items-center gap-2">
                  <Icon name="Filter" size={14} />
                  <span>Status: {statusFilter}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        {content?.action && (
          <Button
            variant={content?.action?.variant}
            onClick={content?.action?.onClick}
            iconName={content?.action?.variant === 'outline' ? 'RotateCcw' : 'RefreshCw'}
            iconPosition="left"
          >
            {content?.action?.label}
          </Button>
        )}

        {/* Additional Help Text */}
        {type === 'no-leads' && (
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Leads are typically imported from your CRM system or added manually by your sales team.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;