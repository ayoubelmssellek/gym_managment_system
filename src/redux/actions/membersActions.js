export const ADD_MEMBER = 'ADD_MEMBER';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';



export const add_member = (member)=>{
    return {
        type : ADD_MEMBER,
        payload : member
    }
}

export const remove_member = (member_id)=>{
    return {
        type : REMOVE_MEMBER,
        payload : member_id
    }
}

export const update_member = (newData)=>{
    return {
        type : UPDATE_MEMBER,
        payload : newData
    }
}