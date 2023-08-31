import React from 'react'
import { VaultItem } from '..'
import { useFieldArray, useForm } from 'react-hook-form'
import FormWrapper from './FormWrapper';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { encryptVault } from '@/crypto';
import { useMutation } from 'react-query';
import { saveVault } from '@/api';

export default function Vault({vault = [], vaultKey = ""}:{vault: VaultItem[], vaultKey: string}) {
  
	const {control, register, handleSubmit} = useForm({
		defaultValues: {
			vault
		}
	});

	const {fields, append, remove} = useFieldArray({
		control,
		name: "vault",
	})

	const mutation = useMutation(saveVault)

	return (
		<FormWrapper onSubmit={handleSubmit(({vault}) => {
			console.log({ vault });

			const encryptedVault = encryptVault({
				vault: JSON.stringify({ vault }),
				vaultKey,
			});
	  
			window.sessionStorage.setItem("vault", JSON.stringify(vault));

			mutation.mutate({
				encryptedVault,
			});
	  
		})}>

		{
			fields.map((field, index)=>(
				<Box key={field.id} mt="4" mb="4" display="flex" alignItems="flex-end">
					<FormControl>
						<FormLabel htmlFor="website">Website</FormLabel>
						<Input type="url" id="website" {...register(`vault.${index}.website`, {required: 'website is required'})}/>
					</FormControl>

					<FormControl ml="2">
						<FormLabel htmlFor="username">Username</FormLabel>
						<Input id="username" placeholder='username' {...register(`vault.${index}.username`, {required: 'username is required'})}/>
					</FormControl>

					<FormControl ml="2">
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input type="password" id="password" placeholder='password' {...register(`vault.${index}.password`, {required: 'password is required'})}/>
					</FormControl>

					<Button type="button" bg="red.500" color="white" fontSize="2xl" ml="2" onClick={() => remove(index)} > - </Button>
				</Box>
			))
		}

	<Button onClick={() => append({ website: "", username: "", password: "" })}>
        Add
    </Button>

	<Button ml="8" color="teal" type="submit">
        Save vault
    </Button>

	</FormWrapper>
  )
}
