import { useState  } from 'react'
import { useNavigate } from 'react-router-dom'

const Form = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    let newErrors = {}

    if (!form.firstName) newErrors.firstName = 'First Name is required'
    if (!form.lastName) newErrors.lastName = 'Last Name is required'
    if (!form.username) newErrors.username = 'Username is required'
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.password) newErrors.password = 'Password is required'
    if (!form.phoneNo) newErrors.phoneNo = 'Phone Number is required'
    if (!form.country) newErrors.country = 'Country is required'
    if (!form.city) newErrors.city = 'City is required'
    if (!form.panNo) newErrors.panNo = 'PAN No. is required'
    if (!form.aadharNo) newErrors.aadharNo = 'Aadhar No. is required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      navigate('/success', { state: { form } })
    }
  }

  const navigateToToDoList= (e)=>{
    e.preventDefault()
    navigate('/ToDoList')
  }

  const navigateToDashboard= (e)=>{
    e.preventDefault()
    navigate('/AdminDashboard')
  }

  return (
    <div className="container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} />
          {errors.username && <span>{errors.username}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label>Phone No.:</label>
          <input type="text" name="phoneNo" value={form.phoneNo} onChange={handleChange} />
          {errors.phoneNo && <span>{errors.phoneNo}</span>}
        </div>
        <div>
          <label>Country:</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
          {errors.country && <span>{errors.country}</span>}
        </div>
        <div>
          <label>City:</label>
          <select name="city" value={form.city} onChange={handleChange}>
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="New York">New York</option>
          </select>
          {errors.city && <span>{errors.city}</span>}
        </div>
        <div>
          <label>PAN No.:</label>
          <input type="text" name="panNo" value={form.panNo} onChange={handleChange} />
          {errors.panNo && <span>{errors.panNo}</span>}
        </div>
        <div>
          <label>Aadhar No.:</label>
          <input type="text" name="aadharNo" value={form.aadharNo} onChange={handleChange} />
          {errors.aadharNo && <span>{errors.aadharNo}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>

      <button type='button' onClick={navigateToToDoList}>GO TO TODO LIST</button>
      <br></br>
      <button type='button' onClick={navigateToDashboard}>ADMIN DASHBOARD</button>
    </div>
  )
}

export default Form
