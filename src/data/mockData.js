import { 
  MemberGender, 
  SubscriptionType, 
  PaymentStatus, 
  PaymentMethod, 
  PaymentStatusOptions,
  NotificationType 
} from '../types/index.js';

export const members = [
  {
    id: '1',
    name: 'أحمد',
    phone: '01234567890',
    email: 'ahmed@example.com',
    age: 28,
    gender: MemberGender.MALE,
    joinDate: '2024-01-15',
    subscriptionId: '1',
    coachId: '1',
    emergencyContact: {
      name: 'فاطمة ',
      phone: '01234567891'
    }
  },
  {
    id: '2',
    name: 'سارة',
    phone: '01234567892',
    email: 'sara@example.com',
    age: 25,
    gender: MemberGender.FEMALE,
    joinDate: '2024-02-01',
    subscriptionId: '2',
    coachId: '2',
    emergencyContact: {
      name: 'نادية',
      phone: '01234567893'
    }
  },
  {
    id: '3',
    name: 'محمد',
    phone: '01234567894',
    email: 'mohamed@example.com',
    age: 32,
    gender: MemberGender.MALE,
    joinDate: '2024-01-20',
    subscriptionId: '3',
    emergencyContact: {
      name: 'أميرة',
      phone: '01234567895'
    }
  }
];

export const subscriptions = [
  {
    id: '1',
    memberId: '1',
    type: SubscriptionType.MONTHLY,
    price: 500,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    isActive: true,
    paymentStatus: PaymentStatus.PAID
  },
  {
    id: '2',
    memberId: '2',
    type: SubscriptionType.QUARTERLY,
    price: 1400,
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    isActive: true,
    paymentStatus: PaymentStatus.PAID
  },
  {
    id: '3',
    memberId: '3',
    type: SubscriptionType.YEARLY,
    price: 5000,
    startDate: '2024-01-20',
    endDate: '2025-01-20',
    isActive: true,
    paymentStatus: PaymentStatus.PENDING
  }
];

export const coaches = [
  {
    id: '1',
    name: ' أحمد صالح',
    specialty: 'تضخيم العضلات',
    phone: '01234567896',
    email: 'coach1@example.com',
    workingHours: { start: '06:00', end: '14:00' },
    workingDays: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
    salary: 3000,
    commissionRate: 10
  },
  {
    id: '2',
    name: ' مريم عادل',
    specialty: 'اللياقة البدنية للسيدات',
    phone: '01234567897',
    email: 'coach2@example.com',
    workingHours: { start: '16:00', end: '22:00' },
    workingDays: ['السبت', 'الأحد', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    salary: 2800,
    commissionRate: 12
  }
];

export const workoutPlans = [
  {
    id: '1',
    name: 'برنامج تضخيم للمبتدئين',
    description: 'برنامج تدريبي شامل لبناء العضلات للمبتدئين',
    level: 'beginner',
    duration: 12,
    coachId: '1',
    exercises: [
      {
        id: '1',
        name: 'تمرين البنش برس',
        sets: 3,
        reps: '8-12',
        restTime: 90,
        notes: 'التركيز على الشكل الصحيح'
      },
      {
        id: '2',
        name: 'تمرين السكوات',
        sets: 3,
        reps: '10-15',
        restTime: 120,
        notes: 'النزول بشكل كامل'
      }
    ]
  }
];

export const classes = [
  {
    id: '1',
    name: 'Intense Cardio Session',
    description: 'A high-intensity cardio workout designed to boost stamina and burn fat.',
    coachId: '2',
    maxCapacity: 20,
    duration: 60,
    price: 50,
    schedule: [
      { dayOfWeek: 0, startTime: '18:00' }, // Sunday
      { dayOfWeek: 2, startTime: '18:00' }, // Tuesday
      { dayOfWeek: 4, startTime: '18:00' }  // Thursday
    ]
  },
  {
    id: '2',
    name: 'Strength Building Class',
    description: 'A powerful training session focused on building muscle and improving physical strength. Designed for men.',
    coachId: '1',
    maxCapacity: 15,
    duration: 45,
    price: 60,
    schedule: [
      { dayOfWeek: 1, startTime: '19:00' }, // Monday
      { dayOfWeek: 3, startTime: '19:00' }, // Wednesday
      { dayOfWeek: 5, startTime: '19:00' }  // Friday
    ]
  }
];


export const checkIns = [
  {
    id: '1',
    memberId: '1',
    checkInTime: '2024-01-24T08:30:00',
    checkOutTime: '2024-01-24T10:00:00',
    date: '2024-01-24'
  },
  {
    id: '2',
    memberId: '2',
    checkInTime: '2024-01-24T18:00:00',
    date: '2024-01-24'
  }
];

export const payments = [
  {
    id: '1',
    memberId: '1',
    subscriptionId: '1',
    amount: 500,
    method: PaymentMethod.CASH,
    status: PaymentStatusOptions.COMPLETED,
    date: '2024-01-15',
    description: 'اشتراك شهري'
  },
  {
    id: '2',
    memberId: '2',
    subscriptionId: '2',
    amount: 1400,
    method: PaymentMethod.CARD,
    status: PaymentStatusOptions.COMPLETED,
    date: '2024-02-01',
    description: 'اشتراك ربع سنوي'
  }
];

export const notifications = [
  {
    id: '1',
    type: NotificationType.SUBSCRIPTION_EXPIRY,
    title: 'انتهاء اشتراك',
    message: 'اشتراك أحمد علي سينتهي خلال 3 أيام',
    recipientId: null,
    isRead: false,
    createdAt: '2024-01-24T10:00:00'
  },
  {
    id: '2',
    type: NotificationType.PAYMENT_DUE,
    title: 'مدفوعات متأخرة',
    message: 'محمد لديه مدفوعات متأخرة',
    recipientId: null,
    isRead: false,
    createdAt: '2024-01-24T11:00:00'
  }
];