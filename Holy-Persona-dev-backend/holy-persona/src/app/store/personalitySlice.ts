import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalityState {
  type: string | null;
  answers: Array<{
    questionId: string;
    optionId: string;
  }> | null;
}

const initialState: PersonalityState = {
  type: null,
  answers: null,
};

const personalitySlice = createSlice({
  name: 'personality',
  initialState,
  reducers: {
    setPersonalityType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setAnswers: (state, action: PayloadAction<Array<{ questionId: string; optionId: string }>>) => {
      state.answers = action.payload;
    },
    clearPersonality: (state) => {
      return initialState;
    },
  },
});

export const { setPersonalityType, setAnswers, clearPersonality } = personalitySlice.actions;
export default personalitySlice.reducer; 