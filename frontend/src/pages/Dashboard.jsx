import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createSession, getSessions,reset,deleteSession } from '../features/sessions/sessionSlice'
import { toast } from 'react-toastify'
import SessionCard from "../components/SessionCard"
import interviewImage from "../assets/interview.png";
import { Bot } from "lucide-react";

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
const LEVELS = ["Junior", "Mid-Level", "Senior"];
const TYPES = [{ label: 'Oral only', value: 'oral-only' }, { label: 'Coding Mix', value: 'coding-mix' }];
const COUNTS = [5, 10, 15];

const Dashboard = () => {
  const dispatch = useDispatch();
   
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { sessions, isLoading, isGenerating, isError, message } = useSelector((state) => state.sessions);
  const isProcessing = isGenerating;
 

  const [formData, setFormData] = useState({
    role: user.preferredRole || ROLES[0],
    level: LEVELS[0],
    interviewType: TYPES[1].value,
    count: COUNTS[0],
  });
  

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSession(formData));
  }

  const viewSession = (session) => {
    if (session.status === 'completed') {
      navigate(`/review/${session._id}`);
    } else if(session.status === 'in-progress') {
      navigate(`/interview/${session._id}`);
    }else{
      toast.info('Session not ready yet')
    }
  }


  const handleDelete = (e, sessionId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this session?')) {
      dispatch(deleteSession(sessionId));
      toast.error('Session Deleted')
    }
  }

  const completedSessions = sessions.filter(
  (session) => session.status === "completed"
);

const scores = completedSessions
  .map(session => Number(session.overallScore))
  .filter(score => !isNaN(score));

const averageScore =
  scores.length > 0
    ? Math.round(
        scores.reduce((a, b) => a + b, 0) / scores.length
      )
    : 0;

const bestScore =
  scores.length > 0
    ? Math.max(...scores)
    : 0;

const getPerformanceLevel = (score) => {
 if(score>=90)
return {
text:"🏆 Excellent",
color:"text-emerald-600"
}

if(score>=75)
return {
text:"🔥 Good",
color:"text-blue-600"
}

if(score>=60)
return {
text:"🙂 Average",
color:"text-yellow-600"
}

if(score>=40)
return {
text:"⚠ Needs Improvement",
color:"text-orange-600"
}

return {
text:"❌ Poor",
color:"text-red-600"
};
};

const performance = getPerformanceLevel(averageScore);
const completedCount = sessions.filter(
  (session) => session.status === "completed"
).length;

const inProgressCount = sessions.filter(
  (session) => session.status === "in-progress"
).length;

const pendingCount = sessions.filter(
  (session) => session.status === "pending"
).length;
const nextGoal = Math.ceil((sessions.length + 1) / 10) * 10;

