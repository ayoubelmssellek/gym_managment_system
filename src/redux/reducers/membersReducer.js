import { ADD_MEMBER, REMOVE_MEMBER,UPDATE_MEMBER } from '../actions/membersActions';

const initialState = {
    members :[
    {
      id: 1,
      name: 'أحمد',
      phone: '01234567890',
      email: 'ahmed@example.com',
      age: 28,
      gender: 'Male',
      joinDate: '2024-01-15',
      subscriptionPlanId: 1,
 
    },
    {
      id: 2,
      name: 'سارة',
      phone: '01234567892',
      email: 'sara@example.com',
      age: 25,
      gender: 'Female',
      joinDate: '2024-02-01',
      subscriptionPlanId: 2,

    },
    {
      id: 3,
      name: 'محمد',
      phone: '01234567894',
      email: 'mohamed@example.com',
      age: 32,
      gender: 'Male',
      joinDate: '2024-01-20',
      subscriptionPlanId: 3,
    }
    ]
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return { ...state, members: [...state.members, action.payload] };
    case REMOVE_MEMBER:
      return {
        ...state,
        members: state.members.filter((member) => member.id != action.payload),
      };
    case UPDATE_MEMBER:
      return {
        ...state,
        members: state.members.map((member) => member.id == action.payload.id ? action.payload : member),
      };
    default:
      return state;
  }
};

export default membersReducer;
