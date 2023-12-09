import { useEffect } from 'react';

const useLocation = (onSuccess: (position: GeolocationPosition) => void, onError: (error: GeolocationPositionError) => void, shouldExecute: React.MutableRefObject<boolean>, forceUpdate: boolean = false) => {
  useEffect(() => {
    if (navigator.geolocation && (shouldExecute.current || forceUpdate)) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [onSuccess, onError, shouldExecute, forceUpdate]);
};

export default useLocation;
