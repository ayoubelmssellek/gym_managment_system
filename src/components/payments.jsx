import React, { useState } from 'react';
import { Search, Plus, Filter, CreditCard, CircleDollarSign, Calendar, User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { payments, members, subscriptions } from '../data/mockData';

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedPaymentId, setExpandedPaymentId] = useState(null);

  // Get member name by ID
  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'عضو غير معروف';
  };

  // Get subscription type by ID
  const getSubscriptionType = (subscriptionId) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    return subscription ? 
      (subscription.type === 'MONTHLY' ? 'شهري' : 
       subscription.type === 'QUARTERLY' ? 'ربع سنوي' : 'سنوي') : 
      'غير معروف';
  };

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.amount.toString().includes(searchTerm) ||
                         getMemberName(payment.memberId).toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterMethod !== 'all' && payment.method !== filterMethod) return false;
    
    if (filterStatus !== 'all' && payment.status !== filterStatus) return false;
    
    return true;
  });

  // Payment method options
  const paymentMethods = [
    { value: 'all', label: 'جميع الطرق' },
    { value: 'CASH', label: 'نقدي' },
    { value: 'CARD', label: 'بطاقة' },
    { value: 'BANK_TRANSFER', label: 'تحويل بنكي' }
  ];

  // Payment status options
  const paymentStatuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'COMPLETED', label: 'مكتمل' },
    { value: 'PENDING', label: 'قيد الانتظار' },
    { value: 'FAILED', label: 'فاشل' },
    { value: 'REFUNDED', label: 'تم الاسترداد' }
  ];

  // Toggle payment expansion
  const toggleExpand = (paymentId) => {
    setExpandedPaymentId(expandedPaymentId === paymentId ? null : paymentId);
  };

  // Handle actions
  const handleEditPayment = (payment) => console.log('Edit payment:', payment);
  const handleDeletePayment = (paymentId) => console.log('Delete payment:', paymentId);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'COMPLETED':
        return { icon: <CheckCircle size={18} className="text-green-500" />, color: 'text-green-500' };
      case 'PENDING':
        return { icon: <Clock size={18} className="text-yellow-500" />, color: 'text-yellow-500' };
      case 'FAILED':
        return { icon: <XCircle size={18} className="text-red-500" />, color: 'text-red-500' };
      default:
        return { icon: <CheckCircle size={18} className="text-blue-500" />, color: 'text-blue-500' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المدفوعات</h2>
          <p className="text-gray-600 mt-1">تتبع جميع مدفوعات الأعضاء</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          إضافة دفعة جديدة
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
              placeholder="ابحث بالوصف أو المبلغ أو اسم العضو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Payment Method Filter */}
          <div className="flex items-center gap-2">
            <CreditCard size={20} className="text-gray-400" />
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {paymentMethods.map(method => (
                <option key={method.value} value={method.value}>{method.label}</option>
              ))}
            </select>
          </div>

          {/* Payment Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {paymentStatuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.length > 0 ? (
          filteredPayments.map(payment => {
            const statusInfo = getStatusInfo(payment.status);
            return (
              <div key={payment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Payment Header */}
                <div className="bg-blue-50 p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CircleDollarSign size={20} className="text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{payment.description}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {statusInfo.icon}
                          <span className={`text-sm ${statusInfo.color}`}>
                            {paymentStatuses.find(s => s.value === payment.status)?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleEditPayment(payment)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        تعديل
                      </button>
                      <button 
                        onClick={() => handleDeletePayment(payment.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        حذف
                      </button>
                      <button 
                        onClick={() => toggleExpand(payment.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedPaymentId === payment.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">العضو</p>
                      <p className="text-gray-700">{getMemberName(payment.memberId)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">طريقة الدفع</p>
                      <p className="text-gray-700">
                        {payment.method === 'CASH' ? 'نقدي' : 
                         payment.method === 'CARD' ? 'بطاقة' : 'تحويل بنكي'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">تاريخ الدفع</p>
                      <p className="text-gray-700">{formatDate(payment.date)}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Details - Collapsible */}
                {expandedPaymentId === payment.id && (
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-3">تفاصيل الدفعة</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">المبلغ:</span>
                          <span className="text-gray-700 font-medium">{payment.amount} ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">نوع الاشتراك:</span>
                          <span className="text-gray-700">{getSubscriptionType(payment.subscriptionId)}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">رقم المعاملة:</span>
                          <span className="text-gray-700">{payment.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">رقم الاشتراك:</span>
                          <span className="text-gray-700">{payment.subscriptionId}</span>
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
            <p className="text-gray-500 text-lg">لا توجد مدفوعات مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
}