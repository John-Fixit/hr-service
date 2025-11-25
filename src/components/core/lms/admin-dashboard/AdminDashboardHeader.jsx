import { Button, ConfigProvider } from "antd";
import { FaGraduationCap, FaUserAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useCourseStore } from "../../../../hooks/useCourseStore";

const AdminDashboardHeader = () => {
  const { openCourseDrawer } = useCourseStore();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-9">
          <div className="rounded bg-[#58baab] h-full">
            <div className="flex justify-between flex-wrap gap-3">
              <div className="flex-1 h-full px-8 py-8">
                <div className="flex flex-col justify-between gap-12 text-white h-full">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold font-outfit tracking-wide">
                      Learn Effectively With Us!
                    </h2>
                    <p className="text-lg font-medium text-gray-200 font-outfit">
                      Get 30% off every course on january.
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex gap-2 items-center">
                      <div className="rounded-full border border-white bg-[#f2426d] p-3">
                        <FaGraduationCap size={23} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold tracking-wide text-xl text-white font-outfit">
                          Students
                        </span>
                        <span className="text-sm text-gray-200 font-outfit font-medium">
                          75,000+
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="rounded-full border border-white bg-yellow-400 p-3">
                        <FaUserAlt size={23} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold tracking-wide text-xl text-white font-outfit">
                          Expert Members
                        </span>
                        <span className="text-sm text-gray-200 font-outfit font-medium">
                          200+
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full mx-auto">
                <img
                  src="https://edulearn-lms-admin-template.multipurposethemes.com/images/svg-icon/color-svg/custom-30.svg"
                  alt=""
                  className="object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3 h-full my-auto mx-auto">
          <div className="text-center space-y-4">
            <h3 className="text-[1.3rem] font-medium text-gray-600 font-outfit">
              Have More knoledge to share?
            </h3>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#1e3a8a",
                },
              }}
            >
              <Button
                type="primary"
                className="w-full font-outfit font-medium"
                size="large"
                onClick={() =>
                  openCourseDrawer({ drawerName: "create-course" })
                }
              >
                <MdAdd size={22} />
                <span className="font-outfit">Create New Course</span>
              </Button>
            </ConfigProvider>
            <div className="flex gap-4 justify-between">
              <div>
                <p className="bg-blue-900/10 text-xs font-medium tracking-wide text-blue-900 px-3 py-1 rounded font-outfit">
                  Courses in progress
                </p>
                <div className="px-14 py-6 bg-white rounded text-center">
                  <h1 className="text-[2.5rem] font-outfit">5</h1>
                </div>
              </div>
              <div>
                <p className="bg-blue-900/10 text-xs font-medium tracking-wide text-blue-900 px-3 py-1 rounded font-outfit">
                  Forum Discussion
                </p>
                <div className="px-14 py-6 bg-white rounded text-center">
                  <h1 className="text-[2.5rem] font-outfit">25</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardHeader;
