"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Category({
  title,
  items,
  delay = 0,
}: {
  title: string;
  items: { name: string; price: string }[];
  delay?: number;
}) {
  return (
    <AnimatedSection animation="slide-up" delay={delay}>
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-[#C6A667] mb-6">{title}</h2>

        <ul className="space-y-4">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex justify-between border-b border-white/10 pb-2"
            >
              <span>{item.name}</span>
              <span className="font-semibold text-white">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}
