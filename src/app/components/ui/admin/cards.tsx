export function Card({
  heading,
  content,
  footer,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  heading: string;
  content: string;
  footer?: string;
}) {
  return (
    <main {...rest}>
      {/* card heading */}
      <div>
        <h2 className="text-2xl font-extrabold truncate text-ellipsis">
          {heading}
        </h2>
      </div>
      {/* card content */}
      <div className="flex-1 text-2xl">{content}</div>
      {/* card footer/small text */}
      {footer && <div className="border-t border-stone-200">{footer}</div>}
    </main>
  );
}
