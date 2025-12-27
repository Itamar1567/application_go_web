interface props{
    text: string;
}


function RequiredField({ text }: props){
    return(
        <p style={{color: "red", margin: 0, fontSize: "smaller"}}>{text}</p>
    );
}

export default RequiredField;