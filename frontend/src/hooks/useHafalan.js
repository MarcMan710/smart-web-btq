// frontend/src/hooks/useHafalan.js
import { useContext } from 'react';
import HafalanContext from '../context/HafalanContext';

const useHafalan = () => {
    return useContext(HafalanContext);
};

export default useHafalan;