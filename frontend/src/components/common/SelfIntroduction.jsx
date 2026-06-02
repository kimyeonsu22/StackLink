
const SelfIntroduction = ({id, name, placeholder, onChange}) => {
    return (
        <textarea className="flex flex-col gap-1" id={id} name={name}
                  placeholder={placeholder} onChange={onChange} cols="30" rows="10">

        </textarea>
    );
}

export default SelfIntroduction;