import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./Button";
import FormInput from "./FormInput";

interface Props {
  email: string;
}

const VerifyOtpForm: React.FC<Props> = ({ email }) => {
  const supabase = useSupabaseClient();

  const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
    otp: z.string().min(6, "Please enter a valid OTP"),
  });

  type FormSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
    },
  });

  const submit = async (formData: FormSchema) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.otp,
        type: "magiclink",
      });

      if (error) {
        console.log({ data, error });
      }

      if (data) {
        console.log({ data, error });
      }
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)}>
      <div>
        <FormInput
          label="Email address"
          id="email"
          type="email"
          disabled
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <p className="text-center text-sm text-gray-600">
          We just sent you a temporary login code.
          <br />
          Please check your inbox.
        </p>
      </div>

      <div>
        <FormInput
          label="Login code"
          id="otp"
          type="text"
          placeholder="Paste the code from your email"
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Continue with login code
        </Button>
      </div>
      {/* <div>
        {errorMessage && (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
      </div> */}
    </form>
  );
};

export default VerifyOtpForm;
