export default function Category({
  title,
  items,
}: {
  title: string;
  items: { name: string; price: string }[];
}) {
  return (
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
  );
}
