import Link from "next/link";

export default function Topline({ email }: { email: string }) {
  return (
    <nav className="topline" aria-label="Portfolio navigation">
      <Link href="/terminal" className="terminal-prime" aria-label="Open interactive terminal portfolio">
        <span className="pulse" aria-hidden="true" />
        terminal portfolio ↗
      </Link>
      <span className="right">
        <a href={`mailto:${email}`}>{email}</a>
      </span>
    </nav>
  );
}
