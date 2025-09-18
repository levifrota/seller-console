import { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Icon from '../../../components/AppIcon';

const LeadSlideOver = ({ 
  lead, 
  isOpen, 
  onClose, 
  onSave, 
  onConvertToOpportunity,
  loading,
  error 
}) => {
  const [editedLead, setEditedLead] = useState(lead || {});
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (lead) {
      setEditedLead(lead);
      setIsEditing(false);
      setValidationErrors({});
    }
  }, [lead]);

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'unqualified', label: 'Unqualified' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleInputChange = (field, value) => {
    setEditedLead(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors?.[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSave = () => {
    const errors = {};
    
    // Validate email
    if (!validateEmail(editedLead?.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (Object.keys(errors)?.length > 0) {
      setValidationErrors(errors);
      return;
    }

    onSave(editedLead);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
    setValidationErrors({});
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
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

  const getSourceIcon = (source) => {
    const sourceIcons = {
      website: 'Globe',
      email: 'Mail',
      phone: 'Phone',
      referral: 'Users',
      social: 'Share2',
      event: 'Calendar'
    };
    return sourceIcons?.[source] || 'HelpCircle';
  };

  if (!isOpen || !lead) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      {/* Slide Over Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-elevated border-l border-border overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Lead Details</h2>
              <p className="text-sm text-muted-foreground">ID: {lead?.id}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={16} className="text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Basic Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <p className="mt-1 text-sm text-muted-foreground">{lead?.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Company</label>
                  <p className="mt-1 text-sm text-muted-foreground">{lead?.company}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedLead?.email}
                      onChange={(e) => handleInputChange('email', e?.target?.value)}
                      error={validationErrors?.email}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{lead?.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Source</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Icon name={getSourceIcon(lead?.source)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground capitalize">{lead?.source}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Score</label>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium text-foreground">{lead?.score}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Status</label>
                  {isEditing ? (
                    <Select
                      options={statusOptions}
                      value={editedLead?.status}
                      onChange={(value) => handleInputChange('status', value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1">
                      {getStatusBadge(lead?.status)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lead Score Analysis */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Score Analysis</h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Lead Score</span>
                  <span className="text-sm font-medium text-foreground">{lead?.score}/100</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${lead?.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {lead?.score >= 80 ? 'High priority lead' : 
                   lead?.score >= 60 ? 'Medium priority lead': 'Low priority lead'}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border p-6 space-y-3">
            {isEditing ? (
              <div className="flex gap-3">
                <Button
                  variant="default"
                  onClick={handleSave}
                  loading={loading}
                  className="flex-1"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="default"
                  onClick={() => setIsEditing(true)}
                  iconName="Edit"
                  iconPosition="left"
                  className="w-full"
                >
                  Edit Lead
                </Button>
                
                <Button
                  variant="success"
                  onClick={() => onConvertToOpportunity(lead)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  loading={loading}
                  className="w-full"
                >
                  Convert to Opportunity
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadSlideOver;