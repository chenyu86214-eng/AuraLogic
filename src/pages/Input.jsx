import BirthInput from '../components/BirthInput/BirthInput';

export default function Input({ onSubmit, initialData }) {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-6">
      <BirthInput onSubmit={onSubmit} initialData={initialData} />
    </div>
  );
}
