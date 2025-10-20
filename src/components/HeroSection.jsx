import React from "react";
import { MessageSquare, BookOpen, Users, Zap, ArrowRight, Play } from "lucide-react";
import heroImage from "@/components/assets/hero-image.jpg";
import "./HeroSection.css";

const HeroSection = () => {
  const iconSize = 20;

  return (
    <section className="hero-root">
      <div className="hero-gradient" />
      <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-badge"><Zap /> <span>AI-Powered Assistant</span></div>

            <h1 className="hero-title">Your Smart <span className="text-gradient">OJT Companion</span> at FPT University</h1>

            <p className="hero-desc">
              Get instant, accurate answers about On-the-Job Training policies, procedures, and guidelines.
              Powered by advanced AI to support students, mentors, and CRO staff.
            </p>

            <div className="hero-ctas">
              <button className="btn btn-primary"><MessageSquare /> Start Asking Questions <ArrowRight /></button>
              <button className="btn btn-outline"><Play /> Watch Demo</button>
            </div>

            <div className="hero-stats">
              <div><div className="stat-num">24/7</div><div className="stat-label">Available</div></div>
              <div><div className="stat-num">1000+</div><div className="stat-label">Questions Answered</div></div>
              <div><div className="stat-num">98%</div><div className="stat-label">Accuracy Rate</div></div>
            </div>
          </div>

          <div className="hero-right">
            <img src={heroImage} alt="Hero" className="hero-image" />
            <div className="floating-primary"><MessageSquare /> <span>AI Assistant</span></div>
            <div className="floating-card">
              <div className="avatars">
                <span className="a a1" />
                <span className="a a2" />
                <span className="a a3" />
              </div>
              <span>Active Users</span>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="card feature">
            <div className="feature-icon"><MessageSquare /></div>
            <h3>Smart Q&A</h3>
            <p>Ask questions in natural language and get precise, contextual answers</p>
          </div>
          <div className="card feature">
            <div className="feature-icon"><BookOpen /></div>
            <h3>Knowledge Base</h3>
            <p>Access comprehensive OJT resources, policies, and guidelines</p>
          </div>
          <div className="card feature">
            <div className="feature-icon"><Users /></div>
            <h3>Multi-Role Support</h3>
            <p>Tailored experiences for students, mentors, and CRO staff</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
