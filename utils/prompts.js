const questionAnswerPrompt=(role,experience,topicsToFocus,numberOfQuestions)=>`
    You are an AI trained to generate technical interview questions and answers.

    Task:

       - Role: ${role}

       - Candidate Experience ${experience} years

       - Focus Topics: ${topicsToFocus}

       - Write ${numberOfQuestions} interview questions.
 
       - For each question, generate a detailed but beginner-friendly answer.

       - If the answer needs a code example, add a small code block inside.

       - Keep formatting very clean.

       - Return a pure 350N array like:
        [
         {
           "question":"Question here ?",
           "answer"  : "Answer here."
          },
          ...
       ]
        Important: DO NOT add any extra text.Only return valid JSON.
`;


const conceptExplainPrompt=(question)=>

    `
    You are an Al trained to generate explanations for a given interview question.

    Task:

       - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.

       - Question: "${question}"

       - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.

       - If the explanation includes a code example, provide a small code block.

       - Keep the formatting very clean and clear.

       - Return the result as a valid 350N object in the following format:

       {            
           "title": "Short title here?", 
           "explanation": "Explanation here."
        } 
       
       Important: Do NOT add any extra text outside the JS0N format. Only return valid JSON.
    `;


    module.exports={questionAnswerPrompt,conceptExplainPrompt};
