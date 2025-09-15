import { useState, useEffect } from "react";
import { LoginForm } from "./auth/LoginForm";
import { RegisterForm } from "./auth/RegisterForm";
import { Header } from "./layout/Header";
import { AdminDashboard } from "./dashboard/AdminDashboard";
import { UserDashboard } from "./dashboard/UserDashboard"; 
import { StoreOwnerDashboard } from "./dashboard/StoreOwnerDashboard";
import { authService, User } from "@/lib/auth";

export const AppContainer = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleRegister = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication forms if not logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm
              onLogin={handleLogin}
              onToggleMode={() => setIsLogin(false)}
            />
          ) : (
            <RegisterForm
              onRegister={handleRegister}
              onToggleMode={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    );
  }

  // Show appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard user={currentUser} />;
      case 'store_owner':
        return <StoreOwnerDashboard user={currentUser} />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        {renderDashboard()}
      </main>
    </div>
  );
};