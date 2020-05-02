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

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
              Name
              <input id="name" 
              type="text" 
              name="name" 
              value={pizza.name}
              onChange={inputChange} /> 
              {errors.name.length > 1 ? <p className="error">{errors.name}</p> : null}  
            </label><br></br>
            <label htmlFor="size">
                {/* size is going to be a select-option*/}
                Choice of Size<br></br>
                <select id="size" name="size" onChange={inputChange}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </label><br></br>
            {/* TODO: Can we handle toppings as array */}
            <label htmlFor="topping1">
              Add Toppings<br></br>
              Choose up to 4.<br></br>
              Pepperoni
              <input
              id="topping1"
              type="checkbox"
              name="topping1"
              value={pizza.topping1}
              onChange={inputChange} />
            </label><br></br>
            <label htmlFor="topping2">
              Ham
              <input
              id="topping2"
              type="checkbox"
              name="topping2"
              value={pizza.topping2}
              onChange={inputChange} />
            </label><br></br>
            <label htmlFor="topping3">
              Beef
              <input
              id="topping3"
              type="checkbox"
              name="topping3"
              value={pizza.topping3}
              onChange={inputChange} />
            </label><br></br>
            <label htmlFor="topping4">  
              Bacon
              <input
              id="topping4"
              type="checkbox"
              name="topping4"
              value={pizza.topping4}
              onChange={inputChange} />           
            </label><br></br>
            <label htmlFor="special_instructions">
              Special Instructions<br></br>
              <textarea 
              id="special_instructions"
              name="special_instructions"
              value={pizza.special_instructions}
              onChange={inputChange}
              />
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>        
            <button id="submitter" disabled={buttonDisabled}>Add to Order</button>
          </form>
    ); //end of return
    
} //end of Form

export default Form;