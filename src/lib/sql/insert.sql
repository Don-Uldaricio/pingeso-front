INSERT INTO Perfil (codigo_per, formula_dim, formula_cant, kg_ml_per, valor) VALUES 
(6901, "X-12", "1", 0.692, 5275),
(6902, "X-12", "1", 0.677, 5275),
(6903, "Y", "2", 0.550, 5275),
(6915, "(X/2)-13", "4*Z", 0.569, 5275),
(6995, "Y-40", "2*Z", 0.655, 5275),
(6914, "Y-40", "2", 0.573, 5275),
(6938, "Y-40", "2*Z", 0.825, 5275),
(6917, "Y-40", "4", 0.751, 5275),
(4301, "X", "2*Z", 0.436, 5275),
(4301, "Y", "2*Z", 0.436, 5275),
(4308, "X-44", "2*Z", 0.177, 5275),
(4308, "Y-44", "2*Z", 0.177, 5275),
(4302, "X-32", "2*Z", 0.687, 5275),
(4302, "Y-32", "2*Z", 0.687, 5275),
(4308, "X-112", "2*Z", 0.177, 5275),
(4308, "Y-112", "2*Z", 0.177, 5275),
(4301, "X", "Z", 0.436, 5000),
(4301, "Y", "2*Z", 0.436, 5000),
(4312, "X-30", "Z", 1.047, 5000),
(4312, "Y-25", "2*Z", 1.047, 5000),
(4313, "X-212", "Z", 0.801, 5000),
(4314, "X-212", "4*Z", 0.158, 5000),
(4314, "Y-174", "4*Z", 0.158, 5000),
(65201, "(X+6)/1000", "2*Z", NULL, 36984),
(65201, "(Y+6)/1000", "2*Z", NULL, 36984),
(61011, "(X-85)/1000", "2*Z", NULL, 9172),
(61011, "(Y-85)/1000", "2*Z", NULL, 9172),
(5050, "(X-80)/1000", "2*Z", NULL, 8682),
(5050, "(Y-80)/1000", "2*Z", NULL, 8682),
(65201, "(X+6)/1000", "Z", NULL, 36984),
(69070, "(X-85)/1000", "Z", NULL, 9172),
(69070, "(Y-85)/1000", "2*Z", NULL, 9172),
(65210, "(X-58)/1000", "2*Z", NULL, 63808),
(65210, "(Y-32)/1000", "2*Z", NULL, 63808),
(69025, "(X-222)/1000", "2*Z", NULL, 7863),
(69025, "(Y-195)/1000", "2*Z", NULL, 7863),
(4040, "(X-221)/1000", "2*Z", NULL, 8662),
(4040, "(Y-194)/1000", "2*Z", NULL, 8662),
(65212, "(X-58)/1000", "2*Z", NULL, 45406),
(65212, "(Y-58)/1000", "2*Z", NULL, 45406),
(61011, "(X-178)/1000", "2*Z", NULL, 9172),
(61011, "(Y-178)/1000", "2*Z", NULL, 9172),
(3030, "(X-173)/1000", "2*Z", NULL, 8662),
(3030, "(Y-173)/1000", "2*Z", NULL, 8662),
(67401, "(X+6)/1000", "2*Z", NULL, 54777),
(67401, "(Y+6)/1000", "2*Z", NULL, 54777),
(69040, "(X-70)/1000", "2*Z", NULL, 13678),
(69040, "(Y-70)/1000", "2*Z", NULL, 13678),
(67415, "((X/2)-3.5)/1000", "4*Z", NULL, 49682),
(67415, "(Y-88)/1000", "4*Z", NULL, 49682),
(69041, "(((X/2)-3.5)/1000)-0.006-0.12", "4*Z", NULL, 8554),
(69041, "(((Y-88)/1000)-0.006-0.12)", "4*Z", NULL, 8554),
(2020, "(X-119.5)/1000", "4*Z", NULL, 11288),
(2020, "(Y-204)/1000", "4*Z", NULL, 11288),
(67419, "((Y-88)/1000)-0.006", "2*Z", NULL, 22858),
(61016, "(X-114)/1000", "2*Z", NULL, 9223),
(69014, "(X-70)/1000", "2*Z", NULL, 13678),
(69014, "(Y-70)/1000", "2*Z", NULL, 13678),
(67414, "((X/2)+5.5)/1000", "4*Z", NULL, 62457),
(67414, "(Y-88)/1000", "4*Z", NULL, 62457),
(69069, "(((X/2)+5.5)/1000)-0.006-0.16", "4*Z", NULL, 13249),
(69069, "((Y-88)/1000)-0.006-0.16", "4*Z", NULL, 13249),
(1010, "((X/2)-146.5)/1000", "4*Z", NULL, 11288),
(1010, "(Y-240)/1000", "4*Z", NULL, 11288),
(67418, "((Y-88)/1000)-0.006", "2*Z", NULL, 24640);



