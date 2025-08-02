import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI-Resumind" },
    { name: "description", content: "Smart feedback for your dream" },
  ];
}

export default function Home() {
  const {auth} = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, navigate]);
  return (
    <main className="bg-[url('images/bg-main.svg')]">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your Application & Resume Ratings</h1>
          <h2>Get smart feedback on your resume and track your job applications.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resume-section">
            {resumes.map((resume: Resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}