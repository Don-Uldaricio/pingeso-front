<script lang="ts">
	import DatosCotizacion from '$lib/components/DatosCotizacion.svelte';
	import OpcionVentanas from '$lib/components/OpcionVentanas.svelte';
	import { generatePDF } from '$lib/services/pdf_generator';
	import {
		tipoOptions,
		anchoOptions,
		altoOptions,
		cantidadOptions,
		cristalOptions,
		gananciaOptions,
		precioUnitarioOptions,
		precioTotalOptions,
		url,
		presupuesto,
		resetStores,
		editFromHistory,
		materialOptions,
		colorOptions
	} from '$lib/store';
	import type {
		ClienteUI,
		ConstantData,
		DatosAdicionales,
		OpcionModel,
		OpcionUI,
		PresupuestoModel,
		VentanaModel,
		VentanaUI
	} from '$lib/types';
	import type { Color, Cristal, Material, Tipo } from '@prisma/client';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	const { data }: { data: ConstantData } = $props();
	const constantData = data; // horrible pero necesito usar data dentro de un fetch

	let successModal = $state(false);
	let errorModal = $state(false);

	let imagenes = data.imagenes;
	let materiales: Material[] = data.materiales;
	let colores: Color[] = data.colores;
	let tipos: Tipo[] = data.tipos;
	let cristales: Cristal[] = data.cristales;

	let materialesNombre: string[] = $state(materiales.map((material) => material.nombre_material));
	let coloresNombre: string[] = $state(colores.map((color) => color.nombre_color));

	let editarPresupuesto = $editFromHistory;

	let mostrarAgregarOpcion = $state(false);
	let materialModal = $state('');
	let colorModal = $state('');
	let texto_libre = $state('');

	let cliente: ClienteUI = $state({
		nombre: '',
		rut_cliente: '',
		direccion: '',
		email: '',
		telefono: ''
	});

	let opciones: OpcionUI[] = $state([
		{
			material: '',
			color: '',
			ventanas: [
				{
					material: '',
					tipo: '',
					cantidad: 1,
					cristal: '',
					color: '',
					alto: undefined,
					ancho: undefined,
					precio_unitario: 0,
					precio_total: 0,
					ganancia: undefined,
					item: ''
				}
			]
		}
	]);

	let datosAdicionales: DatosAdicionales = $state({
		costo_despacho: undefined,
		costo_instalacion: undefined,
		ganancia_global: undefined
	});

	let mostrar_eliminar_opcion = $derived(opciones.length > 1);

	$inspect('opciones:', opciones);
	$inspect('materialModal:', materialModal);
	$inspect('colorModal:', colorModal);
	$inspect('cliente: ', cliente);

	onMount(() => {
		if (editarPresupuesto === 1) {
			const presupuestoHistorial = $presupuesto;
			actualizarStoresDesdePresupuesto(presupuestoHistorial);
			editarPresupuesto = 0;
			editFromHistory.set(0);
			console.log(get(editFromHistory));
		}
	});

	function actualizarStoresDesdePresupuesto(presupuestoCargado: PresupuestoModel | undefined) {
		if (!presupuestoCargado || !presupuestoCargado.Opciones.length) return;

		const primeraOpcion = presupuestoCargado.Opciones[0];

		// Extraer las características de la cotización para editarlas
		const listaMateriales = primeraOpcion.Ventanas.map((ventana) => {
			const material = materiales.find((m) => m.id_material === ventana.id_material);
			return material ? material.nombre_material : 'Desconocido'; // Manejar el caso en que no se encuentre el material
		});
		const listaTipos = primeraOpcion.Ventanas.map((ventana) => {
			const tipo = tipos.find((t) => t.id_tipo === ventana.id_tipo);
			return tipo ? tipo.descripcion_tipo : 'Desconocido'; // Manejar el caso en que no se encuentre el material
		});
		const listaColores = primeraOpcion.Ventanas.map((ventana) => {
			const color = colores.find((c) => c.id_color === ventana.id_color);
			return color ? color.nombre_color : 'Desconocido'; // Manejar el caso en que no se encuentre el material
		});
		const listaCristal = primeraOpcion.Ventanas.map((ventana) => {
			const cristal = cristales.find((c) => c.id_cristal === ventana.id_cristal);
			return cristal ? cristal.desc_cristal : 'Desconocido'; // Manejar el caso en que no se encuentre el material
		});
		const listaCantidad = primeraOpcion.Ventanas.map((ventana) => {
			return ventana.cantidad; // Manejar el caso en que no se encuentre el material
		});
		const listaAlto = primeraOpcion.Ventanas.map((ventana) => {
			return ventana.alto; // Manejar el caso en que no se encuentre el material
		});
		const listaAncho = primeraOpcion.Ventanas.map((ventana) => {
			return ventana.ancho; // Manejar el caso en que no se encuentre el material
		});
		const listaGanancia = primeraOpcion.Ventanas.map((ventana) => {
			return ventana.ganancia; // Manejar el caso en que no se encuentre el material
		});
		const listaPrecioUnitario = primeraOpcion.Ventanas.map((ventana) => {
			return ventana.precio_unitario; // Manejar el caso en que no se encuentre el material
		});
		const listaPrecioTotal = primeraOpcion.Ventanas.map((ventana) => {
			return ventana.precio_total; // Manejar el caso en que no se encuentre el material
		});

		cliente = presupuestoCargado.Cliente;
		datosAdicionales.costo_despacho = presupuestoCargado.valor_despacho;
		datosAdicionales.costo_instalacion = presupuestoCargado.valor_instalacion;
		datosAdicionales.ganancia_global = presupuestoCargado.ganancia_global;
		opciones = presupuestoCargado.Opciones.map((opcion, indexOpcion) => {
			return {
				material: listaMateriales[indexOpcion] || '',
				color: listaColores[indexOpcion] || '',
				ventanas: opcion.Ventanas.map((ventana, indexVentana) => ({
					material: listaMateriales[indexVentana] || '',
					tipo: listaTipos[indexVentana] || '',
					cantidad: listaCantidad[indexVentana] || 1,
					cristal: listaCristal[indexVentana] || '',
					color: listaColores[indexVentana] || '',
					alto: listaAlto[indexVentana] ?? 0,
					ancho: listaAncho[indexVentana] ?? 0,
					precio_unitario: listaPrecioUnitario[indexVentana] || 0,
					precio_total: listaPrecioTotal[indexVentana] || 0,
					ganancia: listaGanancia[indexVentana] ?? 0,
					item: ''
				}))
			};
		});

		//materialOptions.set(listaMateriales);
		//colorOptions.set(listaColores);
		tipoOptions.set(listaTipos);
		cristalOptions.set(listaCristal);
		cantidadOptions.set(listaCantidad);
		altoOptions.set(listaAlto);
		anchoOptions.set(listaAncho);
		gananciaOptions.set(listaGanancia);
		precioUnitarioOptions.set(listaPrecioUnitario);
		precioTotalOptions.set(listaPrecioTotal);
	}

	function resetFormValues() {
		cliente = {
			nombre: '',
			rut_cliente: '',
			direccion: '',
			email: '',
			telefono: ''
		};

		opciones = [
			{
				material: '',
				color: '',
				ventanas: [
					{
						material: '',
						tipo: '',
						cantidad: 1,
						cristal: '',
						color: '',
						alto: undefined,
						ancho: undefined,
						precio_unitario: 0,
						precio_total: 0,
						ganancia: undefined,
						item: ''
					}
				]
			}
		];

		datosAdicionales = {
			costo_despacho: undefined,
			costo_instalacion: undefined,
			ganancia_global: undefined
		};
	}

	function cerrarSuccessModal() {
		resetFormValues();
		resetStores();
		successModal = !successModal;
	}

	function visualizarCotizacion() {
		window.open($url);
		resetFormValues();
		resetStores();
		successModal = !successModal;
	}

	function cerrarErrorModal() {
		errorModal = !errorModal;
	}

	function cambiarAgregarOpcion() {
		mostrarAgregarOpcion = !mostrarAgregarOpcion;
	}

	function agregarOpcion() {
		let nuevas_ventanas = opciones[0].ventanas.map((ventana) => ({
			...ventana,
			material: materialModal,
			color: colorModal,
			tipo: '',
			ganancia: undefined,
			precio_unitario: 0,
			precio_total: 0
		}));
		//console.log(nuevas_ventanas);

		// Crear una nueva opción
		const nuevaOpcion = {
			material: materialModal,
			color: colorModal,
			ventanas: nuevas_ventanas
		};

		opciones.push(nuevaOpcion);

		// Reiniciar los valores del modal
		materialModal = '';
		colorModal = '';
		mostrarAgregarOpcion = false;
	}

	function eliminarOpcion(index: any) {
		opciones = opciones.filter((_, i) => i !== index);
	}

	// Función para convertir la lista de VentanaUI a VentanaModel
	function convertirVentana(ventana: VentanaUI): VentanaModel {
		// Buscar el id del material, tipo, color y cristal en sus respectivas listas
		const id_material =
			materiales.find((m) => m.nombre_material === ventana.material)?.id_material ?? 0;
		const id_tipo =
			tipos.find((t) => t.descripcion_tipo === ventana.tipo && t.id_material === id_material)
				?.id_tipo ?? 0;
		const id_color = colores.find((c) => c.nombre_color === ventana.color)?.id_color ?? 0;
		const id_cristal = cristales.find((c) => c.desc_cristal === ventana.cristal)?.id_cristal ?? 0;

		// Devolver el objeto convertido a VentanaModel
		return {
			cantidad: ventana.cantidad,
			id_material,
			id_tipo,
			id_color,
			id_cristal,
			item: ventana.item,
			alto: ventana.alto ?? 0,
			ancho: ventana.ancho ?? 0,
			precio_unitario: ventana.precio_unitario,
			precio_total: ventana.precio_total,
			ganancia: ventana.ganancia ?? 0
		};
	}

	// Función para convertir la lista de VentanaUI a VentanaModel
	function convertirVentanas(ventanas: VentanaUI[]): VentanaModel[] {
		return ventanas.map((ventana) => {
			// Buscar el id del material, tipo, color y cristal en sus respectivas listas
			const id_material =
				materiales.find((m) => m.nombre_material === ventana.material)?.id_material ?? 0;
			const id_tipo =
				tipos.find((t) => t.descripcion_tipo === ventana.tipo && t.id_material === id_material)
					?.id_tipo ?? 0;
			const id_color = colores.find((c) => c.nombre_color === ventana.color)?.id_color ?? 0;
			const id_cristal = cristales.find((c) => c.desc_cristal === ventana.cristal)?.id_cristal ?? 0;

			// Devolver el objeto convertido a VentanaModel
			return {
				cantidad: ventana.cantidad,
				id_material,
				id_tipo,
				id_color,
				id_cristal,
				item: ventana.item,
				alto: ventana.alto ?? 0,
				ancho: ventana.ancho ?? 0,
				precio_unitario:
					ventana.precio_unitario * (1 + (datosAdicionales.ganancia_global ?? 0) / 100),
				precio_total: ventana.precio_total * (1 + (datosAdicionales.ganancia_global ?? 0) / 100),
				ganancia: ventana.ganancia ?? 0
			};
		});
	}

	function crearOpcionesModel(opciones: OpcionUI[]): { Ventanas: VentanaModel[] }[] {
		return opciones.map((opcion) => ({
			Ventanas: convertirVentanas(opcion.ventanas)
		}));
	}

	async function crearCotizacion() {
		if (!validarOpciones(opciones)) {
			alert('Por favor, complete todos los campos requeridos.');
			return;
		}
		try {
			let opcionesModel: OpcionModel[] = crearOpcionesModel(opciones);
			let cotizacion: PresupuestoModel = {
				id_usuario: 0,
				fecha: '',
				valor_despacho: datosAdicionales.costo_despacho ?? 0,
				valor_instalacion: datosAdicionales.costo_instalacion ?? 0,
				texto_libre: texto_libre,
				nombre_cliente: cliente.nombre,
				estado: 'Creado',
				Cliente: {
					nombre: cliente.nombre,
					rut_cliente: cliente.rut_cliente,
					direccion: cliente.direccion,
					email: cliente.email,
					telefono: cliente.telefono
				},
				ganancia_global: datosAdicionales.ganancia_global ?? 0,
				Opciones: opcionesModel
			};
			await fetch('/api/presupuesto', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(cotizacion)
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
					}
					return response.json();
				})
				.then(async (data) => {
					presupuesto.set(cotizacion);
					successModal = true;
					const urlLocal = await generatePDF(cotizacion, imagenes, constantData);
					url.set(urlLocal);
					console.log('Respuesta del servidor:', data);
				})
				.catch((error) => {
					errorModal = true;
					console.error('Error durante la solicitud:', error);
				});
		} catch (error) {
			errorModal = true;
			console.error('Error al crear la cotización:', error);
		}
	}

	function eliminarVentana(_opcionIndex: number, ventanaIndex: number) {
		opciones = opciones.map((opcion) => {
			return {
				...opcion,
				ventanas: opcion.ventanas.filter((_, i) => i !== ventanaIndex)
			};
		});

		tipoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		cantidadOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		cristalOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		altoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		anchoOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		gananciaOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		precioUnitarioOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
		precioTotalOptions.update((current) => current.filter((_, i) => i !== ventanaIndex));
	}

	async function handleCalcularCosto(ventana: VentanaUI) {
		const response = await fetch('/api/calculadora', {
			method: 'POST',
			body: JSON.stringify(convertirVentana(ventana))
		});
		const data: {
			resultado: {
				costoTotal: number;
				costoUnitario: number;
			};
		} = await response.json();
		//console.log(data);

		ventana.precio_unitario = data.resultado.costoUnitario;
		ventana.precio_total = data.resultado.costoTotal;
	}

	function aplicarGananciaGlobal(gananciaGlobal: number) {
		if (gananciaGlobal) {
			opciones = opciones.map((opcion) => ({
				...opcion,
				ventanas: opcion.ventanas.map((ventana) => {
					const nuevoPrecioTotal =
						ventana.precio_unitario * ventana.cantidad * (1 + gananciaGlobal / 100);
					return {
						...ventana,
						precio_total: nuevoPrecioTotal
					};
				})
			}));
		}
	}

	// Función para calcular el total con ganancia
	function calcularTotalConGanancia(
		opcion: { material?: string; color?: string; ventanas: any },
		gananciaGlobal: number | undefined
	) {
		if (!gananciaGlobal) return 0;
		return opcion.ventanas.reduce(
			(total: number, ventana: { precio_unitario: number; cantidad: number }) =>
				total + ventana.precio_unitario * ventana.cantidad * (1 + gananciaGlobal / 100),
			0
		);
	}
	/*
	$effect (() => {
		for (const opcion of opciones) {
			for (const ventana of opcion.ventanas) {
				if (ventana.alto !== undefined && ventana.ancho !== undefined) {
					handleCalcularCosto(ventana);
				}
			}
		}
	}); */

	// svelte-ignore non_reactive_update
	let formIsValid = false;

	// Reactive statement: each time `opciones` changes, we recalculate
	$effect(() => {
		formIsValid = validarOpciones(opciones);
	});

	// The validation functions
	function validarVentana(ventana: VentanaUI): boolean {
		if (!ventana.material || ventana.material.trim() === '') return false;
		if (!ventana.tipo || ventana.tipo.trim() === '') return false;
		if (!ventana.cristal || ventana.cristal.trim() === '') return false;
		if (!ventana.color || ventana.color.trim() === '') return false;

		if (!ventana.cantidad || ventana.cantidad <= 0) return false;
		if (!ventana.ancho || ventana.ancho <= 0) return false;
		if (!ventana.alto || ventana.alto <= 0) return false;

		// Adjust logic depending on your requirement for local vs. global ganancia
		if (ventana.ganancia === undefined || ventana.ganancia <= 0) return false;

		return true;
	}

	function validarOpciones(opciones: OpcionUI[]): boolean {
		for (const opcion of opciones) {
			for (const ventana of opcion.ventanas) {
				if (!validarVentana(ventana)) {
					return false;
				}
			}
		}
		return true;
	}
