import { useForm } from "react-hook-form";
import { formSchema } from "../../validation/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormValues } from "../../validation/formSchema";

type Props = {
  onSubmit: (data: FormValues) => void;
};

export function ReactHookForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="form mt-4">
      <input className="form-input" placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input className="form-input" type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input className="form-input" type="number" placeholder="Age"  {...register("age", { valueAsNumber: true })} />
      {errors.age && <p>{errors.age.message}</p>}

      <button className="btn" type="submit" disabled={!isValid}>
        Send
      </button>
    </form>
  );
}