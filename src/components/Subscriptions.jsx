import React, { useState } from 'react';
import { Search, Plus, Filter, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, CreditCard, CircleDollarSign } from 'lucide-react';
import { subscriptions, members } from '../data/mockData';

export default function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState(null);

  // Get member name by ID
  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'عضو غير معروف';
  };

  // Filter subscriptions
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = getMemberName(subscription.memberId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.price.toString().includes(searchTerm);
    
    if (!matchesSearch) return false;
    
    if (filterType !== 'all' && subscription.type !== filterType) return false;
    
    if (filterStatus !== 'all') {
      if (filterStatus === 'active' && !subscription.isActive) return false;
      if (filterStatus === 'payment' && subscription.paymentStatus !== 'PAID') return false;
    }
    
    return true;
  });

  // Subscription type options
  const subscriptionTypes = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'MONTHLY', label: 'شهري' },
    { value: 'QUARTERLY', label: 'ربع سنوي' },
    { value: 'YEARLY', label: 'سنوي' }
  ];

  // Subscription status options
  const subscriptionStatuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'active', label: 'نشطة فقط' },
    { value: 'payment', label: 'مدفوعة فقط' }
  ];

  // Toggle subscription expansion
  const toggleExpand = (subscriptionId) => {
    setExpandedSubscriptionId(expandedSubscriptionId === subscriptionId ? null : subscriptionId);
  };

  // Handle actions
  const handleEditSubscription = (subscription) => console.log('Edit subscription:', subscription);
  const handleDeleteSubscription = (subscriptionId) => console.log('Delete subscription:', subscriptionId);
  const handleRenewSubscription = (subscriptionId) => console.log('Renew subscription:', subscriptionId);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Get status info
  const getStatusInfo = (subscription) => {
    if (!subscription.isActive) {
      return { text: 'منتهية', color: 'text-red-500', icon: <XCircle size={18} /> };
    }
    if (subscription.paymentStatus !== 'PAID') {
      return { text: 'بانتظار الدفع', color: 'text-yellow-500', icon: <AlertCircle size={18} /> };
    }
    return { text: 'نشطة', color: 'text-green-500', icon: <CheckCircle size={18} /> };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الاشتراكات</h2>
          <p className="text-gray-600 mt-1">تتبع اشتراكات الأعضاء وتجديدها</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          إضافة اشتراك جديد
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
              placeholder="ابحث باسم العضو أو سعر الاشتراك..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Subscription Type Filter */}
          <div className="flex items-center gap-2">
            <CreditCard size={20} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subscriptionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subscriptionStatuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map(subscription => {
            const statusInfo = getStatusInfo(subscription);
            const daysRemaining = getDaysRemaining(subscription.endDate);
            
            return (
              <div key={subscription.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Subscription Header */}
                <div className="bg-blue-50 p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} className="text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {subscription.type === 'MONTHLY' ? 'اشتراك شهري' : 
                           subscription.type === 'QUARTERLY' ? 'اشتراك ربع سنوي' : 'اشتراك سنوي'}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`${statusInfo.color} flex items-center gap-1`}>
                            {statusInfo.icon}
                            {statusInfo.text}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleRenewSubscription(subscription.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        تجديد
                      </button>
                      <button 
                        onClick={() => handleEditSubscription(subscription)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        تعديل
                      </button>
                      <button 
                        onClick={() => handleDeleteSubscription(subscription.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        حذف
                      </button>
                      <button 
                        onClick={() => toggleExpand(subscription.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedSubscriptionId === subscription.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subscription Summary */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">العضو</p>
                      <p className="text-gray-700">{getMemberName(subscription.memberId)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CircleDollarSign size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">السعر</p>
                      <p className="text-gray-700">{subscription.price} ر.س</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">الأيام المتبقية</p>
                      <p className="text-gray-700">{daysRemaining} يوم</p>
                    </div>
                  </div>
                </div>

                {/* Subscription Details - Collapsible */}
                {expandedSubscriptionId === subscription.id && (
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-3">تفاصيل الاشتراك</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">تاريخ البدء:</span>
                          <span className="text-gray-700">{formatDate(subscription.startDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">تاريخ الانتهاء:</span>
                          <span className="text-gray-700">{formatDate(subscription.endDate)}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">حالة الدفع:</span>
                          <span className={`${subscription.paymentStatus === 'PAID' ? 'text-green-500' : 'text-yellow-500'}`}>
                            {subscription.paymentStatus === 'PAID' ? 'مدفوع' : 'بانتظار الدفع'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">رقم الاشتراك:</span>
                          <span className="text-gray-700">{subscription.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد اشتراكات مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
}