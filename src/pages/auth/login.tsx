import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleLogo from "../../assets/google.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

const loginFormSchema = z.object({
  email: z.string().email("email not valid!"),
});

function LoginPage() {
  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      console.log(values);
      await axios.post("/*URL*/", values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="shadow-md p-2 w-[80%] sm:w-96">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label htmlFor="email" className="text-md">
                          Email
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1.5">
                          <Input
                            type="email"
                            required
                            id="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="px-5 text-right text-sm text-muted-foreground">
                  <a
                    href="/register"
                    className="hover:text-brand underline underline-offset-4"
                  >
                    Don&apos;t have an account?
                  </a>
                </p>
                <div className="w-full flex items-center justify-center">
                  <Button className="w-full text-md" type="submit">
                    Login with Email
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 ">
          <div className="relative flex justify-center text-xs uppercase ">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Button
            variant="outline"
            className="text-md w-full hover:bg-slate-100/60"
          >
            <img src={GoogleLogo} className="w-6 h-6 m-2" />
            Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
