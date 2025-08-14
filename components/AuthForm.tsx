"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import CustomFormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signUp, signIn } from "@/lib/actions/auth.actions";
import { auth } from "../firebase/client";

// Use getAuth() to get the client-side Auth instance
// const auth = getAuth();

type AuthFormProps = {
  type: "sign-in" | "sign-up";
};

// Schema adjusts based on type (sign-in vs sign-up)
const authFormSchema = (type: AuthFormProps['type']) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
}

const AuthForm = ({ type }: AuthFormProps) => {
  const isSignIn = type === "sign-in";
  const router = useRouter();

  const formSchema = authFormSchema(type);
  type FormSchemaType = z.infer<typeof formSchema>;
  
  // Defining the Form with proper default values based on type
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: isSignIn
      ? {
          email: "",
          password: "",
        }
      : {
          name: "",
          email: "",
          password: "",
        },
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      console.log("Form submitted with data:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (type === "sign-up") {
        const {name, email, password} = data;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name ??  "", 
          email,
          password,
        });

        if(!result.success){
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully! Please sign in.");
        router.push("/auth/sign-in");
      } 
      else {
        const {email, password} = data;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();

        if(!idToken){
          toast.error("Failed to retrieve ID token. Please try again.");
          return;
        }

        await signIn({
          email, idToken
        });

        toast.success("Logged in successfully!");
        router.push("/");
      }
    }
    catch (err) {
      console.error("Submit error:", err);
      toast.error(`There was an error: ${err}`);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="rounded-xl border shadow-lg p-8 lg:min-w-[566px] bg-white dark:bg-gray-900">
        <div className="flex flex-col gap-6 py-6 px-4">
          <div className="flex flex-row gap-2 justify-center">
            <Image src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-primary-100 capitalize"> PrepWise </h2>
          </div>

          <h3 className="text-center text-xl font-semibold">
            Practise Job Interviews with AI
          </h3>

          <Form {...form}>
            <form 
              className="w-full space-y-6 mt-4 form" 
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {!isSignIn && (
                <CustomFormField
                  control={form.control}
                  name="name"
                  label="Username"
                  placeholder="Enter Your Name"
                  description="This is your public display name."
                />
              )}

              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter Your Email"
                type="email"
                description="We'll never share your email."
              />

              <CustomFormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter Your Password"
                type="password"
              />

              <Button 
                className="w-full" 
                type="submit" 
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting 
                  ? "Processing..." 
                  : isSignIn ? "Sign In" : "Create an Account"
                }
              </Button>
            </form>
          </Form>

          {/* Redirect */}
          <p className="text-center mt-4">
            {!isSignIn ? "Have an account already? " : "No account yet? "}
            <Link
              href={!isSignIn ? "/auth/sign-in" : "/auth/sign-up"}
              className="ml-1 font-bold text-user-primary"
            >
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;