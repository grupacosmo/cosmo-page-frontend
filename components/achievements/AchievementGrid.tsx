'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { IconButton } from '@/components/common/IconButton';
import { ModalContent } from '@/components/common/Modal';
import { Surface } from '@/components/common/Surface';
import { Dialog, DialogClose, DialogTitle } from '@/components/ui/dialog';
import type { Achievement } from '@/lib/types';

function Medal({ date, compact }: { date: string; compact?: boolean }) {
  return (
    <div className="relative flex flex-col items-center p-2.5">
      <div
        className={`absolute top-[70px] flex -translate-x-1 flex-col items-center gap-2.5 text-[#ffde69] ${
          compact ? 'text-cosmo-s xl:text-cosmo-m' : 'text-[20px]'
        }`}
      >
        {date}
        <Icon name="rocket" size={45} />
      </div>
      <Image src="/images/Medal.svg" alt="" width={206} height={270} className={compact ? 'max-xl:w-3/4' : ''} />
    </div>
  );
}

export function AchievementGrid({ achievements }: { achievements: Achievement[] }) {
  // `selected` outlives `open` so the panel keeps its content during the close animation.
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [open, setOpen] = useState(false);
  const show = (achievement: Achievement) => {
    setSelected(achievement);
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-center gap-[30px] px-[50px] py-[50px] xl:px-[100px]">
        {achievements.map((achievement) => (
          <Surface key={achievement.id} asChild radius="lg" padding="em" interactive="zoom">
            <button type="button" onClick={() => show(achievement)}>
              <Medal date={achievement.date} compact />
              <h2 className="text-justify">{achievement.title}</h2>
            </button>
          </Surface>
        ))}
      </div>

      <ModalContent variant="panel">
        {selected && (
          <>
            <header className="flex justify-end">
              <DialogClose asChild>
                <IconButton icon="close" label="Close" />
              </DialogClose>
            </header>
            <section className="flex flex-col gap-5 md:flex-row">
              <Medal date={selected.date} />
              <div className="shrink-0 basis-[5px] bg-linear-to-r from-cosmo-magenta to-cosmo-blue md:bg-linear-to-b" />
              <div className="flex flex-col gap-[1em] text-justify">
                <DialogTitle asChild>
                  <h2>{selected.title}</h2>
                </DialogTitle>
                <p>{selected.description}</p>
              </div>
            </section>
          </>
        )}
      </ModalContent>
    </Dialog>
  );
}
