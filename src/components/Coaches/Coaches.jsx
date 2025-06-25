import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import CoachCard from './CoachesCards';
import { useSelector } from 'react-redux';
import DeleteCoachModal from './DeleteCoachModal';
import { useNavigate } from 'react-router-dom';

export default function Coaches() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const coaches = useSelector(state => state.coaches.coaches);
  const navigate = useNavigate();

  // Filter coaches based on search and specialty
  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.phone.includes(searchTerm) ||
                         coach.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterSpecialty === 'all') return true;
    return coach.specialty && coach.specialty.includes(filterSpecialty);
  });

  // Handle edit coach
  const handleEditCoach = (coach) => {
    navigate(`/editCoach/${coach.id}`);
  };

  // Handle delete coach
  const handleDeleteCoach = (coachId) => {
    const coach = coaches.find(c => c.id === coachId);
    setSelectedCoach(coach);
    setShowDeleteModal(true);
  };

  // Get unique specialties for filter dropdown
  const specialties = ['all', ...new Set(coaches.map(coach => coach.specialty))];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المدربين</h2>
          <p className="text-gray-600 mt-1">إدارة معلومات المدربين وجداول عملهم</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => navigate('/addCoach')}
        >
          <Plus size={20} />
          إضافة مدرب جديد
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث بالاسم أو رقم الهاتف أو البريد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Specialty Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'جميع التخصصات' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map(coach => (
          <CoachCard
            key={coach.id}
            coach={coach}
            onEdit={handleEditCoach}
            onDelete={handleDeleteCoach}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCoaches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد نتائج مطابقة للبحث</p>
        </div>
      )}

      <DeleteCoachModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} coach={selectedCoach} />
    </div>
  );
}