import { Video } from "lucide-react";
import { AiOutlineTags } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { CiFlag1 } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { IoGameControllerOutline } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";

const CourseFeatures = () => {
  const features = [
    {
      icon: HiOutlineUsers,
      title: "Student Enrolled",
      value: "1740",
    },
    {
      icon: Video,
      title: "Lectures",
      value: "10",
    },
    {
      icon: IoGameControllerOutline,
      title: "Quizzes",
      value: "4",
    },
    {
      icon: BsClockHistory,
      title: "Duration",
      value: "60h 40min",
    },
    {
      icon: AiOutlineTags,
      title: "Skill Level",
      value: "Beginner",
    },
    {
      icon: CiFlag1,
      title: "Language",
      value: "English",
    },
    {
      icon: SlBadge,
      title: "Certification",
      value: "Yes",
    },
  ];
  return (
    <div className="border rounded-lg p-6">
      <h3 className="font-outfit text-lg font-bold text-blue-900 mb6">
        Course Features
      </h3>

      <div className="space-y-3 mt-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <feature.icon className="text-gray-500" size={16} />
              </div>
              <span className="font-outfit text-sm text-gray-700">
                {feature.title}
              </span>
            </div>
            <span className="font-outfit text-sm text-gray-900">
              {feature.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseFeatures;
