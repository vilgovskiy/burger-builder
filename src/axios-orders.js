import axios from "axios";

import {FIREBASE_URL} from './secure/private'

const instance = axios.create({
  baseURL: FIREBASE_URL,
});

export default instance;
