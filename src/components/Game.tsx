"use client";
import React, { useEffect, useState } from 'react';

import Chart from './Chart';
import Layout from './Layout';
import BiddingForm from './Forms/BiddingForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { handleEndGame, handleEndRound } from '@/lib/features/gameSlice';
import RegisterForm from './Forms/RegisterForm';
import BiddersTable from './BiddersTable';
import Chat from './Chat';
import { FaMedal, FaUserAlt } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import ResultsModal from './ResultsModal';
import { handleToggleModal } from '@/lib/features/modalSlice';
import { Button } from 'flowbite-react';

const Game = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { currentPoints, roundSpeed, isRoundStarted, randomPoint, currentRound, isGameEnded } = useAppSelector((state: RootState) => state.game);
  const { status } = useAppSelector((state: RootState) => state.auth);

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (isRoundStarted) {
      const intervelSpeed = 120 - (roundSpeed * 20)
      if (count >= randomPoint) {
        dispatch(handleEndRound());
        setCount(1);
        return;
      }

      const intervel = setInterval(() => {
        setCount(prev => Math.round((prev + 0.1) * 100) / 100);
      }, intervelSpeed)
      return () => clearInterval(intervel);
    }
  }, [count, isRoundStarted, randomPoint]);

  useEffect(() => {
    if (currentRound >= 4) {
      dispatch(handleEndGame());
      dispatch(handleToggleModal(true))
    }
  }, [currentRound]);

  return (
    <Layout>
      <ResultsModal />
      {status === "authenticated" ?
        <>
        <div>
          {isGameEnded ? <Button className='my-5' onClick={() => dispatch(handleToggleModal(true))}>Show Results</Button> : null}
        </div>
        <div className="flex items-center gap-5 mb-5">
          <div className="flex-1 bg-slate-600 flex items-center gap-3 justify-center p-3 rounded-md">
            <FaMedal className="text-yellow-300" size={24} />
            {currentPoints}
          </div>
          <div className="flex-1 bg-slate-600 flex items-center gap-3 justify-center p-3 rounded-md">
            <FaUserAlt className="text-teal-400" size={24} />
            {user?.name || "Unknown"}
          </div>
          <div className="flex-1 bg-slate-600 flex items-center gap-3 justify-center p-3 rounded-md">
            <IoGameController className="text-green-500" size={24} />
            {currentRound} / 4
          </div>
        </div>
          <div className='grid grid-cols-2 gap-5'>
            <BiddingForm />
            <Chart value={isRoundStarted || randomPoint === 10 ? count : randomPoint} />
            {/* <h3>Current Poinst: {currentPoints}</h3> */}
            {/* <BiddingsTable /> */}
            <BiddersTable />
            <Chat />
          </div>
        </> :
        <RegisterForm />
      }
    </Layout>
  )
}

export default Game