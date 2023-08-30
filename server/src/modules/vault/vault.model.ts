import { getModelForClass, Ref, prop } from "@typegoose/typegoose";
import { User } from "../user/user.model";

export class Vault {
	@prop({required: true, ref: () => User})
	user: Ref<User>

	@prop({defailt: ""})
	data: string;

	@prop({required: true})
	salt: string
}

export const VaultModel = getModelForClass(Vault, {
	schemaOptions: {
		timestamps: true,
	}
});