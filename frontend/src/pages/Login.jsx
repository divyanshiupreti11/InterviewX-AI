import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, googleLogin, reset } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import {
Bot,
Target,
TrendingUp,
ShieldCheck
} from "lucide-react";
const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset())
    }

    if (isSuccess || user) {
      navigate('/');
      dispatch(reset())
    }


  }, [user, isError, isSuccess, message, navigate, dispatch])



  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {

      email,
      password
    }
    dispatch(login(userData))

  }

  const handleGoogleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(googleLogin(credentialResponse.credential))
    } else {
      toast.error('Something went wrong. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500'></div>
      </div>
    )
  }

  return (
   <div className="min-h-[90vh]
relative
overflow-hidden
bg-gradient-to-br
from-white
via-indigo-50
to-violet-100 flex items-center justify-center px-8 py-4">
  
  
<div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-indigo-300/20 blur-[120px]" />

<div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-violet-300/20 blur-[120px]" />
<div className="absolute top-32 right-24 w-72 h-72 rounded-full border border-indigo-200/60"></div>

<div className="absolute bottom-20 left-10 w-60 h-60 rounded-full border border-violet-200/60"></div>

  <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-28 items-center">
    {/* LEFT SIDE */}

<div className="hidden lg:block">

    <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
        ✨ Welcome Back
    </span>

    <h1 className="text-6xl font-black leading-tight mt-6 text-slate-900">
        Welcome
        <br />
        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 bg-clip-text text-transparent">
            Back!
        </span>
    </h1>

    <p className="mt-6 text-lg text-slate-600 max-w-lg leading-8">
        Login to continue your AI-powered interview preparation,
        practice coding interviews and track your performance.
    </p>

    <div className="mt-12 space-y-8">

       <div className="
flex
gap-5
p-4
rounded-3xl
hover:bg-white/60
hover:shadow-lg
transition-all
duration-300
">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
              <Target className="text-emerald-600"/>
            </div>

            <div>
                <h3 className="font-bold text-xl">
                    AI Powered Practice
                </h3>

                <p className="text-slate-500">
                    Real interview questions with instant feedback.
                </p>
            </div>
        </div>

        <div className="
flex
gap-5
p-4
rounded-3xl
hover:bg-white/60
hover:shadow-lg
transition-all
duration-300
">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
                <TrendingUp className="text-indigo-600"/>
            </div>

            <div>
                <h3 className="font-bold text-xl">
                    Track Progress
                </h3>

                <p className="text-slate-500">
                    Improve consistently with analytics.
                </p>
            </div>
        </div>

       <div className="
flex
gap-5
p-4
rounded-3xl
hover:bg-white/60
hover:shadow-lg
transition-all
duration-300
">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-2xl">
                <ShieldCheck className="text-violet-600"/>
            </div>

            <div>
                <h3 className="font-bold text-xl">
                    Secure & Private
                </h3>

                <p className="text-slate-500">
                    Your interview history is always protected.
                </p>
            </div>
        </div>

    </div>

</div>
      <div className="
relative
overflow-hidden
w-full
max-w-[460px]
bg-white/95
backdrop-blur-xl
p-12
rounded-[30px]
border
border-indigo-100
shadow-[0_20px_70px_rgba(99,102,241,.18)]
hover:shadow-[0_30px_80px_rgba(99,102,241,.25)]
transition-all
duration-500
">
  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-indigo-200/20 blur-[90px]" />
     <div className="text-center mb-10">

 <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">
    <Bot size={38} className="text-white" strokeWidth={2.5}/>
</div>

  <p className="uppercase tracking-[6px] text-emerald-500 font-bold text-xs">
    INTERVIEWX
  </p>

  <h1 className="text-4xl font-black mt-4 text-slate-900 leading-tight">
    Login to
    <br />
    <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
      Your Account
    </span>
  </h1>

  <p className="mt-5 text-slate-500 text-base leading-7">
    Enter your credentials to continue your AI-powered interview preparation.
  </p>

</div>

        <form onSubmit={onSubmit} className='grid grid-cols-1 gap-4'>

          <div className='space-y-1'>
            <label className='text-[10px] font-bold uppercase text-gray-400 ml-1'>Email</label>
            <input type="email" name="email" value={email}className="
w-full
h-14
px-5
rounded-2xl
bg-white
border
border-slate-200
placeholder:text-slate-400
hover:border-indigo-300
focus:border-indigo-500
focus:ring-4
focus:ring-indigo-100
outline-none
transition-all
" placeholder='Enter Your E-mail Here' onChange={onChange} required />

          </div>

          <div className='space-y-1'>
            <label className='text-[10px] font-bold uppercase text-gray-400 ml-1'>Password</label>
            <input type="password" name="password" value={password} className="
w-full
h-14
px-5
rounded-2xl
bg-white
border
border-slate-200
placeholder:text-slate-400
hover:border-indigo-300
focus:border-indigo-500
focus:ring-4
focus:ring-indigo-100
outline-none
transition-all
" placeholder='Enter Your Password Here' onChange={onChange} required />

          </div>


          <button type="submit" className="
w-full
py-4
rounded-2xl
font-bold
text-white
bg-gradient-to-r
from-indigo-600
via-violet-600
to-purple-600
shadow-lg
shadow-indigo-200
hover:-translate-y-1
hover:scale-[1.02]
hover:shadow-2xl
hover:shadow-indigo-300
transition-all
duration-300
">Login to Account</button>
        </form>

        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400 text-[10px] font-black tracking-widest uppercase">Social Login</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

       <div className="w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google login failed')}
            theme="outline"
            size="large"
            width="360"
            text="continue_with"
           shape="pill"
          />
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
         Don't have an account? <Link to="/register" className="text-teal-600 font-bold hover:underline">Create an account</Link>
        </p>

      </div>
    </div>
    </div>



  )
}

export default Login
