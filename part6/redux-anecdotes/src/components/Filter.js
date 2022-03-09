import { connect } from "react-redux"
import { showFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        const content = event.target.value
        props.showFilter(content)
        
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style} >
            filter <input onChange={handleChange} />
        </div>
    )
}


export default connect(null, { showFilter })(Filter)