
interface props{
    func: () => void;
}

function SubmitButton({func}: props){

    
    return(
        <button onClick={func}>
            Press me
        </button>
    )
    
}
export default SubmitButton

