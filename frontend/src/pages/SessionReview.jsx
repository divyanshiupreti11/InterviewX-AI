import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSessionById } from '../features/sessions/sessionSlice';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import trophyImage from "../assets/trophy.png";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
    Download,
    RotateCcw,
    Award,
    Brain,
    Mic,
    Clock3,
    FileText,
    Bot
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const formatDuration = (start, end) => {
    if (!start || !end) return 'N/A';
    const diff = new Date(end) - new Date(start);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
};

const sanitizeQuestionText = (text) => {
    return text.replace(/^\d+[\s\.\)]+/, '').trim();
};

const formatIdealAnswer = (text) => {
    try {
        if (!text) return "Pending evaluation.";

        let cleanText = text.trim();

        // 1. Remove Markdown code blocks if the AI added them (e.g., ```json ... ```)
        if (cleanText.startsWith('```')) {
            cleanText = cleanText.replace(/^```(json)?/, '').replace(/```$/, '').trim();
        }

        // 2. Check if it's a JSON object
        if (cleanText.startsWith('{') && cleanText.endsWith('}')) {
            const parsed = JSON.parse(cleanText);

            // Scenario A: The "Merged" Hallucination (Fixes Screenshot 266)
            // The AI put the score object inside the answer. We extract just the answer.
            if (parsed.verbalAnswer || parsed.idealAnswer || parsed.idealanswer) {
                return parsed.verbalAnswer || parsed.idealAnswer || parsed.idealanswer;
            }

            // Scenario B: Structured Explanation (Fixes Screenshot 267/268)
            const explanation = parsed.explanation || parsed.understanding || "";
            const code = parsed.code || parsed.codeExample || parsed.example || "";

            if (explanation || code) {
                return `${explanation}\n\n${code}`.trim();
            }
        }

        // Scenario C: It's just a normal string
        return text;
    } catch (e) {
        // If parsing fails, just show the raw text so nothing crashes
        return text;
    }
};

