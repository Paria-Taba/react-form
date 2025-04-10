import { useState } from "react";
import "../components/Form.css"
import Joi from "joi"

const schema = Joi.object({
	name: Joi.string().min(3).max(10).required(),
	lastName: Joi.string().min(3).required().max(20),
	email: Joi.string().email({ tlds: { allow: false } }).required()
  });
  
function Form(){
	const [data,setData]=useState({
		name:"",
		lastName:"",
		email:""
	})
	const message={
		name:"",
		lastName:"",
		email:""
	}
	const css={
		name:"",
		lastName:"",
		email:""
	}
	const [focus,setFocus]=useState({
		name:false,
		lastName:false,
		email:false
	})
	const result=schema.validate(data)
	console.log(result);

	if(result.error){
		result.error.details.forEach(item=>{
			const field=item.context.key
			if(focus[field]){
				if(field==="name"){
					message.name="please write your name between 3 and 10"
					css.name="invalid"
			}
			if(field==="lastName"){
				message.lastName="please write your lastname between 3 and 20"
				css.lastName="invalid"

		}
		if(field==="email"){
			message.email="please write your email in right form"
			css.email="invalid"

	}
			}
			
		})
	}
	const formValid=!result.error
	if(!result.error){
		css.name="valid",
		css.lastName="valid",
		css.email="valid"
	}

	return(
		<div>
					<h1>react-form</h1>
					<div className="form">
						<label htmlFor="firstName">FirstName:</label>
						<input type="text" id="firstName" placeholder="Name" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} onBlur={()=>setFocus({...focus,name:true})} className={css.name}/>
						<p className="error">{message.name}</p>

						<label htmlFor="lastname">LastName:</label>
						<input type="text" id="lastname" placeholder="lastname" value={data.lastName} onChange={(e)=>setData({...data,lastName:e.target.value})} onBlur={()=>setFocus({...focus,lastName:true})} className={css.lastName}/>
						<p className="error">{message.lastName}</p>

						<label htmlFor="email">Email:</label>
						<input type="text" id="email" placeholder="e-mail" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} onBlur={()=>setFocus({...focus,email:true})} className={css.email}/>
						<p className="error">{message.email}</p>
<label htmlFor="role">Select role:</label>
						<select id="role">
							<option value="man">Man</option>
							<option value="woman">Woman</option>
						</select>
						<button disabled={!formValid}>Submit</button>


					</div>

		</div>
	)
}
export default Form