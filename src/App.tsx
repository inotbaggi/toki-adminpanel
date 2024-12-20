import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider, useAuth} from './AuthContext';
import LoginPage from './pages/LoginPage';
import FacultyListPage from './pages/faculty/FacultyListPage';
import FacultyPage from './pages/faculty/FacultyPage';
import CreateFacultyPage from './pages/faculty/CreateFacultyPage';
import CreateGroupPage from './pages/group/CreateGroupPage';
import Navbar from './components/Navbar';
import GroupManagePage from "./pages/group/GroupManagePage";
import ScheduleCreatePage from "./pages/ScheduleCreatePage";
import GroupSchedulePage from "./pages/group/GroupSchedulePage";
import TimeEditPage from "./pages/TimeEditPage";
import HomePage from "./pages/HomePage";
import TeacherCreatePage from "./pages/TeacherCreatePage";
import TeacherListPage from "./pages/TeacherListPage";
import DeveloperPage from "./pages/DevPage";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({children}) => {
    const {token} = useAuth();
    if (!token) {
        return <LoginPage/>;
    }
    return children;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>

                    <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>

                    <Route path="/faculty/list" element={<PrivateRoute><FacultyListPage/></PrivateRoute>}/>
                    <Route path="/faculty/:id/groups" element={<PrivateRoute><FacultyPage/></PrivateRoute>}/>
                    <Route path="/faculty/create" element={<PrivateRoute><CreateFacultyPage/></PrivateRoute>}/>

                    <Route path="/group/:groupId/schedule/:dayId" element={<PrivateRoute><GroupSchedulePage/></PrivateRoute>}/>
                    <Route path="/group/:groupId/schedule" element={<PrivateRoute><GroupManagePage/></PrivateRoute>}/>
                    <Route path="/group/create" element={<PrivateRoute><CreateGroupPage/></PrivateRoute>}/>

                    <Route path="/schedule/create" element={<PrivateRoute><ScheduleCreatePage/></PrivateRoute>}/>
                    <Route path="/time/edit" element={<PrivateRoute><TimeEditPage/></PrivateRoute>}/>

                    <Route path="/teacher/create" element={<PrivateRoute><TeacherCreatePage/></PrivateRoute>}/>
                    <Route path="/teacher/list" element={<PrivateRoute><TeacherListPage/></PrivateRoute>}/>
                    <Route path="/dev/null/panel/kek" element={<PrivateRoute><DeveloperPage/></PrivateRoute>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
