import React, { useState } from 'react';
import { Search, Plus, Filter, Calendar, Clock, Users, DollarSign, User } from 'lucide-react';
import { classes, coaches } from '../data/mockData';

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCoach, setFilterCoach] = useState('all');
  const [expandedClassId, setExpandedClassId] = useState(null);

  // Get coach name by ID
  const getCoachName = (coachId) => {
    const coach = coaches.find(c => c.id === coachId);
    return coach ? coach.name : 'غير معين';
  };

  // Map day numbers to Arabic names
  const dayNames = {
    0: 'الأحد',
    1: 'الإثنين',
    2: 'الثلاثاء',
    3: 'الأربعاء',
    4: 'الخميس',
    5: 'الجمعة',
    6: 'السبت'
  };

  // Filter classes
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterCoach !== 'all' && cls.coachId !== filterCoach) return false;
    
    return true;
  });

  // Toggle class expansion
  const toggleExpand = (classId) => {
    setExpandedClassId(expandedClassId === classId ? null : classId);
  };

  // Handle actions
  const handleEditClass = (cls) => console.log('Edit class:', cls);
  const handleDeleteClass = (classId) => console.log('Delete class:', classId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الحصص</h2>
          <p className="text-gray-600 mt-1">إدارة جدول الحصص والمدربين</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          إضافة حصة جديدة
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ابحث باسم الحصة أو الوصف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Coach Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterCoach}
              onChange={(e) => setFilterCoach(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع المدربين</option>
              {coaches.map(coach => (
                <option key={coach.id} value={coach.id}>{coach.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {filteredClasses.length > 0 ? (
          filteredClasses.map(cls => (
            <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Class Header */}
              <div className="bg-blue-50 p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                    <p className="text-blue-600 text-sm">{cls.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleEditClass(cls)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      تعديل
                    </button>
                    <button 
                      onClick={() => handleDeleteClass(cls.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      حذف
                    </button>
                    <button 
                      onClick={() => toggleExpand(cls.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedClassId === cls.id ? (
                        <span className="flex items-center gap-1">
                          <span>إخفاء</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <span>التفاصيل</span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Class Summary */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">المدرب</p>
                    <p className="text-gray-700">{getCoachName(cls.coachId)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">السعة</p>
                    <p className="text-gray-700">{cls.maxCapacity} أشخاص</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">المدة</p>
                    <p className="text-gray-700">{cls.duration} دقيقة</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">السعر</p>
                    <p className="text-gray-700">{cls.price} ر.س</p>
                  </div>
                </div>
              </div>

              {/* Schedule Details - Collapsible */}
              {expandedClassId === cls.id && (
                <div className="p-4 bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-3">جدول الحصص</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {cls.schedule.map((session, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-3">
                        <Calendar size={18} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700 font-medium">{dayNames[session.dayOfWeek]}</p>
                          <p className="text-sm text-gray-500">{session.startTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد حصص مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
}