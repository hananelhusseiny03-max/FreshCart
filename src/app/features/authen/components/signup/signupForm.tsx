"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "../../schemas/signup.schema";
import { SignupAction } from "../../server/signup.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function SignupForm() {

  const router = useRouter();




  // react-hook-form

  const { register, handleSubmit,setError ,formState: {errors},
   } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
    reValidateMode: "onBlur"
  });

const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {

  
  try {
    const response = await SignupAction(values);

    if (response.success) {
      toast.success(response.message);
      setTimeout(() =>{
        router.push("/login")
      } ,2000)
    } else{
      if (response?.errors) {
      Object.keys(response.errors).forEach((key) => {
      setError(key as keyof SignupFormValues, {
      message: response.errors[key],
    });
  });
}
    }


  } catch (error) {}
};


  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        <div className="mb-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h2>

          <p className="text-center">
            Start your fresh journey with us today
          </p>

          <div className="flex gap-2 mb-6 mt-8">
            <button
              type="button"
              className="btn flex-1 bg-white border border-gray-300 hover:bg-gray-50"
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="text-red-600 me-2"
              />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="btn flex-1 bg-white border border-gray-300 hover:bg-gray-50"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-blue-600 me-2"
              />
              <span>Facebook</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span>or</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

       <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name*</label>

            <input
              type="text"
              className="form-control"
              placeholder="Ali"
              id="name"
              {...register("name")}
            />
            {errors.name && (<p className="text-red-500 mt-0.5">*{errors.name.message}</p>)}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email*</label>

            <input
              type="email"
              className="form-control"
              placeholder="ali@example.com"
              id="email"
              {...register("email")}
            />
            {errors.email && (<p className="text-red-500 mt-0.5">*{errors.email.message}</p>)}


          </div>

          <div className="flex bg-light flex-col gap-2">
            <label htmlFor="password">Password*</label>

            <input
              type="password"
              className="form-control"
              placeholder="create a strong password"
              autoComplete="off"
              id="password"
              {...register("password")}
            />

            <div className="password-requirements">
              <div className="flex items-center gap-2">
                <div className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden">
                  <div className="progress bg-orange-500 w-50 h-full"></div>
                </div>

                <span>Fair</span>
              </div>
            </div>
             {errors.password && (<p className="text-red-500 mt-0.5">*{errors.password.message}</p>)}

          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="repassword">Confirm Password*</label>

            <input
              type="password"
              className="form-control"
              placeholder="confirm your password"
              autoComplete="off"
              id="repassword"
              {...register("repassword")}
            />
             {errors.repassword && (<p className="text-red-500 mt-0.5">*{errors.repassword.message}</p>)}

          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number*</label>

            <input
              type="tel"
              className="form-control"
              placeholder="+1 234 567 8900"
              id="phone"
              {...register("phone")}
            />
             {errors.phone && (<p className="text-red-500 mt-0.5">*{errors.phone.message}</p>)}

          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 accent-primary-600"
                {...register("terms")}
              />
                {errors.terms && (<p className="text-red-500 mt-0.5">*{errors.terms.message}</p>)}


              <label htmlFor="terms" className="ms-2">
                I agree to the{" "}
                <Link href={`/terms`} className="text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={`/privacy-policy`} className="text-primary-600">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed w-full"
          >
            <FontAwesomeIcon icon={faUserPlus} />

            <span>Create My Account</span>
          </button>
        </form>

        <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}