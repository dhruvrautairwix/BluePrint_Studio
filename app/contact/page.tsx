"use client";

import ContactForm from "@/components/ContactForm";
import AnimatedText from "@/components/AnimatedText";

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedText>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Contact</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Get in touch with us to discuss your next project.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <AnimatedText>
                <h2 className="text-3xl font-bold mb-8">Send us a message</h2>
              </AnimatedText>
              <ContactForm />
            </div>

            {/* Map & Info */}
            <div>
              <AnimatedText delay={0.2}>
                <h2 className="text-3xl font-bold mb-8">Find us</h2>
              </AnimatedText>
              <div className="mb-8">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132576894!2d-73.98811768459384!3d40.748440979327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p>123 Design Street, Creative District, NY 10001</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:hello@studio.com" className="hover:underline">
                    hello@studio.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

