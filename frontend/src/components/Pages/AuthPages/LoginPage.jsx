import LinkedInLogo from '../../../assets/LinkedIn.svg'
import Google from '../../../assets/google.svg'
import Microsoft from '../../../assets/microsoft.svg'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex px-10 py-4 text-[#0A66C2] space-x-1 shrink-0">
        <h1 className="font-bold text-2xl">Linked</h1>
        <img src={LinkedInLogo} alt="Logo" className="h-7 w-7" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-4 overflow-hidden">
        <div className="w-90 shadow-2xl p-5 space-y-5">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <div className="flex border rounded-4xl px-6 py-3 space-x-3 cursor-pointer">
            <img src={Google} alt="Google" className="h-6 w-6" />
            <h1>Continue with Google</h1>
          </div>
          <div className="flex border rounded-4xl px-6 py-3 space-x-3 cursor-pointer">
            <img src={Microsoft} alt="Microsoft" className="h-4 w-4" />
            <h1>Continue with Microsoft</h1>
          </div>
          <p className="text-[12px] leading-4">
            By clicking Continue, you agree to LinkedIn’s{" "}
            <span className="text-[#0A66C2]">User</span><br />
            <span className="text-[#0A66C2]">Agreement</span>,{" "}
            <span className="text-[#0A66C2]">Privacy Policy,</span> and{" "}
            <span className="text-[#0A66C2]">Cookie Policy</span>.
          </p>
          <div className="flex items-center gap-3 w-full">
            <hr className="grow border-gray-300" />
            <span className="text-gray-500">or</span>
            <hr className="grow border-gray-300" />
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="Email or phone" className="border w-full px-3 py-3 rounded-sm" />
            <input type="password" placeholder="Password" className="border w-full px-3 py-3 rounded-sm" />
          </div>
          <h1 className="font-semibold text-[#0A66C2] cursor-pointer">Forgot password?</h1>
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="h-5 w-5 cursor-pointer" />
            <h1>Keep me logged in</h1>
          </div>
          <button className="w-full py-4 bg-[#0A66C2] text-white font-semibold rounded-4xl cursor-pointer" onClick={() => {
            navigate('/home');
          }}>
            Sign in
          </button>
        </div>
        <div className="pt-4 text-center">
          <h1>
            New to LinkedIn?{" "}
            <span className="text-[#0A66C2] cursor-pointer">join now</span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
