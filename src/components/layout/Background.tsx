// Soft colour fields are drawn as radial gradients rather than blurred
// elements: same look, a fraction of the GPU cost.
const orbs = [
  { className: '-left-[15%] -top-[20%] h-[70vmax] w-[70vmax] animate-drift', color: '167 139 250', alpha: 0.22 },
  { className: '-right-[20%] top-[15%] h-[60vmax] w-[60vmax] animate-drift-slow', color: '127 216 255', alpha: 0.14 },
  { className: '-bottom-[30%] left-[20%] h-[55vmax] w-[55vmax] animate-drift', color: '255 181 71', alpha: 0.1 },
]

/** Fixed backdrop: slow drifting colour fields, a faint grid and film grain. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {orbs.map((o) => (
        <div
          key={o.color}
          className={`absolute rounded-full will-change-transform ${o.className}`}
          style={{ background: `radial-gradient(closest-side, rgb(${o.color} / ${o.alpha}), transparent)` }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
        }}
      />
      <div className="grain absolute inset-0 opacity-[0.05]" />
    </div>
  )
}
