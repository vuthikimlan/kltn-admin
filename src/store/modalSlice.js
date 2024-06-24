import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const role = Cookies.get("role");

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalOpen: {
      modalUser: false,
      modalBlog: false,
      modalField: false,
      modalCourse: false,
      modalLectures: false,
      modalProfile: false,
      modalDiscount: false,
      modalAssignment: false,
      modalQuestion: false,
    },
    modalData: {} || "",
    drawerOpen: {
      drawerProfile: false,
      drawerUser: false,
      drawerCourse: false,
      drawerBlog: false,
      drawerOrder: false,
    },
    hiddenPopOver: false,
    hiddenPopOverDiscount: false,
    hiddenPopOverEdit: false,
    hiddenPopOverAnswer: [],
    dataDiscount: "",
    courseId: "",
    role: role,
    isNewCourseCreated: false,
  },
  reducers: {
    modalAddEditOpen: (state, actions) => {
      const { modalKey, data } = actions.payload;
      state.modalOpen[modalKey] = true;
      state.modalData = data;
      state.dataDiscount = actions.payload;
    },
    modalAddEditClose: (state, actions) => {
      const { modalKey } = actions.payload;
      state.modalOpen[modalKey] = false;
      state.modalData = {};
      state.dataDiscount = "";
    },
    drawerOpen: (state, actions) => {
      const { drawerKey } = actions.payload;
      state.drawerOpen[drawerKey] = true;
    },
    drawerClose: (state, actions) => {
      const { drawerKey } = actions.payload;
      state.drawerOpen[drawerKey] = false;
    },
    hiddenPopOver: (state) => {
      state.hiddenPopOver = false;
    },
    openPopOver: (state) => {
      state.hiddenPopOver = true;
    },
    openPopOverDiscount: (state) => {
      state.hiddenPopOverDiscount = true;
    },
    popOverDiscountClose: (state) => {
      state.hiddenPopOverDiscount = false;
    },
    hiddenPopOverEdit: (state) => {
      state.hiddenPopOverEdit = false;
    },
    openPopOverEdit: (state) => {
      state.hiddenPopOverEdit = true;
    },
    openPopOverAnswer: (state, action) => {
      const { index } = action.payload;
      const newPopoverStates = [...state.hiddenPopOverAnswer];
      newPopoverStates[index] = !newPopoverStates[index];
      state.hiddenPopOverAnswer = newPopoverStates;
    },
    hiddenPopOverAnswer: (state) => {
      state.hiddenPopOverAnswer = state.hiddenPopOverAnswer.map(() => false);
    },
    permission: (state, actions) => {
      state.role = actions.payload;
      Cookies.set("role", actions.payload);
    },
    newCourseCreated: (state) => {
      state.isNewCourseCreated = true;
    },
    notNewCourseCreated: (state) => {
      state.isNewCourseCreated = false;
    },
    getCourseId: (state, actions) => {
      state.courseId = actions.payload;
    },
  },
});

export const {
  modalAddEditOpen,
  modalAddEditClose,
  drawerOpen,
  drawerClose,
  hiddenPopOver,
  openPopOver,
  openPopOverDiscount,
  popOverDiscountClose,
  hiddenPopOverEdit,
  openPopOverEdit,
  openPopOverAnswer,
  hiddenPopOverAnswer,
  permission,
  newCourseCreated,
  notNewCourseCreated,
  getCourseId,
} = modalSlice.actions;

export default modalSlice.reducer;