const progress =
Math.min((sessions.length / nextGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
<div className="max-w-[1400px] mx-auto px-8 py-10 space-y-10">

     <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-5">

  <div>
    <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
      Welcome back,
      <span
  className="
bg-gradient-to-r
from-indigo-600
to-violet-600
bg-clip-text
text-transparent
"
>
  {" "}
  {user.name.split(" ")[0]}
</span>
     <span className="inline-block animate-bounce">
  👋
</span>
    </h1>
<p className="mt-4 text-xl text-slate-500">
      Ready to ace your next interview?
    </p>
    <div className="flex gap-3 mt-6 flex-wrap">

  <div className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold hover:scale-105 transition-all cursor-default">
    🤖 AI Powered
  </div>

  <div className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 font-semibold hover:scale-105 transition-all cursor-default">
    🎤 Voice Interview
  </div>

  <div className="px-4 py-2 rounded-xl bg-cyan-100 text-cyan-700 font-semibold hover:scale-105 transition-all cursor-default">
    📊 Performance Analytics
  </div>

</div>
  </div>

 <div
className="
bg-gradient-to-br
from-indigo-700
via-violet-600
to-purple-600
rounded-[30px]
shadow-[0_20px_60px_rgba(99,102,241,0.45)]
text-white
px-8
py-9
w-[300px]
hover:scale-[1.03]
hover:-translate-y-2
transition-all
duration-500
"
>

<p className="text-xs uppercase tracking-[3px] opacity-70">
Total Sessions
</p>

<h2 className="text-6xl font-black mt-2">
{sessions.length}
</h2>

<p className="mt-2 text-sm opacity-80">

{performance.text}

</p>

<div className="mt-6">

<div className="flex justify-between text-xs opacity-80 mb-2">

<span>
Goal
</span>

<span>

{nextGoal}

</span>

</div>

<div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">

<div

className="
h-full
bg-white
rounded-full
shadow-[0_0_20px_white]
transition-all
duration-700
"

style={{
width:`${progress}%`
}}

></div>

</div>

</div>

<p className="mt-4 text-xs opacity-70">

Only {nextGoal-sessions.length} interviews to reach your next milestone 🚀

</p>

</div>

</div>
      </div>
      <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-xl sm:shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-10 pt-10">
<div className="flex items-center gap-6">

<div
className="
group
w-20
h-20
rounded-3xl
bg-gradient-to-br
from-blue-50
to-indigo-100
flex
items-center
justify-center
shadow-xl
hover:shadow-indigo-200
hover:scale-110
transition-all
duration-300
"
>

    <Bot
size={42}
strokeWidth={2}
className="text-blue-600 group-hover:rotate-12 transition-all duration-300"
/>

  </div>

  <div>

    <h2 className="text-4xl font-extrabold text-slate-900">
      Start a New Interview
    </h2>

    <p className="mt-2 text-lg text-slate-500">
      Choose your preferences and begin your practice session
    </p>

  </div>

</div>

<div className="hidden lg:flex flex-col items-center">
  <img
    src={interviewImage}
    alt="Interview Illustration"
   className="
w-64
hover:scale-105
transition-all
duration-500
"
  />

  <p className="mt-3 text-sm text-slate-500 font-medium">
    AI Interview Assistant
  </p>
</div>

</div>

        <form onSubmit={onSubmit}className="px-10 pb-10 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role</label>
            <select name="role" value={formData.role} onChange={onChange} className="
w-full
h-14
px-4
bg-white
border
border-slate-300
rounded-2xl
text-slate-700
font-medium
shadow-sm
transition-all
duration-300
outline-none
hover:border-indigo-500
hover:shadow-md
focus:border-indigo-600
focus:ring-4
focus:ring-indigo-100
appearance-none
cursor-pointer
"> 
              {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}</select>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:contents">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Level</label>
              <select name="level" value={formData.level} onChange={onChange} className="
w-full
h-14
px-4
bg-white
border
border-slate-300
rounded-2xl
text-slate-700
font-medium
shadow-sm
transition-all
duration-300
outline-none
hover:border-indigo-500
hover:shadow-md
focus:border-indigo-600
focus:ring-4
focus:ring-indigo-100
appearance-none
cursor-pointer
">
                {LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}</select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Length</label>
              <select name="count" value={formData.count} onChange={onChange} className="
w-full
h-14
px-4
bg-white
border
border-slate-300
rounded-2xl
text-slate-700
font-medium
shadow-sm
transition-all
duration-300
outline-none
hover:border-indigo-500
hover:shadow-md
focus:border-indigo-600
focus:ring-4
focus:ring-indigo-100
appearance-none
cursor-pointer
">
                {COUNTS.map((count) => <option key={count} value={count}>{count} Qs</option>)}</select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
            <select name="interviewType" value={formData.interviewType} onChange={onChange}className="
w-full
h-14
px-4
bg-white
border
border-slate-300
rounded-2xl
text-slate-700
font-medium
shadow-sm
transition-all
duration-300
outline-none
hover:border-indigo-500
hover:shadow-md
focus:border-indigo-600
focus:ring-4
focus:ring-indigo-100
appearance-none
cursor-pointer
">
              {TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select>
          </div>
  <button
  type="submit"
  disabled={isProcessing}
 className={`w-full h-[54px]
rounded-2xl
border
border-indigo-300
shadow-xl
hover:shadow-indigo-200
font-semibold
text-white
flex
items-center
justify-center
gap-2
transition-all
duration-300
${
  isProcessing
    ? "bg-slate-400 cursor-not-allowed"
    : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 hover:scale-[1.02]"
}`}
>
  {isProcessing ? (
    <>
      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      Generating...
    </>
  ) : (
    <>🚀 Start Interview</>
  )}
</button>
        </form>
     <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 px-10 pb-10">

{/* Sessions */}

<div className="bg-white rounded-3xl p-6 shadow-lg border hover:-translate-y-2
hover:shadow-2xl
hover:border-indigo-300
transition-all
duration-300">
<div className="flex items-center gap-4">

<div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
📚
</div>

<div>
<p className="text-slate-400 text-xs uppercase">
Sessions
</p>

<h2 className="text-3xl font-bold">
{sessions.length}
</h2>

<p className="text-xs text-slate-400">
Completed Interviews
</p>

</div>

</div>
</div>

{/* Average */}

<div className="bg-white rounded-3xl p-6 shadow-lg border hover:-translate-y-2
hover:shadow-2xl
hover:border-indigo-300
transition-all
duration-300">
<div className="flex items-center gap-4">

<div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
📈
</div>

<div>
<p className="text-slate-400 text-xs uppercase">
Average
</p>

<h2 className={`text-3xl font-bold ${performance.color}`}>
{averageScore}%
</h2>

<p className="text-xs text-slate-400">
Overall Performance
</p>

</div>

</div>
</div>

{/* Best */}

<div className="bg-white rounded-3xl p-6 shadow-lg border hover:-translate-y-2
hover:shadow-2xl
hover:border-indigo-300
transition-all
duration-300">
<div className="flex items-center gap-4">

<div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
🏆
</div>

<div>
<p className="text-slate-400 text-xs uppercase">
Best
</p>

<h2 className="text-3xl font-bold text-emerald-600">
{bestScore}%
</h2>

<p className="text-xs text-slate-400">
Highest Score
</p>

</div>

</div>
</div>

{/* Performance */}

<div className="bg-white rounded-3xl p-6 shadow-lg border hover:-translate-y-2
hover:shadow-2xl
hover:border-indigo-300
transition-all
duration-300">
<div className="flex items-center gap-4">

<div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl">
🔥
</div>

<div>
<p className="text-slate-400 text-xs uppercase">
Performance
</p>

<h2 className={`text-3xl font-bold ${performance.color}`}>
{performance.text}
</h2>

<p className="text-xs text-slate-400">
Based on Average
</p>

</div>

</div>
</div>

</div>
        
</div> {/* 3. Closing div for the card moved here */}

      {/* HISTORY LIST (Now separate from the creation card) */}
<div className="space-y-6 pt-10 pb-20 sm:pb-0">
      <div className="flex items-start justify-between">

  <div>

 
    <h2 className="text-4xl font-black text-slate-900 mb-6">
      Interview History
    </h2>
   <p className="text-slate-500 mb-6">
Track your previous interview sessions and review your progress.
</p>
    <div className="flex gap-3 mt-4 flex-wrap">

      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
        ✅ Completed : {completedCount}
      </span>

      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
        🟡 In Progress : {inProgressCount}
      </span>

      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
        🔵 Pending : {pendingCount}
      </span>

    </div>

  </div>

  <div className="flex items-center gap-4">

    <button className="px-4 py-2 rounded-xl border hover:bg-slate-50">
      Filter ▼
    </button>

    <button className="text-indigo-600 font-semibold hover:text-indigo-700">
      View All ({sessions.length})
    </button>

  </div>

</div>
        {isLoading && sessions.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-indigo-600 rounded-full"></div>
          </div>
        ) : (
          sessions.length === 0 ? (
           <div className="bg-white rounded-3xl shadow-lg border border-slate-300 shadow-sm p-20 text-center">
  <h3 className="text-2xl font-bold text-slate-900">
    No Interviews Yet 🚀
  </h3>

  <p className="text-slate-500 mt-3">
    Start your first AI interview and track your progress here.
  </p>
</div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <SessionCard key={session._id} session={session} onClick={viewSession} onDelete={handleDelete}/>
              ))}
            </div>
          )
        )}
      </div>

    </div>
  )
}
export default Dashboard
