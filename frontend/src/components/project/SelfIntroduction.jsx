
const SelfIntroduction = ({id, name, placeholder, onChange}) => {
    return (
        <textarea className="w-full h-20 resize-none p-2 focus:outline-none" id={id} name={name}
                  placeholder={placeholder} onChange={onChange} cols="30" rows="10">
        </textarea>
    );
}

export default SelfIntroduction;