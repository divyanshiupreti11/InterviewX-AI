import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {register,reset} from '../features/auth/authSlice'
import { useNavigate,Link } from 'react-router-dom'
import {toast} from 'react-toastify'

import {
Bot,
User,
Mail,
Lock,
ShieldCheck,
Target,
TrendingUp
} from "lucide-react";

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name,email,password,password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user,isLoading,isError,isSuccess,message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
      dispatch(reset())
    }
    if(isSuccess ){
      toast.success('User Registered Successfully')
      navigate('/')
      dispatch(reset())
    }
    if(user && !isSuccess){
      navigate('/')
      
    }
  }, [user,isError,isSuccess,message,navigate,dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(password !== password2){
      toast.error('Passwords do not match')
    }else{
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return(
      <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500'></div>
      </div>
    )
  }

  return (
    <div className="
min-h-[90vh]
relative
overflow-hidden
bg-gradient-to-br
from-white
via-indigo-50
to-violet-100
flex
items-center
justify-center
px-8
py-12
">

<div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-indigo-300/20 blur-[120px]" />

<div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-violet-300/20 blur-[120px]" />

<div className="absolute top-32 right-24 w-72 h-72 rounded-full border border-indigo-200/60"></div>

<div className="absolute bottom-20 left-10 w-60 h-60 rounded-full border border-violet-200/60"></div>

<div className="max-w-7xl w-full grid lg:grid-cols-2 gap-28 items-center">
  <div className="hidden lg:block">

<span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
✨ Join InterviewX
</span>

<h1 className="text-6xl font-black mt-6 leading-tight text-slate-900">
Create
<br/>

<span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
Your Account
</span>

</h1>

<p className="mt-6 text-lg text-slate-600 max-w-lg leading-8">
Start your AI-powered interview journey, solve coding questions and track your progress.
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
">

<div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

<Target className="text-emerald-600"/>

</div>

<div>

<h3 className="font-bold text-xl">
Practice Smarter
</h3>

<p className="text-slate-500">
AI-powered interview questions.
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
">

<div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

<TrendingUp className="text-indigo-600"/>

</div>

<div>

<h3 className="font-bold text-xl">
Track Growth
</h3>

<p className="text-slate-500">
Analytics and performance reports.
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
">

<div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

<ShieldCheck className="text-violet-600"/>

</div>

<div>

<h3 className="font-bold text-xl">
Safe & Secure
</h3>

<p className="text-slate-500">
Encrypted account and interview history.
</p>

</div>

</div>

</div>







</div>

      <div
className="
relative
overflow-hidden
lg:-ml-20
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
"
>
        <div className='text-center mb-8'>
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-indigo-200/20 blur-[90px]" />
         <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">
    <Bot size={38} className="text-white" strokeWidth={2.5}/>
</div>

<p className="uppercase tracking-[6px] text-emerald-500 font-bold text-xs">
INTERVIEWX
</p>

<h1 className="text-4xl font-black mt-4 leading-tight text-slate-900">
Create
<br/>

<span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
Your Account
</span>

</h1>

<p className="mt-5 text-slate-500 leading-7">
Start your AI-powered interview journey.
</p>
        </div>

        <form onSubmit={onSubmit} className='grid grid-cols-1 gap-4'>
          <div className='space-y-1'>
            <label className='text-[10px] font-bold uppercase text-gray-400 ml-1'>Full Name</label>
            <input type="text" name="name" value={name} className="
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
" placeholder='Enter Your Name Here' onChange={onChange} required />
          </div>
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
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
duration-300
hover:-translate-y-1
focus:ring-4
focus:ring-indigo-100
outline-none
transition-all
" placeholder='Enter Your Password Here' onChange={onChange} required />

            </div>
            <div className='space-y-1'>
              <label className='text-[10px] font-bold uppercase text-gray-400 ml-1'>Confirm</label>
              <input type="password" name="password2" value={password2} className="
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
duration-300
hover:-translate-y-1
focus:ring-4
focus:ring-indigo-100
outline-none
transition-all
" placeholder='********' onChange={onChange} required />
            </div>
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
">Create My Account</button>
        </form>

        <p className='mt-8 text-center text-sm text-gray-500 '>Already have an account? <Link to="/login" className='text-teal-600  font-bold hover:underline'>Sign In</Link></p>

      </div>
    </div>
    </div>
  )
}

export default Register
