import React from 'react';
import { Users, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import StatsCard from './StatsCard';
import { members, subscriptions, checkIns, payments } from '../../data/mockData';

export default function Dashboard() {
  const activeMembers = members.filter(m => 
    subscriptions.find(s => s.memberId === m.id && s.isActive)?.isActive
  ).length;
  
  const monthlyRevenue = payments
    .filter(p => p.date.startsWith('2024-01'))
    .reduce((sum, p) => sum + p.amount, 0);
  
  const todayCheckIns = checkIns.filter(c => 
    c.date === new Date().toISOString().split('T')[0]
  ).length;
  
  const expiringSubscriptions = subscriptions.filter(s => {
    const endDate = new Date(s.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  }).length;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="الأعضاء النشطين"
          value={activeMembers}
          change={{ value: '12%', type: 'increase' }}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="إيرادات الشهر"
          value={`${monthlyRevenue.toLocaleString()} $`}
          change={{ value: '8%', type: 'increase' }}
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="حضور اليوم"
          value={todayCheckIns}
          icon={Calendar}
          color="orange"
        />
        <StatsCard
          title="اشتراكات تنتهي قريباً"
          value={expiringSubscriptions}
          icon={CreditCard}
          color="red"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">آخر عمليات الحضور</h3>
          <div className="space-y-3">
            {checkIns.slice(0, 5).map((checkIn) => {
              const member = members.find(m => m.id === checkIn.memberId);
              return (
                <div key={checkIn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{member?.name}</p>
                    <p className="text-sm text-gray-500">
                      دخل الساعة {new Date(checkIn.checkInTime).toLocaleTimeString('ar-EG', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
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
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">اشتراكات تنتهي قريباً</h3>
          <div className="space-y-3">
            {subscriptions
              .filter(s => {
                const endDate = new Date(s.endDate);
                const today = new Date();
                const diffTime = endDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7 && diffDays > 0;
              })
              .map((subscription) => {
                const member = members.find(m => m.id === subscription.memberId);
                const endDate = new Date(subscription.endDate);
                const today = new Date();
                const diffTime = endDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={subscription.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{member?.name}</p>
                      <p className="text-sm text-gray-500">
                        ينتهي خلال {diffDays} يوم
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      يحتاج تجديد
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}