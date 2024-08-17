"use client";
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { Player } from '@/types/types';
import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaRankingStar } from "react-icons/fa6";



const BiddersTable = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { botPlayers, currentPoints, biddingMultiplier, biddingPoints } = useAppSelector((state: RootState) => state.game);
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    setPlayers([{ name: user.name, points: currentPoints, biddingMultiplier, biddingPoints }, ...botPlayers])
  }, [user, botPlayers, biddingPoints, currentPoints, biddingMultiplier])


  return (
    <div>
      <h3 className="flex gap-2 items-center text-xl p-3"><FaRankingStar size={24} className='text-orange-500' /> Ranking</h3>
      <Table bgcolor=''>
        <Table.Head>
          <Table.HeadCell>Index</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Predection</Table.HeadCell>
          <Table.HeadCell>Lst Bid</Table.HeadCell>
          <Table.HeadCell>Points</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {players.map((item, index) => (
            <Table.Row key={index}  className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index + 1}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.name}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.biddingMultiplier}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.biddingPoints}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{Math.round(item.points * 100) / 100}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default BiddersTable