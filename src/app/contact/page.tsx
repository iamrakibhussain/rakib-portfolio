import { Metadata } from "next";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "Contact | Rakib Hussain",
  description: "Get in touch for freelance opportunities, job offers, or just to say hi.",
};
import { ContactForm } from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24 px-4 md:px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <FadeIn>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Let&apos;s Connect</h1>
            <p className="text-xl text-muted-foreground">
              I&apos;m currently available for freelance projects and open to full-time opportunities.
            </p>
          </div>
          
          <div className="space-y-4 text-muted-foreground">
            <p>
              Whether you have a question, a project in mind, or just want to connect, feel free to reach out. I try my best to respond within 24 hours.
            </p>
            <div className="pt-4 space-y-2">
              <h3 className="font-semibold text-foreground">Email</h3>
              <p>alrokib44@gmail.com</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Location</h3>
              <p>Remote / Global</p>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="h-full">
        <div className="bg-card p-6 md:p-8 rounded-xl border shadow-sm h-full">
          <ContactForm />
        </div>
      </FadeIn>
    </div>
  );
}
