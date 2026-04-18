import type { Metadata } from "next";
import AppShell from "../components/AppShell";

export const metadata: Metadata = {
  title: "Terminal · Oussama Nahiz",
};

export default function TerminalPage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <AppShell />
    </div>
  );
}
