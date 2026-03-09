import React, { useState } from 'react';
import './FormValidation.css';

const FormValidation = () => {
  const [form, setForm] = useState({email: '', pwd: ''});
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    let err = {};
    if (!form.email.includes('@')) err.email = 'Invalid email';
    if (form.pwd.length < 6) err.pwd = 'Password must be 6+ chars';
    setErrors(err);
    if(Object.keys(err).length === 0) alert('Submitted!');
  };

  return (
    <form className="formvalidation-container" onSubmit={submit}>
      <h2>Form Validation</h2>
      <div>
        <input type="text" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        {errors.email && <span className="err">{errors.email}</span>}
      </div>
      <div>
        <input type="password" placeholder="Password" value={form.pwd} onChange={e => setForm({...form, pwd: e.target.value})} />
        {errors.pwd && <span className="err">{errors.pwd}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
export default FormValidation;
