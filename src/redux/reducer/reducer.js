import { ReactFormConst } from "./const";

const stateDefault = {
  listStudent: [],
  studentEdit: null,
};

export const studentReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case ReactFormConst.Submit:
      console.log("payload", action.payload);

      const newListStudent = [...state.listStudent];
      newListStudent.push(action.payload);

      return { ...state, listStudent: newListStudent };

    case ReactFormConst.Delete: {
      const newListStudent = state.listStudent.filter(
        (student) => student.id !== action.payload
      );

      return { ...state, listStudent: newListStudent };
    }

    case ReactFormConst.Edit:
      return { ...state, studentEdit: action.payload };

    case ReactFormConst.Update: {
      const newListStudent = [...state.listStudent];
      const index = state.listStudent.findIndex(
        (student) => student.id === action.payload.id
      );

      newListStudent.splice(index, 1, action.payload);

      return { ...state, listStudent: newListStudent, studentEdit: null };
    }

    default:
      return state;
  }
};