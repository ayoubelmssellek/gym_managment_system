import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import MemberCard from './MemberCard';
import { members, subscriptions } from '../../data/mockData';

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    
    if (!matchesSearch) return false;
    
    if (filterStatus === 'all') return true;
    
    const subscription = subscriptions.find(s => s.memberId === member.id);
    if (filterStatus === 'active') {
      return subscription?.isActive;
    } else {
      return !subscription?.isActive;
    }
  });

  const handleEditMember = (member) => {
    // Implement edit functionality
    console.log('Edit member:', member);
  };

  const handleDeleteMember = (memberId) => {
    // Implement delete functionality
    console.log('Delete member:', memberId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الأعضاء</h2>
          <p className="text-gray-600 mt-1">إدارة معلومات الأعضاء واشتراكاتهم</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          إضافة عضو جديد
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث بالاسم أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الأعضاء</option>
              <option value="active">الأعضاء النشطين</option>
              <option value="expired">الاشتراكات المنتهية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => (
          <MemberCard
            key={member.id}
            member={member}
            subscription={subscriptions.find(s => s.memberId === member.id)}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد نتائج مطابقة للبحث</p>
        </div>
      )}
    </div>
  );
}