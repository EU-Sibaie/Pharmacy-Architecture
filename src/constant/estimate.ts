export const estimateFiltersOptions = [
    { label: 'Estimate No', name: 'estimateNo', type: 'input' },
    { label: 'Contact', name: 'contactId', type: 'dropdown' },
    { label: 'Company', name: 'companyId', type: 'dropdown' },
    { label: 'Status', name: 'status', type: 'dropdown' },
    { label: 'Total AMount Min', name: 'totalAmountMin', type: 'input', isNumber: true },
    { label: 'Total AMount Max', name: 'totalAmountMax', type: 'input', isNumber: true },
    { label: 'Estimation Date', name: 'estimationDate', type: 'date' },
  ]

  export const columnsEstimate = [
    {
      id: '0',
      label: 'Estimate No',
      show: true,
    },
    {
      id: '1',
      label: 'Contact',
      show: true,
    },
    {
      id: '2',
      label: 'Company',
      show: true,
    },
    {
      id: '3',
      label: 'Estimation Date',
      show: true,
    },
    {
      id: '4',
      label: 'Total Amount',
      show: true,
    },
    {
      id: '5',
      label: 'Status',
      show: true,
    },
    {
      id: '6',
      label: 'Actions',
      show: true,
    },
  ];