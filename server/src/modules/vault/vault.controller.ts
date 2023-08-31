import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { get } from "lodash";
import logger from "../../utils/logger";
import { updateVault } from "./vault.service";

export async function updateVaultHandler(
  request: FastifyRequest<{
    Body: {
      encryptedVault: string;
    };
  }>, reply: FastifyReply
) {
  const userId = get(request, "user._id") as string | undefined

  try {
    await updateVault({
      data: request.body.encryptedVault,
      userId: userId !== undefined ? userId.toString() : "",
    })

    return reply.code(200).send("Vault updated")
  } catch (e) {
    logger.error(e, "error updating vault")
    return reply.code(500).send(e)
  }
}