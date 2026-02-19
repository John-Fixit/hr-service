

import { useState, useMemo } from "react";
import { useGetCreatorCourseDetail } from "../../../../../API/lms-apis/course";
import { useCourseStore } from "../../../../../hooks/useCourseStore";
import RecipientTable from "./RecipientTable";
import CourseFeatures from "../course-detail/CourseFeatures";
import { getCompoundPeriod } from "../../../../../utils/utitlities";


const STUDENT = [
  { name:"Femi Bejide",      email:"femi.bejide@africacodes.net",   lessons:2, score:78,   lastActive:"2 days ago", color:"#f47c20" },
  { name:"Amaka Okafor",     email:"amaka.o@africacodes.net",       lessons:3, score:91,   lastActive:"Today",      color:"#1abc9c" },
  { name:"Dayo Adewale",     email:"dayo.a@africacodes.net",        lessons:0, score:null, lastActive:"Never",      color:"#8b5cf6" },
  { name:"Chinwe Eze",       email:"chinwe.e@africacodes.net",      lessons:3, score:85,   lastActive:"Yesterday",  color:"#ef4444" },
  { name:"Bola Fashola",     email:"bola.f@africacodes.net",        lessons:1, score:60,   lastActive:"5 days ago", color:"#0ea5e9" },
  { name:"Tunde Bakare",     email:"tunde.b@africacodes.net",       lessons:2, score:72,   lastActive:"3 days ago", color:"#f59e0b" },
  { name:"Ngozi Nwachukwu",  email:"ngozi.n@africacodes.net",       lessons:0, score:null, lastActive:"Never",      color:"#10b981" },
  { name:"Emeka Obi",        email:"emeka.o@africacodes.net",       lessons:3, score:95,   lastActive:"Today",      color:"#6366f1" },
  { name:"Aisha Musa",       email:"aisha.m@africacodes.net",       lessons:1, score:55,   lastActive:"1 week ago", color:"#ec4899" },
  { name:"Yemi Alade",       email:"yemi.a@africacodes.net",        lessons:2, score:80,   lastActive:"Today",      color:"#14b8a6" },
  { name:"Kola Balogun",     email:"kola.b@africacodes.net",        lessons:0, score:null, lastActive:"Never",      color:"#f97316" },
  { name:"Sade Aderemi",     email:"sade.a@africacodes.net",        lessons:3, score:88,   lastActive:"Yesterday",  color:"#a855f7" },
  { name:"Chidi Okeke",      email:"chidi.o@africacodes.net",       lessons:1, score:62,   lastActive:"4 days ago", color:"#334155" },
  { name:"Fatima Abdullahi", email:"fatima.ab@africacodes.net",     lessons:2, score:76,   lastActive:"2 days ago", color:"#16a34a" },
  { name:"Olu Maintain",     email:"olu.m@africacodes.net",         lessons:3, score:90,   lastActive:"Today",      color:"#dc2626" },
  { name:"Blessing Uche",    email:"blessing.u@africacodes.net",    lessons:0, score:null, lastActive:"Never",      color:"#7c3aed" },
  { name:"Musa Garba",       email:"musa.g@africacodes.net",        lessons:1, score:58,   lastActive:"6 days ago", color:"#0369a1" },
  { name:"Ifeoma Chukwu",    email:"ifeoma.c@africacodes.net",      lessons:2, score:83,   lastActive:"Today",      color:"#b45309" },
  { name:"Rotimi Fasan",     email:"rotimi.f@africacodes.net",      lessons:3, score:74,   lastActive:"3 days ago", color:"#047857" },
  { name:"Adaora Nwosu",     email:"adaora.n@africacodes.net",      lessons:1, score:67,   lastActive:"Yesterday",  color:"#9f1239" },
  { name:"Seun Kuti",        email:"seun.k@africacodes.net",        lessons:0, score:null, lastActive:"Never",      color:"#1d4ed8" },
  { name:"Remi Adeyemi",     email:"remi.a@africacodes.net",        lessons:3, score:92,   lastActive:"Today",      color:"#0891b2" },
  { name:"Kunle Afolabi",    email:"kunle.af@africacodes.net",      lessons:2, score:70,   lastActive:"5 days ago", color:"#92400e" },
  { name:"Zainab Yusuf",     email:"zainab.y@africacodes.net",      lessons:1, score:61,   lastActive:"1 week ago", color:"#6d28d9" },
  { name:"Tobi Adesanya",    email:"tobi.a@africacodes.net",        lessons:3, score:87,   lastActive:"Today",      color:"#065f46" },
];


