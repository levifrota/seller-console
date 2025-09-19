import Icon from '../../../components/AppIcon';

const StatsOverview = ({ leads, loading }) => {
  const calculateStats = () => {
    if (!leads || leads?.length === 0) {
      return {
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        unqualified: 0,
        averageScore: 0,
        highPriority: 0
      };
    }

    const stats = {
      total: leads?.length,
      new: leads?.filter(lead => lead?.status === 'new')?.length,
      contacted: leads?.filter(lead => lead?.status === 'contacted')?.length,
      qualified: leads?.filter(lead => lead?.status === 'qualified')?.length,
      unqualified: leads?.filter(lead => lead?.status === 'unqualified')?.length,
      averageScore: Math.round(leads?.reduce((sum, lead) => sum + lead?.score, 0) / leads?.length),
      highPriority: leads?.filter(lead => lead?.score >= 80)?.length
    };

    return stats;
  };

  const stats = calculateStats();

  const statCards = [
    {
      label: 'Total Leads',
      value: stats?.total,
      icon: 'Users',
      color: 'text-blue-500',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'New Leads',
      value: stats?.new,
      icon: 'UserPlus',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Qualified',
      value: stats?.qualified,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'High Priority',
      value: stats?.highPriority,
      icon: 'Star',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      label: 'Avg Score',
      value: stats?.averageScore,
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)]?.map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-16"></div>
                <div className="h-8 bg-muted rounded w-12"></div>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6 hover:shadow-moderate transition-smooth">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat?.label}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stat?.value}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon 
                name={stat?.icon} 
                size={20} 
                className={stat?.color}
              />
            </div>
          </div>
          
          {/* Progress indicator for percentage-based stats */}
          {stat?.label === 'Qualified' && stats?.total > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Conversion Rate</span>
                <span>{Math.round((stats?.qualified / stats?.total) * 100)}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(stats?.qualified / stats?.total) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;