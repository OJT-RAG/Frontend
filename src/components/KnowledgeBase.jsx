// Plain JSX component (no Tailwind; uses local .kb-* CSS rules)
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  FileText,
  Users,
  Building,
  Calendar,
  Search,
  ArrowRight,
  Clock,
  Download
} from "lucide-react";
import "./KnowledgeBase.css";

const KnowledgeBase = () => {
  const categories = [
    // ...existing data...
    { icon: FileText, title: "OJT Policies", description: "Official policies and regulations for On-the-Job Training", count: 24, color: "kb-cat-primary" },
    { icon: Calendar, title: "Application Process", description: "Step-by-step guides for OJT applications and deadlines", count: 18, color: "kb-cat-accent" },
    { icon: Building, title: "Partner Companies", description: "Information about internship opportunities and partners", count: 156, color: "kb-cat-primary" },
    { icon: Users, title: "Guidelines for Mentors", description: "Resources and guidelines for OJT mentors and supervisors", count: 12, color: "kb-cat-accent" }
  ];

  const recentUpdates = [
    // ...existing data...
    { title: "Updated OJT Application Deadlines for 2024", category: "Application Process", date: "2 days ago", type: "Policy Update" },
    { title: "New Partner Companies Added - Tech Sector", category: "Partner Companies", date: "1 week ago", type: "Company List" },
    { title: "Revised GPA Requirements for OJT", category: "OJT Policies", date: "2 weeks ago", type: "Policy Update" }
  ];

  const popularDocuments = [
    // ...existing data...
    { title: "OJT Student Handbook 2024", downloads: 1240, category: "Guidelines", format: "PDF" },
    { title: "Company Evaluation Form", downloads: 856, category: "Forms", format: "DOCX" },
    { title: "OJT Report Template", downloads: 692, category: "Templates", format: "PDF" }
  ];

  return (
    <section className="kb-root">
      <div className="kb-container">
        <div className="kb-header">
          <Badge variant="secondary" className="kb-badge">
            <BookOpen className="kb-badge-icon" />
            Knowledge Hub
          </Badge>
          <h2 className="kb-title">
            Comprehensive <span className="kb-title-gradient">Knowledge Base</span>
          </h2>
          <p className="kb-sub">
            Access all OJT resources, policies, forms, and company information in one place
          </p>
        </div>

        {/* Search Bar */}
        <div className="kb-search">
          <div className="kb-search-inner">
            <Search className="kb-search-icon" />
            <Input placeholder="Search knowledge base..." className="kb-input" />
          </div>
        </div>

        {/* Knowledge Categories */}
        <div className="kb-grid">
          {categories.map((category, index) => (
            <Card key={index} className="kb-card">
              <div className={`kb-cat ${category.color}`}>
                <category.icon className="kb-icon" />
              </div>
              <h3 className="kb-cat-title">{category.title}</h3>
              <p className="kb-cat-desc">{category.description}</p>
              <div className="kb-card-footer">
                <Badge variant="outline" className="kb-count">
                  {category.count} items
                </Badge>
                <ArrowRight className="kb-arrow" />
              </div>
            </Card>
          ))}
        </div>

        <div className="kb-panels">
          {/* Recent Updates */}
          <Card className="kb-panel">
            <div className="kb-panel-header">
              <h3 className="kb-panel-title">Recent Updates</h3>
              <Button variant="ghost" size="sm" className="kb-viewall">
                View All
                <ArrowRight className="kb-arrow-sm" />
              </Button>
            </div>
            <div className="kb-panel-body">
              {recentUpdates.map((update, index) => (
                <div key={index} className="kb-update">
                  <div className="kb-update-left">
                    <div className="kb-update-icon">
                      <FileText className="kb-icon-small" />
                    </div>
                    <div className="kb-update-content">
                      <h4 className="kb-update-title">{update.title}</h4>
                      <div className="kb-update-meta">
                        <Badge variant="outline" className="kb-meta-badge">{update.type}</Badge>
                        <span className="kb-dot">•</span>
                        <div className="kb-meta-time"><Clock className="kb-meta-icon" />{update.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Popular Documents */}
          <Card className="kb-panel">
            <div className="kb-panel-header">
              <h3 className="kb-panel-title">Popular Documents</h3>
              <Button variant="ghost" size="sm" className="kb-viewall">
                View All
                <ArrowRight className="kb-arrow-sm" />
              </Button>
            </div>
            <div className="kb-panel-body">
              {popularDocuments.map((doc, index) => (
                <div key={index} className="kb-doc">
                  <div className="kb-doc-left">
                    <div className="kb-doc-icon">
                      <FileText className="kb-icon-small" />
                    </div>
                    <div className="kb-doc-content">
                      <h4 className="kb-doc-title">{doc.title}</h4>
                      <div className="kb-doc-meta">
                        <Badge variant="outline" className="kb-meta-badge">{doc.format}</Badge>
                        <span className="kb-dot">•</span>
                        <div className="kb-meta-download"><Download className="kb-meta-icon" />{doc.downloads}</div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="kb-download-btn">
                    <Download className="kb-icon-sm" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;
