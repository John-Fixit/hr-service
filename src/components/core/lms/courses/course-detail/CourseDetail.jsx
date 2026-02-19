import CourseAuthorCard from "./CourseAuthorCard";
import CourseCurriculum from "./CourseCurriculum";
import CourseFeatures from "./CourseFeatures";
import { useCourseStore } from "../../../../../hooks/useCourseStore";
import { courseDuration } from "../../../../../utils/utitlities";
import CourseRecipientCard from "./CourseRecipientCard";


const CourseDetail = () => {
  const {
    // eslint-disable-next-line no-unused-vars
    data: { courseDetail },
  } = useCourseStore();


  return (
    <>
      <main>
        <header
          className="relative bg-cover bg-center min-h-80 flex items-center rounded-xl"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 35, 65, 0.7), rgba(15, 35, 65, 0.7)), url("${courseDetail?.COURSE_PREVIEW_IMAGE}")`,
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 my-10">
            {/* Badge Pills */}
            <div className="flex gap-3 mb-4">
              <span className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-outfit font-medium">
                Department
              </span>
              <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-outfit font-medium">
                INFORMATION, COMMUNICATION & TECHNOLOGY (ICT)
              </span>
            </div>
            <h1 className="text-white text-4xl lg:text-5xl font-outfit font-bold mb-4 line-clamp-1">
              {courseDetail?.COURSE_TITLE}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white mb-5">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-outfit text-sm">
                  {courseDuration({
                    start_date: courseDetail?.START_DATE,
                    end_date: courseDetail?.END_DATE,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-outfit text-sm">
                  {courseDetail?.course_lessons?.length} Lessons
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-outfit text-sm capitalize">
                  {/* 502 Student Enrolled */}
                  {courseDetail?.course_recipients?.length}{" "}
                  {courseDetail?.recipientType || "Ddepartment"}s
                </span>
              </div>
            </div>
            {/* Course Description */}
            <p className="text-white text-base font-outfit leading-relaxed max-w-4xl mb-5">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum, accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
              inventore. veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </p>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 fill-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-outfit font-semibold text-base">
                4.9
              </span>
              <span className="text-white/80 font-outfit text-sm">
                (2.24k Reviews)
              </span>
            </div>
          </div>
        </header>
        <section className="container mx-auto px-6 relative">
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <div className="space-y-6">
                <div className="border rounded-lg p-6 space-y-4">
                  {
                    courseDetail?.COURSE_DESCRIPTION &&
                  <div>
                  <h2 className="text-blue-900 text-[18px] lg:text-[20px] font-outfit font-bold">
                    Course Overview
                  </h2>

                    <p className=" text-gray-700 text-base font-outfit leading-relaxed">
                    
                      {courseDetail?.COURSE_DESCRIPTION}
                    </p>
                  </div>
                  }
{
  courseDetail?.COURSE_OBJECTIVE &&
                  <div className="space-y-3">
                    <h4 className="text-blue-900 text-[16px] lg:text-[16px] font-outfit font-bold">
                      Course Objective
                    </h4>
                    <p className="text-gray-700 text-base font-outfit leading-relaxed">
                     
                      {courseDetail?.COURSE_OBJECTIVE}
                    </p>
                  </div>
}
                </div>
                <CourseCurriculum course={courseDetail} />
                <CourseAuthorCard />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="relative">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 sticky top-5">
                    <div className="">
                      <CourseRecipientCard courseDetail={courseDetail}/>
                    </div>
                    <CourseFeatures course={courseDetail} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CourseDetail;

// const CoursePricing = () => {
//   return (
//     <div>
//       <div className="border rounded-lg p-3">
//         <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded">
//           <div className="flex items-center justify-between">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
//                   <span className="text-3xl font-bold text-gray-300">W</span>
//                 </div>
//               </div>
//               <h1 className="font-outfit text-3xl font-bold text-white mb-2">
//                 Woocommerce
//               </h1>
//             </div>
//             <div className="relative">
//               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-dashed border-gray-400">
//                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                   <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-blue-600 border-b-8 border-b-transparent ml-1"></div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex-1 flex justify-end">
//               <img
//                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop"
//                 alt="Instructor"
//                 className="w-32 h-32 rounded-lg object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Pricing Section */}
//         <div className="p-4">
//           <div className="inline-block bg-red-50 mb-1 text-red-500 px-3 py-1 rounded-full">
//             <span className="font-outfit font-medium tracking-wide">
//               25% off
//             </span>
//           </div>

//           <div className="mb-4">
//             <h2 className="font-outfit text-2xl font-bold text-blue-900">
//               $179.45
//             </h2>
//           </div>

//           {/* Course Features */}
//           <div className="mb-4">
//             <h3 className="font-outfit text-base font-bold text-blue-900 mb-3">
//               Course Features
//             </h3>
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Check className="w-2 h-2 text-white" strokeWidth={3} />
//                 </div>
//                 <span className="font-outfit text-sm text-gray-700">
//                   Fully Programming
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Check className="w-2 h-2 text-white" strokeWidth={3} />
//                 </div>
//                 <span className="font-outfit text-sm text-gray-700">
//                   Help Code to Code
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Check className="w-2 h-2 text-white" strokeWidth={3} />
//                 </div>
//                 <span className="font-outfit text-sm text-gray-700">
//                   Free Trial 7 Days
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Check className="w-2 h-2 text-white" strokeWidth={3} />
//                 </div>
//                 <span className="font-outfit text-sm text-gray-700">
//                   Unlimited Videos
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Check className="w-2 h-2 text-white" strokeWidth={3} />
//                 </div>
//                 <span className="font-outfit text-sm text-gray-700">
//                   24x7 Support
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
