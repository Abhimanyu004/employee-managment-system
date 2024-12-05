"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  first_name: z
    .string()
    .min(4, "First name must be at least 4 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name cannot contain special characters"),
  second_name: z
    .string()
    .min(4, "Last name must be at least 4 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name cannot contain special characters"),
  emp_id: z
    .string()
    .min(1, "Employee ID is required")
    .max(10, "Employee ID must be less than 10 characters")
    .regex(/^[a-zA-Z0-9]*$/, "Employee ID must be alphanumeric"),
  email: z.string().email("Invalid email format"),
  phone_no: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]*$/, "Phone number must contain only numbers"),
  dept: z.string().min(1, "Department is required"),
  doj: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  role: z
    .string()
    .min(1, "Role is required")
    .regex(/^[a-zA-Z\s]*$/, "Role cannot contain special characters"),
});

type FormData = z.infer<typeof formSchema>;

const EmployeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/addemployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error:', errorResponse);
        alert(`Error occurred: ${errorResponse.error}`);
      } else {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        alert('Form submitted successfully!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center max-w-screen-sm border border-green-700 p-10 rounded-md w-full"
    >
      <div className="mb-5 w-full">
        <input
          className="p-2 rounded-md border-green-700 border w-full"
          type="text"
          placeholder="First Name"
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name.message}</p>
        )}
      </div>

      <div className="mb-5 w-full">
        <input
          className="p-2 rounded-md border-green-700 border w-full"
          type="text"
          placeholder="Last Name"
          {...register("second_name")}
        />
        {errors.second_name && (
          <p className="text-red-500 text-sm">{errors.second_name.message}</p>
        )}
      </div>

      <div className="mb-5 w-full">
        <input
          className="p-2 rounded-md border-green-700 border w-full"
          type="text"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-5 w-full">
        <input
          className="p-2 rounded-md border-green-700 border w-full"
          type="text"
          placeholder="Employee ID"
          {...register("emp_id")}
        />
        {errors.emp_id && (
          <p className="text-red-500 text-sm">{errors.emp_id.message}</p>
        )}
      </div>

      <div className="mb-5 w-full">
        <input
          className="p-2 rounded-md border-green-700 border w-full"
          type="text"
          placeholder="Phone Number"
          {...register("phone_no")}
        />
        {errors.phone_no && (
          <p className="text-red-500 text-sm">{errors.phone_no.message}</p>
        )}
      </div>

      <div className="mb-5 w-full">
        <select
          className="p-2 rounded-md border-green-700 border w-full"
          {...register("dept")}
        >
          <option value="" disabled>
            Select Department
          </option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.dept && (
          <p className="text-red-500 text-sm">{errors.dept.message}</p>
        )}
      </div>

      <div className="mb-5 w-full">
        <input
          className="p-2 rounded-md border-green-700 border w-full"
          type="text"
          placeholder="Date of Joining (YYYY-MM-DD)"
          {...register("doj")}
        />
        {errors.doj && (
          <p className="text-red-500 text-sm">{errors.doj.message}</p>
        )}
      </div>

      <div className="mb-5 w-full">
        <input
          className="p-2 rounded-md border-green-700 border w-full"
          type="text"
          placeholder="Role"
          {...register("role")}
        />
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
      </div>

      <Button type="submit" className="w-1/3">
        Submit
      </Button>
    </form>
  );
};

export default EmployeeForm;
