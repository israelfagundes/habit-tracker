import NewHabitDialog from '../NewHabitDialog';
import logo from '../../assets/logo.svg';

export default function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logo} alt="Habits" />

      <NewHabitDialog />
    </div>
  );
}
