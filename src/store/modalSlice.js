import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const role = Cookies.get("role");

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalOpen: {
            modalUser: false,
            modalBlog: false,
            modalField: false,
            modalCourse: false,
            modalLectures: false,
            modalProfile: false,
            modalDiscount: false,

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
        updateDiscount: {},
        dataDiscount: "",
        role: role,
        isNewCourseCreated: false,
    },
    reducers: {
        modalAddEditOpen: (state, actions) => {
            const { modalKey, data } = actions.payload
            state.modalOpen[modalKey] = true
            state.modalData = data;
            state.dataDiscount = actions.payload
            
        },
        modalAddEditClose: (state, actions) => {
            const { modalKey } = actions.payload;
            state.modalOpen[modalKey] = false;
            state.modalData = {};
            state.dataDiscount = ""
        },
        drawerOpen: (state, actions) => {
            const {drawerKey}  =  actions.payload;
            state.drawerOpen[drawerKey] = true
        },
        drawerclose: (state, actions) => {
            const {drawerKey}  =  actions.payload;
            state.drawerOpen[drawerKey] = false
        },
        hiddenPopOver: (state) => {
            state.hiddenPopOver = false
        },
        openPopOver: (state) => {
            state.hiddenPopOver = true
        },
        openPopOverDiscount:(state ) => {
            state.hiddenPopOverDiscount = true
        },
        popOverDiscountClose:(state ) => {
            state.hiddenPopOverDiscount = false
        },
        hiddenPopOverEdit: (state,) => {
            state.hiddenPopOverEdit = false
        },
        openPopOverEdit: (state,) => {
            state.hiddenPopOverEdit = true

        },
        permission:(state, actions) => {
            state.role = actions.payload
            Cookies.set("role", actions.payload)

        },
        newCourseCreated:(state) => {
            state.isNewCourseCreated = true
        },
        notNewCourseCreated: (state) => {
            state.isNewCourseCreated = false
        },
        updateProfile: (state, actions) => {
            state.updateProfile = actions.payload
        },

    }
});

export const {
        modalAddEditOpen, 
        modalAddEditClose, 
        drawerOpen, 
        drawerclose, 
        hiddenPopOver,
        openPopOver,
        openPopOverDiscount,
        popOverDiscountClose,
        hiddenPopOverEdit,
        openPopOverEdit,
        permission,
        newCourseCreated,
        notNewCourseCreated,
        updateProfile, 
        
    } = modalSlice.actions

export default modalSlice.reducer;