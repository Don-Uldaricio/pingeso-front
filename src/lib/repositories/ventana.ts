import { err, ok } from 'neverthrow';

export const getVentanaById = async (db: D1Database, id: number) => {
	const ventana = await db
		.prepare('SELECT * FROM ventana WHERE id_ventana = ?;')
		.bind(id)
		.run<VentanaEntity>()
		.then((stmt) => {
			if (!stmt.results[0]) return err('Ventana no encontrada');
			return ok(stmt.results[0]);
		});
	return ventana;
};

export const getAllVentanas = async (db: D1Database) => {
	const ventanas = await db
		.prepare('SELECT * FROM ventana;')
		.run<VentanaEntity>()
		.then((stmt) => stmt.results);
	return ventanas;
};

export const saveVentana = async (db: D1Database, ventana: VentanaEntity) => {
	return await db
		.prepare(
			'INSERT INTO ventana (descripcion, alto, ancho, minimo, maximo, id_opcion) VALUES (?, ?, ?, ?, ?, ?);'
		)
		.bind(
			ventana.descripcion,
			ventana.alto,
			ventana.ancho,
			ventana.minimo,
			ventana.maximo,
			ventana.id_opcion
		)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};

export const deleteVentana = async (db: D1Database, id: number) => {
	return await db
		.prepare('DELETE FROM ventana WHERE id_ventana = ?;')
		.bind(id)
		.run()
		.then(() => ok(true))
		.catch((error: Error) => err(error));
};