export default function Stack({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-y-6">{children}</div>;
}
