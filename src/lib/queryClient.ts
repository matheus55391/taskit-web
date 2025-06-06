import {
  DefaultError,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";

type MakeQueryClientProps = {
  onError?: (error: DefaultError) => void;
};
export function makeQueryClient(params: MakeQueryClientProps) {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: params?.onError,
    }),
    mutationCache: new MutationCache({
      onError: params?.onError,
    }),
    defaultOptions: {
      mutations: {
        onError: params?.onError,
      },
    },
  });
}

const browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient({ onError: () => {} });
  } else {
    if (!browserQueryClient) return makeQueryClient({ onError: () => {} });
    return browserQueryClient;
  }
}