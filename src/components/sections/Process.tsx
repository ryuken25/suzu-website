const commission = [
  'Brief & references',
  'Scope check',
  'Price confirmation',
  'Sketch / early preview',
  'Render & revision',
  'Delivery + credit info',
];

const collab = [
  'Send proposal',
  'Fit check',
  'Agree role/credit/timeline',
  'Asset creation',
  'Launch/post together',
];

function Flow({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-strong rounded-[2.5rem] p-7">
      <h3 className="font-display text-3xl font-black">{title}</h3>
      <div className="mt-6 space-y-3">
        {items.map((x, i) => (
          <div key={x} className="flex gap-4 rounded-2xl bg-white/55 p-4">
            <span className="font-display text-2xl font-black text-pink">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-bold text-mocha">{x}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="py-20">
      <div className="container-suzu">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">Process</p>
          <h2 className="section-title mt-3">From tiny idea to finished art</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Flow title="Commission Flow" items={commission} />
          <Flow title="Open Collab Flow" items={collab} />
        </div>
      </div>
    </section>
  );
}