INSERT INTO Quincalleria (desc_quin, formula_quin, precio_quin) VALUES 
("EMPAQUETADURA PERFIL 6901", "2*Z", 0),
("EMPAQUETADURA PERFIL 6902 IZQUIERDA", "Z", 0),
("EMPAQUETADURA PERFIL 6902 DERECHA", "Z",0),
("FELPA 7X8 FIN SEAL", "4*(X/1000)+6*(Y/1000)*Z", 55),
("BURLETE EPDM", "2*(X/1000)+4*(Y/1000)*Z", 830),
("CAJA REG. SIMPLE AGUJA 111 E-502A", "4*Z", 2500),
("GUIA TAPA", "4*Z", 90),
("GUIA CONTRATAPA", "8*Z", 90),
("CIERRE OMNIA 2048", "2*Z", 2500),
("KEEPER 2170/80", "2*Z", 0),
("ENGANCHE CURVO (2050,711)", "2*Z", 0),
("TOPE AMORTIGUADOR PERFIL 6903 PUERTA VENTANA", "4*Z", 0),
("TOPE ESTANCO SUPERIOR PERFIL 6901", "Z", 170),
("TOPE ESTANCO INFERIOR 6902", "Z", 110),
("TRLCBPH 1X8", "16*Z", 15),
("TOPE ESTANCO PERFIL 6901 SUPERIOR", "Z", 86),
("TOPE ESTANCO PERFIL 6902 INFERIOR", "Z", 54),
("BURLETE 'U' EPDM", "2*(X/1000)+4*(Y/1000)*Z", 830),
("CAJA REG. SIMPLE AGUJA 111 E-502A", "4*Z", 3500),
("CIERRE OMNIA 2048", "Z", 2500),
("SUPLE 6903 KEEPER","Z", 190),
("ENGANCHE CURVO (2050,711)", "Z", 457),
("MECANISMO UNIPUNTO 8626", "Z", 4224),
("CIERRE MANILLA MARTELINA ROMY", "Z", 5500),
("KEEPER MARCO 8630", "Z", 500),
("SEGURO ANTIELEVACION 8631", "Z", 242),
("TAPA REFUERZO IZQUIERDA", "4*Z", 34),
("TAPA REFUERZO DERECHA", "4*Z", 34),
("TOPE AMORTIGUADOR PUERTA VENTANA", "4*Z", 53),
("TRLCBPH 1X8", "16*Z", 10),
("KEEPER 2170/80", "1", 302),
("UNION L S-43", "4*Z", 600),
("BURLETE BASE EPDM", "2*(X/1000)+2*(Y/1000)*Z", 190),
("BURLETE CUÑA EPDM", "2*(X/1000)+2*(Y/1000)*Z", 220),
("CLIP SIMPLE S-43", "(X/100)+(Y/100)*Z", 100),
("UNION L S-43", "8*Z", 600),
("MANILLA CREMONA 879", "Z", 6447),
("KIT DE CIERRE K-4000E DOS PUNTAS 1 HOJA EXT.", "Z", 3116),
("BRAZO DE PROYECCION", "Z", 24545),
("BURLETE DOBLE CONTACTO SID 064 EPDM", "4*(X/1000)+4*(Y/1000)*Z", 126),
("CONECTOR APERTURA EXTERIOR S-43", "2*Z", 89),
("BULON 8MM", "2*Z", 290),
("BURLETE BASE EPDM", "2*(X/1000)+2*(Y/1000)*Z", 178),
("BURLETE CUÑA EPDM", "2*(X/1000)+2*(Y/1000)*Z", 325),
("CLIP SIMPLE S-43", "(X/100)+(Y/100)*Z", 51),
("BISAGRA 3 PALETAS 6013", "3*Z", 9498),
("MANON 874 SAVIO", "Z", 12800),
("CERRADURA 44221,30 tesa", "Z", 13300),
("CLIP DOBLE S-43", "(X/100)+(Y/100)", 140),
("BURLETE EPDM DC SID-064", "2*(X/1000)+4*(Y/1000)*Z", 325),
("TRCBPH 5/8 X 8", "14*Z", 15),
("SOPORTE X-43 PERFIL 4317 X48mm", "2", 300);

