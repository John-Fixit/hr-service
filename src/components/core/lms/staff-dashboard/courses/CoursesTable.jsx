import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
const courses = [
  {
    id: 1,
    name: "Building Scalable APIs With GraphQL",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&fit=crop",
    selling: 42,
    amount: 18432,
    period: "06 months",
  },
  {
    id: 2,
    name: "Building Scalable APIs With GraphQL",
    img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=80&h=80&fit=crop",
    selling: 36,
    amount: 20560,
    period: "09 months",
  },
  {
    id: 3,
    name: "Building Scalable APIs With GraphQL",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=80&h=80&fit=crop",
    selling: 44,
    amount: 45550,
    period: "12 months",
  },
  {
    id: 4,
    name: "Building Scalable APIs With GraphQL",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
    selling: 65,
    amount: 22568,
    period: "18 months",
  },
  {
    id: 5,
    name: "Building Scalable APIs With GraphQL",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=80&h=80&fit=crop",
    selling: 75,
    amount: 36980,
    period: "08 months",
  },
];
const CoursesTable = () => {
  const [currentPage, setCurrentPage] = useState(2);
  return (
    <>
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="flex justify-between items-center px-6 pb-4 pt-4 border-b">
          <h2 className="text-base tracking-wide font-semibold text-[#003384] font-outfit">
            Recent Selling Courses
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
                  Selling
                </th>
                <th className="text-center py-2 px-4 font-semibold tracking-wide font-outfit">
                  Amount
                </th>
                <th className="text-center py-2 px-4 font-semibold tracking-wide font-outfit">
                  Period
                </th>
                <th className="text-center py-2 px-6 font-semibold tracking-wide font-outfit rounded-r-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr
                  key={course.id + idx}
                  className={`border-b border-gray-200`}
                >
                  <td className="py-4 px-2 md:px-6">
                    <div className="flex items-center gap-4 w-56 md:w-full">
                      <img
                        src={course.img}
                        alt={course.name}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <span className="font-semibold text-[#212529] hover:text-blue-600 cursor-pointer tracking-wide transition-all font-outfit">
                        {course.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4 text-[#6c829e] font-medium text-[14px] font-outfit">
                    {course.selling}
                  </td>
                  <td className="text-center py-4 px-4 text-[#6c829e] font-medium text-[14px] font-outfit">
                    ${course.amount.toLocaleString()}
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-block bg-[#eef7f3] text-[#4bae83]  px-4 py-1.5 rounded-lg text-nowrap text-sm font-medium font-outfit">
                      {course.period}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2 md:px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-9 h-9 bg-[#edf1fb] rounded-lg flex items-center justify-center hover:bg-[#122a3e] hover:text-white transition-colors">
                        <FaEdit className="w-4 h-4 " />
                      </button>
                      <button className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-400 text-red-400 hover:text-white transition-colors border border-red-100">
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
            Showing 1 to 8 of 20 entries
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#6c829e] font-medium text-[14px]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
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
            <button className="w-8 h-8 flex items-center justify-center text-black hover:text-[#6c829e] font-medium text-[14px]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesTable;
