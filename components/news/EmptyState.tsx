import { Rocket } from 'lucide-react';

/** Shown when a list has nothing to display, e.g. no events translated into the current language. */
export function EmptyState({ text }: { text: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center text-muted-foreground">
      <Rocket className="size-10 text-cosmo-magenta-light" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}
