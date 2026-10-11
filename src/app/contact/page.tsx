import { Metadata } from "next";
import { ContactClient } from "@/components/sections/ContactClient";

export const metadata: Metadata = {
  title: "Contact & Collaboration | Rakib Hussain",
  description:
    "Connect with Rakib Hussain — Full-Stack Developer specializing in modern web applications, Next.js, TypeScript, and scalable systems. Available for freelance projects and full-time opportunities.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactClient />
    </main>
  );
}
