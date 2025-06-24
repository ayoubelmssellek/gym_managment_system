
import { Bell, User, LogOut, Settings } from 'lucide-react';


export default function Header({ notificationCount = 0 }) {
   const activeTab = window.location.pathname;
   


  const getPageTitle = () => {
    switch (activeTab) {
      case '/':
        return 'لوحة التحكم';
      case '/members':
        return 'إدارة الأعضاء';
      case '/checkin':
        return 'تسجيل الحضور';
      case '/subscriptions':
        return 'إدارة الاشتراكات';
      case '/coaches':
        return 'إدارة المدربين';
      case '/classes':
        return 'إدارة الحصص';
      case '/payments':
        return 'إدارة المدفوعات';
      case '/reports':
        return 'التقارير والإحصائيات';
      case '/notifications':
        return 'التنبيهات';
      case '/settings':
        return 'الإعدادات';
      case '/addMember':
        return 'إضافة عضو';
      default:
        return 'لوحة التحكم';
    }
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('ar-EG', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
          
          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
          
          {/* User Menu */}
          <div className="flex items-center gap-3 border-r border-gray-200 pl-4">
            <div className="text-right">
              <p className="font-medium text-gray-900">المدير العام</p>
              <p className="text-sm text-gray-500">admin@gym.com</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
          </div>
          
          {/* Logout */}
          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}