export const ADD_COACH = 'ADD_COACH'
export const DELETE_COACH = 'DELETE_COACH'
export const EDIT_COACH = 'EDIT_COACH'

export const addCoach = (coach) => ({
  type: ADD_COACH,
  payload: coach,
});

export const editCoach = (coach) => ({
  type: EDIT_COACH,
  payload: coach,
});

export const deleteCoach = (coachId) => ({
  type: DELETE_COACH,
  payload: coachId,
}); 