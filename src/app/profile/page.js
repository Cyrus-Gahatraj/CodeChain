"use client";

import { useState } from "react";
import AddButton from "@/components/AddButton";
import ProfileContainer from "@/components/ProfileContainer";
import QuestionModal from "@/components/modal/QuestionModal"; // We'll create this

export default function Home() {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const openQuestionModal = () => setIsQuestionModalOpen(true);
  const closeQuestionModal = () => setIsQuestionModalOpen(false);

  const handlePostQuestion = (questionData) => {
   
    console.log("New Question to post:", questionData);
    // Example:
    // if (questionData.type === 'text') {
    //   console.log("Text content:", questionData.content);
    // } else if (questionData.type === 'image') {
    //   console.log("Image file:", questionData.file);
    //   console.log("Image description:", questionData.description);
    // }
    closeQuestionModal(); // Close modal after submission
  };

  return (
    <>
      <ProfileContainer>
        Questions
        {/* Your existing content for questions will go here */}
      </ProfileContainer>
        
      <AddButton onClick={openQuestionModal} /> {/* Pass onClick handler */}

      {isQuestionModalOpen && (
        <QuestionModal 
          onClose={closeQuestionModal} 
          onPost={handlePostQuestion} 
        />
      )}
    </>
  );
}