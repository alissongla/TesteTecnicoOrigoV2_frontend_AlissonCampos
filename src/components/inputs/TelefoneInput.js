import React from "react";
import InputMask from "react-input-mask";


export default function TelefoneInput(props) {
    return (
        <InputMask mask="(99) 9999-9999"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={props.className}
            type={props.type}
        />
    );
}