function SessionReview() {
    const { sessionId } = useParams();
    const dispatch = useDispatch();
    const { activeSession, isLoading } = useSelector(state => state.sessions);

    useEffect(() => {
        dispatch(getSessionById(sessionId));
    }, [dispatch, sessionId]);

    if (isLoading) return <div className="text-center py-20 font-bold text-slate-400 animate-pulse uppercase tracking-widest">Generating Analysis...</div>;

    if (!activeSession || activeSession.status !== "completed") {
  return (
    <div
      className="
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
      px-6
      "
    >

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-indigo-300/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-violet-300/20 blur-[120px]" />

      <div className="absolute top-32 right-24 w-72 h-72 rounded-full border border-indigo-200/60" />

      <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full border border-violet-200/60" />

      <div
        className="
        relative
        overflow-hidden
        max-w-xl
        w-full
        bg-white/95
        backdrop-blur-xl
        rounded-[32px]
        border
        border-indigo-100
        p-12
        shadow-[0_20px_70px_rgba(99,102,241,.18)]
        text-center
        "
      >

        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-indigo-200/20 blur-[90px]" />

        <div className="relative z-10">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">

            <Bot
              size={40}
              className="text-white"
              strokeWidth={2.5}
            />

          </div>

          <p className="uppercase tracking-[6px] text-emerald-500 font-bold text-xs">
            INTERVIEWX
          </p>

          <h2 className="mt-5 text-4xl font-black text-slate-900">
            Report
            <br />

            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Not Ready
            </span>

          </h2>

          <p className="mt-5 text-slate-500 leading-8">
            This interview is still being processed by our AI engine.
            <br />
            Your performance report will be available shortly.
          </p>

          <Link
            to="/"
            className="
            inline-flex
            items-center
            gap-3
            mt-10
            px-8
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
            hover:scale-105
            transition-all
            "
          >
            Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}

    const { overallScore, metrics, role, level, questions, startTime, endTime } = activeSession;
  const finalMetrics = metrics || {};

const barData = {
  labels: questions.map((_, i) => `Q${i + 1}`),

  datasets: [
    {
      label: "Technical Score",

      data: questions.map((q) => q.technicalScore || 0),

      backgroundColor: [
        "#6366F1",
        "#5B6CF6",
        "#6366F1",
        "#7C3AED",
        "#A855F7",
      ],

      borderRadius: 16,
      borderSkipped: false,

      barThickness: 55,

      hoverBorderRadius: 20,
    },
  ],
};
return (
    <div className="max-w-[1400px] mx-auto px-8 py-10 space-y-8 animate-in fade-in duration-700">

            {/* --- Header --- */}
          {/* ================= HERO SECTION ================= */}

<div
className="
relative
overflow-hidden
bg-gradient-to-br
from-white
via-indigo-50/40
to-violet-100/40
rounded-[2.5rem]
border
border-indigo-100
shadow-[0_20px_70px_rgba(99,102,241,.15)]
p-12
lg:p-14
transition-all
duration-500
hover:-translate-y-2
"
>
<div
className="
absolute
right-0
top-0
w-[520px]
h-[520px]
rounded-full
bg-gradient-to-br
from-violet-200/40
via-indigo-100/20
to-cyan-100/10
blur-[120px]
"
/>

<div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl" />
<div className="
relative
z-10
flex
flex-col
lg:flex-row
justify-between
items-center
gap-20
">

{/* LEFT */}

<div className="flex-1">

<p className="
inline-flex
items-center
gap-2
w-fit
px-4
py-2
rounded-full
bg-emerald-50
text-emerald-600
font-bold
tracking-[0.2em]
uppercase
text-xs
">

✅ Assessment Complete

</p>

<h1 className="mt-4 text-5xl font-black text-slate-900 leading-tight">

{role}

<span className="text-slate-400 font-semibold">
{" "}
({level})
</span>

</h1>

<p className="
mt-6
text-xl
leading-9
text-slate-500
max-w-xl
">

You have completed your interview.

<br />

Here's your AI Performance Report.

</p>

<div className="flex flex-wrap gap-4 mt-10">

<div className="px-5
py-3
rounded-2xl
font-semibold
shadow-sm bg-indigo-50 text-indigo-700 ">

📅{" "}
{new Date(activeSession.createdAt).toLocaleDateString("en-IN",{
day:"numeric",
month:"short",
year:"numeric"
})}

</div>

<div className="px-5
py-3
rounded-2xl
font-semibold
shadow-sm bg-violet-50 text-violet-700 ">

🕒 {formatDuration(startTime,endTime)}

</div>

<div className="px-5
py-3
rounded-2xl
font-semibold
shadow-sm bg-cyan-50 text-cyan-700 ">

🧠 AI Generated

</div>

</div>

</div>

{/* RIGHT */}

<div className="relative flex flex-col items-center justify-center w-[420px] h-[320px]">

    {/* Background Glow */}
    <div
        className="
        absolute
        inset-0
        rounded-full
        bg-gradient-to-br
        from-violet-300/25
        via-indigo-200/20
        to-cyan-200/10
        blur-3xl
        scale-125
        "
    />

    {/* Decorative Blob */}
    <div
        className="
        absolute
        w-[340px]
        h-[340px]
        rounded-full
        bg-violet-100/40
        blur-2xl
        "
    />

    {/* Image */}
<img
src={trophyImage}
alt="Performance"
className="
w-[450px]
max-w-none
object-contain
mix-blend-multiply
opacity-95
drop-shadow-[0_30px_60px_rgba(124,58,237,.12)]
hover:scale-105
transition-all
duration-500
"
/>

    {/* Buttons */}
    <div className="mt-8 flex items-center gap-3">

<div className="px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 font-semibold shadow-sm">
<div className="
px-6
py-3
rounded-full
bg-gradient-to-r
from-emerald-50
to-cyan-50
border
border-emerald-100

text-emerald-600
font-bold
shadow-sm
">
✨ AI Verified Report
</div>
</div>

</div>

</div>

</div>

</div>

            {/* --- Summary Stats --- */}
           <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

{[
{
title:"Overall Result",
value:overallScore,
icon:<Award size={26}/>,
color:"from-emerald-500 to-teal-500",
bg:"from-emerald-50 to-white",
text:
overallScore>=90
?"Excellent"
:overallScore>=75
?"Good"
:overallScore>=60
?"Average"
:"Needs Improvement"
},

{
title:"Technical Score",
value:finalMetrics.avgTechnical,
icon:<Brain size={26}/>,
color:"from-indigo-500 to-violet-500",
bg:"from-indigo-50 to-white",
text:"Technical"
},

{
title:"Confidence",
value:finalMetrics.avgConfidence,
icon:<Mic size={26}/>,
color:"from-pink-500 to-purple-500",
bg:"from-pink-50 to-white",
text:"Communication"
},

{
title:"Interview Time",
value:39,
display:formatDuration(startTime,endTime),
icon:<Clock3 size={26}/>,
color:"from-orange-500 to-amber-500",
bg:"from-orange-50 to-white",
text:"Completed"
}

].map((card,index)=>(

<div
key={index}
className={`
group
rounded-[2rem]
p-6
border
border-slate-100
bg-gradient-to-br
${card.bg}
shadow-lg
hover:shadow-2xl
hover:-translate-y-1
hover:scale-[1.02]
transition-all
duration-500
`}
>

<div className="flex justify-between items-start">

<div
className={`
w-14
h-14
rounded-2xl
flex
items-center
justify-center
bg-gradient-to-r
${card.color}
text-white
shadow-lg
`}
>
{card.icon}
</div>

<p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
{card.title}
</p>

</div>

<div className="mt-8">

<h2 className="text-5xl font-black text-slate-900">

{card.display ? card.display : `${card.value}%`}

</h2>

<p className="mt-2 text-sm font-semibold text-slate-500">

{card.text}

</p>

</div>

{!card.display && (

<>

<div className="mt-6 h-2 bg-slate-200 rounded-full overflow-hidden">

<div

className={`
h-full
bg-gradient-to-r
${card.color}
rounded-full
transition-all
duration-700
`}

style={{width:`${card.value}%`}}

/>

</div>

<div className="mt-2 text-xs text-right font-bold text-slate-400">

{card.value}%

</div>

</>

)}

</div>

))}
</div>

            {/* --- Chart --- */}
            <div
className="
bg-white
rounded-[2.5rem]
border
border-slate-100
shadow-xl
p-10
space-y-8
"
>
                <div className="flex items-center justify-between">

<div>

<p className="text-xs uppercase tracking-[0.25em] text-indigo-500 font-black">

Performance Analytics

</p>

<h2 className="text-3xl font-black text-slate-900 mt-2">

Interview Performance

</h2>

</div>

<div className="px-5 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold">

Overall {overallScore}%

</div>

</div>
                <div className="grid lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3 h-[500px]">
                    <Bar
                        data={barData}
                       options={{
  responsive: true,
  maintainAspectRatio: false,

 plugins: {
  legend: {
    display: false,
  },

  tooltip: {
    backgroundColor: "#1E1B4B",
    titleColor: "#fff",
    bodyColor: "#fff",
    padding: 14,
    cornerRadius: 12,
    displayColors: false,
  },

  datalabels: {
    anchor: "end",
    align: "top",
    color: "#10B981",
    font: {
      size: 14,
      weight: "bold",
    },
    formatter: (value) => `${value}%`,
  },
},
  scales: {
    y: {
      beginAtZero: true,
      max: 100,

      grid: {
        color: "rgba(99,102,241,.08)",
        drawBorder: false,
      },

      ticks: {
        color: "#64748b",
        stepSize: 20,
      },
    },

    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: "#64748b",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  },
}}
                    />
                    </div>
                    <div className="space-y-4">

<h3 className="font-black text-slate-900">

Performance Insights

</h3>

<div className="rounded-3xl bg-emerald-50 p-5 shadow-sm hover:shadow-lg transition">

<p className="font-semibold text-emerald-700">

✅ Strongest Question

</p>

<p className="text-sm text-slate-600 mt-2">

Question 1 scored highest.

</p>

</div>

<div className="rounded-2xl bg-amber-50 p-4">

<p className="font-semibold text-amber-700">

⚠ Needs Improvement

</p>

<p className="text-sm text-slate-600 mt-2">

Improve confidence in later questions.

</p>

</div>

<div className="rounded-2xl bg-violet-50 p-4">

<p className="font-semibold text-violet-700">

🚀 AI Suggestion

</p>

<p className="text-sm text-slate-600 mt-2">

Explain approach before writing code.

</p>

</div>

</div>
                </div>
                <div>

<p className="text-s uppercase tracking-[0.2em] text-slate-500 font-black mb-4">

Question Navigation

</p>

<div className="flex flex-wrap gap-5">

{questions.map((q,index)=>(

<div
key={index}
className="
group
flex
items-center
gap-5
px-6
py-4
rounded-[22px]
bg-white
border
border-slate-200
shadow-md
hover:shadow-2xl
hover:-translate-y-1
hover:scale-[1.03]
hover:border-indigo-400
transition-all
duration-300
cursor-pointer
min-w-[150px]
"
>

<div
className="
w-12
h-12
rounded-2xl
bg-indigo-50
flex
items-center
justify-center
text-2xl
group-hover:bg-indigo-500
transition-all
duration-300
"
>
<FileText
size={24}
className="text-indigo-600 group-hover:text-white transition"
/>
</div>

<div className="flex items-center gap-4">

<span className="text-2xl font-black text-slate-900">
Q{index+1}
</span>

<div className="w-px h-8 bg-slate-200"/>

<span className="text-xl font-bold text-indigo-600">
{q.technicalScore}%
</span>

</div>

</div>

))}

</div>

</div>
            </div>

            {/* --- Detailed Question Review --- */}
            <div className="space-y-6 sm:space-y-10">
                <h3 className="text-xl sm:text-3xl font-black text-slate-900 px-2 flex items-center tracking-tighter uppercase">
                    <span className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-900 text-white rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-5 text-base sm:text-xl">✓</span>
                    Answer Intelligence
                </h3>
                <div className="space-y-6 sm:space-y-10">
                    {questions.map((q, index) => (
                        <div
key={index}
className="
relative
bg-white
rounded-3xl
sm:rounded-[3rem]
border
border-slate-100
shadow-sm
overflow-hidden
group
hover:shadow-lg
transition-all
duration-500
"
>
    <div
className="
absolute
left-0
top-0
bottom-0
w-2
bg-gradient-to-b
from-violet-500
via-indigo-500
to-cyan-400
"
/>
                            <div className="p-8 space-y-6 sm:space-y-8">

                                {/* Header: Question & Scores */}
                              <div
className="
flex
flex-col
lg:flex-row
justify-between
lg:items-start
gap-6
border-b
border-slate-100
pb-8
">
                                 <h4
className="
flex-1
text-[30px]
font-black
leading-tight
text-slate-900
pr-6
"
>
                                    <span
className="
flex
items-center
justify-center
w-14
h-14
rounded-2xl
bg-gradient-to-r
from-violet-500
to-indigo-600
text-white
font-black
text-2xl
mr-5
shadow-lg
"
>{index + 1}.</span> {sanitizeQuestionText(q.questionText)}
                                    </h4>
                                  <div
className="
flex
gap-3
shrink-0
self-start
mt-2
"
>

    {/* TECH */}

    <div
        className="
        group
        h-10
px-3
        rounded-2xl
        border
        border-emerald-200
        bg-gradient-to-r
        from-emerald-50
        to-white
        flex
        items-center
        gap-2
        shadow-md
        hover:-translate-y-1
        hover:scale-105
        hover:shadow-[0_12px_30px_rgba(16,185,129,.25)]
        transition-all
        duration-300
        cursor-default
        "
    >

        <Brain
            size={18}
            className="text-emerald-500 group-hover:rotate-12 transition"
        />

        <span
            className="
            text-xs
            tracking-[0.25em]
            font-black
            uppercase
            text-slate-400
            "
        >
            TECH
        </span>

        <span
            className="
            text-2xl
            font-black
            text-emerald-600
            group-hover:scale-110
            transition
            "
        >
            {q.technicalScore}%
        </span>

    </div>

    {/* CONF */}

    <div
        className="
        group
         h-10
         px-3
        rounded-2xl
        border
        border-blue-200
        bg-gradient-to-r
        from-blue-50
        to-white
        flex
        items-center
        gap-2
        shadow-md
        hover:-translate-y-1
        hover:scale-105
        hover:shadow-[0_12px_30px_rgba(59,130,246,.25)]
        transition-all
        duration-300
        cursor-default
        "
    >

        <Mic
            size={18}
            className="text-blue-500 group-hover:rotate-12 transition"
        />

        <span
            className="
            text-xs
            tracking-[0.25em]
            font-black
            uppercase
            text-slate-400
            "
        >
            CONF
        </span>

        <span
            className="
            text-2xl
            font-black
            text-blue-600
            group-hover:scale-110
            transition
            "
        >
            {q.confidenceScore}%
        </span>

    </div>

</div>
                                </div>

                                {/* --- User's Submission Display (Corrected) --- */}
                                <div className="space-y-3">
                                   <label
className="
flex
items-center
gap-2
text-indigo-500
font-bold
uppercase
tracking-[0.15em]
mb-4
"
>

<FileText size={18}/>

<span>Your Submission</span>

</label>
                                    <div className="bg-gradient-to-br
from-slate-50
to-slate-100 rounded-2xl sm:rounded-[2.2rem]border border-slate-100 overflow-hidden shadow-inner">

                                        {/* Display Code if available */}
                                        {q.userSubmittedCode && q.userSubmittedCode !== "undefined" && (
                                            <div className="p-4 sm:p-6 border-b border-slate-200 last:border-0">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Code</span>
                                                <div className="flex items-center gap-2 mb-4">

<div className="w-3 h-3 rounded-full bg-red-400"/>

<div className="w-3 h-3 rounded-full bg-yellow-400"/>

<div className="w-3 h-3 rounded-full bg-green-400"/>

</div>
                                               <pre
className="
bg-gradient-to-br
from-slate-900
to-slate-800
border
border-slate-700

relative
text-indigo-300
rounded-2xl
p-6
font-mono
text-[13px]
overflow-x-auto
leading-8
shadow-xl
">
                                                    {q.userSubmittedCode}
                                                </pre>
                                            </div>
                                        )}

                                        {/* Display Transcript if available */}
                                       {q.userAnswerText && (
    <div className="p-6">

       <div className="
flex
items-center
gap-4
px-4
py-2
rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
hover:bg-white/10
hover:border-violet-500/40
transition-all
duration-300
">

    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center shadow-md">
        <span className="text-white text-lg">🎤</span>
    </div>

    <div>
        <p className="text-lg font-black text-slate-900 tracking-wide">
            Transcript
        </p>

        <p className="text-xs text-slate-500 font-medium">
            AI captured your spoken response
        </p>
    </div>

</div>

        <div
            className="
           bg-gradient-to-br
from-white
to-slate-50
            rounded-2xl
            border
            border-slate-200
            p-6
            leading-8
           shadow-md
hover:shadow-xl
transition-all
duration-300
            "
        >
            <p
                className="
                text-slate-700
                text-base
                leading-8
                italic
                "
            >
                "{q.userAnswerText}"
            </p>
        </div>

    </div>
)}

                                        {/* Fallback if nothing was recorded */}
                                        {(!q.userSubmittedCode || q.userSubmittedCode === "undefined") && !q.userAnswerText && (
                                            <div className="p-6 text-center text-slate-400 text-xs italic">
                                                No answer recorded.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Feedback & Ideal Answer Grid */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 sm:pt-8 border-t border-slate-50">
                                    <div className="space-y-3">
                                       <label
className="
flex
items-center
gap-2
text-emerald-600
font-bold
uppercase
tracking-[0.15em]
mb-4
"
>

🤖

<span>AI Feedback</span>

</label>
                                        <div className="bg-gradient-to-br
from-emerald-50
via-white
to-cyan-50 border
border-emerald-100
shadow-md p-4 sm:p-6  sm:rounded-[2.2rem] text-xs sm:text-sm italic text-slate-600 border-l-[4px] sm:border-l-[6px] border-teal-500 leading-relaxed rounded-[2.2rem]">
                                            "{q.aiFeedback}"
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                     <label
className="
flex
items-center
gap-2
text-violet-600
font-bold
uppercase
tracking-[0.15em]
mb-4
"
>

💡

<span>Ideal Solution</span>

</label>
                                        <pre className="bg-gradient-to-br
from-slate-900
to-slate-800 text-slate-400 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] text-[11px] sm:text-[13px] overflow-x-auto whitespace-pre-wrap font-mono shadow-inner leading-relaxed">
                                            {/* Using the updated helper function here */}
                                            {formatIdealAnswer(q.idealAnswer)}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SessionReview;