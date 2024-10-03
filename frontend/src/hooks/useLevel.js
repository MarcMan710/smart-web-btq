// frontend/src/hooks/useLevel.js
import { useContext } from 'react';
import LevelContext from '../context/LevelContext';

const useLevel = () => {
    return useContext(LevelContext);
};

export default useLevel;
