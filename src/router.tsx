import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Page/HomePage";
import TableStudent from "./Components/Table/User/Student";
import DetailUser from "./Components/Drawer/detailUser";
import TableTeacher from "./Components/Table/User/Teacher";
import TableCourse from "./Components/Table/Course/Course";
import DetailCourse from "./Components/Drawer/detailCourse";
import Lectures from "./Components/Table/Course/Lectures";
import TableBlog from "./Components/Table/Blog";
import DetailBLog from "./Components/Drawer/detailBlog";
import TableDiscount from "./Components/Table/Discount";
import TableOrder from "./Components/Table/Order";
import DetailOrder from "./Components/Drawer/detailOrder";
import Login from "./Page/Login";
import TableCategory from "./Components/Table/Field/Category";
import ProfileUser from "./Components/ProfileUser/ProfileUser";
import CourseApprove from "./Components/Table/Course/CourseApprove";
import CourseRejected from "./Components/Table/Course/CourseRejected";
import StudentOfTeacher from "./Components/Table/User/UserOfTeacher";
import StudentOfCourse from "./Components/Table/User/StudentOfCourse";
import RatingsCourse from "./Components/Table/Course/RatingsCourse";
import PageCourseInstructor from "./App/Course/CourseInstructor";
import PageCourseInstructorAdmin from "./App/Course/CourseInstructorAdmin";
import PageStatistic from "./App/Revenue/PageStatistic";
import RevenueByMonthAdmin from "./App/Revenue/RevenueByMonthAdmin";
import RevenueByMonthTeacher from "./App/Revenue/RevenueCourseByMonthTeacher";
import PaymentOfTeacher from "./App/Payment/PaymentOfTeacher";
import RevenueCourse from "./Components/Table/Course/RevenueCourse";
import RevenueCourseByDay from "./App/Revenue/RevenueCourseByDay";
import RevenueCourseByMonth from "./App/Revenue/RevenueCourseByMonth";
import RevenueCourseOfInstructor from "./Components/Table/Course/RevenueCourseOfInstructor";
import RevenueInstructor from "./Components/Table/Course/RevenueInstructor";
import RevenueTeacherByMonth from "./App/Revenue/RevenueTeacherByMonth";
import ForgotPassword from "./Page/ForgotPassword";
import AssignmentPage from "./Components/Table/Course/AssignmentList/AssignmentPage";
import QuestionList from "./Components/Table/Course/AssignmentList/QuestionList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/admin",
    element: <HomePage />,
    children: [
      {
        path: "student",
        element: <TableStudent />,
        children: [
          {
            path: "detailStudent/:id",
            element: <DetailUser />,
          },
        ],
      },
      {
        path: "teacher",
        element: <TableTeacher />,
        children: [
          {
            path: "detailTeacher/:id",
            element: <DetailUser />,
          },
        ],
      },
      {
        path: "course-instructor/:id",
        element: <PageCourseInstructorAdmin />,
      },
      {
        path: "course",
        element: <TableCourse />,
        children: [
          {
            path: "detailCourse/:id",
            element: <DetailCourse />,
          },
        ],
      },
      {
        path: "student-course/:id",
        element: <StudentOfCourse />,
      },
      {
        path: "ratings-course/:id",
        element: <RatingsCourse />,
      },
      {
        path: "course-approve",
        element: <CourseApprove />,
      },

      {
        path: "course-rejected",
        element: <CourseRejected />,
      },
      {
        path: "lectures/:id",
        element: <Lectures />,
      },
      {
        path: "assignment/:id",
        element: <AssignmentPage />,
      },
      {
        path: "question/:id",
        element: <QuestionList />,
      },
      {
        path: "blog",
        element: <TableBlog />,
        children: [
          {
            path: "detailBlog/:id",
            element: <DetailBLog />,
          },
        ],
      },
      {
        path: "discount",
        element: <TableDiscount />,
        children: [
          {
            path: "detailBlog/:id",
            element: <DetailBLog />,
          },
        ],
      },
      {
        path: "order",
        element: <TableOrder />,
        children: [
          {
            path: "detailOrder/:id",
            element: <DetailOrder />,
          },
        ],
      },
      {
        path: "category",
        element: <TableCategory />,
      },
      {
        path: "profile",
        element: <ProfileUser />,
      },
      {
        path: "total-revenue",
        element: <PageStatistic />,
      },
      {
        path: "total-revenue-month",
        element: <RevenueByMonthAdmin />,
      },
      {
        path: "revenue-course",
        element: <RevenueCourse />,
      },
      {
        path: "revenue-course-day/:id",
        element: <RevenueCourseByDay />,
      },
      {
        path: "revenue-instructor",
        element: <RevenueInstructor />,
      },
      {
        path: "revenue-course-month/:id",
        element: <RevenueCourseByMonth />,
      },
    ],
  },
  {
    path: "/instructor",
    element: <HomePage />,
    children: [
      {
        path: "courses",
        // element: <CourseInstructor />,
        element: <PageCourseInstructor />,
        children: [
          {
            path: "detailCourse/:id",
            element: <DetailCourse />,
          },
        ],
      },
      {
        path: "lectures/:id",
        element: <Lectures />,
      },
      {
        path: "assignment/:id",
        element: <AssignmentPage />,
      },
      {
        path: "question/:id",
        element: <QuestionList />,
      },
      {
        path: "student-course/:id",
        element: <StudentOfCourse />,
      },
      {
        path: "ratings-course/:id",
        element: <RatingsCourse />,
      },
      {
        path: "profile",
        element: <ProfileUser />,
      },
      {
        path: "students",
        element: <StudentOfTeacher />,
      },
      {
        path: "total-revenue",
        element: <RevenueByMonthTeacher />,
      },
      {
        path: "payment-management",
        element: <PaymentOfTeacher />,
      },
      {
        path: "revenue-course",
        element: <RevenueCourseOfInstructor />,
      },
      {
        path: "revenue-teacher",
        element: <RevenueTeacherByMonth />,
      },
      {
        path: "revenue-course-day/:id",
        element: <RevenueCourseByDay />,
      },
      {
        path: "revenue-course-month/:id",
        element: <RevenueCourseByMonth />,
      },
    ],
  },
]);
