  import { Input } from "@/components/ui/input"
  import * as React from "react"
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
import { Progress } from "@components/ui/progress"
import { Button } from "@components/ui/button"
import zxcvbn from 'zxcvbn';
import { Eye, EyeOff, HelpCircleIcon } from "lucide-react"

  export default interface PasswordSectionProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
      control: any
    }

    const PasswordSection = React.forwardRef<HTMLInputElement, PasswordSectionProps>(
      ({ className, type, control, ...props}, ref) => {
        //Password Strength Logic
        const [passwordStrength, setPasswordStrength] = React.useState<number>(0);

        const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const enteredPassword = e.target.value;
          const result = zxcvbn(enteredPassword);
          const strength = result.score; // zxcvbn provides a score from 0 to 4
          setPasswordStrength(strength);
        };
        const [showPassword, setShowPassword] = React.useState(false)

        return (
          <div>
            {/* Password Field*/}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter Password" type={showPassword?'text':'password'} {...field} onInput={handlePasswordChange}/>
                    <Button variant="ghost" type="button" size='icon' className="absolute right-0 bottom-0" aria-label="Toggle Passowrd Visibility" onClick={() => {setShowPassword(!showPassword)}}>
                      <Eye className="absolute text-slate-400" visibility={showPassword? 'visible':'hidden'}/>
                      <EyeOff className="absolute text-slate-300" visibility={showPassword? 'hidden':'visible'}/>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
            
            {/* Password Strength Checker*/}
            <div className="flex justify-center items-center space-x-4 my-2 mr-1">
              <label className="text-sm text-character-secondary">Strength</label>
              <Progress value={passwordStrength * 25} className="h-2" />
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="button" className="text-character-secondary">
                  <HelpCircleIcon/>
                </TooltipTrigger>
                <TooltipContent>
                  <h5 className="text-sm font-medium">Password Guidelines:</h5>
                  <ol className="list-disc mx-5">
                    <li>At least 8 characters in length</li>
                    <li>Contain a number / symbol</li>
                    <li>No repeated characters</li>
                    <li>etc...</li>
                  </ol>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </div>
            {/* Generate Password Button*/}
            <Button type="button" variant={'secondary'} className="w-full">Genereate Password</Button>
            {/* Confirm Password Field*/}
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Re-enter Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
          </div>
        )
      }
    )
    PasswordSection.displayName = "PasswordSection"
    
    export { PasswordSection }


    