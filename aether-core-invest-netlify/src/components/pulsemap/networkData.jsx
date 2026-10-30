export const nodes = [
  { id: 'dashboard',  label: 'Dashboard',         sub: 'Command Hub',        x: 0.50, y: 0.15, pressure: 85,  activity: 96,  risk: 'high',     size: 52 },
  { id: 'portfolio', label: 'Portfolio Mgmt',     sub: 'Asset Oversight',    x: 0.22, y: 0.33, pressure: 78,  activity: 88,  risk: 'high',     size: 46 },
  { id: 'portcreate',label: 'Portfolio Creation',  sub: 'Strategy Setup',     x: 0.78, y: 0.29, pressure: 54,  activity: 71,  risk: 'critical', size: 40, attentionReasons: ['Excessive clicks to complete setup', 'User confusion patterns', 'Long completion time'] },
  { id: 'crm',       label: 'CRM',                 sub: 'Contacts',           x: 0.15, y: 0.55, pressure: 82,  activity: 84,  risk: 'high',     size: 44 },
  { id: 'documents', label: 'Documents',          sub: 'Repository',          x: 0.40, y: 0.49, pressure: 67,  activity: 79,  risk: 'medium',   size: 42 },
  { id: 'reports',   label: 'Reports',            sub: 'Generation',          x: 0.62, y: 0.49, pressure: 58,  activity: 73,  risk: 'medium',   size: 40 },
  { id: 'ir',        label: 'Investor Relations',  sub: 'Stakeholder',         x: 0.85, y: 0.51, pressure: 41,  activity: 64,  risk: 'low',      size: 38 },
  { id: 'approvals', label: 'Approval Workflows',  sub: 'Queue',               x: 0.31, y: 0.73, pressure: 93,  activity: 86,  risk: 'critical', size: 44, attentionReasons: ['Long approval wait times', 'Frequent user backtracking', 'High abandonment rate'] },
  { id: 'finance',   label: 'Finance',             sub: 'Accounting',          x: 0.55, y: 0.75, pressure: 49,  activity: 62,  risk: 'low',      size: 36 },
  { id: 'datafeed',  label: 'Data Feed',           sub: 'Market Intel',        x: 0.73, y: 0.73, pressure: 72,  activity: 81,  risk: 'medium',   size: 38 },
  { id: 'analytics', label: 'Analytics',           sub: 'Insights',            x: 0.50, y: 0.88, pressure: 38,  activity: 57,  risk: 'low',      size: 34 },
  { id: 'deals',     label: 'Deal Management',     sub: 'Pipeline',            x: 0.88, y: 0.73, pressure: 63,  activity: 68,  risk: 'medium',   size: 36 },
];

export const edges = [
  { from: 'dashboard',  to: 'portfolio',   weight: 0.9, congestion: 0.7, label: 'Portfolio Access' },
  { from: 'dashboard',  to: 'reports',     weight: 0.8, congestion: 0.5, label: 'Report View' },
  { from: 'dashboard',  to: 'crm',         weight: 0.7, congestion: 0.6, label: 'CRM Access' },
  { from: 'dashboard',  to: 'documents',   weight: 0.6, congestion: 0.4, label: 'Doc Access' },
  { from: 'portfolio',  to: 'portcreate',  weight: 0.8, congestion: 0.5, label: 'New Portfolio' },
  { from: 'portfolio',  to: 'reports',     weight: 0.7, congestion: 0.4, label: 'Portfolio Reports' },
  { from: 'portfolio',  to: 'analytics',   weight: 0.6, congestion: 0.3, label: 'Performance Review' },
  { from: 'crm',        to: 'ir',          weight: 0.7, congestion: 0.3, label: 'Investor Outreach' },
  { from: 'crm',        to: 'documents',   weight: 0.6, congestion: 0.4, label: 'Doc Attach' },
  { from: 'documents',  to: 'reports',     weight: 0.7, congestion: 0.5, label: 'Doc to Report' },
  { from: 'portcreate', to: 'approvals',   weight: 0.8, congestion: 0.85, label: 'Approval Request' },
  { from: 'deals',      to: 'approvals',   weight: 0.7, congestion: 0.9, label: 'Deal Approval' },
  { from: 'approvals',  to: 'documents',   weight: 0.6, congestion: 0.6, label: 'Sign-off Docs' },
  { from: 'datafeed',   to: 'analytics',   weight: 0.7, congestion: 0.4, label: 'Data Pipeline' },
  { from: 'datafeed',   to: 'portfolio',   weight: 0.6, congestion: 0.3, label: 'Market Data' },
  { from: 'analytics',  to: 'reports',     weight: 0.5, congestion: 0.3, label: 'Insight Export' },
  { from: 'ir',         to: 'reports',     weight: 0.5, congestion: 0.2, label: 'Investor Reports' },
  { from: 'finance',    to: 'reports',     weight: 0.5, congestion: 0.3, label: 'Finance Reports' },
];

export const insights = [
  { id: 1, severity: 'critical', title: 'Approval Workflow Needs Attention', desc: 'Portfolio Creation to Approvals queue: 12 requests exceeding target response by 2.8hrs', time: '2m ago' },
  { id: 2, severity: 'high',     title: 'High Usage Journey Detected', desc: 'Dashboard to Portfolio to Reports path sees 340 daily sessions. Consider shortcut.', time: '7m ago' },
  { id: 3, severity: 'medium',   title: 'CRM Adoption Surge',           desc: 'CRM module activity up 41% this week — investor outreach season detected.', time: '15m ago' },
  { id: 4, severity: 'low',      title: 'Document Utilization Pattern', desc: '68% of document views concentrate on 12 files. Auto-surface recommended.', time: '28m ago' },
  { id: 5, severity: 'info',     title: 'Productivity Opportunity',      desc: 'Predicted 24% workflow acceleration if Portfolio Creation steps reduce from 7 to 4.', time: '1h ago' },
];