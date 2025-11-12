// /* eslint-disable no-unused-vars */
// import { useState } from "react";
// import logo from "/assets/images/community-logo.png";
// import { FaEyeSlash } from "react-icons/fa";
// import { FaEye } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import { loginUserAction } from "../../API/auth";
// import useCurrentUser from "../../hooks/useCurrentUser";
// import { useNavigate } from "react-router-dom";
// import { Spinner } from "@nextui-org/react";
// import { Send } from "lucide-react";
// import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
// import ResetPasswordSetByAdmin from "../../components/profile/resetPassword_forms/ResetPasswordSetByAdmin";
// import useAdPopupStore from "../../hooks/useAdsPopup";
// export default function Login() {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setloading] = useState(false);
//   const { setCurrentUser } = useCurrentUser();
//   const [passwordDrawer, setPasswordDrawer] = useState(false);
//   const navigate = useNavigate();
//   const { handleLogin } = useAdPopupStore();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (values) => {
//     // console.log(values);
//     setloading(true);
//     // setCurrentUser(values)
//     // navigate('/')

//     const res = await loginUserAction({
//       username: values?.username?.trim() || "",
//       password: values?.password?.trim() || "",
//     });
//     if (res) {
//       setloading(false);
//       setCurrentUser(res);
//       handleLogin();

//       // console.log(res)

//       if (res?.data?.PASSWORD_RESET) {
//         handleOpenPasswordDrawer();
//       } else {
//         navigate("/");
//       }
//     } else {
//       setloading(false);
//       // setCurrentUser(values)
//     }
//   };

//   //password visible function
//   const handlePasswordVisibleChange = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleOpenPasswordDrawer = () => {
//     setPasswordDrawer(true);
//   };
//   const handleClosePasswordDrawer = () => {
//     setPasswordDrawer(false);
//   };

//   return (
//     <>
//       <main className="w-full bg-none flex flex-col space-y-5 items-center justify-center h-[100vh] px-3">
//         {/* <img src={logo} alt="communeety logo" /> */}
//         <section className="form_section w-[85%] lg:w-[45vw] xl:w-[30vw] md:w-[55vw] rounded-xl bg-white shadow-md p-10 ">
//           <div className="form_header text-center pb-3">
//             <h4 className="text-gray-700 text-2xl font-medium">Login</h4>
//             <p className="text-gray-400 font-medium text-md mb-[1.5rem]">
//               Access to our dashboard
//             </p>
//           </div>
//           <form
//             className="flex flex-col space-y-[20px]"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div className="email_address flex flex-col space-y-1">
//               <label
//                 htmlFor="email"
//                 className="font-medium text-gray-600 text-sm"
//               >
//                 Email Address Or ID
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 {...register("username", { required: true })}
//                 placeholder="Email address or ID"
//                 className="mt-1 w-full border bg-white py-4 lg:py-[0.475rem] px-3 focus:outline-none text-gray-800 rounded"
//               />
//               {errors.email && (
//                 <span className="text-red-500 text-xs">
//                   This field is required
//                 </span>
//               )}
//             </div>
//             <div className="password flex flex-col space-y-1 ">
//               <div className="password_label flex justify-between">
//                 <label
//                   htmlFor="Password"
//                   className="font-medium text-gray-600  text-sm"
//                 >
//                   Password
//                 </label>
//                 <label
//                   htmlFor="Forgot_password"
//                   className="font-medium text-[#8e8e8e] text-xs cursor-pointer"
//                 >
//                   Forgot Password?
//                 </label>
//               </div>
//               <div className="relative">
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   id="Password"
//                   name="password"
//                   {...register("password", { required: true })}
//                   placeholder="password"
//                   className="mt-1 w-full border bg-white py-4 lg:py-[0.475rem] px-3 focus:outline-none text-gray-600 rounded "
//                 />
//                 <span
//                   className="absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-600  cursor-pointer"
//                   onClick={handlePasswordVisibleChange}
//                 >
//                   {passwordVisible ? (
//                     <FaEye size={"18px"} />
//                   ) : (
//                     <FaEyeSlash size={"18px"} />
//                   )}
//                 </span>
//               </div>
//               {errors.password && (
//                 <span className="text-red-500 text-xs">
//                   This field is required
//                 </span>
//               )}
//             </div>
//             <div className="submit_btn">
//               <button
//                 disabled={loading}
//                 type="submit"
//                 className="text-lg  w-full bg-sidebarBg hover:bg-sidebarBg/40 active:bg-sidebarBg/80 p-[4px] text-white rounded-md py-2"
//               >
//                 <div className="flex items-center justify-center gap-x-2">
//                   {loading ? (
//                     <Spinner
//                       size="sm"
//                       classNames={{ circle1: "border-white/80" }}
//                     />
//                   ) : (
//                     <Send size={15} />
//                   )}
//                   Login
//                 </div>
//               </button>
//             </div>
//             <div className="dont_have_acc text-center text-[15px] font-medium text-black">
//               {/* <p>
//                 Don&apos;t have an account yet?{" "}
//                 <span className="cursor-pointer text-[#00bcc2]">Register</span>
//               </p> */}
//             </div>
//           </form>
//         </section>
//       </main>
//       <ExpandedDrawerWithButton
//         maskClosable={false}
//         isOpen={passwordDrawer}
//         onClose={handleClosePasswordDrawer}
//         maxWidth={450}
//       >
//         <ResetPasswordSetByAdmin closeDrawer={handleClosePasswordDrawer} />
//       </ExpandedDrawerWithButton>
//     </>
//   );
// }

