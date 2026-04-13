"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "./section"
import { X, Award, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const certificates = [
  {
    title: "IBM Cloud Computing",
    issuer: "IBM - Coursera",
    image: "/certificates/ibm-cloud-intro.jpg",
  },
  {
    title: "Generative AI",
    issuer: "IBM - Coursera",
    image: "/certificates/ibm-generative-ai.jpg",
  },
  {
    title: "AWS Cloud Foundations",
    issuer: "AWS Academy",
    image: "/certificates/aws-academy-cloud.jpg",
  },
  {
    title: "Mathematics for CS",
    issuer: "University of London",
    image: "/certificates/uol-maths-cs.jpg",
  },
  {
    title: "Backend Development",
    issuer: "Packt - Coursera",
    image: "/certificates/packt-backend-api.jpg",
  },
  {
    title: "Frontend with React",
    issuer: "Packt - Coursera",
    image: "/certificates/packt-frontend-react.jpg",
  },
  {
    title: "Advanced Frontend",
    issuer: "Packt - Coursera",
    image: "/certificates/packt-advanced-frontend.jpg",
  },
  {
    title: "MERN Stack",
    issuer: "Packt - Coursera",
    image: "/certificates/mern-specialization.jpg",
  },
]

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null)

  return (
    <>
      <Section id="certificates" title="My Certifications" icon={<Award className="w-8 h-8" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <motion.div
              whileHover={{ y: -8 }}
              key={cert.title}
              className="flip-card cursor-pointer group"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="flip-card-inner relative h-56 rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                {/* Front */}
                <div className="flip-card-front absolute inset-0 rounded-2xl overflow-hidden bg-card border border-border/40 group-hover:border-primary/30 transition-colors">
                  <div className="relative w-full h-full bg-secondary/30 flex items-center justify-center">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-0" />
                    <div className="absolute bottom-4 left-5 right-5 z-10">
                      <p className="text-sm font-semibold text-foreground truncate">{cert.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back absolute inset-0 rounded-2xl overflow-hidden bg-card border border-primary/30 flex flex-col items-center justify-center p-6 text-center shadow-inner">
                  <Award className="w-10 h-10 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-1">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium transition-colors">
                    View
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                className="object-contain bg-card"
              />
            </div>
            <div className="text-center mt-6">
              <h3 className="text-xl font-bold tracking-tight text-foreground">{selectedCert.title}</h3>
              <p className="text-muted-foreground mt-1">{selectedCert.issuer}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