</script>

<div class="flex flex-col bg-gray-100 p-8 gap-5 xl:w-full 2xl:w-[80%] mx-auto">
	<div class="flex flex-row items-center">
		<button
			onclick={() => {
				location.assign('/home');
			}}
			aria-label="home"
			class="hover:underline">Home</button>
		<div class="iconify mdi--keyboard-arrow-right size-5"></div>
		<span class=" text-slate-400">Cotizar</span>
	</div>
	<DatosCotizacion
		bind:cliente
		bind:datos_adicionales={datosAdicionales}
		on:aplicarGananciaGlobal={(event) => aplicarGananciaGlobal(event.detail)} />
	<!-- Ventanas -->
	<div class="space-y-6 w-full">
		{#each opciones as opcion, opcionIndex}
			<OpcionVentanas
				{convertirVentana}
				{data}
				agregarVentana={() => {
					for (const opc of opciones) {
						opc.ventanas = [
							...opc.ventanas,
							{
								material: opc.material,
								tipo: '',
								cantidad: 1,
								cristal: '',
								color: opc.color,
								alto: undefined,
								ancho: undefined,
								precio_unitario: 0,
								precio_total: 0,
								ganancia: undefined,
								item: ''
							}
						];
					}
					$tipoOptions.push('');
					$cristalOptions.push('');
					$altoOptions.push();
					$anchoOptions.push();
					$cantidadOptions.push(1);
					$gananciaOptions.push();
					$precioUnitarioOptions.push();
					$precioTotalOptions.push();
				}}
				eliminarVentana={(ventanaIndex: number) => eliminarVentana(opcionIndex, ventanaIndex)}
				bind:opcion={opciones[opcionIndex]}
				index={opcionIndex}
				{eliminarOpcion}
				{mostrar_eliminar_opcion}
				ganancia_global={datosAdicionales.ganancia_global} />
			<!-- Totales de la opción 
		<div class="flex justify-end mt-2 text-lg">
			<p class="font-semibold">Total:</p>
			<p class="ml-2">
				${opcion.ventanas.reduce((total, ventana) => total + ventana.precio_total, 0).toLocaleString()}
			</p>
			<p class="ml-6 font-semibold text-green-600">Total con Ganancia:</p>
			<p class="ml-2 text-green-600">
				${calcularTotalConGanancia(opcion, datosAdicionales.ganancia_global).toLocaleString()}
			</p>
		</div>-->
		{/each}

		<div class="bg-white shadow rounded-lg w-full p-5 flex flex-col gap-5">
			<label for="texto_libre" class="text-xl font-medium">Notas adicionales</label>
			<textarea
				name="texto_libre"
				bind:value={texto_libre}
				placeholder="Introducir texto de pie de página"
				class="w-full min-h-20 resize-none border rounded-lg p-1"></textarea>
		</div>

		<!-- Botón para agregar nueva ventana -->
		<div class="flex flex-row w-full justify-center gap-10">
			<button
				class="flex flex-row mt-4 bg-teal-600 hover:bg-teal-500 font-bold transition-all text-white px-4 py-2 rounded items-center"
				onclick={cambiarAgregarOpcion}>
				<span class=" iconify mdi--plus size-6"></span> Agregar otra opción
			</button>
			<button
				class="mt-4 bg-amber-500 hover:bg-amber-600 font-bold transition-all text-white px-4 py-2 rounded"
				onclick={crearCotizacion}>
				Crear cotización
			</button>
		</div>
	</div>

	{#if successModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl w-96 p-8">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={cerrarSuccessModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<div class="w-full iconify mdi--success-circle bg-teal-500 size-16"></div>

				<!-- Contenido del modal -->
				<div class="flex flex-col gap-2 text-center mt-2 items-center">
					<h2 class="text-2xl font-extrabold text-gray-800">¡Éxito!</h2>
					<p class="text-gray-700">Presupuesto creado correctamente</p>

					<!-- Botón para realizar otra acción o cerrar -->
					<button
						onclick={cerrarSuccessModal}
						class="bg-transparent text-gray-700 mt-2 w-fit font-medium py-2 px-4 rounded hover:underline">
						Cerrar
					</button>
					<button
						onclick={visualizarCotizacion}
						class="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
						Visualizar cotización
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if errorModal}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl w-96 p-8">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={cerrarErrorModal}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg iconify mdi--close size-6"
						aria-label="X">
					</button>
				</div>

				<div class="w-full iconify mdi--error bg-red-500 size-16"></div>

				<!-- Contenido del modal -->
				<div class="flex flex-col gap-2 text-center mt-2 items-center">
					<h2 class="text-2xl font-extrabold text-gray-800">Error</h2>
					<p class="text-gray-700">Algo sucedió. Intente nuevamente.</p>

					<!-- Botón para realizar otra acción o cerrar -->
					<button
						onclick={cerrarErrorModal}
						class="w-full mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
						Cerrar ventana
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if mostrarAgregarOpcion}
		<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-xl w-96 p-6">
				<!-- Botón de cierre -->
				<div class="flex justify-end">
					<button
						onclick={cambiarAgregarOpcion}
						class="text-gray-500 hover:text-gray-800 font-bold text-lg">
						X
					</button>
				</div>

				<!-- Contenido del modal -->
				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-gray-800">Nueva Opción</h2>

					<!-- Select para material -->
					<div>
						<label for="material" class="block text-gray-600 font-medium mb-1">Material</label>
						<select
							id="material"
							bind:value={materialModal}
							class="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500">
							<option value="" disabled>Selecciona un material</option>
							{#each materialesNombre as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>

					<!-- Select para color -->
					<div>
						<label for="color" class="block text-gray-600 font-medium mb-1">Color</label>
						<select
							id="color"
							bind:value={colorModal}
							class="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500">
							<option value="" disabled>Selecciona un color</option>
							{#each coloresNombre as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>

					<!-- Botón de Crear Opción -->
					<div class="flex justify-center">
						<button
							onclick={agregarOpcion}
							class="bg-teal-600 hover:bg-teal-500 transition-all text-white px-4 py-2 rounded font-bold"
							disabled={materialModal == '' || colorModal == ''}>
							Crear Opción
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
