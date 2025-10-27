import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ChatInterface from "./ChatInterface";
import KnowledgeBase from "./KnowledgeBase";
import Footer from "./Footer";


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
