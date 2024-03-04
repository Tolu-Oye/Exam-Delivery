
import '../App.css';
import React from 'react';

// const num = 0;

const Question = ({ question, onOptionChange, index, submitted }) => {
  return (
    <div className="container mt-4">
      <p className="font-weight-bold">{`${index + 1}. ${question.questionText}`}</p>
      <div className="options">
        <label className={`option ${question.selectedOption === 'A' ? 'selected' : ''} ${submitted && question.correctOption === 'A' ? 'correct' : ''} ${submitted ? 'disabled' : ''}`}>
          <input
            type="radio"
            name={`question_${index}`}
            value="A"
            onChange={() => onOptionChange(question.id, 'A')}
            disabled={submitted}
          />
          {question.optionA}
        </label>
        <label className={`option ${question.selectedOption === 'B' ? 'selected' : ''} ${submitted && question.correctOption === 'B' ? 'correct' : ''} ${submitted ? 'disabled' : ''}`}>
          <input
            type="radio"
            name={`question_${index}`}
            value="B"
            onChange={() => onOptionChange(question.id, 'B')}
            disabled={submitted}
          />
          {question.optionB}
        </label>
      </div>
    </div>
  );
};

export default Question;

// const Question = ({ question, onOptionChange, index, submitted }) => {
//   return (
//     <div className="container mt-4">
//       <p className="font-weight-bold">{`${index + 1}. ${question.questionText}`}</p>
//       <div className="options">
//         <label className={`option ${question.selectedOption === 'A' ? 'selected' : ''} ${submitted && question.correctOption === 'A' ? 'correct' : ''}`}>
//           <input
//             type="radio"
//             name={`question_${index}`}
//             value="A"
//             onChange={() => onOptionChange(question.id, 'A')}
//             disabled={submitted}
//           />
//           {question.optionA}
//         </label>
//         <label className={`option ${question.selectedOption === 'B' ? 'selected' : ''} ${submitted && question.correctOption === 'B' ? 'correct' : ''}`}>
//           <input
//             type="radio"
//             name={`question_${index}`}
//             value="B"
//             onChange={() => onOptionChange(question.id, 'B')}
//             disabled={submitted}
//           />
//           {question.optionB}
//         </label>
//       </div>
//     </div>
//   );
// };

// export default Question;