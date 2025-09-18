import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button';
import OpportunityTable from './components/OpportunityTable';
import OpportunityFilters from './components/OpportunityFilters';
import OpportunityStats from './components/OpportunityStats';

interface Opportunity {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
  stage?: string;
  amount?: number;
  createdAt?: string;
}

interface Filters {
  stage: string;
  amountRange: string;
}

interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

const OpportunityManagement = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    stage: '',
    amountRange: ''
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'createdAt',
    direction: 'desc'
  });

  // Mock opportunities data
  const mockOpportunities: Opportunity[] = [
    {
      id: "opp-001",
      name: "Enterprise Software License - TechCorp",
      company: "TechCorp Solutions",
      email: "contact@techcorp.com",
      source: "Referral",
      score: 85,
      status: "Active",
      stage: "Proposal",
      amount: 75000,
      createdAt: new Date(2024, 8, 15)?.toISOString(),
    },
    {
      id: "opp-002",
      name: "Cloud Migration Services - DataFlow Inc",
      company: "DataFlow Inc",
      email: "sales@dataflow.com",
      source: "Website",
      score: 92,
      status: "Active",
      stage: "Negotiation",
      amount: 120000,
      createdAt: new Date(2024, 8, 12)?.toISOString(),
    },
    {
      id: "opp-003",
      name: "Marketing Automation Platform - GrowthCo",
      company: "GrowthCo Marketing",
      email: "info@growthco.com",
      source: "Cold Call",
      score: 68,
      status: "Active",
      stage: "Qualification",
      amount: 45000,
      createdAt: new Date(2024, 8, 10)?.toISOString(),
    },
    {
      id: "opp-004",
      name: "Security Audit Services - SecureBank",
      company: "SecureBank Financial",
      email: "security@securebank.com",
      source: "Partner",
      score: 95,
      status: "Won",
      stage: "Closed Won",
      amount: 85000,
      createdAt: new Date(2024, 8, 8)?.toISOString(),
    },
    {
      id: "opp-005",
      name: "Custom Development Project - InnovateLab",
      company: "InnovateLab Technologies",
      email: "projects@innovatelab.com",
      source: "Website",
      score: 88,
      status: "Active",
      stage: "Proposal",
      amount: 95000,
      createdAt: new Date(2024, 8, 5)?.toISOString(),
    },
    {
      id: "opp-006",
      name: "Training & Consulting - EduTech Solutions",
      company: "EduTech Solutions",
      email: "training@edutech.com",
      source: "Referral",
      score: 72,
      status: "Lost",
      stage: "Closed Lost",
      amount: 25000,
      createdAt: new Date(2024, 8, 3)?.toISOString(),
    },
    {
      id: "opp-007",
      name: "Infrastructure Upgrade - MegaCorp",
      company: "MegaCorp Industries",
      email: "it@megacorp.com",
      source: "Existing Customer",
      score: 98,
      status: "Active",
      stage: "Negotiation",
      amount: 180000,
      createdAt: new Date(2024, 8, 1)?.toISOString(),
    }
  ];

  // Load opportunities with simulated API delay
  const loadOpportunities = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load from localStorage or use mock data
      const savedOpportunities = localStorage.getItem('opportunities');
      const opportunitiesData = savedOpportunities 
        ? JSON.parse(savedOpportunities) 
        : mockOpportunities;
      
      setOpportunities(opportunitiesData);
    } catch (error) {
      console.error('Error loading opportunities:', error);
      setOpportunities(mockOpportunities);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter and sort opportunities
  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...opportunities];

    // Apply stage filter
    if (filters?.stage) {
      filtered = filtered?.filter(opp => opp?.stage === filters?.stage);
    }

    // Apply amount range filter
    if (filters?.amountRange) {
      filtered = filtered?.filter(opp => {
        const amount = opp?.amount || 0;
        switch (filters?.amountRange) {
          case '0-10000':
            return amount < 10000;
          case '10000-50000':
            return amount >= 10000 && amount < 50000;
          case '50000-100000':
            return amount >= 50000 && amount < 100000;
          case '100000+':
            return amount >= 100000;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      const field = sortConfig?.field as keyof Opportunity;
      let aValue = a?.[field];
      let bValue = b?.[field];

      // Handle different data types
      if (sortConfig?.field === 'createdAt') {
        const dateA = new Date(aValue as string || 0);
        const dateB = new Date(bValue as string || 0);
        if (dateA < dateB) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (dateA > dateB) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      }
      
      if (sortConfig?.field === 'amount') {
        aValue = aValue || 0;
        bValue = bValue || 0;
      } else {
        aValue = String(aValue)?.toLowerCase();
        bValue = String(bValue)?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredOpportunities(filtered);
  }, [opportunities, filters, sortConfig]);

  // Handle filter changes
  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      stage: '',
      amountRange: ''
    });
  };

  // Handle sorting
  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev?.field === field && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Load opportunities on component mount
  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  // Save filter preferences to localStorage
  useEffect(() => {
    localStorage.setItem('opportunityFilters', JSON.stringify(filters));
  }, [filters]);

  // Save sort preferences to localStorage
  useEffect(() => {
    localStorage.setItem('opportunitySortConfig', JSON.stringify(sortConfig));
  }, [sortConfig]);

  // Load preferences on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('opportunityFilters');
    const savedSortConfig = localStorage.getItem('opportunitySortConfig');
    
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
    
    if (savedSortConfig) {
      setSortConfig(JSON.parse(savedSortConfig));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 lg:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                Opportunity Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Track and manage your sales pipeline opportunities
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/lead-management-dashboard">
                <Button variant="outline" iconName="ArrowLeft" iconPosition="left">
                  Back to Leads
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <OpportunityStats opportunities={filteredOpportunities} />

        {/* Filters */}
        <OpportunityFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          opportunityCount={filteredOpportunities?.length}
        />

        {/* Opportunities Table */}
        <OpportunityTable
          opportunities={filteredOpportunities}
          loading={loading}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      </main>
    </div>
  );
};

export default OpportunityManagement;