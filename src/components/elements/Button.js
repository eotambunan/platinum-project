const Button = ({type,target,onClick,children}) => {

    return (
        <>
        {type ==="Api" && <button onClick={onClick} type="button" className="btn btn-primary">{children}</button>}
        {type ==="Modal" && <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={target}>{children}</button>}            
        </>
    );
};

export default Button