INSERT INTO Cristal (desc_cristal, precio_cristal) VALUES
('4+10+4', 38000),
('5+10+5', 45000),
('4+10+6', 48000),
('4+10+6 Lam', 60000),
('4+12+4', 38000),
('4+10+4 C.Solar', 60000),
('4+12+4 C.Solar', 60000),
('5 mm', 25000),
('4 mm', 23000),
('6 mm', 27000),
('6 mm Lam', 38000),
('8 mm Lam', 45000),
('8 mm', 32000),
('10 mm', 38000);

INSERT INTO Color (nombre_color) VALUES
('NOGAL'),
('TITANIO'),
('MATE'),
('BLANCO'),
('ANTRACITA'),
('ROBLE DORADO'),
('NEGRO');

INSERT INTO Material (nombre_material, texto_calidad, texto_termopanel) VALUES
("ALUMINIO PREMIUM XELENTIA", "ALTA", "WARMEDGE"),
("PVC EUROPEO", "ALTA", "WARMEDGE"),
("ALUMINIO ESTÁNDAR BÁSICO", "ALTA", "WARMEDGE");

INSERT INTO Tipo (descripcion_tipo, id_material, formula_ancho, formula_alto, cantidad_cristal, porcentaje_quinc, largo_perfil, minimo, maximo, ganancia) VALUES
--ALUMINIO PREMIUM XELENTIA--
("VENTANA CORREDERA CHICA CLASE A", 1, "(X/2)-65", "Y-124", "2*Z", NULL, NULL, 0, 1700, 85),
("VENTANA CORREDERA GRANDE CLASE A", 1, "(X/2)-65", "Y-124", "2*Z", NULL, NULL, 1700, 2400, 85),
("VENTANA PAÑO FIJO CLASE A", 1, "X-64", "Y-64", "Z", NULL, NULL, NULL, NULL, 85),
("VENTANA PROYECTANTE CLASE A", 1, "X-134", "Y-134", "Z", NULL, NULL, NULL, NULL, 85),
("VENTANA ABATIR CLASE A", 1, "X-134", "Y-134", "Z", NULL, NULL, NULL, NULL, 85),
("PUERTA ABATIR CLASE A", 1, "X-230", "Y-193", "Z", NULL, NULL , NULL, NULL, 85),
--PVC EUROPEO--
("VENTANA MARCO FIJO CLASE A", 2, "X-90", "Y-90", "Z", 10, 5.8, NULL, NULL, 55),
("PUERTA ABATIR CLASE A", 2, "(X-58)-173", "(Y-32)-173", "Z", 19, 5.8, NULL, NULL, 55),
("VENTANA ABATIR CLASE A", 2, "X-183", "Y-183", "Z", 8, 5.8, NULL, NULL, 55),
("VENTANA CORREDERA CHICA CLASE A", 2, "(X/2)-129.5", "Y-214", "2*Z", 16, 5.8, NULL, 1700, 40),
("VENTANA CORREDERA GRANDE CLASE A", 2, "(X/2)-156.5", "Y-250", "2*Z", 10, 5.8, 1700, 2400, 55),
--ALUMINIO ESTÁNDAR BÁSICO--
("VENTANA CORREDERA CHICA CLASE B", 3, "(X/2)-65", "Y-124", "2*Z", NULL, NULL, 0, 1700, 75),
("VENTANA CORREDERA GRANDE CLASE B", 3, "(X/2)-65", "Y-124", "2*Z", NULL, NULL, 1700, 2400, 75),
("VENTANA PAÑO FIJO CLASE B", 3, "X-64", "Y-64", "Z", NULL, NULL, NULL, NULL, 75),
("VENTANA PROYECTANTE CLASE B", 3, "X-134", "Y-134", "Z", NULL, NULL, NULL, NULL, 75),
("VENTANA ABATIR CLASE B", 3, "X-134", "Y-134", "Z", NULL, NULL, NULL, NULL, 75),
("PUERTA ABATIR CLASE B", 3, "X-230", "Y-193", "Z", NULL, NULL , NULL, NULL, 75);

