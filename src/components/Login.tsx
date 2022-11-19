import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const submitVerify = async (formData) => {
    console.log("submitVerify", formData);
    // return;
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.otp,
        type: "magiclink",
      });

      if (error) {
        console.log({ data, error });
        setErrorMessage(error.message);
      }

      if (data) {
        console.log({ data, error });
        // router.push("/account");
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitEmail = async (formData) => {
    console.log("submitVerify", formData);
    setVerify(true);
    // return;
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
      });
      if (error) {
        throw error;
      } else {
        setVerify(true);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to Bookie
        </h2>
        {/* <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            register
          </Link>
        </p> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(verify ? submitVerify : submitEmail)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required={true}
                  disabled={verify}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("email")}
                />
              </div>
            </div>
            {verify && (
              <div>
                <p className="text-center text-sm text-gray-600">
                  We just sent you a temporary login code.
                  <br />
                  Please check your inbox.
                </p>
              </div>
            )}

            {verify && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Login code
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    type="text"
                    autoFocus={true}
                    required={false}
                    placeholder="Paste the code from your email"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("otp")}
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {verify ? "Continue with login code" : "Continue with email"}
              </button>
            </div>
            <div>
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
