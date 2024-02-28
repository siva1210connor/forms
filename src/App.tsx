import React from "react";
import "./App.css";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";

//Typescript type
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  //Zod schema for validation
  const Schema: ZodType = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(8).max(20),
      confirmPassword: z.string().min(8).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match!",
      path: ["confirmPassword"],
    });

  //combines type to schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const submitData = (data: FormData) => {
    console.log("It Worked", data);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>First name :</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <label>Last name :</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <label>E-mail :</label>
        <input type="text" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <label>Age :</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <span>{errors.age.message}</span>}
        <label>Password :</label>
        <input type="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <label>Confirm Password :</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
