export type Student = {
  id: string;
  name: string;
  class: string;
  contact: string;
  feesStatus: 'Paid' | 'Pending' | 'Overdue';
  attendance: 'Present' | 'Absent' | 'Late' | null;
  batch: string;
  joinDate: string;
  performance: number; // 0-100
};

export type NavItem = {
  id: string;
  label: string;
  icon: string;
};

export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Alex Johnson', class: 'Grade 10', contact: '+1 234 567 890', feesStatus: 'Paid', attendance: 'Present', batch: 'Morning A', joinDate: '2023-09-15', performance: 88 },
  { id: '2', name: 'Sarah Williams', class: 'Grade 12', contact: '+1 234 567 891', feesStatus: 'Pending', attendance: 'Absent', batch: 'Evening B', joinDate: '2023-10-01', performance: 92 },
  { id: '3', name: 'Michael Chen', class: 'Grade 10', contact: '+1 234 567 892', feesStatus: 'Paid', attendance: 'Present', batch: 'Morning A', joinDate: '2023-08-20', performance: 75 },
  { id: '4', name: 'Emily Davis', class: 'Grade 11', contact: '+1 234 567 893', feesStatus: 'Overdue', attendance: 'Late', batch: 'Afternoon C', joinDate: '2023-11-12', performance: 81 },
  { id: '5', name: 'James Wilson', class: 'Grade 12', contact: '+1 234 567 894', feesStatus: 'Paid', attendance: 'Present', batch: 'Evening B', joinDate: '2023-07-05', performance: 95 },
  { id: '6', name: 'Jessica Taylor', class: 'Grade 11', contact: '+1 234 567 895', feesStatus: 'Pending', attendance: 'Present', batch: 'Afternoon C', joinDate: '2023-12-01', performance: 68 },
  { id: '7', name: 'David Miller', class: 'Grade 10', contact: '+1 234 567 896', feesStatus: 'Paid', attendance: 'Present', batch: 'Morning A', joinDate: '2023-09-22', performance: 84 },
  { id: '8', name: 'Sophia Moore', class: 'Grade 12', contact: '+1 234 567 897', feesStatus: 'Paid', attendance: 'Absent', batch: 'Evening B', joinDate: '2023-10-15', performance: 90 },
];

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 4500, students: 120 },
  { month: 'Feb', revenue: 5200, students: 135 },
  { month: 'Mar', revenue: 4800, students: 142 },
  { month: 'Apr', revenue: 6100, students: 158 },
  { month: 'May', revenue: 5900, students: 165 },
  { month: 'Jun', revenue: 7200, students: 180 },
];
