import BirthInput from '../components/BirthInput/BirthInput';

export default function Input({ onSubmit, initialData }) {
  return <BirthInput onSubmit={onSubmit} initialData={initialData} />;
}
