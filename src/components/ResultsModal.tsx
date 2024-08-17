"use client";
import { handleToggleModal } from '@/lib/features/modalSlice';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Player } from '@/types/types';
import { Button, Modal, Table, TableBody, TableRow } from 'flowbite-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import FirstBadge from "@/static/icons/first.svg"
import SecondBadge from "@/static/icons/second.svg"
import TheirdBadge from "@/static/icons/theird.svg"
import { handleRestartGame } from '@/lib/features/gameSlice';
import { resetChat } from '@/lib/features/chatSlice';
import { handleLogout } from '@/lib/features/authSlice';


const ResultsModal = () => {
  const { botPlayers, currentPoints, biddingMultiplier, biddingPoints } = useAppSelector((state: RootState) => state.game);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { toggleModal } = useAppSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const [players, setPlayers] = useState<Player[]>([])

  const handleStartNewGame = () => {
    dispatch(handleRestartGame());
    dispatch(resetChat());
    dispatch(handleLogout())
    dispatch(handleToggleModal(false));
  }

  useEffect(() => {
    setPlayers(
      [{ name: user.name, points: currentPoints, biddingMultiplier, biddingPoints }, ...botPlayers].sort((a, b) => {
        if (a.points > b.points) {
          return -1
        } else {
          return 1
        }
      })
    )
  }, [user, botPlayers, biddingPoints, currentPoints, biddingMultiplier])

  return (
    <Modal show={toggleModal} onClose={() => dispatch(handleToggleModal(false))}>
      <Modal.Header>Results</Modal.Header>
      <Modal.Body>
        <Table>
          <Table.Head>
            <Table.HeadCell>Rank</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Score</Table.HeadCell>
          </Table.Head>
          <TableBody>
            {players.map((item, index) => (
              <Table.Row key={index + 1}>
                <Table.Cell>
                  <div className='flex justify-center items-center relative w-[25px] h-[25px]'>
                    {index === 0 ? 
                    <Image src={FirstBadge} alt="FirstBadge" width={25} height={25} /> : 
                    index === 1 ?
                    <Image src={SecondBadge} alt="SecondBadge" width={25} height={25} /> :
                    index === 2 ?
                    <Image src={TheirdBadge} alt="TheirdBadge" width={25} height={25} /> :
                    index + 1}
                  </div>
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{Math.round(item.points * 100) / 100}</Table.Cell>
              </Table.Row>
            ))}
          </TableBody>
        </Table>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleStartNewGame()}>New Game</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ResultsModal