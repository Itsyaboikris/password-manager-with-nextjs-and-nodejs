import {ChakraProvider} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from 'react-query'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
	<QueryClientProvider client={queryClient}>
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	</QueryClientProvider>
  )
}