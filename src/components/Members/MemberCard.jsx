import React from 'react';
import { Phone, Mail, Calendar, User, AlertCircle } from 'lucide-react';

export default function MemberCard({ member, subscription, onEdit, onDelete }) {
  const isSubscriptionExpiring = subscription && (() => {
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  })();

  const subscriptionTypeLabels = {
    monthly: 'شهري',
    quarterly: 'ربع سنوي',
    yearly: 'سنوي',
    daily: 'يومي'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.age} سنة</p>
          </div>
        </div>
        
        {isSubscriptionExpiring && (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
            <AlertCircle size={12} />
            <span>ينتهي قريباً</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone size={16} />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail size={16} />
          <span>{member.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>انضم في {new Date(member.joinDate).toLocaleDateString('ar-EG')}</span>
        </div>
      </div>

      {subscription && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">نوع الاشتراك</span>
            <span className="text-sm text-gray-900">{subscriptionTypeLabels[subscription.type]}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">المبلغ</span>
            <span className="text-sm text-gray-900">{subscription.price} جنيه</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">ينتهي في</span>
            <span className="text-sm text-gray-900">
              {new Date(subscription.endDate).toLocaleDateString('ar-EG')}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(member)}
          className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          تعديل
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="flex-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
        >
          حذف
        </button>
      </div>
    </div>
  );
}