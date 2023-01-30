import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import clsx from 'clsx';

interface Props extends RadixCheckbox.CheckboxProps {
  children?: React.ReactNode;
  light?: boolean;
  ringOffsetColor?: string;
}

export function Checkbox({ children, light = false, ringOffsetColor = 'background', ...rest }: Props) {
  return (
    <RadixCheckbox.Root
      className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      {...rest}
    >
      <div
        className={clsx(
          `
          h-8
          w-8
          rounded-lg
          flex
          items-center
          justify-center
          bg-zinc-900
          border-2
          border-zinc-800
          group-data-[state=checked]:bg-green-500
          group-data-[state=checked]:border-green-500
          transition-colors
          group-focus:outline-none
          group-focus:ring-2
          group-focus:ring-violet-700
          group-focus:ring-offset-2
        `,
          {
            [`group-focus:ring-offset-${ringOffsetColor}`]: !!ringOffsetColor,
          },
        )}
      >
        <RadixCheckbox.Indicator>
          <Check size={20} className="text-white" weight="bold" />
        </RadixCheckbox.Indicator>
      </div>

      <span
        className={clsx('text-white leading-tight', {
          'font-semibold text-xl group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400':
            !light,
        })}
      >
        {children}
      </span>
    </RadixCheckbox.Root>
  );
}
