type Props = {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  min?: number;
  max?: number;
};

export default function Input({ label, name, value, onChange, min = 0, max = 100 }: Props) {
  const handlePlus = () => {
    if (value < max) {
      onChange(name, value + 1);
    }
  };

  const handleMinus = () => {
    if (value > min) {
      onChange(name, value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === '') {
      onChange(name, 0);
      return;
    }

    const numericValue = parseInt(newValue, 10);

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(numericValue, min), max);
      onChange(name, clampedValue);
    }
  };

  return (
    <div className="flex text-center flex-col text-white">
      <label>{label}</label>
      <div className="flex items-center gap-1">
        <button type="button" onClick={handleMinus} className="px-2 bg-gray-600 rounded text-white">
          -
        </button>
        <input
          type="text"
          name={name}
          value={value === 0 ? '' : value}
          onChange={handleInputChange}
          className="w-20 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 text-center 
                     appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button type="button" onClick={handlePlus} className="px-2 bg-gray-600 rounded text-white">
          +
        </button>
      </div>
    </div>
  );
}
