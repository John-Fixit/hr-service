const CourseRecipientCard = ({ courseDetail, maxVisibleRecipient = 7 }) => {
  // Generate initials from name or email
  const getInitials = (item) => {
    const name = item?.FULLNAME || item?.EMAIL || "";
    if (item?.FULLNAME) {
      const parts = name.split(" ");
      return parts.length >= 2
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : name[0]?.toUpperCase();
    }
    return name[0]?.toUpperCase() || "?";
  };

  // Consistent color per person
  const avatarColors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-red-500",
    "bg-indigo-500",
  ];

  const recipients = courseDetail?.course_recipients || [];
  const previewAvatars = recipients.slice(0, 4);
  const remainingCount = recipients.length - previewAvatars.length;

  return (
    <div>
      <div className="border rounded-lg p-3">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl">
          <div className="flex items-center justify-between">
            {/* Left: Course info */}
            <div className="flex-1">
             
              <h1 className="font-outfit text-3xl font-bold text-white mb-2">
                Attendees
              </h1>
            </div>

            {/* Right: Group icon representing attendees */}
            <div className="flex-1 flex justify-end">
              <div className="w-24 h-24 rounded-lg bg-gray-700 flex flex-col items-center justify-center gap-1 border border-gray-600">
                {/* People icon */}
                <svg
                  className="w-10 h-10 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.2}
                    d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0zM3 17a3 3 0 016 0"
                  />
                </svg>
                <span className="text-gray-400 text-xs font-outfit text-center leading-tight">
                  Course<br />Attendees
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Total count badge */}
         

          <div className="mb-4 mt-1 flex items-center justify-between">
            <h2 className="font-outfit text-xl font-bold text-blue-900">
               Who Should Enroll?
            </h2>
             <div className="inline-flex items-center gap-1 bg-blue-50 mb-1 text-blue-600 px-3 py-1 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="font-outfit font-medium tracking-wide text-sm">
              {recipients.length} Recipients
            </span>
          </div>
          </div>

          {/* Who Should Enroll Section */}
          <div className="mb-4">
            
            <div className="space-y-2">
              {recipients.slice(0, maxVisibleRecipient).map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Colored initial avatar */}
                 
                   <div className="flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="1"
                              fill="none"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M9 12l2 2 4-4"
                            />
                          </svg>
                        </div>
                         <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-outfit flex-shrink-0 ${
                      avatarColors[index % avatarColors.length]
                    }`}
                  >
                    {getInitials(item)}
                  </div>
                  <p className="text-gray-700 text-sm font-medium font-outfit leading-relaxed">
                    {item?.FULLNAME || item?.EMAIL}
                  </p>
                </div>
              ))}

              {/* Overflow row */}
              {recipients.length > maxVisibleRecipient && (
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="1" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm font-medium font-outfit leading-relaxed">
                    {`and ${recipients.length - maxVisibleRecipient}+ more`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRecipientCard