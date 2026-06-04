import { useForm } from "react-hook-form";
import type { FormValues } from "../../types/form";

type Props = {
  onSubmit: (data: FormValues) => void;
};

export function ReactHookForm({ onSubmit }: Props) {
  const {register, handleSubmit} = useForm<FormValues>();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form mt-4">
      <input className="form-input" placeholder="Name" {...register("name")}/>
      <input className="form-input" type="email" placeholder="Email" {...register("email")}/>
      <input className="form-input" type="number" placeholder="Age" {...register("age")}/>
      <button className="btn" type="submit">
        Send
      </button>
    </form>
  );
}