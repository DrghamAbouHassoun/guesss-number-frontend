"use client";
import { handleStartRound } from '@/lib/features/gameSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Button, Label, RangeSlider, TextInput } from 'flowbite-react';
import React, { FormEvent, useState } from 'react'
import CounterInput from '../CounterInput';

const BiddingForm = () => {
  const { currentPoints, isGameEnded, roundSpeed, isRoundStarted } = useAppSelector((state: RootState) => state.game)
  const dispatch = useAppDispatch();

  const [biddingPoints, setBiddingPoints] = useState<number>(0);
  const [biddingMultiplier, setBiddingMultiplier] = useState<number>(1.0);
  const [selectedRoundSpeed, setSelectedRoundSpeed] = useState<string>(roundSpeed?.toString())

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (biddingPoints > currentPoints) {
      alert("You don't have enough points to bid");
      return;
    }
    dispatch(handleStartRound({ points: biddingPoints, multiplier: biddingMultiplier, roundSpeed: parseInt(selectedRoundSpeed) }));
    setBiddingMultiplier(1);
    setBiddingPoints(0);
  }

  return (
    <form className="p-4 bg-gray-800 rounded-md" onSubmit={handleSubmit}>
      <div className="max-w-[400px] mx-auto">
        <div className="my-3">
          <Label htmlFor='biddingPoints' className='text-white'>Points:</Label>
          <CounterInput
            value={biddingPoints}
            onChange={(value) => setBiddingPoints(value)}
            max={currentPoints}
            min={0}
            increaseValue={10}
          />
        </div>
        <div className="my-3">
          <Label htmlFor='biddingMultiplier' className='text-white'>Multiplier:</Label>
          <CounterInput
            value={biddingMultiplier}
            onChange={(value) => setBiddingMultiplier(value)}
            max={10}
            min={1}
            increaseValue={0.1}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="default-range" value={`Speed of Round: ${selectedRoundSpeed}x`} />
          </div>
          <RangeSlider 
            id="default-range" 
            value={selectedRoundSpeed} 
            onChange={(e) => setSelectedRoundSpeed(e.target.value)} 
            min={1}
            max={5}
            className='text-cyan-600'
            disabled={isRoundStarted}
          />
        </div>
        <Button type='submit' fullSized className='my-3' disabled={isGameEnded || isRoundStarted}>Set a Bid</Button>
      </div>
    </form>
  )
}

export default BiddingForm