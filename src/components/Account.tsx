import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import Button from "./Button";

interface Props {
  session: Session;
}

const Account: React.FC<Props> = ({ session }) => {
  console.log("Account");
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    website: z.string({ invalid_type_error: "Website can not be empty" }),
  });

  type FormSchema = z.infer<typeof schema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    if (user === null) {
      throw new Error("User is null");
    }

    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        reset({
          username: data.username,
          website: data.website,
        });
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const submit = async (data: FormSchema) => {
    console.log("onSubmit", data);

    const { username, website } = data;

    if (user === null) {
      throw new Error("User is null");
    }

    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        website,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="grid grid-cols-1 gap-y-6">
        <div>
          <FormInput
            id="email"
            label="Email address"
            value={session.user.email}
            register={register}
            errors={errors}
            disabled
          />
        </div>
        <div>
          <FormInput
            id="username"
            label="Username"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <FormInput
            id="website"
            label="Website"
            register={register}
            errors={errors}
          />
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Updating ..." : "Update"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Account;
