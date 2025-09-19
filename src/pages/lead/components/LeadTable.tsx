import Icon from '../../../components/AppIcon';
import type { Lead } from '../../../types';

interface LeadTableProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  sortBy: string;
  sortOrder: string;
  onSort: (field: string, order: string) => void;
  loading: boolean;
}

const LeadTable = ({ 
  leads, 
  onLeadClick, 
  sortBy, 
  sortOrder, 
  onSort,
  loading 
}: LeadTableProps) => {
  const handleSort = (field: string) => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc';
    onSort(field, newOrder);
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return 'ArrowUpDown';
    return sortOrder === 'desc' ? 'ArrowDown' : 'ArrowUp';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'New' },
      contacted: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Contacted' },
      qualified: { bg: 'bg-green-100', text: 'text-green-800', label: 'Qualified' },
      unqualified: { bg: 'bg-red-100', text: 'text-red-800', label: 'Unqualified' }
    };

    const config = statusConfig?.[status] || statusConfig?.new;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const getSourceIcon = (source: string) => {
    const sourceIcons: Record<string, string> = {
      website: 'Globe',
      email: 'Mail',
      phone: 'Phone',
      referral: 'Users',
      social: 'Share2',
      event: 'Calendar'
    };
    return sourceIcons?.[source] || 'HelpCircle';
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-muted"></div>
          {[...Array(5)]?.map((_, i) => (
            <div key={i} className="h-16 bg-background border-t border-border"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  Name
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('company')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  Company
                  <Icon name={getSortIcon('company')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                Source
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  Score
                  <Icon name={getSortIcon('score')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads?.map((lead: Lead) => (
              <tr
                key={lead?.id}
                onClick={() => onLeadClick(lead)}
                className="hover:bg-muted/30 cursor-pointer transition-smooth"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{lead?.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-muted-foreground">{lead?.company}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-muted-foreground">{lead?.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name={getSourceIcon(lead?.source)} size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground capitalize">{lead?.source}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="font-medium text-foreground">{lead?.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(lead?.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4 p-4">
        {leads?.map((lead: Lead) => (
          <div
            key={lead?.id}
            onClick={() => onLeadClick(lead)}
            className="bg-background border border-border rounded-lg p-4 cursor-pointer hover:shadow-moderate transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground">{lead?.name}</h3>
                <p className="text-sm text-muted-foreground">{lead?.company}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="font-medium text-foreground text-sm">{lead?.score}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={14} />
                <span>{lead?.email}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name={getSourceIcon(lead?.source)} size={14} />
                  <span className="capitalize">{lead?.source}</span>
                </div>
                {getStatusBadge(lead?.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadTable;