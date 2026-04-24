'use client'

import Hero from "./_components/Hero";
import CoursesSection from './_components/CoursesSection';

export default function Home() {
  return (
    <>
      <section className="hero_section">
        <Hero />
      </section>
      <div id="courses">
        <CoursesSection />
      </div>
    </>
  );
}
