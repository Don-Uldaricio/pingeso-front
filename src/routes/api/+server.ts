import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB, init_db } from '$lib';
import { PUBLIC_IS_DEV } from '$env/static/public';
import { getAllUsuarios, getUsuario } from '$lib/repositories/usuarios';

export const POST: RequestHandler = async ({ fetch, request, platform }) => {
	const conn = getDB(platform);
	if (conn.isErr()) return json({ error: conn.error }, { status: 400 });

	const db = conn.value;

	console.log(await getUsuario(db, 'HOLA'));

	let usuarios = await getAllUsuarios(db);

	return json({ results: usuarios });
};
