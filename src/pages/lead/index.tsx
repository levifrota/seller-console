import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import SearchAndFilters from './components/SearchAndFilters';
import StatsOverview from './components/StatsOverview';
import LeadTable from './components/LeadTable';
import LeadSlideOver from './components/LeadSlideOver';
import EmptyState from './components/EmptyState';
import type { Lead } from '../../types';

const LeadManagementDashboard = () => {
  // State management
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  // Mock leads data
  const mockLeads: Lead[] = [
    {
      id: 'LD001',
      name: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      email: 'sarah.johnson@techcorp.com',
      source: 'website',
      score: 92,
      status: 'new'
    },
    {
      id: 'LD002',
      name: 'Michael Chen',
      company: 'Digital Innovations Inc',
      email: 'michael.chen@digitalinnovations.com',
      source: 'referral',
      score: 87,
      status: 'contacted'
    },
    {
      id: 'LD003',
      name: 'Emily Rodriguez',
      company: 'StartupHub',
      email: 'emily.rodriguez@startuphub.com',
      source: 'email',
      score: 78,
      status: 'qualified'
    },
    {
      id: 'LD004',
      name: 'David Thompson',
      company: 'Enterprise Systems',
      email: 'david.thompson@enterprisesys.com',
      source: 'phone',
      score: 85,
      status: 'new'
    },
    {
      id: 'LD005',
      name: 'Lisa Wang',
      company: 'CloudTech Partners',
      email: 'lisa.wang@cloudtech.com',
      source: 'social',
      score: 73,
      status: 'contacted'
    },
    {
      id: 'LD006',
      name: 'Robert Martinez',
      company: 'Global Dynamics',
      email: 'robert.martinez@globaldynamics.com',
      source: 'event',
      score: 91,
      status: 'qualified'
    },
    {
      id: 'LD007',
      name: 'Jennifer Kim',
      company: 'Innovation Labs',
      email: 'jennifer.kim@innovationlabs.com',
      source: 'website',
      score: 45,
      status: 'unqualified'
    },
    {
      id: 'LD008',
      name: 'Alex Brown',
      company: 'Future Systems',
      email: 'alex.brown@futuresystems.com',
      source: 'referral',
      score: 82,
      status: 'new'
    },
    {
      id: 'LD009',
      name: 'Maria Garcia',
      company: 'Tech Ventures',
      email: 'maria.garcia@techventures.com',
      source: 'email',
      score: 67,
      status: 'contacted'
    },
    {
      id: 'LD010',
      name: 'James Wilson',
      company: 'Digital Solutions',
      email: 'james.wilson@digitalsolutions.com',
      source: 'phone',
      score: 89,
      status: 'qualified'
    }
  ];

  // Load preferences from localStorage
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('leadDashboard_searchTerm') || '';
    const savedStatusFilter = localStorage.getItem('leadDashboard_statusFilter') || 'all';
    const savedSortBy = localStorage.getItem('leadDashboard_sortBy') || 'score';
    const savedSortOrder = localStorage.getItem('leadDashboard_sortOrder') || 'desc';

    setSearchTerm(savedSearchTerm);
    setStatusFilter(savedStatusFilter);
    setSortBy(savedSortBy);
    setSortOrder(savedSortOrder);
  }, []);

  // Simulate API call to load leads
  useEffect(() => {
    const loadLeads = async () => {
      setLoading(true);
      try {
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLeads(mockLeads);
        setError('');
      } catch {
        setError('Failed to load leads. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  // Filter and sort leads
  useEffect(() => {
    let filtered = [...leads];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter((lead: Lead) =>
        lead?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        lead?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered?.filter((lead: Lead) => lead?.status === statusFilter);
    }

    // Apply sorting
    filtered?.sort((a: Lead, b: Lead) => {
      let aValue: any = a?.[sortBy as keyof Lead];
      let bValue: any = b?.[sortBy as keyof Lead];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, sortBy, sortOrder]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('leadDashboard_searchTerm', searchTerm);
    localStorage.setItem('leadDashboard_statusFilter', statusFilter);
    localStorage.setItem('leadDashboard_sortBy', sortBy);
    localStorage.setItem('leadDashboard_sortOrder', sortOrder);
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  // Calculate lead counts for filters
  const getLeadCounts = useCallback(() => {
    const searchFiltered = searchTerm
      ? leads?.filter((lead: Lead) =>
          lead?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          lead?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      : leads;

    return {
      all: searchFiltered?.length,
      new: searchFiltered?.filter((lead: Lead) => lead?.status === 'new')?.length,
      contacted: searchFiltered?.filter((lead: Lead) => lead?.status === 'contacted')?.length,
      qualified: searchFiltered?.filter((lead: Lead) => lead?.status === 'qualified')?.length,
      unqualified: searchFiltered?.filter((lead: Lead) => lead?.status === 'unqualified')?.length
    };
  }, [leads, searchTerm]);

  // Event handlers
  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsSlideOverOpen(true);
  };

  const handleCloseSlideOver = () => {
    setIsSlideOverOpen(false);
    setSelectedLead(null);
    setError('');
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSort = (field: string, order: string) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const handleSaveLead = async (updatedLead: Lead) => {
    setSaveLoading(true);
    setError('');

    try {
      // Simulate API call with potential failure
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate 10% failure rate
      if (Math.random() < 0.1) {
        throw new Error('Failed to save lead. Please try again.');
      }

      // Optimistic update
      setLeads(prevLeads =>
        prevLeads?.map((lead: Lead) =>
          lead?.id === updatedLead?.id ? updatedLead : lead
        )
      );

      setSelectedLead(updatedLead);
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleConvertToOpportunity = async (lead: Lead) => {
    setSaveLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate 5% failure rate
      if (Math.random() < 0.05) {
        throw new Error('Failed to convert lead to opportunity. Please try again.');
      }

      // Create opportunity (in real app, this would be saved to backend)
      const opportunity = {
        id: `OPP${Date.now()}`,
        name: `${lead?.company} - ${lead?.name}`,
        stage: 'prospecting',
        amount: null,
        accountName: lead?.company,
        leadId: lead?.id
      };

      // Update lead status to qualified
      const updatedLead = { ...lead, status: 'qualified' as const };
      setLeads(prevLeads =>
        prevLeads?.map((l: Lead) => l?.id === lead?.id ? updatedLead : l)
      );

      setSelectedLead(updatedLead);
      
      // Show success message (in real app, might redirect to opportunity page)
      alert(`Successfully converted lead to opportunity: ${opportunity?.name}`);
      
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setSaveLoading(false);
    }
  };

  // Render empty state
  const renderEmptyState = () => {
    if (loading) return null;
    
    if (leads?.length === 0) {
      return <EmptyState type="no-leads" onClearFilters={handleClearFilters} />;
    }
    
    if (filteredLeads?.length === 0) {
      return (
        <EmptyState
          type="no-results"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onClearFilters={handleClearFilters}
        />
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 lg:px-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
            <p className="text-muted-foreground mt-2">
              Review, filter, and convert leads to optimize your sales pipeline
            </p>
          </div>

          {/* Stats Overview */}
          <StatsOverview leads={leads} loading={loading} />

          {/* Search and Filters */}
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            onClearFilters={handleClearFilters}
            leadCounts={getLeadCounts()}
          />

          {/* Leads Table or Empty State */}
          {renderEmptyState() || (
            <LeadTable
              leads={filteredLeads}
              onLeadClick={handleLeadClick}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              loading={loading}
            />
          )}

          {/* Lead Slide Over */}
          <LeadSlideOver
            lead={selectedLead}
            isOpen={isSlideOverOpen}
            onClose={handleCloseSlideOver}
            onSave={handleSaveLead}
            onConvertToOpportunity={handleConvertToOpportunity}
            loading={saveLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default LeadManagementDashboard;