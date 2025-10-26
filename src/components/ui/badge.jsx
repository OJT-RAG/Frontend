import React from "react";
import "./badge.css";
import { cn } from "@/lib/utils";

function Badge({ className = "", variant = "default", ...props }) {
  return <div className={cn("badge", `badge--${variant}`, className)} {...props} />;
}

export { Badge };