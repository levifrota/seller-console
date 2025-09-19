import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Icon from '../../../components/AppIcon';
import type { OpportunityFilters } from '../../../types';

interface OpportunityFiltersProps {
  filters: OpportunityFilters;
  onFilterChange: (filterType: keyof OpportunityFilters, value: string) => void;
  onClearFilters: () => void;
  opportunityCount: number;
}

const OpportunityFiltersComponent = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  opportunityCount 
}: OpportunityFiltersProps) => {
  const stageOptions = [
    { value: '', label: 'All Stages' },
    { value: 'Qualification', label: 'Qualification' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Negotiation', label: 'Negotiation' },
    { value: 'Closed Won', label: 'Closed Won' },
    { value: 'Closed Lost', label: 'Closed Lost' }
  ];

  const amountRangeOptions = [
    { value: '', label: 'All Amounts' },
    { value: '0-10000', label: 'Under $10,000' },
    { value: '10000-50000', label: '$10,000 - $50,000' },
    { value: '50000-100000', label: '$50,000 - $100,000' },
    { value: '100000+', label: 'Over $100,000' }
  ];

  const hasActiveFilters = filters?.stage || filters?.amountRange;

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 min-w-0">
            <Select
              placeholder="Filter by stage"
              options={stageOptions}
              value={filters?.stage}
              onChange={(value) => onFilterChange('stage', value as string)}
              className="w-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Select
              placeholder="Filter by amount"
              options={amountRangeOptions}
              value={filters?.amountRange}
              onChange={(value) => onFilterChange('amountRange', value as string)}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear Filters
            </Button>
          )}
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Target" size={16} />
            <span>
              {opportunityCount} {opportunityCount === 1 ? 'opportunity' : 'opportunities'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityFiltersComponent;