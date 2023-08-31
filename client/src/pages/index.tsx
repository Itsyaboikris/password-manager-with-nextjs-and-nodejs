import { useEffect, useState } from 'react'
import RegisterForm from './components/RegisterForm'
import Vault from './components/Vault'
import LoginForm from './components/LoginForm'
import { effect } from '@chakra-ui/react'
import input from 'postcss/lib/input'
import { set } from 'react-hook-form'

export interface VaultItem{
	website: string,
	username: string,
	password: string
}

export default function Home() {

	const [step, setStep] = useState<'login' | 'register' | 'vault'>('login')
	const [vault, setVault] = useState<VaultItem[]>([])
	const [vaultKey, setVaultKey] = useState("")

	useEffect(() => {
		const vault = window.sessionStorage.getItem('vault');
		const vaultKey = window.sessionStorage.getItem('vk');

		if (vault) {
			setVault(JSON.parse(vault))
		}

		if (vaultKey) {
			setVaultKey(vaultKey)
			setStep('vault')
		}

	}, [])

	return (
		<main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
			{step === 'register' && <RegisterForm setStep={setStep} setVaultKey={setVaultKey}/>}
			{step === 'login' && <LoginForm setVault={setVault} setStep={setStep} setVaultKey={setVaultKey}/>}
			{step === 'vault' && <Vault vault={vault} vaultKey={vaultKey}/>}
		</main>
	)
}
