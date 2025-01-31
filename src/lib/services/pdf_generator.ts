import type { ConstantData, ImageGroup, OpcionModel, PresupuestoModel } from '$lib/types';
import type { Color, Cristal, Material, Tipo } from '@prisma/client';
import {
	PDFDocument,
	PDFFont,
	PDFPage,
	PageSizes,
	StandardFonts,
	rgb,
	layoutMultilineText,
	TextAlignment
} from 'pdf-lib';

//#region constantes
let materiales: Material[];
let colores: Color[];
let cristales: Cristal[];
let tipos: Tipo[];

const checkbox_0 =
	'M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z';
const checkbox_1 =
	'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5zm-9 12l-4-4l1.41-1.42L10 14.17l6.59-6.59L18 9';

let pdfDoc: PDFDocument;
let page: PDFPage;

let fontSize = 9;
let font: PDFFont;
let boldFont: PDFFont;

let height: number;
let width: number;

let marginTop: number = 40;
let marginLeft: number = 20;

let currentX: number;
let currentY: number;

let verticalGap: number = 11;

// Dimensiones de las columnas
const headersTabla = ['TIPO', 'COLOR', 'CRISTAL', 'ANCHO', 'ALTO', 'CANT', 'PRECIO U', 'TOTAL'];
let columnWidths = [115, 10, 0, -35, -35, -40, -25, -10].map((element, _, arr) => {
	return element + 550 / arr.length;
});
const rowHeight = 13; // Altura de cada fila
const rowGap = 9;
const footerText = ['TRANSPORTE', 'INSTALACIÓN', 'TOTAL IVA INCLUIDO'];

//#region funciones
async function drawImageRow(group: ImageGroup | undefined) {
	if (group == undefined) return;

	let images = group.imagenes;
	if (images.length == 0) return;
	let imgHeight = images[0].height;

	if (currentY - -verticalGap < 0) {
		page = pdfDoc.addPage(PageSizes.A4);
		currentY = height - marginTop;
	}

	// Agregar imágenes programáticamente
	const imageYPosition = currentY - imgHeight; // Posición vertical del área para imágenes
	const imageWidth = (width - marginLeft * 2) / images.length - 10; // Espacio horizontal dividido entre imágenes
	const imageXStart = marginLeft; // Margen inicial a la izquierda

	for (let i = 0; i < images.length; i++) {
		const bytes = images[i].bytes;
		const embeddedImage = await pdfDoc.embedPng(bytes);
		const scaledImage = embeddedImage.scaleToFit(imageWidth, imgHeight);

		const xOffset = imageXStart + i * (imageWidth + 10); // Espacio entre imágenes
		const xCenterOffset = (imageWidth - scaledImage.width) / 2; // Centrado horizontal
		const yCenterOffset = (imgHeight - scaledImage.height) / 2; // Centrado vertical
		page.drawImage(embeddedImage, {
			x: xOffset + xCenterOffset,
			y: imageYPosition + yCenterOffset,
			width: scaledImage.width,
			height: scaledImage.height
		});
	}
	currentY = imageYPosition - verticalGap;
}

function formatoChileno(valor: number) {
	const truncado = Math.trunc(valor); // Trunca el número
	return new Intl.NumberFormat('es-CL', {
		currency: 'CLP',
		minimumFractionDigits: 0
	}).format(truncado);
}

function drawLeftText(textArray: string[], options: { linkOn3rd: boolean } = { linkOn3rd: false }) {
	for (let index = 0; index < textArray.length; index++) {
		const text = textArray[index];
		const isLink = index === 3; // El último es un link
		page.drawText(text, {
			x: marginLeft,
			y: currentY,
			size: fontSize,
			font: boldFont,
			color: isLink && options.linkOn3rd ? rgb(0, 0, 1) : rgb(0, 0, 0) // Azul para el link
		});
		currentY -= verticalGap; // Espacio entre líneas
	}
}

function drawOptionHeaderRow(
	row: string[],
	rowSize: number,
	colSize: number,
	optionMargin: number,
	fontSize: number
) {
	// currentX = +optionMargin;
	for (let index = 0; index < row.length; index++) {
		const text = row[index];
		page.drawText(text, {
			x: currentX,
			y: currentY,
			size: fontSize,
			font: boldFont
		});
		currentX += rowSize;
	}
	currentY -= colSize;
}

