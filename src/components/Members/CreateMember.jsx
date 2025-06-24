import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { subscriptionsPlans } from '../../data/mockData';
import { add_member } from '../../redux/actions/membersActions';

export default function CreateMember() {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        age: '',
        gender : '',
        joinDate: '',
        subscriptionPlanId: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.email || !form.age || !form.joinDate) {
            console.log('erorrj');
            
            setError('يرجى تعبئة جميع الحقول');
            return;
        }
        dispatch(add_member({ ...form, id: Date.now() }));
        setForm({ name: '', phone: '', email: '', age: '', joinDate: '', subscriptionPlanId: '' });
        setError('');
        navigate('/members');
    };

    const subscriptionTypeLabels = {
    monthly: 'شهري',
    quarterly: 'ربع سنوي',
    yearly: 'سنوي',
    semiannual: 'نصف سنوي'
  };

    return (
        <div className="max-w-xl mx-auto p-6">
            <button onClick={() => navigate('/members')} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft size={20} />
                عودة
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">إضافة عضو</h2>
            <p className="text-gray-600 mb-4">انشاء عضو جديد</p>
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
                            <input type='radio' name='gender' value={'Male'} onChange={handleChange}/>
                            <label>ذكر</label>
                        </div>
                        <div className=' flex items-center gap-3'>
                            <input type='radio' name='gender' value={'Female'} onChange={handleChange}/>
                            <label>أنثى</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block mb-1 text-gray-700">نوع الإشتراك</label>
                    <select name='subscriptionPlanId' onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
                        <option selected disabled>إختر نوع الإشتراك</option>
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
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">حفظ</button>
            </form>
        </div>
    );
}