import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { addCoach } from '../../redux/actions/coachesActions';

const initialForm = {
  name: '',
  specialty: '',
  phone: '',
  email: '',
  workingHoursStart: '',
  workingHoursEnd: '',
  workingDays: [],
  salary: '',
};

const daysOfWeek = [
  'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
];

export default function CreateCoach() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        workingDays: checked
          ? [...prev.workingDays, value]
          : prev.workingDays.filter((d) => d !== value),
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.specialty || !form.phone || !form.email || !form.workingHoursStart || !form.workingHoursEnd || form.workingDays.length === 0 || !form.salary) {
      setError('يرجى تعبئة جميع الحقول');
      return;
    }
    dispatch(addCoach({
      id: Date.now(),
      name: form.name,
      specialty: form.specialty,
      phone: form.phone,
      email: form.email,
      workingHours: { start: form.workingHoursStart, end: form.workingHoursEnd },
      workingDays: form.workingDays,
      salary: Number(form.salary),
    }));
    setForm(initialForm);
    setError('');
    navigate('/coaches');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <button onClick={() => navigate('/coaches')} className="mb-4 flex items-center gap-2 text-gray-600 hover:text-blue-600">
        <ArrowLeft size={20} />
        عودة
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">إضافة مدرب</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">الاسم</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">التخصص</label>
          <input name="specialty" value={form.specialty} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">رقم الهاتف</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">البريد الإلكتروني</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-700">ساعات العمل من</label>
            <input name="workingHoursStart" value={form.workingHoursStart} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" type="time" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-700">إلى</label>
            <input name="workingHoursEnd" value={form.workingHoursEnd} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" type="time" />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">أيام العمل</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="workingDays"
                  value={day}
                  checked={form.workingDays.includes(day)}
                  onChange={handleChange}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">الراتب</label>
          <input name="salary" value={form.salary} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" type="number" />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">حفظ</button>
      </form>
    </div>
  );
} 