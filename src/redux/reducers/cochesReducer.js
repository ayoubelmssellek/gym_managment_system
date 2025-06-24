import { ADD_COACH,EDIT_COACH,DELETE_COACH } from "../actions/coachesActions";

const initialState = {
    coaches : [
  {
    id: '1',
    name: ' أحمد صالح',
    specialty: 'تضخيم العضلات',
    phone: '01234567896',
    email: 'coach1@example.com',
    workingHours: { start: '06:00', end: '14:00' },
    workingDays: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
    salary: 3000,
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
  }
    ]
};

const coachesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COACH:
      return { ...state, coaches: [...state.coaches, action.payload] };
    case DELETE_COACH:
      return {
        ...state,
        coaches: state.coaches.filter((coach) => coach.id != action.payload),
      };
    case EDIT_COACH:
      return {
        ...state,
        coaches: state.coaches.map((coach) => coach.id == action.payload.id ? action.payload : coach),
      };
    default:
      return state;
  }
};

export default coachesReducer;
