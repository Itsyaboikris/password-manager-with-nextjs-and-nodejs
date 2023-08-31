import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import Vault from './components/Vault'
import LoginForm from './components/LoginForm'

export interface VaultItem{
	website: string,
	username: string,
	password: string
}

export default function Home() {

	const [step, setStep] = useState<'login' | 'register' | 'vault'>('register')
	const [vault, setVault] = useState<VaultItem[]>([])
	const [vaultKey, setVaultKey] = useState("")

	return (
		<main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
			{step === 'register' && <RegisterForm setStep={setStep} setVaultKey={setVaultKey}/>}
			{step === 'login' && <LoginForm/>}
			{step === 'vault' && <Vault/>}
		</main>
	)
}
