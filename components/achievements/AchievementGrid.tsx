'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
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
  const [selected, setSelected] = useState<Achievement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selected) dialogRef.current?.showModal();
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-center gap-[30px] px-[50px] py-[50px] xl:px-[100px]">
        {achievements.map((achievement) => (
          <button
            key={achievement.id}
            type="button"
            onClick={() => setSelected(achievement)}
            className="cursor-pointer rounded-[15px] p-[1em] transition duration-500 hover:scale-105 hover:shadow-elevation-3"
          >
            <Medal date={achievement.date} compact />
            <h2 className="text-justify">{achievement.title}</h2>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto max-w-[800px] rounded p-5 shadow-elevation-5 backdrop:bg-transparent"
      >
        {selected && (
          <>
            <header className="flex justify-end">
              <button
                type="button"
                aria-label="Close"
                onClick={() => dialogRef.current?.close()}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-black/5"
              >
                <Icon name="close" />
              </button>
            </header>
            <section className="flex flex-col gap-5 md:flex-row">
              <Medal date={selected.date} />
              <div className="shrink-0 basis-[5px] bg-linear-to-r from-cosmo-magenta to-cosmo-blue md:bg-linear-to-b" />
              <div className="flex flex-col gap-[1em] text-justify">
                <h2>{selected.title}</h2>
                <p>{selected.description}</p>
              </div>
            </section>
          </>
        )}
      </dialog>
    </>
  );
}
