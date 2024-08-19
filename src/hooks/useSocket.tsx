import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { globalVariables } from '../config/constants';
import { io } from 'socket.io-client';

const useSocket = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const currentGame = useSelector((state: RootState) => state.game.currentGameId);

  const socket = io(`${globalVariables.socketBackendUrl}`, {
    extraHeaders: {
      authorization: `Bearer ${auth.token}`
    }
  });

  const handleJoinGame = () => {
    socket.emit("joinGame", { roomName: currentGame })
  }

  useEffect(() => {
    if (currentGame) {
      socket.emit("joinGame", { roomName: currentGame })
    }

    // return () => {
    //   socket.emit("leaveRoom", { roomName: currentChat })
    // }
  }, [socket, currentGame])

  return { socket, handleJoinGame };
}

export default useSocket