//#region tabla
function drawTable(opcion: OpcionModel, valor_despacho: number, valor_instalacion: number) {
	const tableFontSize = fontSize - 1;

	currentX = marginLeft;

	// Dibujar encabezados con fondo de color
	page.drawRectangle({
		x: marginLeft,
		y: currentY - rowHeight,
		width: width - marginLeft * 2,
		height: rowHeight,
		color: rgb(0.75, 0.75, 0.75), // Color de fondo gris claro
		borderColor: rgb(0, 0, 0),
		borderWidth: 0.5
	});

	headersTabla.forEach((header, index) => {
		const cellX = currentX + 5;
		const columnWidth = columnWidths[index];

		if (index > headersTabla.length - 3) {
			const textWidth = font.widthOfTextAtSize(header, tableFontSize);
			page.drawText(header, {
				x: currentX + columnWidth - textWidth + 10, // Ajuste para alinearlo al borde derecho
				y: currentY - rowGap,
				size: tableFontSize,
				font: font,
				color: rgb(0, 0, 0)
			});
		} else {
			// Texto alineado a la izquierda
			page.drawText(header, {
				x: cellX,
				y: currentY - rowGap,
				size: tableFontSize,
				font: font,
				color: rgb(0, 0, 0)
			});
		}
		currentX += columnWidths[index];
	});
	currentY -= rowHeight; // Espacio para las filas

	//#region ventanas
	// Dibujar filas de datos desde las opciones
	opcion.Ventanas.forEach((ventana) => {
		currentX = marginLeft;

		// Dibujar bordes de las filas
		page.drawRectangle({
			x: marginLeft,
			y: currentY - rowHeight,
			width: width - marginLeft * 2,
			height: rowHeight,
			borderWidth: 0.5,
			borderColor: rgb(0, 0, 0)
		});

		// Material
		let material: string;
		let tipo: string;
		let cristal: string;
		let color: string;

		const materialEncontrado = materiales.find((mat) => mat.id_material === ventana.id_material);
		material = materialEncontrado ? materialEncontrado.nombre_material : 'Material no encontrado';
		const tipoEncontrado = tipos.find((t) => t.id_tipo === ventana.id_tipo);
		tipo = tipoEncontrado ? tipoEncontrado.descripcion_tipo : 'Tipo no encontrado';
		const cristalEncontrado = cristales.find((c) => c.id_cristal === ventana.id_cristal);
		cristal = cristalEncontrado ? cristalEncontrado.desc_cristal : 'Cristal no encontrado';
		const colorEncontrado = colores.find((c) => c.id_color === ventana.id_color);
		color = colorEncontrado ? colorEncontrado.nombre_color : 'Color no encontrado';
		const row = [
			tipo,
			color,
			cristal,
			ventana.ancho.toString(),
			ventana.alto.toString(),
			ventana.cantidad.toString(),
			formatoChileno(ventana.precio_unitario),
			formatoChileno(ventana.precio_total)
		];

		row.forEach((cell, index) => {
			const cellX = currentX + 5;
			const columnWidth = columnWidths[index];

			// Alinear texto a la derecha para "PRECIO U" y "TOTAL"
			if (index > headersTabla.length - 3) {
				const textWidth = font.widthOfTextAtSize(cell, tableFontSize);
				page.drawText(cell, {
					x: currentX + columnWidth - textWidth + 10, // Ajuste para alinearlo al borde derecho
					y: currentY - rowGap,
					size: tableFontSize,
					font: font,
					color: rgb(0, 0, 0)
				});
			} else {
				// Texto alineado a la izquierda
				let add_dot = false;
				while (font.widthOfTextAtSize(cell, tableFontSize) > columnWidth) {
					cell = cell.slice(0, cell.length - 1);
					add_dot = true;
				}
				if (add_dot) cell = cell.concat('.');
				page.drawText(cell, {
					x: cellX,
					y: currentY - rowGap,
					size: tableFontSize,
					font: font,
					color: rgb(0, 0, 0)
				});
			}

			currentX += columnWidth;
		});

		currentY -= rowHeight; // Espacio entre filas
	});

	//#region footer
	const totalIvaIncluido = opcion.Ventanas.reduce((sum, ventana) => sum + ventana.precio_total, 0);
	const footerValues = [
		valor_despacho,
		valor_instalacion,
		totalIvaIncluido + valor_despacho + valor_instalacion
	];

	footerText.forEach((text, index) => {
		const textWidth = font.widthOfTextAtSize(text, tableFontSize);
		const extraWidth = font.widthOfTextAtSize('000000000000000', tableFontSize);

		page.drawRectangle({
			x: width - marginLeft - extraWidth * 2.5,
			y: currentY - rowHeight,
			width: extraWidth * 2.5,
			height: rowHeight,
			color: rgb(0.9, 0.9, 0.5), // Color amarillo claro
			borderColor: rgb(0, 0, 0),
			borderWidth: 0.5
		});

		page.drawText(text, {
			x: width - marginLeft - textWidth - extraWidth,
			y: currentY - rowGap,
			size: tableFontSize,
			font: font,
			color: rgb(0, 0, 0)
		});

		const value = footerValues[index].toLocaleString('en-US').split('.')[0];
		const valueWidth = font.widthOfTextAtSize(value, tableFontSize);

		page.drawText(value, {
			x: currentX - valueWidth + 10, // Ajuste para alinearlo al borde derecho
			y: currentY - rowGap,
			size: tableFontSize,
			font: font,
			color: rgb(0, 0, 0)
		});
		currentY -= rowHeight;
	});
	currentY -= verticalGap;
}

