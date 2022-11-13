import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";

const getCurrentUser = async () => {
  const session = await supabase.auth.session();
  console.log("session", session);

  if (!session?.user) {
    // throw new Error("No user found");
    return console.log("No user found");
  }

  return session.user;
};

export default function VacationHomes() {
  const [loading, setLoading] = useState(false);
  const [homes, setHomes] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  const { data, isLoading } = useQuery(["home"], async () => {
    return await supabase.from("homes").select("*");
  });

  console.log("result", data);

  const submit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const user = await getCurrentUser();
    } catch (e) {}
  };

  const loadData = async () => {
    const user = await getCurrentUser();

    console.log("user", user);

    const { data, error } = await supabase
      .from("homes")
      .select("*")
      .eq("profile_id", user.id);
    // .single();

    console.log("data", data);

    setHomes(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>Vacation Homes</h1>
      <p>List</p>
      <ul>
        {homes.map((home) => (
          <li key={home.id}>{home.name}</li>
        ))}
      </ul>

      <h1>Add vacation home</h1>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="name">Name</label>
        <input {...register("name", { required: true })} />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}
