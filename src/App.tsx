import {z} from 'zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>;



function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues:{
      email : "test@email.com",
      password: "12345678"
    },
    resolver : zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      // setError("email",{
      //   message: "This email is already taken",
      // });
      setError("root",{
        message: "This email is already taken",
      });
    }
  };

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email")}
        type="text"
        placeholder="Email"
      />
      {errors.email && <div>{errors.email.message}</div>}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
      />
      {errors.password && <div>{errors.password.message}</div>}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading...." : "Submit"}
      </button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
}

export default App;
