import * as io from 'socket.io-client';
import { baseUrl } from '../constants/constants';

export function createConnection() {
    const socket = io.connect(baseUrl);
    return socket;
}