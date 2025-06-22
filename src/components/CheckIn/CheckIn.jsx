import React, { useState } from 'react';
import { Search, UserCheck, UserX, Clock } from 'lucide-react';
import { members, checkIns } from '../../data/mockData';

export default function CheckIn() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const todayCheckIns = checkIns.filter(checkIn => 
    checkIn.date === new Date().toISOString().split('T')[0]
  );

  const handleCheckIn = (memberId) => {
    // Implement check-in functionality
    console.log('Check in member:', memberId);
  };

  const handleCheckOut = (memberId) => {
    // Implement check-out functionality
    console.log('Check out member:', memberId);
  };

  const getMemberCheckInStatus = (memberId) => {
    const todayCheckIn = todayCheckIns.find(c => c.memberId === memberId);
    if (!todayCheckIn) return 'not_checked_in';
    if (todayCheckIn.checkOutTime) return 'checked_out';
    return 'checked_in';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">تسجيل الحضور والانصراف</h2>
        <p className="text-gray-600 mt-1">إدارة دخول وخروج الأعضاء</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Search & Check-in */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">البحث عن عضو</h3>
          
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث بالاسم أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredMembers.map(member => {
              const status = getMemberCheckInStatus(member.id);
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedMember(member.id)}
                >
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.phone}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      status === 'checked_in' 
                        ? 'bg-green-100 text-green-700'
                        : status === 'checked_out'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {status === 'checked_in' && 'داخل الجيم'}
                      {status === 'checked_out' && 'خرج اليوم'}
                      {status === 'not_checked_in' && 'لم يدخل اليوم'}
                    </div>
                    
                    {status === 'not_checked_in' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckIn(member.id);
                        }}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <UserCheck size={16} />
                      </button>
                    )}
                    
                    {status === 'checked_in' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckOut(member.id);
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <UserX size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Check-ins */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">حضور اليوم</h3>
          
          <div className="space-y-3">
            {todayCheckIns.map(checkIn => {
              const member = members.find(m => m.id === checkIn.memberId);
              if (!member) return null;
              
              return (
                <div key={checkIn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>دخل: {new Date(checkIn.checkInTime).toLocaleTimeString('ar-EG', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}</span>
                      </div>
                      {checkIn.checkOutTime && (
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>خرج: {new Date(checkIn.checkOutTime).toLocaleTimeString('ar-EG', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    checkIn.checkOutTime 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {checkIn.checkOutTime ? 'خرج' : 'داخل الجيم'}
                  </div>
                </div>
              );
            })}
          </div>
          
          {todayCheckIns.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">لا يوجد حضور اليوم بعد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}