/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  CreditCard, 
  BarChart3, 
  Layers, 
  FileText, 
  Bell, 
  Settings, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Download,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  Send,
  Edit,
  Trash2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { MOCK_STUDENTS, REVENUE_DATA, type Student } from './types';

// --- Components ---

const StatCard = ({ title, value, change, icon: Icon, trend, variant = 'light' }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "glass-card p-8 flex flex-col gap-6 relative overflow-hidden group",
      variant === 'dark' ? "bg-slate-900 text-white border-none" : ""
    )}
  >
    {variant === 'dark' && (
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-500/20 rounded-full blur-3xl group-hover:bg-brand-500/40 transition-all" />
    )}
    <div className="flex justify-between items-start relative z-10">
      <div className={cn(
        "p-4 rounded-2xl",
        variant === 'dark' ? "bg-white/10 text-white" : "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
      )}>
        <Icon size={28} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
        trend === 'up' 
          ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
          : "text-rose-600 bg-rose-50 dark:bg-rose-900/20"
      )}>
        {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {change}
      </div>
    </div>
    <div className="relative z-10">
      <p className={cn(
        "text-sm font-medium",
        variant === 'dark' ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
      )}>{title}</p>
      <h3 className="text-3xl font-bold mt-2 tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  };
  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", variants[variant])}>
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-xl font-bold font-display">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Pages ---

const DashboardPage = () => {
  return (
    <div className="space-y-10 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-100/50 dark:bg-brand-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-slate-200/50 dark:bg-slate-800/10 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="brand">Overview</Badge>
          <h1 className="text-4xl font-bold font-display tracking-tight">Welcome back, <br/><span className="text-brand-600">Administrator</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">Here's what's happening at your tuition centre today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <CalendarCheck size={18} /> Schedule
          </button>
          <button className="btn-primary">
            <Plus size={20} /> Add Student
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Students" value="1,284" change="+12%" icon={Users} trend="up" variant="dark" />
        <StatCard title="Fees Collected" value="₹4.2L" change="+8.2%" icon={CreditCard} trend="up" />
        <StatCard title="Fees Pending" value="₹85K" change="-2.4%" icon={Clock} trend="down" />
        <StatCard title="Today Attendance" value="94%" change="+1.5%" icon={CalendarCheck} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold font-display">Revenue Growth</h3>
              <p className="text-sm text-slate-500">Monthly collection analysis</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold px-4 py-2 focus:ring-2 focus:ring-brand-500">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6fbf9e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6fbf9e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e9f2" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6b7c93', fontSize: 12, fontWeight: 600}} 
                  dy={15} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6b7c93', fontSize: 12, fontWeight: 600}} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6fbf9e" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-display">Recent Activity</h3>
            <button className="text-brand-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-8">
            {[
              { user: 'Rahul S.', action: 'paid monthly fees', time: '2 mins ago', icon: CreditCard, color: 'emerald' },
              { user: 'Priya K.', action: 'marked as absent', time: '15 mins ago', icon: X, color: 'rose' },
              { user: 'New Batch', action: 'Physics Grade 12 started', time: '1 hour ago', icon: Layers, color: 'brand' },
              { user: 'System', action: 'Monthly reports generated', time: '3 hours ago', icon: FileText, color: 'amber' },
              { user: 'Amit V.', action: 'joined Morning Batch A', time: '5 hours ago', icon: Users, color: 'brand' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                  activity.color === 'brand' ? "bg-brand-50 text-brand-600 dark:bg-brand-900/30" :
                  activity.color === 'emerald' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30" :
                  activity.color === 'rose' ? "bg-rose-50 text-rose-600 dark:bg-rose-900/30" :
                  "bg-amber-50 text-amber-600 dark:bg-amber-900/30"
                )}>
                  <activity.icon size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    <span className="text-brand-600">{activity.user}</span> {activity.action}
                  </p>
                  <span className="text-xs text-slate-400 font-medium mt-1">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-brand-600 rounded-3xl text-white relative overflow-hidden group cursor-pointer shadow-xl shadow-brand-600/20">
            <div className="relative z-10">
              <p className="text-xs font-bold opacity-80 mb-1 uppercase tracking-wider">Pro Tip</p>
              <h4 className="font-bold text-lg leading-tight mb-3">Automate fee reminders via WhatsApp</h4>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold hover:bg-white/30 transition-all">
                Learn More
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20 group-hover:scale-110 transition-transform">
              <Bell size={80} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold font-display">Recent Enrollments</h3>
              <p className="text-sm text-slate-500">Latest students joined this week</p>
            </div>
            <button className="text-sm font-bold text-brand-600 hover:underline">View All Students</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5 font-bold">Student</th>
                  <th className="px-8 py-5 font-bold">Batch</th>
                  <th className="px-8 py-5 font-bold">Status</th>
                  <th className="px-8 py-5 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_STUDENTS.slice(0, 4).map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-bold">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">{student.batch}</td>
                    <td className="px-8 py-5">
                      <Badge variant={student.feesStatus === 'Paid' ? 'success' : student.feesStatus === 'Pending' ? 'warning' : 'danger'}>
                        {student.feesStatus}
                      </Badge>
                    </td>
                    <td className="px-8 py-5">
                      <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <MoreVertical size={18} className="text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-display">Active Batches</h3>
            <button className="text-brand-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-8">
            {[
              { name: 'Mathematics Advanced', time: '10:00 AM', students: 24, progress: 75, color: 'brand' },
              { name: 'Physics Grade 12', time: '01:30 PM', students: 18, progress: 45, color: 'emerald' },
              { name: 'Chemistry Practical', time: '04:00 PM', students: 15, progress: 90, color: 'amber' },
            ].map((batch, i) => (
              <div key={i} className="space-y-4 group cursor-pointer">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 transition-colors">{batch.name}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-2">
                      <Clock size={12} /> {batch.time} • <Users size={12} /> {batch.students} Students
                    </p>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{batch.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${batch.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={cn(
                      "h-full rounded-full",
                      batch.color === 'brand' ? "bg-brand-600" :
                      batch.color === 'emerald' ? "bg-emerald-600" :
                      "bg-amber-600"
                    )} 
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-sm font-bold hover:border-brand-500 hover:text-brand-600 transition-all flex items-center justify-center gap-2">
            <Plus size={18} /> Create New Batch
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentsPage = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="space-y-10 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-100/40 dark:bg-brand-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-brand-50/50 dark:bg-brand-900/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="brand">Student Directory</Badge>
          <h1 className="text-4xl font-bold font-display tracking-tight">Manage your <br/><span className="text-brand-600">Students</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">View, search, and manage all enrolled students across your batches.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={20} /> Add Student
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Student">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input type="text" placeholder="e.g. John Doe" className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 text-sm font-medium" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Class / Grade</label>
              <input type="text" placeholder="e.g. Grade 10" className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 text-sm font-medium" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
            <input type="tel" placeholder="+1 234 567 890" className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 text-sm font-medium" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Batch Assignment</label>
            <select className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 text-sm font-medium">
              <option>Morning A (10:00 AM)</option>
              <option>Evening B (04:00 PM)</option>
              <option>Afternoon C (01:30 PM)</option>
            </select>
          </div>
          <div className="pt-4 flex gap-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-4 bg-brand-500 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all active:scale-95">Save Student</button>
          </div>
        </form>
      </Modal>

      <div className="glass-card overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or class..." 
              className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 text-sm font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all">
              <Filter size={18} /> Filters
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all">
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-5 font-bold">Student</th>
                <th className="px-8 py-5 font-bold">Class</th>
                <th className="px-8 py-5 font-bold">Contact</th>
                <th className="px-8 py-5 font-bold">Join Date</th>
                <th className="px-8 py-5 font-bold">Fees Status</th>
                <th className="px-8 py-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-lg">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">{student.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{student.batch}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300">
                      {student.class}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{student.contact}</td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{student.joinDate}</td>
                  <td className="px-8 py-5">
                    <Badge variant={student.feesStatus === 'Paid' ? 'success' : student.feesStatus === 'Pending' ? 'warning' : 'danger'}>
                      {student.feesStatus}
                    </Badge>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 hover:bg-brand-50 dark:hover:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2.5 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">Showing {filteredStudents.length} of {MOCK_STUDENTS.length} students</p>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold disabled:opacity-50 transition-all" disabled>Previous</button>
            <button className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-600/20">1</button>
            <button className="px-5 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AttendancePage = () => {
  const [selectedBatch, setSelectedBatch] = useState('Morning A');
  
  return (
    <div className="space-y-10 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-100/40 dark:bg-brand-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-brand-50/50 dark:bg-brand-900/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="brand">Attendance Tracker</Badge>
          <h1 className="text-4xl font-bold font-display tracking-tight">Daily student <br/><span className="text-brand-600">Attendance</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">Mark and track daily student attendance with ease and precision.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-6 py-3 flex items-center gap-3 text-sm font-bold">
            <CalendarCheck size={20} className="text-brand-600" />
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-8">
            <h3 className="text-lg font-bold font-display mb-6">Select Batch</h3>
            <div className="space-y-3">
              {['Morning A', 'Evening B', 'Afternoon C', 'Weekend Special'].map((batch) => (
                <button 
                  key={batch}
                  onClick={() => setSelectedBatch(batch)}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                    selectedBatch === batch 
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  {batch}
                </button>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-8 bg-brand-600 text-white border-none relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <h3 className="text-lg font-bold font-display mb-2 relative z-10">Attendance Summary</h3>
            <p className="text-brand-100 text-sm mb-8 relative z-10">Batch: {selectedBatch}</p>
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Present</span>
                  <span>18 / 21</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    className="bg-white h-full rounded-full" 
                  />
                </div>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-brand-100">Absent</span>
                <span>2</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-brand-100">Late</span>
                <span>1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 glass-card overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold font-display">Mark Attendance</h3>
              <p className="text-sm text-slate-500">Update status for each student</p>
            </div>
            <button className="text-sm font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-4 py-2 rounded-xl transition-all">Mark All Present</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {MOCK_STUDENTS.filter(s => s.batch === selectedBatch).map((student) => (
              <div key={student.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-lg">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">{student.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{student.class}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all">
                    <CheckCircle2 size={18} /> Present
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 border border-transparent transition-all">
                    <XCircle size={18} /> Absent
                  </button>
                  <button className="p-3 text-slate-300 hover:text-amber-500 transition-colors">
                    <Clock size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
            <button className="btn-primary px-10">Save Attendance</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeesPage = () => {
  return (
    <div className="space-y-10 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-100/40 dark:bg-brand-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-brand-50/50 dark:bg-brand-900/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="brand">Finance Dashboard</Badge>
          <h1 className="text-4xl font-bold font-display tracking-tight">Fees & <br/><span className="text-brand-600">Revenue Management</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">Track payments, manage pending dues, and automate fee reminders.</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} /> Record Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 border-l-4 border-emerald-500">
          <p className="text-slate-500 text-sm font-bold">Total Collected</p>
          <h3 className="text-4xl font-bold mt-2">₹1,42,850</h3>
          <div className="text-emerald-600 text-xs font-bold mt-4 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={14} /> +12.5% from last month
          </div>
        </div>
        <div className="glass-card p-8 border-l-4 border-amber-500">
          <p className="text-slate-500 text-sm font-bold">Pending Dues</p>
          <h3 className="text-4xl font-bold mt-2">₹28,400</h3>
          <div className="text-amber-600 text-xs font-bold mt-4 flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 w-fit px-2 py-1 rounded-full">
            <Clock size={14} /> 14 students overdue
          </div>
        </div>
        <div className="glass-card p-8 border-l-4 border-brand-500">
          <p className="text-slate-500 text-sm font-bold">Expected Revenue</p>
          <h3 className="text-4xl font-bold mt-2">₹1,71,250</h3>
          <p className="text-brand-600 text-xs font-bold mt-4 bg-brand-50 dark:bg-brand-900/20 w-fit px-2 py-1 rounded-full">Current billing cycle</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold font-display">Pending Payments</h3>
            <p className="text-sm text-slate-500">Students with outstanding balances</p>
          </div>
          <button className="text-brand-600 font-bold text-sm flex items-center gap-2 hover:underline bg-brand-50 dark:bg-brand-900/20 px-4 py-2 rounded-xl transition-all">
            <Send size={18} /> Send All Reminders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-5 font-bold">Student</th>
                <th className="px-8 py-5 font-bold">Amount</th>
                <th className="px-8 py-5 font-bold">Due Date</th>
                <th className="px-8 py-5 font-bold">Status</th>
                <th className="px-8 py-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_STUDENTS.filter(s => s.feesStatus !== 'Paid').map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-lg">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">{student.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{student.class}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-900 dark:text-slate-100">$450.00</td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">Oct 15, 2023</td>
                  <td className="px-8 py-5">
                    <Badge variant={student.feesStatus === 'Pending' ? 'warning' : 'danger'}>
                      {student.feesStatus}
                    </Badge>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="px-5 py-2.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-xl text-xs font-bold hover:bg-brand-500 hover:text-white transition-all">
                      Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PerformancePage = () => {
  return (
    <div className="space-y-10 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-100/40 dark:bg-brand-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-brand-50/50 dark:bg-brand-900/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="brand">Academic Insights</Badge>
          <h1 className="text-4xl font-bold font-display tracking-tight">Student <br/><span className="text-brand-600">Performance Tracking</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">Monitor student progress, analyze results, and identify top performers.</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} /> Enter Marks
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold font-display">Average Class Performance</h3>
              <p className="text-sm text-slate-500">Subject-wise analysis</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-500" />
                <span className="text-xs font-bold text-slate-500">Average</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-200" />
                <span className="text-xs font-bold text-slate-500">Top Score</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { subject: 'Math', avg: 78, top: 98 },
                { subject: 'Physics', avg: 72, top: 95 },
                { subject: 'Chemistry', avg: 85, top: 100 },
                { subject: 'Biology', avg: 82, top: 96 },
                { subject: 'English', avg: 88, top: 94 },
              ]}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6fbf9e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6fbf9e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e9f2" />
                <XAxis 
                  dataKey="subject" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6b7c93', fontSize: 12, fontWeight: 600}} 
                  dy={15} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6b7c93', fontSize: 12, fontWeight: 600}} 
                  domain={[0, 100]} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                />
                <Area type="monotone" dataKey="avg" stroke="#6fbf9e" strokeWidth={4} fillOpacity={1} fill="url(#colorAvg)" />
                <Area type="monotone" dataKey="top" stroke="#4faf88" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold font-display mb-8">Top Performers</h3>
          <div className="space-y-8">
            {MOCK_STUDENTS.sort((a, b) => b.performance - a.performance).slice(0, 5).map((student, i) => (
              <div key={student.id} className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xl text-slate-700 dark:text-slate-300 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 transition-colors">
                    {student.name.charAt(0)}
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold border-4 border-white dark:border-slate-900 shadow-lg">
                    #{i + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{student.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{student.class}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-600 text-lg">{student.performance}%</p>
                  <div className="w-20 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${student.performance}%` }}
                      className="bg-brand-600 h-full rounded-full" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-all">
            View All Results
          </button>
        </div>
      </div>
    </div>
  );
};

const BatchesPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
    <div className="w-24 h-24 bg-brand-50 dark:bg-brand-900/20 rounded-3xl flex items-center justify-center text-brand-600">
      <Layers size={48} />
    </div>
    <div className="text-center">
      <h2 className="text-2xl font-bold font-display">Batches Management</h2>
      <p className="text-slate-500 mt-2">This module is coming soon in the next update.</p>
    </div>
    <button className="btn-primary">Notify Me</button>
  </div>
);

const ReportsPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
    <div className="w-24 h-24 bg-brand-50 dark:bg-brand-900/20 rounded-3xl flex items-center justify-center text-brand-600">
      <FileText size={48} />
    </div>
    <div className="text-center">
      <h2 className="text-2xl font-bold font-display">Advanced Reports</h2>
      <p className="text-slate-500 mt-2">Detailed analytics and reporting tools are being developed.</p>
    </div>
    <button className="btn-primary">Back to Dashboard</button>
  </div>
);

// --- Main Layout ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'batches', label: 'Batches', icon: Layers },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage />;
      case 'students': return <StudentsPage />;
      case 'attendance': return <AttendancePage />;
      case 'fees': return <FeesPage />;
      case 'performance': return <PerformancePage />;
      case 'batches': return <BatchesPage />;
      case 'reports': return <ReportsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className={cn("min-h-screen flex", isDarkMode ? "dark" : "")}>
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 lg:relative lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full lg:hidden"
      )}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-600/30">
              <BarChart3 size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-display tracking-tight">EduPulse</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management System</span>
            </div>
            <button 
              className="lg:hidden ml-auto p-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" 
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "sidebar-item w-full group",
                  activeTab === item.id && "sidebar-item-active"
                )}
              >
                <item.icon size={22} className={cn("transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "text-slate-400")} />
                <span className="font-bold">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="active-pill" 
                    className="ml-auto w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <button className="sidebar-item w-full group">
              <Bell size={22} className="text-slate-400 group-hover:text-brand-600 transition-colors" />
              <span className="font-bold">Notifications</span>
              <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/30">4</span>
            </button>
            <button className="sidebar-item w-full group">
              <Settings size={22} className="text-slate-400 group-hover:text-brand-600 transition-colors" />
              <span className="font-bold">Settings</span>
            </button>
            
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-lg">
                  JD
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">John Doe</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Administrator</span>
                </div>
              </div>
              <button className="w-full py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
        {/* TopBar */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors shadow-sm" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-sm w-64 lg:w-96"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold group-hover:text-brand-500 transition-colors">Admin Panel</p>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Premium Plan</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
