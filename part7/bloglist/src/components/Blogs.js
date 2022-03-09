import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogs }) => {

  return(
    <div>
      <Table striped>
        <tbody>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id} >
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )}
export default Blogs