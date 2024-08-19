import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taixiu: "",
  arrDice: [
    {
      id: 1,
      img: "./img/1.png",
    },
    {
      id: 1,
      img: "./img/1.png",
    },
    {
      id: 1,
      img: "./img/1.png",
    },
  ],
  totalWin: 0,
  totalPlays: 0,
};

const xucxacSlice = createSlice({
  name: "xucxac",
  initialState,
  reducers: {
    betting(state, action) {
      state.taixiu = action.payload;
    },
    playGame(state, action) {
      //B1 xử lý random xúc xắc
      let arrDiceRandom = [];
      for (let i = 0; i < 3; i++) {
        //Mỗi lần lặp sẽ random 1 số từ 1 -> 6
        let randomNumber = Math.ceil(Math.random() * 6);
        //Tạo  1 object random
        let randomDice = {
          id: randomNumber,
          img: `./img/${randomNumber}.png`,
        };
        //push vào mảng xúc xắc ngẫu nhiên
        arrDiceRandom.push(randomDice);
      }
      state.arrDice = arrDiceRandom;
      //Xử lý tổng bàn chơi
      state.totalPlays += 1;
      //Xử lý bàn thắng
      let totalScore = arrDiceRandom.reduce((acc,curr) => acc + curr.id ,0)
      if((totalScore > 10 && state.taixiu === 'Tài') || (totalScore <= 10 && state.taixiu === 'Xỉu')) {
        state.totalWin += 1
      }
    },
  },
});

export const { betting, playGame } = xucxacSlice.actions;
export default xucxacSlice.reducer;
