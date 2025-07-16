const Question=require('../models/Question')
const Session=require('../models/Session')


//decs- add additional question to an existing session
//route post/api/questions/add
//access-private

exports.addQuestionsToSession=async(req,res)=>{
      try{
        const {sessionId,questions}=req.body;
        if(!sessionId || !questions ||!Array.isArray(questions)){
            return res.status(400).json({message:"invalid input data"})
        }
        const session=await Session.findById(sessionId);

        if(!session){
            return res.status(404).json({message:"session not found"})
        }
        //create new questions 
        const createdQuestions=await Question.insertMany(
            questions.map((q)=>({
                session:sessionId,
                question : q.question,
                answer : q.answer
            }))
        );
        // update session include new question IDs
        session.questions.push(...createdQuestions.map((q)=>q._id));
        await session.save();
        res.status(201).json(createdQuestions);

    }catch(error){
        res.status(500).json({message:"server error"})
    }
}

//decs- pin or unpin a question
//route post/api/questions/:id/pin
//access-private

exports.togglePinQuestion=async (req,res)=>{
        try{
            const question=await Question.findById(req.params.id);
            if(!question){
                return res.status(404).json({success:false ,message:"Question not found"})
            }
            question.isPinned=!question.isPinned;
            await question.save();
            res.status(400).json({success:true,question})

        }catch(error){
        res.status(500).json({message:"server error"})
    }
}
//decs- update a note for a question
//route post/api/questions/:id/note
//access-private

exports.updateQuestionNote=async(req,res)=>{
    try{
             const {note}=req.body;
            const question=await Question.findById(req.params.id);
            if(!question){
                return res.status(404).json({success:false ,message:"Question not found"})
            }

            question.note=note || "";
            await question.save();
            res.status(400).json({success:true,question})

    }catch(error){
        res.status(500).json({message:"server error"})
    }
}
