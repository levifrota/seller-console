import Icon from '../../../components/AppIcon';

interface Opportunity {
  id: string;
  name: string;
  stage: string;
  amount: number;
  accountName: string;
  createdAt: string;
  leadId: string;
}

interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

interface OpportunityTableProps {
  opportunities: Opportunity[];
  loading: boolean;
  onSort: (field: string) => void;
  sortConfig: SortConfig;
}

const OpportunityTable = ({
  opportunities,
  loading,
  onSort,
  sortConfig,
}: OpportunityTableProps) => {
  const formatCurrency = (amount: number) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.field !== field) {
      return (
        <Icon name='ArrowUpDown' size={16} className='text-muted-foreground' />
      );
    }
    return sortConfig.direction === 'asc' ? (
      <Icon name='ArrowUp' size={16} className='text-primary' />
    ) : (
      <Icon name='ArrowDown' size={16} className='text-primary' />
    );
  };

  const getStageColor = (stage: string) => {
    const stageColors: Record<string, string> = {
      Qualification: 'bg-yellow-100 text-yellow-800',
      Proposal: 'bg-blue-100 text-blue-800',
      Negotiation: 'bg-orange-100 text-orange-800',
      'Closed Won': 'bg-green-100 text-green-800',
      'Closed Lost': 'bg-red-100 text-red-800',
    };
    return stageColors[stage] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className='bg-card rounded-lg border border-border overflow-hidden'>
        <div className='p-8 text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className='bg-card rounded-lg border border-border overflow-hidden'>
        <div className='p-12 text-center'>
          <Icon
            name='Target'
            size={48}
            className='text-muted-foreground mx-auto mb-4'
          />
          <h3 className='text-lg font-medium text-foreground mb-2'>
            No opportunities yet
          </h3>
          <p className='text-muted-foreground'>
            Convert leads from the Lead Management Dashboard to create
            opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-card rounded-lg border border-border overflow-hidden'>
      {/* Desktop Table */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-muted/50 border-b border-border'>
            <tr>
              <th className='px-6 py-4 text-left'>
                <button
                  onClick={() => onSort('name')}
                  className='flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-smooth'
                >
                  Opportunity Name
                  {getSortIcon('name')}
                </button>
              </th>
              <th className='px-6 py-4 text-left'>
                <button
                  onClick={() => onSort('stage')}
                  className='flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-smooth'
                >
                  Stage
                  {getSortIcon('stage')}
                </button>
              </th>
              <th className='px-6 py-4 text-left'>
                <button
                  onClick={() => onSort('amount')}
                  className='flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-smooth'
                >
                  Amount
                  {getSortIcon('amount')}
                </button>
              </th>
              <th className='px-6 py-4 text-left'>
                <button
                  onClick={() => onSort('accountName')}
                  className='flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-smooth'
                >
                  Account Name
                  {getSortIcon('accountName')}
                </button>
              </th>
              <th className='px-6 py-4 text-left'>
                <span className='text-sm font-medium text-foreground'>
                  Created
                </span>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {opportunities.map((opportunity) => (
              <tr
                key={opportunity.id}
                className='hover:bg-muted/30 transition-smooth'
              >
                <td className='px-6 py-4'>
                  <div className='font-medium text-foreground'>
                    {opportunity.name}
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(
                      opportunity.stage
                    )}`}
                  >
                    {opportunity.stage}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <span className='text-foreground font-medium'>
                    {formatCurrency(opportunity.amount)}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <span className='text-foreground'>
                    {opportunity.accountName}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <span className='text-muted-foreground text-sm'>
                    {new Date(opportunity.createdAt).toLocaleDateString(
                      'en-US'
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className='md:hidden divide-y divide-border'>
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className='p-4'>
            <div className='flex items-start justify-between mb-2'>
              <h3 className='font-medium text-foreground'>
                {opportunity.name}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStageColor(
                  opportunity.stage
                )}`}
              >
                {opportunity.stage}
              </span>
            </div>
            <div className='space-y-1'>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Amount:</span>
                <span className='text-sm font-medium text-foreground'>
                  {formatCurrency(opportunity.amount)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Account:</span>
                <span className='text-sm text-foreground'>
                  {opportunity.accountName}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Created:</span>
                <span className='text-sm text-muted-foreground'>
                  {new Date(opportunity.createdAt).toLocaleDateString('en-US')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunityTable;
