import CompareForm from "../components/CompareForm";

export default function ComparePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-white mb-3">What do you want to compare?</h1>
      <p className="text-gray-400 mb-10 max-w-md">Enter any two things and get an instant AI-powered breakdown.</p>
      <div className="w-full max-w-2xl">
        <CompareForm />
      </div>
    </div>
  );
}