const avatarColors = ['#f47c20', '#1abc9c', '#8b5cf6', '#ef4444', '#0ea5e9', '#f59e0b', '#10b981', '#6366f1', '#ec4899', '#14b8a6', '#f97316', '#a855f7', '#334155', '#16a34a', '#dc2626', '#7c3aed', '#0369a1', '#b45309', '#047857', '#9f1239', '#1d4ed8', '#0891b2', '#92400e', '#6d28d9', '#065f46']

const CURRICULUM = [
  { id:1, title:"Primary Memory of a Computer System",   status:"done" },
  { id:2, title:"Secondary Memory of a Computer System", status:"partial" },
  { id:3, title:"Input & Output Devices",                status:"none" },
];

const getStatus   = s => s.lessons === 0 ? "none" : s.lessons >= s?.total_lessons ? "completed" : "progress";
const getProgress = s => Math.round((s.lessons / s?.total_lessons) * 100);


function calcStats(students) {
  const w = students.filter(s => s.score !== null);
  return {
    enrolled:    students.length,
    completed:   students.filter(s => getStatus(s) === "completed").length,
    avgScore:    w.length ? Math.round(w.reduce((a,s) => a+s.score,0)/w.length) : null,
    avgProgress: Math.round(students.reduce((a,s) => a+getProgress(s),0)/students.length),
  };
}





