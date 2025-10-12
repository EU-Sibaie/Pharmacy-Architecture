export const projectTypes = ['Design', 'Revision', 'As-Build', 'Rev W/Pay', 'Rev W/O Pay'];
export const projectStatuses = ['Not Ready', 'Ready to Start', 'InProgress', 'On Hold', 'Completed'];

export const projectFilterTypes = [
  { id: 1, name: 'Design' },
  { id: 2, name: 'Revision' },
  { id: 3, name: 'As-Build' },
  { id: 4, name: 'Rev W/Pay' },
  { id: 5, name: 'Rev W/O Pay' },
];

export const projectFilterStatuses = [
  { id: 1, name: 'Not Ready' },
  { id: 2, name: 'Ready to Start' },
  { id: 3, name: 'InProgress' },
  { id: 4, name: 'On Hold' },
  { id: 5, name: 'Completed' },
];

export const jobFiltersOptions = [
  { label: 'Contact', name: 'contactId', type: 'dropdown' },
  { label: 'Company', name: 'companyId', type: 'dropdown' },
  { label: 'Estimated Cost Max', name: 'estimatedCostMax', type: 'input', isNumber: true },
  { label: 'Estimated Cost Min', name: 'estimatedCostMin', type: 'input', isNumber: true },
  { label: 'Date Created', name: 'dateCreated', type: 'date' },
];

export const badgeProjectStatuses = [
  {
    label: 'Not Ready',
    value: 'not_ready',
    textColor: '#344054',
    bgColor: '#f2f4f7',
  },
  {
    label: 'Ready to Start',
    value: 'ready_to_start',
    textColor: '#93370d',
    bgColor: '#fff6ed',
  },
  {
    label: 'InProgress',
    value: 'in_progress',
    textColor: '#175cd3',
    bgColor: '#eef4ff',
  },
  {
    label: 'On Hold',
    value: 'on_hold',
    textColor: '#912018',
    bgColor: '#fef3f2',
  },
  {
    label: 'Completed',
    value: 'completed',
    textColor: '#027a48',
    bgColor: '#ecfdf3',
  },
];

export const jobContact = [
  {
    id: '0',
    label: 'ID',
    show: true,
  },
  {
    id: '1',
    label: 'Name',
    show: true,
  },
  {
    id: '2',
    label: 'Type',
    show: true,
  },
  {
    id: '3',
    label: 'Status',
    show: true,
  },
  {
    id: '4',
    label: 'Est. Cost',
    show: true,
  },
  {
    id: '5',
    label: 'Employee',
    show: true,
  },
  {
    id: '6',
    label: 'Contact',
    show: true,
  },
  {
    id: '7',
    label: 'Company',
    show: true,
  },
  {
    id: '8',
    label: 'Actions',
    show: true,
  },
  {
    id: '9',
    label: 'Info',
    show: true,
  },
];