INSERT INTO TipoPerfil (id_tipo, id_perfil) VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),
(2,1),(2,2),(2,3),(2,4),(2,7),(2,8),
(3,9),(3,10),(3,11),(3,12),
(4,9),(4,10),(4,13),(4,14),(4,15),(4,16),
(5,9),(5,10),(5,13),(5,14),(5,15),(5,16),
(6,17),(6,18),(6,19),(6,20),(6,21),(6,22),(6,23),
(7,24),(7,25),(7,26),(7,27),(7,28),(7,29),
(8,30),(8,25),(8,31),(8,32),(8,33),(8,34),(8,35),(8,36),(8,37),(8,38),
(9,24),(9,25),(9,26),(9,27),(9,39),(9,40),(9,41),(9,42),(9,43),(9,44),
(10,45),(10,46),(10,47),(10,48),(10,49),(10,50),(10,51),(10,52),(10,53),(10,54),(10,55),(10,56),
(11,45),(11,46),(11,57),(11,58),(11,59),(11,60),(11,61),(11,62),(11,63),(11,64),(11,65),(11,56),
(12,1),(12,2),(12,3),(12,4),(12,5),(12,6),
(13,1),(13,2),(13,3),(13,4),(13,7),(13,8),
(14,9),(14,10),(14,11),(14,12),
(15,9),(15,10),(15,13),(15,14),(15,15),(15,16),
(16,9),(16,10),(16,13),(16,14),(16,15),(16,16),
(17,17),(17,18),(17,19),(17,20),(17,21),(17,22),(17,23);


INSERT INTO TipoQuincalleria (id_tipo, id_quincalleria) VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),
(2,1),(2,2),(2,3),(2,4),(2,16),(2,17),(2,18),(2,19),(2,7),(2,8),(2,20),(2,21),(2,22),(2,23),(2,24),(2,25),(2,26),(2,27),(2,28),(2,29),(2,30),(2,31),
(3,32),(3,33),(3,34),(3,35),
(4,36),(4,37),(4,38),(4,39),(4,40),(4,41),(4,42),(4,43),(4,44),(4,45),
(5,36),(5,37),(5,38),(5,39),(5,40),(5,41),(5,42),(5,43),(5,44),(5,45),
(6,32),(6,46),(6,47),(6,48),(6,49),(6,50),(6,43),(6,44),(6,51),(6,52),
(12,1),(12,2),(12,3),(12,4),(12,5),(12,6),(12,7),(12,8),(12,9),(12,10),(12,11),(12,12),(12,13),(12,14),(12,15),
(13,1),(13,2),(13,3),(13,4),(13,16),(13,17),(13,18),(13,19),(13,7),(13,8),(13,20),(13,21),(13,22),(13,23),(13,24),(13,25),(13,26),(13,27),(13,28),(13,29),(13,30),(13,31),
(14,32),(14,33),(14,34),(14,35),
(15,36),(15,37),(15,38),(15,39),(15,40),(15,41),(15,42),(15,43),(15,44),(15,45),
(16,36),(16,37),(16,38),(16,39),(16,40),(16,41),(16,42),(16,43),(16,44),(16,45),
(17,32),(17,46),(17,47),(17,48),(17,49),(17,50),(17,43),(17,44),(17,51),(17,52);