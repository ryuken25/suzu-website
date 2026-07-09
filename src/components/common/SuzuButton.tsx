'use client';

import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  withArrow?: boolean;
  asChild?: boolean;
};

export function SuzuButton({
  className,
  variant = 'primary',
  withArrow,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(variant === 'primary' ? 'suzu-btn-primary' : 'suzu-btn-secondary', className)}
      {...props}
    >
      {children}
      {withArrow ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
    </button>
  );
}
