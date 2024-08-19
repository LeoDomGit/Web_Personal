import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betingList: [
    { id: "nai", img: "./img/nai.png", score: 0 },
    { id: "bau", img: "./img/bau.png", score: 0 },
    { id: "ga", img: "./img/ga.png", score: 0 },
    { id: "ca", img: "./img/ca.png", score: 0 },
    { id: "cua", img: "./img/cua.png", score: 0 },
    { id: "tom", img: "./img/tom.png", score: 0 },
  ],
  totalScore: 500,
  arrDice: [
    { id: "bau", img: "./img/bau.png" },
    { id: "bau", img: "./img/bau.png" },
    { id: "bau", img: "./img/bau.png" },
  ],
};

const bauCuaSlice = createSlice({
  name: "bauCua",
  initialState,
  reducers: {
    beting(state, action) {
      //Tìm trong Betinglist => quân cược nào được click sẽ tăng điẻm
      const betingListUpdate = [...state.betingList];
      const index = betingListUpdate.findIndex(
        (x) => x.id === action.payload.item.id
      );
      if (index !== -1) {
        if (action.payload.status === "plus") {
          //Tránh trường hợp âm
          if (state.totalScore > 0) {
            betingListUpdate[index].score += 100;
            state.totalScore -= 100;
          }
        } else if (action.payload.status === "minus") {
          //Tránh trường hợp âm
          if (betingListUpdate[index].score > 0) {
            betingListUpdate[index].score -= 100;
            state.totalScore += 100;
          }
        }
      }
      state.betingList = betingListUpdate;
    },
    playGame(state) {
      //Giai đoạn lắc xúc xắc
      const betingListUpdate = [];
      for (let i = 0; i < 3; i++) {
        //Mỗi lần lặp sẽ random 1 số từ 1 -> 6
        let randomNumber = Math.floor(Math.random() * 6);
        const randamDice = state.betingList[randomNumber];
        betingListUpdate.push(randamDice);
      }
      state.arrDice = betingListUpdate;

      //Xử lý điểm thưởng
      betingListUpdate.forEach((item,index) => {
        let indexBeting = state.betingList.findIndex(x => x.id === item.id)
        if (index !== -1) {
            state.totalScore += (state.betingList[indexBeting].score * 2)
        }
      })

      //Xử lý làm mới game 
      state.betingList = state.betingList.map((item,index) =>{
        return {...item, score : 0}
      })
    },
    playAgain (state) {
        state.totalScore = 500;
        state.betingList = state.betingList.map((item,index) =>{
            return {...item, score : 0}
        })
    }
  },
});

export const { beting, playGame , playAgain} = bauCuaSlice.actions;
export default bauCuaSlice.reducer;