/* eslint-disable no-unused-vars */
import { useState } from "react";
import logo from "/assets/images/community-logo.png";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginUserAction } from "../../API/auth";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { Send, Mail, Lock } from "lucide-react";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import ResetPasswordSetByAdmin from "../../components/profile/resetPassword_forms/ResetPasswordSetByAdmin";
import useAdPopupStore from "../../hooks/useAdsPopup";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const [passwordDrawer, setPasswordDrawer] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAdPopupStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setloading(true);

    const res = await loginUserAction({
      username: values?.username?.trim() || "",
      password: values?.password?.trim() || "",
    });
    if (res) {
      setloading(false);
      setCurrentUser(res);
      handleLogin();

      if (res?.data?.PASSWORD_RESET) {
        handleOpenPasswordDrawer();
      } else {
        navigate("/");
      }
    } else {
      setloading(false);
    }
  };

  const handlePasswordVisibleChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOpenPasswordDrawer = () => {
    setPasswordDrawer(true);
  };

  const handleClosePasswordDrawer = () => {
    setPasswordDrawer(false);
  };

  return (
    <>
      <main className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-[#092035]/5 to-[#092035]/10 flex flex-col space-y-5 items-center justify-center px-3 py-8 ">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#092035]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#092035]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <section className="form_section w-[85%] lg:w-[35vw] md:w-[55vw] rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl border border-white/20 overflow-hidden relative z-10">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#092035] to-[#0a2a45] px-10 py-12 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#092035]" />
              </div>
            </div>
            <h4 className="text-white text-3xl font-bold mb-2">Welcome Back</h4>
            <p className="text-white/80 font-medium text-sm">
              Access to our dashboard
            </p>
          </div>

          <div className="p-10">
            <form
              className="flex flex-col space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="email_address flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="font-medium text-gray-700 text-sm"
                >
                  Email Address Or ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    {...register("username", { required: true })}
                    placeholder="Enter your email or ID"
                    className={`mt-1 w-full pl-10 pr-4 py-3 border ${
                      errors.username
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200 focus:ring-[#092035]"
                    } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400`}
                  />
                </div>
                {errors.username && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    This field is required
                  </span>
                )}
              </div>

              <div className="password flex flex-col space-y-2">
                <div className="password_label flex justify-between">
                  <label
                    htmlFor="Password"
                    className="font-medium text-gray-700 text-sm"
                  >
                    Password
                  </label>
                  <label
                    htmlFor="Forgot_password"
                    className="font-medium text-[#092035] hover:text-[#0a2a45] text-xs cursor-pointer transition-colors"
                  >
                    Forgot Password?
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="Password"
                    name="password"
                    {...register("password", { required: true })}
                    placeholder="Enter your password"
                    className={`mt-1 w-full pl-10 pr-12 py-3 border ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200 focus:ring-[#092035]"
                    } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400`}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                    onClick={handlePasswordVisibleChange}
                  >
                    {passwordVisible ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    This field is required
                  </span>
                )}
              </div>

              <div className="submit_btn pt-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#092035] to-[#0a2a45] hover:from-[#0a2a45] hover:to-[#0b3050] disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#092035]/30 hover:shadow-xl hover:shadow-[#092035]/40 disabled:shadow-none"
                >
                  <div className="flex items-center justify-center gap-x-2">
                    {loading ? (
                      <Spinner
                        size="sm"
                        classNames={{ circle1: "border-white/80" }}
                      />
                    ) : (
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                    <span>Login</span>
                  </div>
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-white text-gray-500 font-medium">
                    Secure Login
                  </span>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <ExpandedDrawerWithButton
        maskClosable={false}
        isOpen={passwordDrawer}
        onClose={handleClosePasswordDrawer}
        maxWidth={450}
      >
        <ResetPasswordSetByAdmin closeDrawer={handleClosePasswordDrawer} />
      </ExpandedDrawerWithButton>
    </>
  );
}
