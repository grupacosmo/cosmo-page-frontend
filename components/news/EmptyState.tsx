import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

/** Shown when a list has nothing to display, e.g. no events translated into the current language. */
export function EmptyState({ text, compact, className }: { text: string; compact?: boolean; className?: string }) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-center text-black/55',
        compact ? 'py-8' : 'py-16',
        className,
      )}
    >
      <Icon name="rocket" size={compact ? 40 : 56} className="text-cosmo-magenta-light" />
      <p className={compact ? 'text-cosmo-m' : 'text-cosmo-l'}>{text}</p>
    </div>
  );
}
