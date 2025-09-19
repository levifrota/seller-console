import Icon from '../../../components/AppIcon';
import type { Opportunity } from '../../../types';

interface OpportunityStatsProps {
  opportunities: Opportunity[];
}

const OpportunityStats = ({ opportunities }: OpportunityStatsProps) => {
  const calculateStats = () => {
    const totalOpportunities = opportunities?.length;
    const totalValue = opportunities?.reduce((sum: number, opp: Opportunity) => sum + (opp?.amount || 0), 0);
    const wonOpportunities = opportunities?.filter((opp: Opportunity) => opp?.stage === 'Closed Won')?.length;
    const winRate = totalOpportunities > 0 ? (wonOpportunities / totalOpportunities) * 100 : 0;
    
    const stageDistribution = opportunities?.reduce((acc: Record<string, number>, opp: Opportunity) => {
      if (opp.stage) {
        acc[opp.stage] = (acc[opp.stage] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      totalOpportunities,
      totalValue,
      wonOpportunities,
      winRate,
      stageDistribution
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const statCards = [
    {
      title: 'Total Opportunities',
      value: stats?.totalOpportunities,
      icon: 'Target',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pipeline Value',
      value: formatCurrency(stats?.totalValue),
      icon: 'DollarSign',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Won Opportunities',
      value: stats?.wonOpportunities,
      icon: 'Trophy',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Win Rate',
      value: `${stats?.winRate?.toFixed(1)}%`,
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${stat?.bgColor} rounded-lg p-3`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground truncate">
                {stat?.title}
              </p>
              <p className="text-2xl font-semibold text-foreground">
                {stat?.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpportunityStats;