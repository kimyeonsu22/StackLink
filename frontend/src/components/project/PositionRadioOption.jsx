// 포지션 선택 radio option component

const PositionRadioOption = ({name, id, value, selectedPositions, onChange, children}) => {
    return (
        <div className="flex justify-center items-center">
            <input type="radio" id={id} name={name} value={value}
            checked={selectedPositions.includes(value)}
            onChange={onChange}/>
            <label htmlFor={value}>{children}</label>
        </div>
    );
}

export default PositionRadioOption;

