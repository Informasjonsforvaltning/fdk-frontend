import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useNonce = () => {
    const [nonce, setNonce] = useState<string | undefined>();
    useEffect(() => {
        const fetchedNonce = Cookies.get('nonce');
        setNonce(fetchedNonce || undefined);
      }, []);

    return nonce;
}