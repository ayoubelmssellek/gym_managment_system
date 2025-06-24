import React from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteCoach } from '../../redux/actions/coachesActions';

export default function DeleteCoachModal({ isOpen, onClose, coach }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (coach) {
      dispatch(deleteCoach(coach.id));
      onClose();
    }
  };

  if (!isOpen || !coach) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative text-center">
        <button onClick={onClose} className="absolute left-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">حذف المدرب</h2>
        <p className="mb-6 text-gray-700">هل أنت متأكد أنك تريد حذف المدرب <span className="font-bold">{coach.name}</span>؟ لا يمكن التراجع عن هذا الإجراء.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">إلغاء</button>
          <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">تأكيد الحذف</button>
        </div>
      </div>
    </div>
  );
} 