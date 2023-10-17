import LayoutNoHeader from '../../components/Layout/LayoutNoHeader';
import Register from '../../components/Register';

export default function LogInHome() {
  return (
    <LayoutNoHeader>
      <section>
        <h1>Your SheLovesPlants Konto </h1>
        <Register />
      </section>
    </LayoutNoHeader>
  );
}
