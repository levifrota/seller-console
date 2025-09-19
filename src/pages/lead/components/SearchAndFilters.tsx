import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Icon from '../../../components/AppIcon';
import type { LeadCounts } from '../../../types';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onClearFilters: () => void;
  leadCounts: LeadCounts;
}

const SearchAndFilters = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  onClearFilters,
  leadCounts 
}: SearchAndFiltersProps) => {
  const statusOptions = [
    { value: 'all', label: 'All Leads', count: leadCounts?.all },
    { value: 'new', label: 'New', count: leadCounts?.new },
    { value: 'contacted', label: 'Contacted', count: leadCounts?.contacted },
    { value: 'qualified', label: 'Qualified', count: leadCounts?.qualified },
    { value: 'unqualified', label: 'Unqualified', count: leadCounts?.unqualified }
  ];

  const getStatusButtonVariant = (status: string) => {
    return statusFilter === status ? 'bg-blue-500 text-white' : 'outline';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search leads by name or company..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>
        
        {(searchTerm || statusFilter !== 'all') && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="sm:w-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Status Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Filter by Status</h3>
        
        {/* Desktop Filter Buttons */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {statusOptions?.map((option) => (
            <Button
              key={option?.value}
              size="sm"
              onClick={() => onStatusFilterChange(option?.value)}
              className={`flex items-center gap-2 ${getStatusButtonVariant(option?.value)}`}
            >
              <span>{option?.label}</span>
              <span className={`
                px-1.5 py-0.5 rounded-full text-xs font-medium
                ${statusFilter === option?.value 
                  ? 'bg-primary-foreground text-primary' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {option?.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Mobile Filter Dropdown */}
        <div className="sm:hidden">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {statusOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label} ({option?.count})
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Active Filters Summary */}
      {(searchTerm || statusFilter !== 'all') && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchTerm && (
            <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm">
              <Icon name="Search" size={12} />
              <span>"{searchTerm}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {statusFilter !== 'all' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm">
              <Icon name="Filter" size={12} />
              <span>{statusOptions?.find(opt => opt?.value === statusFilter)?.label}</span>
              <button
                onClick={() => onStatusFilterChange('all')}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;