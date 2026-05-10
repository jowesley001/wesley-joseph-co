"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type ReplicaLink = {
  href: string;
  label: string;
  external?: boolean;
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
};

type Props = {
  column: 0 | 1 | 2;
  title: string;
  links: ReplicaLink[];
};

function ReplicaAnchor({ link }: { link: ReplicaLink }) {
  const className = "absolute z-10 block focus-visible:outline focus-visible:outline-1 focus-visible:outline-white";
  const style = {
    left: `${link.rect.left}%`,
    top: `${link.rect.top}%`,
    width: `${link.rect.width}%`,
    height: `${link.rect.height}%`
  };

  if (link.external || link.href.startsWith("http")) {
    return (
      <Link
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={link.label}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Link
      href={link.href}
      aria-label={link.label}
      className={className}
      style={style}
    />
  );
}

export function VentureReplicaPage({ column, title, links }: Props) {
  return (
    <main className="min-h-screen bg-black text-white">
      <h1 className="sr-only">{title}</h1>
      <div className="mx-auto w-full max-w-[512px]">
        <div className="relative aspect-[1/2] w-full overflow-hidden bg-black">
          <img
            src="/ventures/page-reference.png"
            alt={`${title} page design`}
            className="absolute top-0 h-full w-[300%] max-w-none select-none"
            style={{ left: `-${column * 100}%` }}
            draggable={false}
          />
          {links.map((link) => (
            <ReplicaAnchor key={`${link.label}-${link.rect.top}`} link={link} />
          ))}
        </div>
      </div>
    </main>
  );
}
