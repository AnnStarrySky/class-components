import { useState } from "react";
import { formSchema } from "../../validation/formSchema";
import type { FormValues } from "../../validation/formSchema";

type Props = {
  onSubmit: (data: FormValues) => void;
};

export function UncontrolledForm({ onSubmit }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      age: Number(formData.get("age")), 
    };

    const result = formSchema.safeParse(rawData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        formattedErrors[path] = issue.message;
      });
      
      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data); 
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="form mt-4">
      <div className="form-group">
        <input className="form-input" name="name" placeholder="Name" required />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <input className="form-input" name="email" placeholder="Email" type="email" required />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <input className="form-input" name="age" placeholder="Age" type="number" required />
        {errors.age && <p className="error-text">{errors.age}</p>}
      </div>

      <button className="btn" type="submit">Send</button>
    </form>
  );
}