// input 필드 공통 컴포넌트로 사용

const InputField = ({ label, type = 'text', name, value, onChange, placeholder, rightButton }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <div className="flex gap-2">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
        />
        {rightButton && rightButton}
      </div>
    </div>
  );
};

export default InputField;