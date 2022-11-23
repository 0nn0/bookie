import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./Button";
import FormInput from "./FormInput";

interface Props {
  onSubmitSuccess: (email: string) => void;
}

const RequestOtpForm: React.FC<Props> = ({ onSubmitSuccess }) => {
  const supabase = useSupabaseClient();

  const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
  });

  type FormSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: FormSchema) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
      });
      if (error) {
        throw error;
      }

      onSubmitSuccess(formData.email);
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput
          label="Email address"
          id="email"
          type="email"
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Continue with email
        </Button>
      </div>
    </form>
  );
};

export default RequestOtpForm;
