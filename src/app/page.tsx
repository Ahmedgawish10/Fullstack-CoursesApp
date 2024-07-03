'use client'

import { useClerk } from '@clerk/nextjs';
import Hero from "./_components/Hero";
import CoursesSection from './_components/CoursesSection';
import { currentUser } from '@clerk/nextjs/server';
import {  ClerkProvider, SignInButton, SignedIn,SignedOut,UserButton, SignOutButton,} from '@clerk/nextjs'

export default   function Home() {
  const { signOut } = useClerk();


  return (
    <>
   
 <section className="hero_section">
 <Hero/>
 </section>
 <div id="courses">
  <CoursesSection/>
  </div>

  </>
   

   
     

  
  );
}
