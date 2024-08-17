import randomNumberGenerator, {
  generateRandomNumber,
} from "@/helpers/randomNumberGenerator";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  roundSpeed: number;
  randomPoint: number;
  currentPoints: number;
  biddingPoints: number;
  biddingMultiplier: number;
  isRoundStarted: boolean;
  records: {
    biddingPoints: number;
    result: number;
  }[];
  botPlayers: {
    name: string;
    biddingMultiplier: number;
    points: number;
    biddingPoints: number;
  }[];
  currentRound: number;
  isGameEnded: boolean;
}

const initialState: InitialState = {
  roundSpeed: 1,
  currentRound: 0,
  randomPoint: 10,
  currentPoints: 400,
  biddingMultiplier: 0,
  biddingPoints: 0,
  isRoundStarted: false,
  isGameEnded: false,
  records: [],
  botPlayers: [
    {
      name: "CPU 1",
      points: 400,
      biddingPoints: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 2",
      points: 400,
      biddingPoints: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 3",
      points: 400,
      biddingPoints: 0,
      biddingMultiplier: 1,
    },
    {
      name: "CPU 4",
      points: 400,
      biddingPoints: 0,
      biddingMultiplier: 1,
    },
  ],
};

export const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    handleChangeCurrentPoinst: (state, action: PayloadAction<number>) => {
      state.currentPoints = action.payload;
    },
    handleChangeBiddingPoints: (state, action: PayloadAction<number>) => {
      state.biddingPoints = action.payload;
    },
    handleChangeBiddingMultiplier: (state, action: PayloadAction<number>) => {
      state.biddingMultiplier = action.payload;
    },
    handleStartRound: (
      state,
      action: PayloadAction<{ points: number; multiplier: number, roundSpeed: number }>
    ) => {
      state.botPlayers = state.botPlayers.map((item) => {
        if (item.points > 50) {
          return {
            ...item,
            biddingMultiplier: randomNumberGenerator(),
            biddingPoints: generateRandomNumber(item.points),
          };
        } else if (item.points <= 50 && item.points > 0) {
          return {
            ...item,
            biddingMultiplier: randomNumberGenerator(),
            biddingPoints: item.points,
          };
        } else {
          return {...item, biddingMultiplier: 0, biddingPoints: 0 };
        }
      });
      state.roundSpeed = action.payload.roundSpeed;
      state.randomPoint = randomNumberGenerator();
      state.biddingMultiplier = action.payload.multiplier;
      state.biddingPoints = action.payload.points;
      state.isRoundStarted = true;
    },
    handleEndRound: (state) => {
      state.isRoundStarted = false;
      state.botPlayers = state.botPlayers.map((item) => {
        if (item.biddingMultiplier <= state.randomPoint) {
          return {
            ...item,
            points: item.points + Math.round(item.biddingPoints * item.biddingMultiplier * 100) / 100,
          };
        } else {
          return {
            ...item,
            points: item.points - item.biddingPoints,
          };
        }
      });
      if (state.biddingMultiplier <= state.randomPoint) {
        state.currentPoints += Math.round(state.biddingPoints * state.biddingMultiplier * 100) / 100;
        state.records.push({
          biddingPoints: state.biddingPoints,
          result: Math.round(state.biddingPoints * state.biddingMultiplier * 100) / 100,
        });
      } else {
        state.currentPoints -= state.biddingPoints;
        state.records.push({
          biddingPoints: state.biddingPoints,
          result: -state.biddingPoints,
        });
      }
      state.currentRound += 1;
    },
    handleEndGame: (state) => {
      state.isGameEnded = true;
    },
    handleRestartGame: (state) => {
      state.biddingMultiplier = initialState.biddingMultiplier;
      state.biddingPoints = initialState.biddingPoints;
      state.botPlayers = initialState.botPlayers;
      state.isGameEnded = initialState.isGameEnded;
      state.currentPoints = initialState.currentPoints;
      state.isRoundStarted = initialState.isRoundStarted;
      state.records = initialState.records;
      state.randomPoint = initialState.randomPoint;
      state.currentRound = initialState.currentRound;
    }
  },
});

export const {
  handleChangeBiddingMultiplier,
  handleChangeBiddingPoints,
  handleChangeCurrentPoinst,
  handleStartRound,
  handleEndRound,
  handleEndGame,
  handleRestartGame,
} = gameSlice.actions;

export default gameSlice.reducer;
