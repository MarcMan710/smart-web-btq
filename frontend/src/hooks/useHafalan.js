// frontend/src/hooks/useHafalan.js
import { useContext } from 'react';
import HafalanContext from '../context/HafalanContext';

const useHafalan = () => {
    const context = useContext(HafalanContext);

    if (!context) {
        throw new Error('useHafalan must be used within a HafalanProvider');
    }

    return context;
};

export default useHafalan;