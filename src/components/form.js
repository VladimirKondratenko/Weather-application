import React from "react";

const Form = props => (
  <form onSubmit={props.weatherMethod}>
    <input type="radio" value="option1" checked={false} /> BLBALA
    <input type="radio" value="option1" checked={false}/> BLBALA2
    <input type="text" name="city" placeholder="What is your city?"/>
    <button>Watch the weather</button>
    
  </form>
)

// class Form extends React.Component {
//     render() {
//         return (
//           <form onSubmit={this.props.weatherMethod}>
//               <input type="text" name="city" placeholder="Город"/>
//               <button>Посмотреть погоду</button>
//           </form>
//         );
//     }
// }

export default Form;
