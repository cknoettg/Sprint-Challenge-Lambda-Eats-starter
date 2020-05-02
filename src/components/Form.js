import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from "yup";

const Form = (props) => {

    console.log(props);

    //state for our Pizza form
    const [pizza, setPizza] = useState({
        name: "",
        size: "",
        topping1: "",
        topping2: "",
        topping3: "",
        topping4: "",
        special_instructions: ""
    });

    //state for our post request
    const [post, setPost] = useState([]);

    //state for our Button state
    const [buttonDisabled, setButtonDisabled] = useState(true);

    //state for our errors
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        topping1: "",
        topping2: "",
        topping3: "",
        topping4: "",
        special_instructions: ""
    });

}

export default Form;