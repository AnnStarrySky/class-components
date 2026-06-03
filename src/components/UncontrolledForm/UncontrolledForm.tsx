import type { FormValues } from "../../types/form";

type Props = {
  onSubmit: (data: FormValues ) => void;
};

export function UncontrolledForm({ onSubmit }: Props) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
    
        const data: FormValues = {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            age: String(formData.get("age") ?? ""),
        };
        onSubmit(data);
    };
    return (
        <form onSubmit={handleSubmit} className="form mt-4">
        <input className="form-input" name="name" placeholder="Name" required />
        <input className="form-input" name="email" placeholder="Email" type="email" required />
        <input className="form-input" name="age" placeholder="Age" type="number" required />
        <button className="btn" type="submit">Send</button>
        </form>
    );
}    