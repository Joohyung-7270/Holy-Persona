import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalityState {
  currentQuestion: number;
  answers: Record<number, number>;
  isComplete: boolean;
  result: string | null;
}

const initialState: PersonalityState = {
  currentQuestion: 0,
  answers: {},
  isComplete: false,
  result: null,
};

const personalitySlice = createSlice({
  name: 'personality',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionIndex: number; answerIndex: number }>) => {
      const { questionIndex, answerIndex } = action.payload;
      state.answers[questionIndex] = answerIndex;
    },
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    resetQuiz: (state) => {
      state.currentQuestion = 0;
      state.answers = {};
      state.isComplete = false;
      state.result = null;
    },
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
    },
    setResult: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },
  },
});

export const { setAnswer, nextQuestion, resetQuiz, setComplete, setResult } = personalitySlice.actions;
export default personalitySlice.reducer; 