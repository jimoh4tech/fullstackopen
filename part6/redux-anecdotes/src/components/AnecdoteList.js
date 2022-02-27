import { useDispatch, useSelector } from "react-redux"
import  { voteOf } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleVote}) => {
    return(
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
    // The map call allows the me get rid of the READ_ONLY property of the array Objects
    const anecdotes = useSelector(state => {
        const filter = state.filter
        const currentAnecdotes = state.anecdotes
        if(!filter)
            return currentAnecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.includes(filter))
        }).map(anecdote => anecdote)


    const dispatch = useDispatch()
    const sortAnecdotes = (a, b) => b.votes - a.votes

    return(
        <div>
            {anecdotes.sort(sortAnecdotes).map(anecdote => 
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() =>  {
                    dispatch(voteOf(anecdote))
                    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
                }}
                />
            )}
        </div>
    )
}

export default AnecdoteList