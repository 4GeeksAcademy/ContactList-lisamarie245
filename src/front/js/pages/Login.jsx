import React, { useState } from "react";  // 1 importar react y hooks


// 5 y 2
export const Login = () => {
  // 3.1 Defino los estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [example, setExample] = useState('');
  const [select, setSelect] = useState('1')
  const [checkMe, setCheckMe] = useState(false);
  
  const handleEmail = (event) => {
    // console.log(event)
    // console.log(event.target)
    // console.log(event.target.value)
    setEmail(event.target.value)
  }
  const handlePassword = (event) => { setPassword(event.target.value) };
  const handleCheckMe = (event) => { setCheckMe(event.target.checked) };
  const handleExample = (event) => { setExample(event.target.value) };
  const handleSelect = (event) => { setSelect(event.target.value)};

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setExample('');
    setSelect('1');
    setCheckMe(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();  // 1.- Siempre primera línea de un submit
    /* const dataToSend = {
      email: email,
      password: password,
      description: example,
      country: select,
      accept: checkMe
    } */
    const dataToSend = {email, password, description: example}
    // lógica que debería lanzar el formulario
    //     talvez redirigir a error o dasboard 
    console.log(dataToSend);
  }

  
  // 4
  return (
    <div className="container col-4 mt-5 mb-5 rounded vh-0 p-5">
      <h1 className="text-primary text-center p-3">Welcome Back!</h1>
      <p className="text-light text-center">Log in to continue</p>
       <form onSubmit={handleSubmit} className="text-start">
        <div className="mb-3  justify-content-center">
         <div><label htmlFor="exampleInputEmail1" className="form-label text-light col-6">Email address</label></div> 
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            value={email} onChange={handleEmail} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
            value={password} onChange={handlePassword} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"
            checked={checkMe} onChange={handleCheckMe} />
          <label className="form-check-label text-light" htmlFor="exampleCheck1">Remember me</label>
        </div>
        <div className="text-center mb-5 p-5">
        <button type="submit" className="btn btn-primary text-center col-12 m-2">Log in</button>
        <button onClick={handleReset} type="reset" className="btn btn-secondary ms-2 col-12">Reset</button>
        </div>
      </form>
    </div>
  )
}

