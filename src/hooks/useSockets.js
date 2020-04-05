import useSocket from 'use-socket.io-client';
import { useEffect, useState, useRef, useContext } from 'react';
import { backend } from '../../config';

import io from 'socket.io-client';
const socket = io.connect(backend.endpoint);

export default useSockets = topic => {
  // const [socket] = useSocket(backend.endpoint);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    socket.on(topic, data => {
      setTemp(data);
    });

    return () => {
      // socket.off(topic);
      // socket.close();
    };
  }, [topic]);

  return [socket, temp];
};
