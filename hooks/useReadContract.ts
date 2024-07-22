import { useAccount, useReadContract as useReadContractWagmi } from 'wagmi';
import { AbiFunction } from '@/services/data-conversion';
import { useCallback } from 'react';

interface useReadContractProps {
  contractAddress: string;
  abiFunction: AbiFunction;
  functionName: string;
  args: any[];
}

export const useReadContract = ({
  contractAddress,
  abiFunction: functionAbi,
  args,
  functionName,
}: useReadContractProps) => {
  const { chainId } = useAccount();

  const { data, isLoading, isError, isFetched, error, refetch, status } =
    useReadContractWagmi({
      abi: [functionAbi] as any,
      address: contractAddress as `0x${string}`,
      functionName: functionName,
      chainId: chainId,
      args,
      query: {
        enabled: false,
      },
    });

  const fetch = useCallback(() => {
    console.log('fetch');
    refetch();
  }, [refetch]);

  return {
    data,
    error,
    isLoading,
    isError,
    isFetched,
    fetch,
    status,
  };
};
