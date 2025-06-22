import React from 'react';
import { Phone, Mail, Clock, Calendar, DollarSign, User } from 'lucide-react';

export default function CoachCard({ coach, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      {/* Coach Header */}
      <div className="bg-blue-50 p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{coach.name}</h3>
              <p className="text-blue-600 text-sm">{coach.specialty}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(coach)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              تعديل
            </button>
            <button 
              onClick={() => onDelete(coach.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              حذف
            </button>
          </div>
        </div>
      </div>

      {/* Coach Details */}
      <div className="p-4 space-y-4">
        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{coach.phone}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-700 break-all">{coach.email}</span>
          </div>
        </div>

        {/* Working Hours */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">ساعات العمل</p>
              <p className="text-gray-700">
                {coach.workingHours.start} - {coach.workingHours.end}
              </p>
            </div>
          </div>
        </div>

        {/* Working Days */}
        <div className="flex items-start gap-3">
          <Calendar size={18} className="text-gray-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-500">أيام العمل</p>
            <p className="text-gray-700">
              {coach.workingDays.join('، ')}
            </p>
          </div>
        </div>

        {/* Salary Info */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3">
            <DollarSign size={18} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-6">
              <div>
                <p className="text-sm text-gray-500">الراتب الأساسي</p>
                <p className="text-gray-700">{coach.salary.toLocaleString()} ر.س</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">نسبة العمولة</p>
                <p className="text-gray-700">{coach.commissionRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}