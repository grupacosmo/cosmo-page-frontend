import { Slider } from '@/components/common/Slider';
import { aboutUsSlides } from '@/lib/data/site';

interface AboutUsProps {
  title: string;
  description: string;
  emptySliderText: string;
}

export function AboutUs({ title, description, emptySliderText }: AboutUsProps) {
  return (
    <div className="flex justify-between gap-[2em] p-[15px] max-xl:flex-col">
      <div className="flex w-full flex-col gap-[1em] xl:w-1/2">
        <h2 className="m-0">{title}</h2>
        <p className="text-justify text-cosmo-xs xs:text-cosmo-s xl:text-cosmo-m">{description}</p>
      </div>
      <div className="relative w-full rounded-[10px] select-none xl:w-[45%]">
        <Slider images={aboutUsSlides} emptyText={emptySliderText} />
      </div>
    </div>
  );
}
