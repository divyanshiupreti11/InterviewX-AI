import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updateProfile, reset } from '../features/auth/authSlice'
import {
  User,
  Mail,
  Briefcase,
  Save
} from "lucide-react";

const ROLES = [
  "MERN Stack Developer",
  "MEAN Stack Developer",
  "Full Stack Python",
  "Full Stack Java",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Cloud Engineer (AWS/Azure/GCP)",
  "Cybersecurity Engineer",
  "Blockchain Developer",
  "Mobile Developer (iOS/Android)",
  "Game Developer",
  "UI/UX Designer",
  "QA Automation Engineer",
  "Product Manager"
];
const inputBase = `
w-full
h-14
px-5
bg-slate-50
border
border-slate-200
shadow-sm
rounded-2xl
text-slate-700
font-medium
transition-all
duration-300
hover:border-indigo-400
hover:shadow-md
hover:bg-white
focus:bg-white
focus:border-indigo-600
focus:ring-4
focus:ring-indigo-100
focus:shadow-lg
outline-none
`;
const Profile = () => {
  const dispatch = useDispatch();
  const { user, isSuccess, isError, message, isProfileLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    preferredRole: user?.preferredRole || '',
  })

  useEffect(() => {
    if (!isError && !isSuccess) return
    if (isError) toast.error(message)
    if (isSuccess) toast.success('Profile Updated Successfully')
    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        preferredRole: user?.preferredRole || '',
      });
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name === user.name && formData.preferredRole === user.preferredRole) {
      toast.info('No changes to save.')
      return
    }
    dispatch(updateProfile(formData))
  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

<div className="max-w-5xl mx-auto px-6 py-12 pb-24">
<div className="
bg-white/90
backdrop-blur-md
rounded-[2rem]
shadow-[0_20px_60px_rgba(99,102,241,.15)]
p-6
sm:p-12
border
border-slate-100
transition-all
duration-300
hover:-translate-y-1
hover:shadow-[0_25px_70px_rgba(99,102,241,.22)]
">
     <header className="mb-14 flex items-center gap-7">

<div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">

<User
size={46}
strokeWidth={2}
className="text-white"
/>

</div>

<div>

<h1 className="text-5xl font-black text-slate-900">
My Profile
</h1>

<p className="mt-3 text-lg text-slate-500 max-w-xl">
Manage your personal information and interview preferences
</p>

</div>

</header>

        <form onSubmit={handleSubmit} className='space-y-6' >

         <FormField
  label="Full Name"
  icon={<User size={16} className="text-indigo-500" />}
>
            <input
              type="text"
              className={inputBase}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </FormField>

          <FormField
  label="Email Address"
  icon={<Mail size={16} className="text-indigo-500" />}
  muted
>
            <input
              type="email"
             className="w-full h-14 px-5 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 cursor-not-allowed"
              value={formData.email}
              onChange={handleChange}

            />
          </FormField>

          <FormField
  label="Target Role"
  icon={<Briefcase size={16} className="text-indigo-500" />}
>
            <div className='relative'>
              <select name="preferredRole" value={formData.preferredRole} onChange={handleChange} className={`${inputBase} appearance-none`}>
                {
                  ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))
                }

              </select>
              <SelectArrow />
            </div>
          </FormField>
<hr className="my-8 border-slate-200" />
          <div className='pt-4'>
            <button
              type='submit'
              disabled={isProfileLoading}
className={`
w-full
h-14
rounded-2xl
font-bold
text-white
flex
items-center
justify-center
gap-2
transition-all
duration-300
${
isProfileLoading
?
"bg-slate-400 cursor-not-allowed"
:
"bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-1 hover:scale-[1.02]"
}
`}>
              {
isProfileLoading
?
<Loader/>
:
<>
<Save size={20} strokeWidth={2.5}/>
<span>Save Changes</span>
</>
}
              </button>
          </div>
        </form>
      </div>

    </div>
    </div>
  )
}

export default Profile

function FormField({ label, icon, children, muted }) {
  return (
    <div className={`space-y-2 ${muted ? "opacity-70" : ""}`}>

      <label className="flex items-center gap-2 ml-1 text-xs font-bold text-slate-500 uppercase tracking-wider">

        {icon}

        <span>{label}</span>

      </label>

      {children}

    </div>
  );
}
function SelectArrow() {
  return (
<div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  )
}

function Loader() {
  return (
    <>
      <span className='w-5 h-5 border-2 border-slate-400 border-t-transparent animate-spin rounded-full' />
      <span>Saving...</span>
    </>
  )
}