// ── Full Page ──────────────────────────────────────────────────────────────
export default function CreatorCourseDetail() {


  const {data} = useCourseStore();
  const courseDetail = data?.courseDetail

const {data: courseDetailData} = useGetCreatorCourseDetail(courseDetail?.COURSE_ID)

const STUDENTS = courseDetailData?.course_recipients?.map((recipient)=>{
  return  { name:recipient?.FULLNAME || recipient?.EMAIL?.split(".")[0] + " "+ (recipient?.EMAIL?.split("@")[0])?.split(".")[1],      email:recipient?.EMAIL,   lessons: Math.floor(Math.random() * courseDetailData?.course_lessons?.length)+1, score:recipient?.COURSE_SCORE || 0, color:avatarColors[Math.floor(Math.random() * avatarColors.length)], total_lessons: courseDetailData?.course_lessons?.length }
})

  const stats = useMemo(() => calcStats(STUDENTS), []);

  return (
    <div className="bg-[#f4f6fb] min-h-screen" style={{fontFamily:"DM Sans,sans-serif"}}>

      {/* ── HERO ── */}
      <div className="bg-[#0f1b35] relative overflow-hidden rounded-t-xl">
        {/* dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.1]"
          style={{ backgroundImage:"radial-gradient(#fff 1px,transparent 1px)", backgroundSize:"22px 22px" }}
        />

        <div className="relative z-10 px-10 pt-8 flex justify-between items-start gap-4 flex-wrap">
          <div>
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className="bg-[#1abc9c] text-white text-[11px] font-bold px-3 py-1 rounded-full" style={{fontFamily:"Sora,sans-serif"}}>Department</span>
              <span className="bg-[#f47c20] text-white text-[11px] font-bold px-3 py-1 rounded-full" style={{fontFamily:"Sora,sans-serif"}}>INFORMATION, COMMUNICATION &amp; TECHNOLOGY (ICT)</span>
            </div>
            <h1 className="font-bold text-white text-[26px] mb-2.5" style={{fontFamily:"Sora,sans-serif"}}>{courseDetailData?.COURSE_TITLE}</h1>
            <div className="flex gap-5 text-white/60 text-xs mb-2.5 flex-wrap">
              <span>📅 {getCompoundPeriod({start_date:courseDetailData?.START_DATE,end_date:courseDetailData?.END_DATE})}</span>
              <span>🎬 {courseDetailData?.course_lessons?.length} Lessons</span>
              <span>🏷 Department (ICT)</span>
            </div>
            
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="bg-[#f47c20] text-white border-none rounded-lg px-5 py-2.5 text-xs font-semibold cursor-pointer"
              style={{fontFamily:"Sora,sans-serif"}}
            >✏️ Edit Course</button>
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-4 mt-6 border-t border-white/10 relative z-10">
          {[
            { label:"Enrolled",     value: stats.enrolled,                              color:"text-[#1abc9c]", sub:null },
            { label:"Completed",    value: stats.completed,                             color:"text-green-400", sub:null },
            { label:"Avg Score",    value: stats.avgScore!==null?stats.avgScore+"%":"—", color:"text-[#f47c20]", sub:"quiz takers" },
            { label:"Avg Progress", value: stats.avgProgress+"%",                       color:"text-white",     sub:"all students" },
          ].map((item, i) => (
            <div
              key={i}
              className={`px-8 py-4 ${i < 3 ? "border-r border-white/10" : ""}`}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1"
                style={{fontFamily:"Sora,sans-serif"}}
              >
                {item.label}{" "}
                {item.sub && <span className="normal-case font-normal text-white/30">({item.sub})</span>}
              </div>
              <div className={`font-bold text-[26px] ${item.color}`} style={{fontFamily:"Sora,sans-serif"}}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w[1300px] mx-auto px-10 py-7 grid gap-6" style={{gridTemplateColumns:"1fr 300px"}}>

        {/* LEFT */}
        <div className="flex flex-col gap-5">
          <RecipientTable students={STUDENTS} />

          {/* Course Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div>
            <div>
            <div className="font-bold text-blue-800 text-sm mb-3" style={{fontFamily:"Sora,sans-serif"}}>Course Overview</div>
            <p className="text-slate-500 text-[13px] leading-relaxed">
              {courseDetailData?.COURSE_DESCRIPTION}
            </p>
          </div>
          {
            courseDetailData?.COURSE_OBJECTIVE && (
            <div className="mt-4">
            <div className="font-bold text-blue-800 text-sm mb-3" style={{fontFamily:"Sora,sans-serif"}}>Course Objective</div>
            <p className="text-slate-500 text-[13px] leading-relaxed">
              {courseDetailData?.COURSE_OBJECTIVE}
            </p>
          </div>
            )
          }

            </div>
           

            </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="flex flex-col gap-5">

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="font-bold text-blue-800 text-sm mb-4" style={{fontFamily:"Sora,sans-serif"}}>Quick Actions</div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                {icon:"📝",label:"Add Quiz"},
                {icon:"📚",label:"Add Lesson"},
                {icon:"📣",label:"Announce"},
                {icon:"📥",label:"Export"},
              ].map(a => (
                <button
                  key={a.label}
                  className="border border-slate-200 rounded-xl py-3 px-2 flex flex-col items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-white cursor-pointer hover:border-[#1abc9c] hover:text-[#1abc9c] transition-all duration-200"
                  style={{fontFamily:"Sora,sans-serif"}}
                >
                  <span className="text-xl">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Course Features */}
     
          <CourseFeatures course={courseDetailData} />

          {/* Curriculum */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="font-bold text-blue-800 text-sm mb-4" style={{fontFamily:"Sora,sans-serif"}}>Course Curriculum</div>
            <div className="flex flex-col gap-2">
              {courseDetailData?.course_lessons?.map((c, idx) => (
                <div
                  key={c?.LESSON_ID+idx}
                  className="border border-slate-200 rounded-xl px-3 py-2.5 flex justify-between items-center cursor-pointer hover:border-[#1abc9c] hover:bg-[#f0fdfb] transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-[22px] h-[22px] rounded-md bg-[#0f1b35] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{fontFamily:"Sora,sans-serif"}}
                    >{idx+1}</span>
                    <span className="text-xs font-medium">{c?.TITLE}</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    c.status === "done"
                      ? "bg-green-100 text-green-700"
                      : c.status === "partial"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {c.status === "done" ? "✔" : c.status === "partial" ? "½" : "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}