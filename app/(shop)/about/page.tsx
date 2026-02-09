"use client";

import React from "react";
import Image from "next/image";
import {
  Award,
  Eye,
  Globe,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/index";

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: "Exceptional Quality",
      description:
        "Each pair is handcrafted using premium materials sourced from the finest suppliers around the world.",
    },
    {
      icon: Eye,
      title: "Vision Protection",
      description:
        "Our lenses provide 100% UV protection with advanced polarization for crystal-clear vision.",
    },
    {
      icon: Heart,
      title: "Sustainable Practices",
      description:
        "We're committed to reducing our environmental footprint through eco-friendly packaging and responsible sourcing.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We offer a 30-day hassle-free return policy on all purchases.",
    },
  ];

  const milestones = [
    { year: "2018", title: "Founded", description: "LUXE VISION was established in Milan" },
    { year: "2019", title: "First Collection", description: "Launched our debut driving collection" },
    { year: "2021", title: "Global Expansion", description: "Opened stores in 12 countries" },
    { year: "2024", title: "100K Customers", description: "Served over 100,000 happy customers worldwide" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-secondary">
          <Image
            src="https://images.unsplash.com/photo-1493423109850-b5b1a7d4d33d?w=1920"
            alt="About LUXE VISION"
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <FadeIn>
            <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-6">
              Our <span className="text-gradient-gold">Story</span>
            </h1>
            <p className="text-text-muted text-xl max-w-2xl mx-auto">
              Redefining eyewear with a perfect blend of Italian craftsmanship
              and modern innovation
            </p>
          </FadeIn>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="font-serif text-4xl font-semibold mb-6">
                  Where Elegance Meets <span className="text-primary">Function</span>
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p>
                    Founded in Milan in 2018, LUXE VISION was born from a simple
                    belief: that premium eyewear should combine exceptional
                    craftsmanship with cutting-edge lens technology.
                  </p>
                  <p>
                    Our founders, with over three decades of combined experience
                    in optical design and luxury fashion, set out to create
                    sunglasses that don't just make a statement—they protect
                    your vision in style.
                  </p>
                  <p>
                    Every pair of LUXE VISION sunglasses is meticulously
                    handcrafted using premium Italian acetate, lightweight
                    titanium, and lenses that meet the highest optical standards.
                    We partner with the best lens manufacturers in Japan to
                    ensure crystal-clear vision with 100% UV protection.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800"
                  alt="Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-text-muted/10">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-muted text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Our <span className="text-primary">Journey</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                Key moments in LUXE VISION's history
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="text-center border-text-muted/10">
                  <CardContent className="p-6">
                    <div className="text-4xl font-serif font-bold text-primary mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-text-muted text-sm">{milestone.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              Join the LUXE VISION Family
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Experience the difference that premium craftsmanship makes.
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-gold text-background font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              Shop Our Collection
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
