import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { useDeleteCourse, useGetCreatorCourses } from "../../../../../API/lms-apis/course";
import dayjs from "dayjs";
import { getCompoundPeriod, toStringDate } from "../../../../../utils/utitlities";
import clsx from "clsx";
import StarLoader from "../../../loaders/StarLoader";
import { useCourseStore } from "../../../../../hooks/useCourseStore";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { errorToast, successToast } from "../../../../../utils/toastMsgPop";


const checkCourseExpiration =(end_date)=>{
  const remaining_days = dayjs(end_date).diff(dayjs(), "day")
  return remaining_days < 0 ? true : false
}

const StaffCoursesTable = () => {

  const { userData } = useCurrentUser();
  const { data: get_courses, isPending: isLoadingCourses } = useGetCreatorCourses(
    userData?.data?.STAFF_ID
  );
  const allCourses = useMemo(() => get_courses || [], [get_courses]);
  const [currentPage, setCurrentPage] = useState(1);

  const {mutateAsync: mutateDeleteCourse, isPending: isDeletingCourse} = useDeleteCourse();

  const { openCourseDrawer } = useCourseStore();

  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [searchValue, setSearchValue] = useState("")
 
  const totalPages = allCourses?.length / rowsPerPage;


  const filteredCourses = useMemo(()=>{
    const hasSearchFilter = Boolean(searchValue?.trim());

    if(!hasSearchFilter) return allCourses;

    const lowerCaseSearch = searchValue?.trim()?.toLowerCase();

    return allCourses?.filter((course)=>{
      const courseNameMatch = course?.COURSE_TITLE?.toLowerCase()?.includes(lowerCaseSearch);
      const courseCategoryMatch = course?.COURSE_CATEGORY?.toLowerCase()?.includes(lowerCaseSearch);
      const courseDescriptionMatch = course?.COURSE_DESCRIPTION?.toLowerCase()?.includes(lowerCaseSearch);
      return courseNameMatch || courseCategoryMatch || courseDescriptionMatch;
    })

  }, [allCourses, searchValue])


const paginatedCourses = useMemo(()=>{
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return filteredCourses?.slice(startIndex, endIndex);
}, [filteredCourses, currentPage, rowsPerPage])


const handleDeleteCourse=(course)=>{
  Modal.confirm({
    title: "Confirm",
    icon: <ExclamationCircleOutlined />,
    content: "Are you sure to delete this course?",
    okText: "Confirm",
    cancelText: "Cancel",
    onOk: async()=>{
      const json = {
        courseID: course?.COURSE_ID,
        staffID: userData?.data?.STAFF_ID
      }
      try{
        await mutateDeleteCourse(json);
      }catch(err){
        const msg = err?.response?.data?.message;
        errorToast(msg);
      }
    }
  })
}



const handleEditCourse=(course)=>{
  //fetch course details before proceesing
  openCourseDrawer({ drawerName: "create-course" })
}


const handleViewCourse=(course)=>{
   openCourseDrawer({
        drawerName: "creator-course-detail",
        courseDetail: { ...course },
      });
}

  return (
    <>
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="flex justify-between items-center px-6 pb-4 pt-4 border-b">
          <h2 className="text-base tracking-wide font-semibold text-[#003384] font-outfit">
            My Recent Courses
          </h2>
          <button className="text-[#6c829e] text-sm font-medium hover:text-[#6c829e] text-[15px] transition-all font-outfit">
            View All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg px-6 mt-6">
          <table className="w-full">
            <thead>
              <tr className="bg-[#212529] text-white">
                <th className="text-left py-4 px-2 md:px-6 font-semibold tracking-wide rounded-l-lg text-nowrap font-outfit">
                  Course Name
                </th>
                <th className="text-center py-2 px-4 font-semibold tracking-wide font-outfit">
                  Recipients
                </th>
                <th className="text-center py-2 px-4 font-semibold tracking-wide font-outfit">
                  Category
                </th>
                <th className="text-center py-2 px-4 font-semibold tracking-wide font-outfit">
                  Period
                </th>
                <th className="text-center py-2 px-4 font-semibold tracking-wide font-outfit">
                  Ends At
                </th>
                <th className="text-center py-2 px-6 font-semibold tracking-wide font-outfit rounded-r-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
              isLoadingCourses?
              <tr>
                <td colSpan={6}>
                  <div className="flex h-32 items-center justify-center">
                    <StarLoader/>
                  </div>
                </td>
                </tr> :
              paginatedCourses.map((course, idx) => (
                <tr
                  key={course.id + idx}
                  className={`border-b border-gray-200`}
                >
                  <td className="py-4 px-2 md:px-6">
                    <div className="flex items-center gap-4 w-56 md:w-full" onClick={()=>handleViewCourse(course)}> 
                      <img
                        src={course.COURSE_PREVIEW_IMAGE}
                        alt={course.COURSE_TITLE}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <span className="font-semibold text-[#212529] hover:text-blue-600 cursor-pointer tracking-wide transition-all font-outfit">
                        {course.COURSE_TITLE}
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4 text-[#6c829e] font-medium text-[14px] font-outfit">
                    {course.selling}
                  </td>
                  <td className="text-center py-4 px-4 text-[#6c829e] font-medium text-[14px] font-outfit">
                   {course.COURSE_CATEGORY}
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-block bg-[#eef7f3] text-[#4bae83]  px-4 py-1.5 rounded-lg text-nowrap text-sm font-medium font-outfit">
                      {getCompoundPeriod(course.START_DATE, course.END_DATE)}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={clsx("inline-block  px-4 py-1.5 rounded-lg text-nowrap text-sm font-medium font-outfit", checkCourseExpiration(course?.END_DATE) ? "text-red-400" : "")}>
                      {toStringDate(course.END_DATE)}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2 md:px-6">
                    <div className="flex items-center justify-center gap-2">{
                      !checkCourseExpiration(course.END_DATE) && (
                        <button onClick={()=>handleEditCourse(course)} className="w-9 h-9 bg-[#edf1fb] rounded-lg flex items-center justify-center hover:bg-[#122a3e] hover:text-white transition-colors">
                          <FaEdit className="w-4 h-4 " />
                        </button>
                      )
                      }
                     
                      <button className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-400 text-red-400 hover:text-white transition-colors border border-red-100" onClick={()=>handleDeleteCourse(course)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-6 pt-4">
          <p className="text-gray-400 text-sm font-outfit">
            Showing {(currentPage - 1) * rowsPerPage} to {((currentPage - 1) * rowsPerPage) + rowsPerPage} of {allCourses?.length} entries
          </p>
          {
            totalPages > 1 &&(
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#6c829e] font-medium text-[14px]" disabled={currentPage===1} onClick={()=>setCurrentPage(currentPage -1)}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors font-outfit ${
                  currentPage === page
                    ? "bg-[#003384] text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center text-black hover:text-[#6c829e] font-medium text-[14px]" disabled={currentPage===totalPages} onClick={()=>setCurrentPage(currentPage +1)}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default StaffCoursesTable;
