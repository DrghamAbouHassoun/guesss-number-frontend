"use client";
import useSocket from '@/hooks/useSocket';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Button, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { io } from 'socket.io-client';

interface IPlayer {
  userId: string;
  username: string;
  currentBid: number;
  currentPoints: number;
}

interface IGame {
  _id: string;
  players: IPlayer[]
  status: string;
  description?: string;
  createdBy: string;
}

interface InitiateGameProps {
  games: IGame[]
}

const InitiateGame = ({ games }: InitiateGameProps) => {


  const { token, user } = useAppSelector((state: RootState) => state.auth);

  const [gamesArray, setGamesArray] = useState<IGame[]>(games)

  const { socket } = useSocket()

  // socket.on("pendingGames", (data: any) => {
  //   setGames(data.games);
  // })

  const handleJoinGame = (gameId: string) => {
    socket.emit("joinGame", { gameId: gameId });
  }

  socket.on("updatedGame", (data: IGame) => {
    setGamesArray((prev) => prev.map(item => {
      if (item._id === data._id) {
        return data;
      }
      return item;
    }))
  })

  return (
    <div className="w-full">
      <div className="bg-gray-600 p-2 rounded-md shadow-md flex justify-between items-center w-full">
        <p>{user.name}</p>
        <Button type="button">
          <div className="flex gap-2 items-center">
            <FaPlus /> <span>Create Game</span>
          </div>
        </Button>
      </div>
      <div className='my-5'>
        <h2 className="p-4">Active Games:</h2>
        <Table >
          <Table.Head>
            <Table.HeadCell>Index</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Users</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {gamesArray && gamesArray.length > 0 ?
              gamesArray.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.description}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.players.map(item => item.username).join(",")}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Button color="gray" onClick={() => handleJoinGame(item._id)}>Join</Button>
                  </Table.Cell>
                </Table.Row>
              )) : null}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default InitiateGame