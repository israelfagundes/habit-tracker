import { Check } from 'phosphor-react';
import { Checkbox } from '../Checkbox';
import { useNewHabitForm } from './useNewHabitForm';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export default function NewHabitForm() {
  const { handleTitleChange, handleToggleWeekDay, handleSubmit, title, weekDays } = useNewHabitForm();

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col mt-6">
      <label className="font-semibold leading-tight" htmlFor="title">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        value={title}
        onChange={handleTitleChange}
      />

      <label className="font-semibold leading-tight mt-4" htmlFor="title">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            light
            onCheckedChange={() => handleToggleWeekDay(index)}
            checked={weekDays.includes(index)}
            ringOffsetColor="zinc-900"
          >
            {weekDay}
          </Checkbox>
        ))}
      </div>

      <button
        type="submit"
        className={`
          mt-6
          rounded-lg
          p-4
          flex
          items-center
          justify-center
          gap-3 font-semibold
          bg-green-600
          transition-colors
          hover:bg-green-500
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          focus:ring-offset-2
          focus:ring-offset-zinc-900
        `}
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
