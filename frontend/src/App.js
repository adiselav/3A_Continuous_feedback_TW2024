import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ProfessorDashboard from './pages/dashboard/ProfessorDashboard';

function App() {
const { user, loading } = useAuth();

if (loading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    );
}

return (
    <div className="min-h-screen bg-gray-100">
    {user && <Navigation />}
    <div className="container mx-auto px-4 py-8">
        <Routes>
        <Route path="/auth">
            <Route
            path="login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
            path="register"
            element={!user ? <Register /> : <Navigate to="/dashboard" />}
            />
        </Route>

        <Route
            path="/dashboard"
            element={
            user ? (
                user.role === 'student' ? (
                <StudentDashboard />
                ) : (
                <ProfessorDashboard />
                )
            ) : (
                <Navigate to="/auth/login" />
            )
            }
        />

        <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    </div>
    </div>
);
}

export default App;
