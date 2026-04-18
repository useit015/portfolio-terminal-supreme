import Link from "next/link";

export default function Topline({ email }: { email: string }) {
  return (
    <div className="topline">
      <span className="mark">
        <span className="pulse" />
        available for work
      </span>
      <span className="right">
        <Link href="/terminal">terminal ↗</Link>
        <a href={`mailto:${email}`}>{email}</a>
      </span>
    </div>
  );
}
