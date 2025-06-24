import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Members from './components/Members/Members';
import CheckIn from './components/CheckIn/CheckIn';
import { notifications } from './data/mockData';
import Coaches from './components/Coaches/coaches';
import Classes from './components/WorkoutPlans';
import Payments from './components/payments';
import Subscriptions from './components/Subscriptions';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

import DevelopementPage from './components/DevelopementPage';

import { Provider } from 'react-redux';
import store from './redux/store';
import CreateCoach from './components/Coaches/CreateCoach';
import EditMember from './components/Members/EditMember';
import CreateMember from './components/Members/createMember';
import EditCoach from './components/Coaches/EditCoach';

function App() {
 
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length;


  return (
    <Provider store={store}>
        <BrowserRouter>
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar  />
      
      <div className="flex-1 flex flex-col">
        <Header notificationCount={unreadNotifications} />
        
        <main className="flex-1 p-6">
          <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/members' element={<Members/>}/>
              <Route path='/addMember' element={<CreateMember/>}/>
              <Route path='/editMember/:id' element={<EditMember/>}/>
              <Route path='/addCoach' element={<CreateCoach/>}/>
              <Route path='/editCoach/:id' element={<EditCoach/>}/>
              <Route path='/checkin' element={<CheckIn/>}/>
              <Route path='/subscriptions' element={<Subscriptions/>}/>
              <Route path='/coaches' element={<Coaches/>}/>
              <Route path='/classes' element={<Classes/>}/>
              <Route path='/payement' element={<DevelopementPage/>}/>
              <Route path='/reports' element={<DevelopementPage/>}/>
              <Route path='/notifications' element={<DevelopementPage/>}/>
              <Route path='/settings' element={<DevelopementPage/>}/>
          </Routes>
          
        </main>
      </div>
    </div>
     
    </BrowserRouter>

    </Provider>

    
  );
}

export default App;