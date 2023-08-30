import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import Vault from './components/Vault'
import LoginForm from './components/LoginForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [step, setStep] = useState<'login' | 'register' | 'vault'>('register')


	return (
		<main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
			{step === 'register' && <RegisterForm/>}
			{step === 'login' && <LoginForm/>}
			{step === 'vault' && <Vault/>}
		</main>
	)
}
