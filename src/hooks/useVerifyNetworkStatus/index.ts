import * as Network from "expo-network";
import { useEffect, useState } from "react";

const useVerifyNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    const getInitialNetworkState = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        setIsConnected(networkState.isConnected || false);
        setConnectionType(networkState.type || null);
      } catch (error) {
        console.error("Error checking network state:", error);
        setIsConnected(false);
      }
    };

    getInitialNetworkState();

    const interval = setInterval(async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        setIsConnected(networkState.isConnected || false);
        setConnectionType(networkState.type || null);
      } catch (error) {
        console.error("Error checking network state:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const checkNetworkStatus = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected || false);
      setConnectionType(networkState.type || null);
    } catch (error) {
      console.error("Error checking network state:", error);
      setIsConnected(false);
    }
  };

  return { isConnected, connectionType, checkNetworkStatus };
};

export default useVerifyNetworkStatus;
