import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Members from './components/Members/Members';
import CheckIn from './components/CheckIn/CheckIn';
import { notifications } from './data/mockData';
import CoachCard from './components/coaches';
import Coaches from './components/maincoaches';
import Classes from './components/WorkoutPlans';
import Payments from './components/payments';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <Members />;
      case 'checkin':
        return <CheckIn />;
      case 'subscriptions':
        return <div className="p-8 text-center text-gray-500">صفحة الاشتراكات قيد التطوير</div>;
      case 'coaches':
        return <Coaches />;
      case 'classes':
        return <Classes/>;
      case 'payments':
        return <Payments/>;
      case 'reports':
        return <div className="p-8 text-center text-gray-500">صفحة التقارير قيد التطوير</div>;
      case 'notifications':
        return <div className="p-8 text-center text-gray-500">صفحة التنبيهات قيد التطوير</div>;
      case 'settings':
        return <div className="p-8 text-center text-gray-500">صفحة الإعدادات قيد التطوير</div>;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'لوحة التحكم';
      case 'members':
        return 'إدارة الأعضاء';
      case 'checkin':
        return 'تسجيل الحضور';
      case 'subscriptions':
        return 'إدارة الاشتراكات';
      case 'coaches':
        return 'إدارة المدربين';
      case 'classes':
        return 'إدارة الحصص';
      case 'payments':
        return 'إدارة المدفوعات';
      case 'reports':
        return 'التقارير والإحصائيات';
      case 'notifications':
        return 'التنبيهات';
      case 'settings':
        return 'الإعدادات';
      default:
        return 'لوحة التحكم';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header title={getPageTitle()} notificationCount={unreadNotifications} />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;