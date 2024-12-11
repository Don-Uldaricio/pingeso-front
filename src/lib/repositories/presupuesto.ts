import { err, ok } from 'neverthrow';
import { prisma } from '$lib';
import type { PresupuestoModel } from '$lib/types';
import { saveCliente } from './cliente';

export const getPresupuestoById = async (id: number) => {
	return prisma.presupuesto
		.findFirst({
			include: { Cliente: true, Opciones: true, Usuario: true },
			where: { id_presupuesto: { equals: id } }
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const getAllPresupuestos = async () => {
	return prisma.presupuesto
		.findMany({
			include: {
				Cliente: true,
				Opciones: { include: { Ventanas: true } },
				Usuario: { select: { email: true } }
			}
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const savePresupuesto = async (presupuesto: PresupuestoModel, id_usuario: number) => {
	const clienteResult = await saveCliente(presupuesto.cliente);
	if (clienteResult.isErr()) return clienteResult;

	return prisma.presupuesto
		.create({
			include: { Opciones: { include: { Ventanas: true } } },
			data: {
				id_presupuesto: presupuesto.id_presupuesto,
				fecha: new Date().toISOString(),
				id_usuario: id_usuario,
				rut_cliente: presupuesto.cliente.rut_cliente,
				Opciones: {
					create: presupuesto.Opciones.map((opcion) => {
						return {
							Ventanas: {
								create: opcion.Ventanas.map((ventana) => {
									return { ...ventana };
								})
							}
						};
					})
				}
			}
		})
		.then((response) => ok(response))
		.catch((error) => err(error));
};

export const deletePresupuesto = async (id: number) => {
	return prisma.presupuesto
		.deleteMany()
		.then((response) => ok(response))
		.catch((error) => err(error));
};
