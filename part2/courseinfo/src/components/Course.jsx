import React from "react";

const Header = (props) => {
    return <h2>{props.course}</h2>
}
  
  const Part = (props) => {
    return <p>{props.part} {props.exercise}</p>
  }
  
  const Content = ({parts}) => {
    return (
      <div>
          {
          parts.map((part) => 
            <Part key={part.id} part={part.name} exercise={part.exercises} />
            // console.log(part.id, part.exercises, part.name)
            )
            }
      </div>
    )
  }
  
  const Total = ({parts}) => {
    return <h4>total of {parts.reduce((p, c) => p + c.exercises, 0)}  exercises</h4>
  }

  const Course = ({course}) => {

    return (
        <div>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )
  }

  export default Course;