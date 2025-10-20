import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import KnowledgeBase from "@/components/KnowledgeBase";
import Footer from "@/components/Footer";
import "./Index.css";

const Index = () => {
  return (
    <div className="index-root min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ChatInterface />
        <KnowledgeBase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
