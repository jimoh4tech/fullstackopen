import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from './queries'

const Recommendation = (props) => {

  const result = useQuery(ALL_BOOKS)
  const user = useQuery(GET_USER)
  
  if (!props.show) {
    return null
  }
  
  if (!result.data) {
    return (<div>loading...</div>)
  }
  const genre = user.data.me.favoriteGenre
  const books = result.data.allBooks.filter(book => book.genres.includes(genre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendation