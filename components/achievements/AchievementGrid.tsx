'use client';

import { Rocket } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { CardGrid } from '@/components/common/Container';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Achievement } from '@/lib/types';

/** Medal artwork with the achievement date and a rocket drawn over it. */
function Medal({ date }: { date: string }) {
  return (
    <div className="relative w-40 shrink-0">
      <Image src="/images/Medal.svg" alt="" width={206} height={270} className="h-auto w-full" />
      <div className="absolute inset-x-0 top-[22%] flex flex-col items-center gap-1 text-sm font-medium text-[#ffde69]">
        {date}
        <Rocket className="size-8" aria-hidden="true" />
      </div>
    </div>
  );
}

export function AchievementGrid({ achievements }: { achievements: Achievement[] }) {
  // `selected` outlives `open` so the dialog keeps its content during the close animation.
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [open, setOpen] = useState(false);
  const show = (achievement: Achievement) => {
    setSelected(achievement);
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <CardGrid>
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            asChild
            className="items-center gap-4 px-4 py-6 text-center transition-shadow outline-none hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <button type="button" onClick={() => show(achievement)}>
              <Medal date={achievement.date} />
              <span className="text-base font-medium text-balance">{achievement.title}</span>
            </button>
          </Card>
        ))}
      </CardGrid>

      <DialogContent className="flex flex-col items-center gap-6 p-6 sm:max-w-2xl md:flex-row md:items-start">
        {selected && (
          <>
            <Medal date={selected.date} />
            <DialogHeader className="pr-6">
              <DialogTitle className="text-lg leading-snug">{selected.title}</DialogTitle>
              <DialogDescription className="leading-relaxed">{selected.description}</DialogDescription>
            </DialogHeader>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
