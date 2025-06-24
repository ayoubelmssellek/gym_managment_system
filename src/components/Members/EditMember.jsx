import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { subscriptionsPlans } from '../../data/mockData';
import { update_member } from '../../redux/actions/membersActions';
export default function EditMember() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const member = useSelector(state => state.members.members.find(m => m.id === Number(id)));
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    joinDate: '',
    subscriptionPlanId: '',
    gender : ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name || '',
        phone: member.phone || '',
        email: member.email || '',
        age: member.age || '',
        joinDate: member.joinDate || '',
        gender : member.gender || '',
        subscriptionPlanId: member.subscriptionPlanId || ''
      });
    }
  }, [member]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.age || !form.joinDate) {
      setError('يرجى تعبئة جميع الحقول');
      return;
    }
    dispatch(update_member( { ...form, id: Number(id) } ));
    setError('');
    navigate('/members');
  };

    const subscriptionTypeLabels = {
    monthly: 'شهري',
    quarterly: 'ربع سنوي',
    yearly: 'سنوي',
    semiannual: 'نصف سنوي'
  };

  if (!member) return <div className="p-6">العضو غير موجود</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <button onClick={() => navigate('/members')} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-blue-600">
        <ArrowLeft size={20} />
        عودة
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">تعديل العضو</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">الاسم</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">رقم الهاتف</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">البريد الإلكتروني</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">العمر</label>
          <input name="age" value={form.age} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" type="number" />
        </div>
         <div>
                    <label className="block mb-1 text-gray-700">الجنس</label>
                    <div className='flex items-center gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type='radio' name='gender' value={'Male'} defaultChecked={form.gender === 'Male'} onChange={handleChange}/>
                            <label>ذكر</label>
                        </div>
                        <div className=' flex items-center gap-3'>
                            <input type='radio' name='gender' value={'Female'} defaultChecked={form.gender === 'Female'} onChange={handleChange}/>
                            <label>أنثى</label>
                        </div>
                    </div>
        </div>
        <div>
                            <label className="block mb-1 text-gray-700">نوع الإشتراك</label>
                            <select name='subscriptionPlanId' onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
                                <option  disabled>إختر نوع الإشتراك</option>
                                {
                                    subscriptionsPlans.map(plan =>
                                       <option value={plan.id} selected={plan.id == form.subscriptionPlanId}>
                                           {subscriptionTypeLabels[plan.type]} - {plan.price} درهم
                                       </option>
                                    )
                                }
                            </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">تاريخ الانضمام</label>
          <input name="joinDate" value={form.joinDate} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" type="date" />
        </div>
        {/* Add subscription plan selection if needed */}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">حفظ التعديلات</button>
      </form>
    </div>
  );
} 