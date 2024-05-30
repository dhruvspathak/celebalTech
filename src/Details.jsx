import { useLocation, Link } from 'react-router-dom'

const Details = () => {
  const location = useLocation()
  const { form } = location.state || {}

  return (
    <div className="container">
      <h1>Form Submitted Successfully!</h1>
      {form ? (
        <div>
          <p><strong>First Name:</strong> {form.firstName}</p>
          <p><strong>Last Name:</strong> {form.lastName}</p>
          <p><strong>Username:</strong> {form.username}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Phone No.:</strong> {form.phoneNo}</p>
          <p><strong>Country:</strong> {form.country}</p>
          <p><strong>City:</strong> {form.city}</p>
          <p><strong>PAN No.:</strong> {form.panNo}</p>
          <p><strong>Aadhar No.:</strong> {form.aadharNo}</p>
        </div>
      ) : (
        <p>No form data available.</p>
      )}
      <Link to="/">Go Back</Link>
      <br></br>
      <Link to='/ToDoList'>Open ToDo</Link>
    </div>
  )
}

export default Details
