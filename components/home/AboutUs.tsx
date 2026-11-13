import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/common/Container';
import { Slider } from '@/components/common/Slider';
import { Button } from '@/components/ui/button';
import { aboutUsSlides } from '@/lib/data/site';

interface AboutUsProps {
  title: string;
  description: string;
  teamLabel: string;
  emptySliderText: string;
}

export function AboutUs({ title, description, teamLabel, emptySliderText }: AboutUsProps) {
  return (
    <Section className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <p className="leading-relaxed text-muted-foreground">{description}</p>
        <Button asChild variant="outline" size="lg">
          <Link href="/team">
            {teamLabel}
            <ArrowRight />
          </Link>
        </Button>
      </div>
      <Slider images={aboutUsSlides} emptyText={emptySliderText} />
    </Section>
  );
}
