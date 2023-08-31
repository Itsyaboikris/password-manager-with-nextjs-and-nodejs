import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import FormWrapper from './FormWrapper'
import { useForm } from 'react-hook-form'
import { decryptVault, generateVaultKey, hashPassword } from '@/crypto'
import { useMutation } from 'react-query'
import { loginUser, registerUser } from '@/api'
import { VaultItem } from '..'

export default function LoginForm({setVault, setStep, setVaultKey}:{
	setStep: Dispatch<SetStateAction<'login' | 'register' | 'vault'>>,
	setVaultKey: Dispatch<SetStateAction<string>>
	setVault: Dispatch<SetStateAction<VaultItem[]>>
}) {


	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: {errors, isSubmitting}
	} = useForm<{email:string, password:string, hashedPassword: string}>()

	const mutation = useMutation(loginUser, {
		onSuccess: ({salt, vault}) => {
			const hashedPassword = getValues("hashedPassword")
			const email = getValues("email")
			const vaultKey = generateVaultKey({
				hashedPassword, email, salt
			});

			window.sessionStorage.setItem("vk", vaultKey);
			

			const decryptedVault = decryptVault({vaultKey, vault: vault ?? ""});
			console.log("decryptedVault", decryptedVault)
			setVaultKey(vaultKey);
			setVault(decryptedVault)

			window.sessionStorage.setItem("vault", JSON.stringify(decryptedVault));
			setStep("vault");

		}
	})

	return (
		<FormWrapper onSubmit={handleSubmit(() => {
			const email = getValues("email");
			const password = getValues("password");
			const hashedPassword = hashPassword(password);

			setValue("hashedPassword", hashedPassword)

			mutation.mutate({
				email, hashedPassword
			})
		})}>
			<Heading>Login</Heading>
			<FormControl mt="4">
				<FormLabel htmlFor='email'>Email</FormLabel>
				<Input id="email" placeholder='email' {...register("email", {required: "email is required",minLength:{value: 4, message: "Email must be 4 characters long"}})}/>

				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>



				<FormLabel htmlFor='password'>Password</FormLabel>
				<Input id="password" placeholder='password' type="password" {...register("password", {required: "passsword is required",minLength:{value: 6, message: "password must be 6 characters long"}})}/>

				<FormErrorMessage>
					{errors.password && errors.password.message}
				</FormErrorMessage>

				<Button type="submit">Login</Button>
			</FormControl>
		</FormWrapper>
	)
}
