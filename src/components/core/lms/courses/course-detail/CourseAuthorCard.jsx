const CourseAuthorCard = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
      color: "text-blue-600",
    },
    {
      name: "LinkedIn",
      icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
      color: "text-blue-700",
    },
    {
      name: "Twitter",
      icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
      color: "text-blue-400",
    },
    {
      name: "Behance",
      icon: "M20 6h-4V5h4v1zm-1.5 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-5.5 3c-3.86 0-7-3.14-7-7s3.14-7 7-7c2.05 0 3.92.88 5.22 2.28l-1.42 1.42A4.96 4.96 0 0013 7.5c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.93 0 3.6-1.1 4.43-2.7h2.14c-1.03 2.64-3.6 4.7-6.57 4.7z",
      color: "text-blue-600",
    },
    {
      name: "YouTube",
      icon: "M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.36 78.36 0 0012 4.27a78.45 78.45 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 000 6.48 9.55 9.55 0 00.3 2.12 3.14 3.14 0 001.71 1.94A78.44 78.44 0 0012 19.73a78.13 78.13 0 008.34-.31 2.92 2.92 0 001.52-.84c.9-.83 1-2.25 1.1-3.45a48.29 48.29 0 000-6.48zM9.75 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z",
      color: "text-red-600",
    },
  ];

  return (
    <div className="border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-shrink-0">
          <div className="w-full lg:w-44 h-44 rounded-lg overflow-hidden bg-gradient-to-br from-teal-700 to-teal-900">
            <img
              src="https://learnup-shreethemes.netlify.app/assets/avatar-3-3USwoUMx.jpg"
              alt="Adam K. Marck"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-blue-900 text-xl font-outfit font-bold mb-">
            Adam K. Marck
          </h2>
          <div className="flex flex-wrap items-center gap-6 mb-3">
            <div className="flex items-center gap-2 text-gray-600">
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
              <span className="font-outfit text-xs font-medium">72 Videos</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
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
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              <span className="font-outfit text-xs font-medium">
                102 Lectures
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
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
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
              <span className="font-outfit text-xs font-medium">
                15+ Year Exp.
              </span>
            </div>
          </div>

          <p className="text-gray-700 text-base font-outfit leading-relaxed mb-6">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors border"
                aria-label={social.name}
              >
                <svg
                  className={`w-4 h-4 ${social.color}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={social.icon} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAuthorCard;
