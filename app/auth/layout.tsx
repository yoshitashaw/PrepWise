import {ReactNode} from 'react'
// import AuthForm from "@/components/AuthForm";

// const AuthLayout = ({children}:{children: ReactNode}) => {
//   return <AuthForm type="sign-up" />;
// };

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {children}
    </div>
  );
};

export default AuthLayout;

