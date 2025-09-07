import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form className="flex flex-col gap-4">
          <label htmlFor="email">Email:</label>
          <Input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <Input id="password" name="password" type="password" required />
          <Button formAction={login}>Log in</Button>
        </form>
      </div>
    </div>
  );
}
