import LoginForm from './LoginForm';

const LoginPage = () => {
    return (
        <div className="flex h-screen bg-purple-600">
            <div className="w-1/2 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">StackLink</h1>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-white rounded-bl-[80px]">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;