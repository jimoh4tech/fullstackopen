import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = () => {

  const users = useSelector(state => state.users)
  console.log(users)
  return(
    <div>
      <h2>Users</h2>
      <h4>blogs created</h4>
      {users.map(user =>
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>  {user.blogs.length}
        </div>
      )}
    </div>
  )
}

export default Users