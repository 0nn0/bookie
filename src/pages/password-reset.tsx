import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";

enum Status {
  Form = "FORM",
  SubmittingForm = "SUBMITTING_FORM",
  Success = "SUCCESS",
  Failed = "FAILED",
}

const PasswordReset: NextPage = () => {
  const [status, setStatus] = useState(Status.Form);

  const { register, handleSubmit } = useForm();

  const [hash, setHash] = useState<string | null>(null);

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const submit = async (data) => {
    setStatus(Status.SubmittingForm);
    if (hash) {
      console.log("hash", hash);
      // example hash: #access_token=XXX&expires_in=3600&refresh_token=KSCFQVi73EHAWjVoaZV1GQ&token_type=bearer&type=recovery
      const params = Object.fromEntries(new URLSearchParams(hash.substring(1)));

      if (params.type === "recovery" && params.access_token) {
        console.log("params", params);

        const { error } = await supabase.auth.api.updateUser(
          params.access_token,
          {
            password: data.password,
          }
        );

        if (error) {
          console.log("error", error);
        }

        setStatus(Status.Success);
      } else if (params.error) {
        // example hash: #error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired
        console.log("params.error", params.error);
        console.log("params.error_code", params.error_code);
        console.log("params.error_description", params.error_description);

        setStatus(Status.Failed);
      }
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {[Status.Form, Status.SubmittingForm].includes(status) && (
            <form className="space-y-6" onSubmit={handleSubmit(submit)}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register("password")}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={status === Status.SubmittingForm}
                >
                  {status === Status.SubmittingForm
                    ? "Submitting..."
                    : "Update password"}
                </button>
              </div>
            </form>
          )}
          {status === Status.Success && (
            <div className="text-center">
              <p className="text-gray-900">
                Password updated! You can now{" "}
                <a
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  login
                </a>
                .
              </p>
            </div>
          )}
          {status === Status.Failed && (
            <div className="text-center">
              <p className="text-gray-900">
                Password update failed. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
