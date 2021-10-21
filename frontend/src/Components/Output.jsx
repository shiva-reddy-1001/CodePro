import React from "react";

const Output = (props) => {
    
    return (
        <div className="output">
        <iframe title="Output" srcDoc={props.code} width="100%" height="100%"></iframe>
        </div>
    );
}

export default Output;