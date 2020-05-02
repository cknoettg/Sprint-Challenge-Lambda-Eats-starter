import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from "yup";

//Yup validation - formSchema
//only name and size are required
const formSchema = Yup.object().shape({
    name: Yup
      .string()
      .required("Name is required."),
    size: Yup
      .string()
      .required("Size is Required"),
    //TODO: form only validates if there is an
    //  attempt to check all four
    topping1: Yup
      .boolean(),
    topping2: Yup
      .boolean(),
    topping3: Yup
      .boolean(),
    topping4: Yup
      .boolean(),
    special_instructions: Yup
      .string()
  });

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

    //submit button function
    const formSubmit = e => {
        e.preventDefault();
        console.log("submitted");

        //add our POST request
        axios
        .post("https://reqres.in/api/users", pizza)
        .then(res => {
            setPost(res.data); // get just the form data from the REST api
            console.log("success", res);

        //reset Pizza state
        setPizza({
        name: "",
        size: "",
        topping1: "",
        topping2: "",
        topping3: "",
        topping4: "",
        special_instructions: ""
        });
    })
    .catch(err => console.log(err.res));  
   }; //end of formSubmit
 
   //enable button if form is valid
   useEffect(() => {
        formSchema.isValid(pizza).then(valid => {
        setButtonDisabled(!valid);
        });
   }, [pizza]);

  //function to track state changes
  const inputChange = e => {
    e.persist();

    Yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });

      const newFormData = {
        ...pizza,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value
      };
      
      setPizza(newFormData);
    }; //end of inputChange

}

export default Form;