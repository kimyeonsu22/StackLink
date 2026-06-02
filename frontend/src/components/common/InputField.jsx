// input 필드 공통 컴포넌트로 사용

const InputField = ({ label, type = 'text', value, onChange, placeholder
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
      />
    </div>
  );
};

export default InputField;