//#region generatePDF
// Función para generar el PDF iterando sobre los elementos.
export const generatePDF = async (
	presupuesto: PresupuestoModel,
	imagenes: ImageGroup[],
	constantes: ConstantData
) => {
	colores = constantes.colores;
	cristales = constantes.cristales;
	materiales = constantes.materiales;
	tipos = constantes.tipos;
	pdfDoc = await PDFDocument.create();
	console.log(imagenes);
	font = await pdfDoc.embedFont(StandardFonts.Helvetica);
	boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

	page = pdfDoc.addPage(PageSizes.A4);
	width = page.getWidth();
	height = page.getHeight();

	currentY = height - marginTop;
	currentX = marginLeft;

	//#region header
	let imagenesHeader = imagenes.find((value) => value.img_group == 1);
	await drawImageRow(imagenesHeader);
	//#region textos
	// Izquierda
	const leftTexts = [
		'TERMOPANEL SYSTEM LTDA',
		'77.323.478-7',
		'SANTA INES 01583, QUINTA NORMAL',
		'WWW.TERMOACUSTICOS.CL'
	];

	// Derecha
	const rightTexts = [
		'ASESOR: ALEJANDRO GONZALEZ',
		'JEFE COMERCIAL',
		'+56 9 4963 7515',
		'CONTACTO@TERMOACUSTICOS.CL'
	];

	// Dibujar textos a la derecha
	let yText = currentY; // no actualizar el currenty para que queden paralelos
	for (let index = 0; index < rightTexts.length; index++) {
		const text = rightTexts[index];
		const textWidth = font.widthOfTextAtSize(text, fontSize);
		const isLink = index === 3; // El último es un link
		page.drawText(text, {
			x: width - textWidth - marginLeft, // Alinear derecha
			y: yText,
			size: fontSize,
			font: boldFont,
			color: isLink ? rgb(0, 0, 1) : rgb(0, 0, 0) // Azul para el link
		});
		yText -= verticalGap; // Espacio entre líneas
	}

	drawLeftText(leftTexts, { linkOn3rd: true });

	//#region imagenes1
	let imagenesGroup2 = imagenes.find((value) => value.img_group == 2);
	await drawImageRow(imagenesGroup2);

	const clienteTexts = [
		'SEÑOR(A): ' + presupuesto.nombre_cliente,
		'A CONTINUACIÓN ENTREGAMOS PROPUESTA PARA SU PROYECTO:'
	];
	drawLeftText(clienteTexts);
	currentY -= verticalGap;

	//#region opciones
	for (let opcionIndex = 0; opcionIndex < presupuesto.Opciones.length; opcionIndex++) {
		const opcion = presupuesto.Opciones[opcionIndex];

		let optRowSize = boldFont.widthOfTextAtSize('AAAAAAAAAA', fontSize + 2);
		let optColSize = boldFont.heightAtSize(fontSize);

		let opcionHeight = opcion.Ventanas.length * rowHeight;
		opcionHeight += (footerText.length + 1) * rowHeight;
		opcionHeight += optColSize * 2;

		if (currentY - opcionHeight < 0) {
			page = pdfDoc.addPage(PageSizes.A4);
			currentY = height - marginTop;
		}

		const currentMat = materiales.find(
			(elem) => elem.id_material == opcion.Ventanas[0].id_material
		);

		currentX = marginLeft;

		const optionMargin = boldFont.widthOfTextAtSize('OPCIÓN X  ', fontSize);
		page.drawText('OPCIÓN ' + (opcionIndex + 1), {
			x: marginLeft,
			y: currentY,
			size: fontSize,
			font: boldFont
		});

		currentX += optionMargin;

		const materialText = currentMat?.nombre_material ?? 'Material no encontrado';
		const materialSize = boldFont.widthOfTextAtSize(materialText + 'AA', fontSize);

		page.drawText(materialText, { x: currentX, y: currentY, size: fontSize, font: boldFont });

		const upperRow = [
			'CALIDAD:',
			currentMat?.texto_calidad ?? '',
			'TERMOPANEL:',
			currentMat?.texto_termopanel ?? ''
		];

		currentX = width - marginLeft - optRowSize * 4;

		drawOptionHeaderRow(upperRow, optRowSize, optColSize, optionMargin, fontSize);

		currentY += verticalGap / 2;

		drawTable(opcion, presupuesto.valor_despacho, presupuesto.valor_instalacion);
		currentY -= verticalGap;
	}

	let imagenesGroup3 = imagenes.find((value) => value.img_group == 3);
	await drawImageRow(imagenesGroup3);

	const multiText = layoutMultilineText(presupuesto.texto_libre, {
		alignment: TextAlignment.Left,
		bounds: { width: width - marginLeft * 2, height: 10000, x: 10, y: 10 },
		font: font,
		fontSize: fontSize
	});
	const textHeight = font.heightAtSize(fontSize);

	currentY -= verticalGap;
	for (let i = 0; i < multiText.lines.length; i++) {
		if (currentY - textHeight < 0) {
			page = pdfDoc.addPage(PageSizes.A4);
			currentY = height - marginTop;
		}
		page.drawText(`${multiText.lines[i].text}`, {
			x: marginLeft,
			y: currentY,
			size: fontSize,
			font: font
		});
		// move position down
		currentY -= textHeight * 1.15;
	}
	//#region guardarPDF
	const pdfBytes = await pdfDoc.save();
	const blob = new Blob([pdfBytes], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	console.log('done');
	return url;
};
