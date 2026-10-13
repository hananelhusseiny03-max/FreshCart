
import SignupHero from "@/app/features/authen/components/signup/signupHero";
import SignupForm from "@/app/features/authen/components/signup/signupForm";



export default function SignupScreen() {
  return <>
  
<main className="py-10">

<div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">

      <SignupHero/>
      <SignupForm/>
      
</div>

</main>

 
  
  </>
}
