-- ============================================================
-- DEMANDAS / ATENDIMENTOS — histórico do gabinete (1A-Tarefas)
-- Total: 292 demandas
-- ⚠ Rode 01-eleitores.sql ANTES — as demandas referenciam os IDs dos eleitores
-- Gerado em 2026-05-26T01:55:04.272Z
-- ============================================================
BEGIN;

INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c9bf72ba-1a27-48a3-8cd6-6c6083562bd3', 'b30d4905-e6bc-495e-9005-f962c67360c1', 'Doação', 'Resolvida', 'Doação para Baguete', '2023-09-22', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9e4e94a6-496f-4196-b101-47bda0f57101', '95430ce3-41b0-45f9-a7b9-8a6e80050b31', 'Doação', 'Resolvida', 'Doação para festa dele', '2023-09-14', '30,00 para àgua
Assessoria: sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('563829dd-79aa-4f64-846a-fbc44163052f', '4aab6df4-f42f-41b2-8b0c-6bbb1021b76c', 'Doação', 'Resolvida', 'Doação para CCC', '2023-09-12', 'Marco doou 50,00
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('45df920f-d0d2-4e23-80d5-29b269d20a5d', 'dc0adae6-64a0-47ae-94b3-d94577da245f', 'Doação', 'Resolvida', 'Doação pa 72', '2023-08-26', 'Doação de coberto para prenda do Show de prêmios
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f5c36212-d5c7-4303-a0fa-c1d1df25a52d', '3aaeeaa1-ef3c-4e66-b735-0caed394e7c4', 'Doação', 'Resolvida', 'Doação de sucos para pedalada', '2023-06-20', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ffc2d7e9-6c03-40a4-a220-a5973e999bd0', '479f17da-79a1-43c8-a1c9-be363f8a07c4', 'Doação', 'Resolvida', 'Descartavél para festa junina  dia 25/06', '2023-06-15', 'Já foi entregue
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('1f3fdf9d-56ff-46d6-ba03-f77d4623b3cc', '099f4a65-d203-4b6b-b9e7-5661716ee071', 'Doação', 'Resolvida', 'doação descartavél', '2023-06-13', 'foi doado e deixado na casa de ração
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4492449f-f797-4299-877d-cc70e68345e6', '01a98d0c-9ddd-47a5-b7fa-d9b393811c4d', 'Doação', 'Resolvida', 'Bombom 72 femi', '2023-03-15', 'para dia 14 de abril
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ca99493d-4c53-47d3-9006-134eb9f5514a', 'b8c5cb84-1f65-4994-b1b1-5b5cdc0b6120', 'Doação', 'Resolvida', 'Cesta basica para amiga', '2023-03-10', 'Ja conseguimos levar para ela
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('83695a3a-5f2a-42a5-b017-9c0c779938c3', '6d1b05b7-e649-4822-bf8d-2ac67a110a08', 'Doação', 'Resolvida', 'Doação de bombons para 72', '2022-08-16', 'Marco vai doar 1 pacote
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('06255dad-e992-44b3-8a61-132f69fe783f', 'd761ec2f-63ce-46bc-8898-8f1685dc4678', 'Doação', 'Resolvida', 'Doação para o ERMEC', '2022-06-22', 'Marco ja doou
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('35176e23-63f8-42d5-be53-e3ef8b0fbb1f', 'ae4abf09-5e77-4f2d-9cec-0581ad98af12', 'Doação', 'Resolvida', 'Solicitou ajuda com Cesta Basica', '2022-06-20', 'estamos tentando dispensario
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('23cccc02-34eb-4352-bf81-4bb08f07625b', '6d1b05b7-e649-4822-bf8d-2ac67a110a08', 'Doação', 'Resolvida', 'Doação de 50,00  reais para 72', '2022-06-07', 'Su fez o PIx
Assessoria: Sueli / Andrea', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9bf3d5f6-ae93-4881-8011-2bbfc31d0018', '61a5921b-3b77-4050-8128-d8dc3bbe7fe3', 'Doação', 'Resolvida', 'Doações de maçãs', '2022-05-26', 'Não precisou mais
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e5ac5ac8-52bb-4c17-86e9-9adb79ecc4b6', 'b0a296a7-0f9f-4662-a594-f61c1ccdd150', 'Doação', 'Resolvida', 'pediu doação de materil de construção para senhor de idade', '2030-02-01', 'veio no gab dia 03/02
Assessoria: Sueli /Vanessa', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('47900209-9a3c-4f69-825d-aba89e94cce0', 'a4634d19-3448-452f-8f2e-94be6e68bea5', 'Educaçao', 'Resolvida', 'Informações sobre ação judicial', '2023-05-02', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c8bea6b8-d945-4820-a30a-2af025516af1', '7a22579f-5277-4cf2-b0ee-3d0f378dd18e', 'Educaçao', 'Resolvida', 'Vaga transferencia', '2023-02-09', 'Ligueri na educação tem uma criança na frente
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('26ffb96f-c647-4620-ab9a-3c18ca23c623', '4a442e65-d072-43e7-af21-be909df7dfaa', 'Educaçao', 'Resolvida', 'Sobre bloqueio de vaga na creche', '2023-02-01', 'Liguei na Educação e ele realmente perdeu a vaga, pois não passou o endereço completo, por duas vezes .. Foi orientada a procurar a escola para meio periodo ou fazer nova Inscrição em abril
Assessoria: Sueli /Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('507d0db3-ab7d-415d-9a56-5dbb8f48624a', '5d75c47c-0735-466c-8ef9-9f91d388391c', 'Educaçao', 'Resolvida', 'Vaga na creche meu Cantinho', '2022-08-30', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ae17c0c0-10d6-4f98-98e3-5daa4773e678', '38236e1f-cafa-4f0c-ac8b-b191fa4ad918', 'Educaçao', 'Resolvida', 'Vaga de creche - Heloise de Andrade Sant´ana', '2022-07-21', 'Ofício  educação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('40cb78cb-d864-45df-bd31-3899ef92ffc2', 'f8dbf6c7-5cc4-4af4-b93b-de37743a3bef', 'Educaçao', 'Resolvida', 'Vaga de Creche', '2022-04-28', 'rua Luis Guilherme Boim 140
Assessoria: Leandro/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5fe461d1-81f0-4461-85ab-035e6b17491b', '524cab94-ea3b-4156-b32d-03408ae9d902', 'Educaçao', 'Resolvida', 'Vaga escola - veio cidade de fora', '2023-01-01', 'conversei na Educação pediu para ela ir la - conseguiu a transferencia
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('7e212c4d-c68f-414b-9654-9b5e67de83e7', 'ec05b837-5959-49de-be18-f30007bf77c1', 'Educaçao', 'Resolvida', 'Transferencia de creche', '2023-01-01', 'Falei com Alessandra na Educação, que  informou que ela é  aprimeira na lista de transferencia
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('2b9dc991-e309-4b66-a2fe-7982f82edc8b', 'c7c2b32e-e022-4b29-9a32-cd07e4c36b62', 'Emprego', 'Resolvida', 'Emprego Tecipar', '2022-03-31', 'Já enviou o curriculo - falei com Nelci - Não pasou na entrevista
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('dcb62551-6560-4629-8cd0-ceb0540f6c8e', '77135b3e-4f2f-457f-a675-946ee80380c1', 'Habitação', 'Resolvida', 'Cadastro da Habitação', '2023-08-23', 'Passei as informações e ela fez
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('aa4a9973-6953-4855-8f40-087f4d4d3d45', '71b1cc3b-df5d-4ab2-96bc-2d04790f9764', 'Habitação', 'Resolvida', 'Inscrição casa propria', '2023-06-13', 'enviei po link para inscrição
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9c29355a-ef9f-4949-89a8-ded38c27b466', '9bfa01e6-f579-4b21-a03a-46acc7700c72', 'Habitação', 'Resolvida', 'informaçoes para cadastro habitacional', '2023-01-01', 'indicamos o claudio da Pref
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4078520e-c1bf-425d-b6ca-e03b67c1a4bc', '9d350021-8004-4a1f-b8cd-cf0f97c01136', 'Habitação', 'Resolvida', 'Cadastro da Habitação', '2023-01-01', 'enviei o link
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('244e3944-27c6-4d6b-ba98-b223a2821976', '8b70ebfe-8574-40b8-968a-d39308f176b6', 'Habitação', 'Resolvida', 'Cadastro da Habitação', '2023-01-01', 'vai vir fazer no gabinete
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('85470866-54dc-433b-83a4-45d29959ace2', 'ebc143a7-2a43-4176-9a0f-5354ea6366e4', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Resolvida', 'Homenagem', '2023-09-14', 'Nome de  rua
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b15578a0-7869-4004-8abe-1124b1834a7b', 'c72f3192-98e6-444e-a7ae-68822ec8e9ad', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Resolvida', 'Homenagem dia da Mulher', '2023-02-24', 'Vanessa  falou com ela
Assessoria: Sueli/Vanessa', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5171bc9d-436b-43a9-9e3c-70991bc71f1c', 'c8abf79d-c6d6-4dd8-9d23-7b1b2d86fbb2', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Resolvida', 'Nome de rua do Marcelo  -o atirador Marcelo Hencklein', '2022-05-16', 'Já protocolado
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('315e4ae1-66c3-40f7-b060-3aa8a596f796', 'a45fa7df-21d5-4109-9f5c-1554f833b10c', 'Iluminação', 'Resolvida', 'luzes apagadas', '2023-01-01', 'foi feito 156 e foi resolvido
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f57bd734-355f-4643-a030-705b36d3ce47', '4353db58-0dd5-477f-ac69-ac8d537f2acc', 'Iluminação', 'Resolvida', 'lampadas', '2023-05-18', 'sonia numes e lourdes SJE pastel
Assessoria: leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('73373e85-aba7-4d7a-aa04-1a27f3437104', 'c12edcc8-6450-4abb-9b19-c802723c79bd', 'Iluminação', 'Resolvida', 'poste apagados  - Rua joão batistela', '2023-03-13', 'fizemos 156- - 1438517
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('d47b8ed1-235e-4686-9dbc-30d241982906', 'e0ba8063-138f-44b6-93af-ff11adebc4f7', 'Iluminação', 'Resolvida', 'Iluminação - ficando sem energia todos sos dias', '2023-03-09', 'Eletro Ja resolveu
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('31bb96d0-d666-44f0-95d5-162bd79cc1de', '0331475e-4459-4e42-a934-5c0af955c637', 'Iluminação', 'Resolvida', 'Praça  Novo Horizonte', '2023-03-01', 'Fiz  156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ef84f90b-c37e-4173-b2a6-321f9e2377d5', '15bafa4f-1d85-40b9-be5d-3e9038441741', 'Iluminação', 'Resolvida', 'luz poste apagadas', '2023-03-01', 'protocolo 1415790
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('719f73dc-fe90-41d4-a18d-3baea40e5996', '3ace1072-9d51-4c61-9484-1cde4a84d92a', 'Iluminação', 'Resolvida', 'pedido de iluminação publica', '2023-02-23', 'foi feito 156 e indicação
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('1c8b2106-4472-49e8-92d4-deac147541a0', '0331475e-4459-4e42-a934-5c0af955c637', 'Iluminação', 'Resolvida', 'Poste Illuminação', '2023-02-09', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('1c9684df-b66e-49ae-9430-e5fba5df3264', 'f5139088-030a-46f7-828a-477820bb74c4', 'Iluminação', 'Resolvida', 'Luz poste apagada - protocolo 1385879 dia 01/02/2023', '2023-01-26', 'Poste apagado - Rua dInamarca , 125
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f3fcac3c-1fab-44ae-a667-273e90602988', '25a41167-7c0a-47aa-9c45-346007ee369e', 'Iluminação', 'Resolvida', 'Luzes do Postes apagadas na rua da casa dela e na frente da escola Dom Idilio', '2022-09-05', 'Fiz 156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e6158336-ca46-4a06-93ae-c4023f0a72c0', 'bda83691-30da-408f-9097-a4a184e20f47', 'Iluminação', 'Resolvida', 'Fiz 156', '2022-06-20', 'Resolvido
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e006b009-10a2-4d52-90de-1419a9342399', '7363b064-c6cf-4528-bbd1-1b886cacf859', 'Iluminação', 'Resolvida', 'Luzes da rua dela apagada', '2022-04-05', 'Fiz o pedido no 156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('106fcb50-dd66-4391-a596-4648d6c43085', '7363b064-c6cf-4528-bbd1-1b886cacf859', 'Iluminação', 'Resolvida', 'Luzes apagadas', '2022-04-04', 'Fiz solicitação no 156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('17793d40-cc80-447c-b452-69a07f480d7a', '107c04c1-a7ce-44ab-8b89-1631ca15e89a', 'Iluminação', 'Resolvida', 'Iluminação 156 - Agilizar', '2022-03-22', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('27049a65-e82d-4960-bd45-3537e2969a90', 'c203243d-e7d7-4a5c-b703-34028e5518b5', 'Iluminação', 'Resolvida', 'Iluminação Hipica', '2022-03-13', 'Fizemos Indicação
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f113df95-d1cb-41da-a0e9-58633533c2fa', '3891565c-4d4a-40ed-af12-30c565097d38', 'Iluminação', 'Resolvida', 'Fez 156', '2023-01-01', 'Resolvido
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4bdf90c4-db9d-4207-9186-33ef0be5c5b6', '749924ad-55cb-4169-8e5f-10cc989a8232', 'Judicial', 'Resolvida', 'Solicitou Judicialização de Med ind Dra Ana', '2022-03-23', 'Passamos contato Dr Ana
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('53a7c9f8-378b-493d-ad8a-180cfbb2b78c', '3b328eb7-a076-497c-9e18-067ca6bcfa42', 'Meio Ambiente', 'Resolvida', 'Remoção de árvore', '2023-01-01', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('bfbae39b-0d58-4646-9d83-b4a5d409270f', 'ebff0b4d-86ab-4b3c-b7de-0692e505507f', 'Meio Ambiente', 'Resolvida', 'Cadeira de rodas para vizinha', '2023-05-19', 'Disse que ia ver se a vizinha ainda ia precisar e avisava
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('6a81ca63-44ae-4641-9ecb-93c53991e46a', '3891565c-4d4a-40ed-af12-30c565097d38', 'Meio Ambiente', 'Resolvida', 'Mato alto e limpeza de terreno', '2023-03-10', 'Indicação foi feito
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('656238f9-5ad1-476d-97bd-959867bba291', '121ed108-b5eb-42db-856d-3acbc403729f', 'Meio Ambiente', 'Resolvida', 'poda de matao em area verde', '2023-02-23', '156 e indicação
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3bccb35f-b3a9-4e6f-8357-42b27a50d94d', 'ef09ea47-7faf-4795-8e36-2b3bcf0e4a84', 'Meio Ambiente', 'Resolvida', 'Limpeza  tereno Jd do Lago', '2023-02-09', 'Visitar o local - Já a visamo s que foi liberada verbas  para o Bosque
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('aa4822ef-6e9e-4ff5-b448-95721c445c0e', '6cd4b2b2-44cd-416e-b225-3a90f44cd95b', 'Meio Ambiente', 'Resolvida', 'poda de mato vizinha da mae', '2023-02-07', 'rua Vitorio Ceneviva 241 fizemos 156
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f19d5b3c-8cb1-45dc-818b-2648194db89d', '02314a9a-b20e-4928-8b12-5a14ba1cc6f7', 'Meio Ambiente', 'Resolvida', 'poda de árvore', '2023-02-06', 'fizemos indicação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('2eb1650e-acda-4238-a586-ea7f126fb299', 'fc2c0c80-aba5-4c97-b165-c7962b44ff36', 'Meio Ambiente', 'Resolvida', 'remoção de arvore', '2023-02-01', 'protololei pedido dia 01/02/23
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4dfe1d0a-bf2e-4471-8c4b-8734b637e41a', '79c91ea5-c7b9-4403-b0f6-b916ee6d56ce', 'Meio Ambiente', 'Resolvida', 'Corte de Raiz de árvore', '2022-08-16', 'Indicação 2014/2022 - Resposta que foi deferido
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5f476bcc-c218-406b-b1f5-98af8948ea3f', '9b914319-24fa-4951-8013-62ee46cdedaa', 'Meio Ambiente', 'Resolvida', 'Poda de arvore', '2022-07-28', 'pedimos via gabinete betinho
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a121e4e2-cf21-4661-9970-aa79338c443b', '7d3955bd-3e84-4a4d-a668-1f66681d8f63', 'Meio Ambiente', 'Resolvida', 'Mato alto - Jd Nova Suiça', '2022-07-25', '156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('eca844d3-17c3-432d-80a2-c71caa26a03e', '70046bf9-3850-4a7a-94c8-7ba6935fcc18', 'Meio Ambiente', 'Resolvida', 'Limpeza de praça', '2022-05-12', 'fizemos indicação - Marco falou com Betinho
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('980b6a6b-d0d5-4dfb-a9dd-d879487b50de', '858c809f-575e-49de-8a6e-4cc4e80918fb', 'Meio Ambiente', 'Resolvida', 'Limpeza terreno vizinho', '2022-05-11', 'foi feito pedido 156 prot  292208
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('2e46a4aa-31dc-44f1-8c7c-e27e4ccd190a', '6605e8b3-aa3b-41f1-8dbf-3c58ac942f52', 'Meio Ambiente', 'Resolvida', 'Pediu para consultar o protocolo de árvore', '2022-04-05', 'Leandro viu com a Camila do Meio ambiente
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ddbfaf7c-8383-4e07-a44f-156798a0e618', '8fc3f79a-c5e5-41bb-9068-1e5869d29476', 'Meio Ambiente', 'Resolvida', 'Aparar a árvore', '2022-03-19', 'Mora casa de Aluguel do Edson da Marilu
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5854b752-f0cb-4bbe-84c9-8591456c46d4', '1ab308c7-9d1c-422a-a1d0-e454a85a93ec', 'Meio Ambiente', 'Resolvida', 'Limpeza de praça', '2022-03-14', '(aconteceu)  grata
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('81b91d93-6c42-45ae-b1b0-78732a5d9e60', '47660295-3fad-4fd5-a12f-f1d1c075845f', 'Meio Ambiente', 'Resolvida', 'Poda de mato area verde', '2022-03-03', 'Indicação e 156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('443781e2-253e-4fe3-9334-0f24da6ded47', '8b29bc4f-c86f-4845-b271-a81b50c9d7a3', 'Meio Ambiente', 'Resolvida', 'Corte e retirada arvore/reduçao de velocidade', '2022-01-01', 'Passado para Simone dar uma atenção
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('38db8f3d-7730-4c04-a183-9c26fa41b8a9', 'e28f7286-92be-4ee1-9efd-88cc3b7d383f', 'Meio Ambiente', 'Resolvida', 'Árvore casa Pai dele', '2022-01-01', 'Foi removida
Assessoria: Marco/Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('bb26eca1-c7e8-4345-86c3-f235f9f0eb5d', '63a4a3a2-8e04-49dd-a514-b791f273e60b', 'Meio Ambiente', 'Resolvida', 'remoção de galhos de árvore', '2023-01-01', 'foi feito 156 e foi resolvido
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('bcf2d201-e706-4f62-8d2d-c9d479638cce', '3b46e943-afc7-4eb9-b9ae-78d297bec402', 'Obras', 'Resolvida', 'poda de mato alto na ALA', '2023-12-08', 'Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9e3583f0-59e4-4250-89a7-1a0726450259', '36854283-3462-44f6-ac73-ebefac78669f', 'Obras', 'Resolvida', 'Tapa buraco', '2023-06-15', 'Foi feito indicação 2033/2023 e 156 - 1540457
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('91394b9f-f9f6-4e0c-9923-54f8117892ac', '8080cf0d-9ee2-4b2e-b96a-3cf6cf6a1f11', 'Obras', 'Resolvida', 'Luzes apagadas', '2023-05-14', 'Protocolo 1596610
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('bc1f759b-5b19-405c-8c31-04008a4ddf9e', '9891c11f-658d-4fdb-953d-35b3882ea941', 'Obras', 'Resolvida', 'limpeza na rua novo horizonte', '2023-03-15', 'indicação 892/2023
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('cfa0c529-a117-4310-bef7-282bc5ee5c84', 'e25f1e67-7404-497b-a740-2e20850b19f6', 'Obras', 'Resolvida', 'Limnpeza de Viela', '2023-03-10', 'protocolo 141888-7
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('6507e771-4dfc-465c-bee4-085109121a59', '86fe8ffb-6de5-4b9c-9298-a7344b1ffb31', 'Obras', 'Resolvida', 'Tapa buracos', '2023-03-10', 'foi feito Indicação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('d0993912-1517-42bd-8a79-c00dd9433917', 'afc8cf96-c15f-45bf-bbf0-fcefeb41670e', 'Obras', 'Resolvida', 'Piscina do Alberto Savoi', '2023-03-10', 'Fizemos requerimento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a3f19fe6-b212-4fe9-95f2-76c09b86a06f', '48fddba8-1baa-447f-a8bc-a2cdb13b8f75', 'Obras', 'Resolvida', 'enchente na rua jose paulilo chacara antonieta', '2023-02-07', 'solicitei melhorias via 156  / nunca mexeram 15/06/2023
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('484a82f3-f2d0-4e6d-b35a-7e944989c6f5', '858c809f-575e-49de-8a6e-4cc4e80918fb', 'Obras', 'Resolvida', 'buraco', '2023-02-06', 'fizemos indicação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e1d67197-8ae7-486d-8e9a-14b7a697b45a', '6f91514e-3c07-4074-96bf-c7f285a9c932', 'Obras', 'Resolvida', 'Vou passar ver o local que ela falou', '2022-08-29', 'Fiz um 156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e7eeb2e2-661d-4d6a-8f11-5ca614348e26', 'b407d11b-4e64-4036-b9de-477ee3dabe54', 'Obras', 'Resolvida', 'Tapa buraco na frente da casa da mãe dele', '2022-08-23', 'Indicação 2077/2022
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3d11cfb6-cddc-4015-af90-1a4665d1437b', '5a4e452a-70dd-4923-9f37-a8a36d37199c', 'Obras', 'Resolvida', 'Tapa-buraco', '2022-05-27', 'fizemos indicacao
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b82a7402-b98a-4959-acd1-8ce4ee87f537', 'a1ebb520-3789-40ac-81aa-735fda96e9c3', 'Obras', 'Resolvida', 'Tapa buraco boa vista ruad a Alegria', '2022-05-20', 'fizemos indicação Nº 1435/2022
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('6db7d860-1ff1-4e74-b5c2-22a7793f5c23', 'e4a56eb6-f513-4e48-9411-5d4964ae36cc', 'Obras', 'Resolvida', 'Ilumanação praca jd montezuma', '2022-05-19', 'fizemos indicação / resp negativa da prefeitura sem orçamento
Assessoria: Marco/Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('50304afc-b98e-46b2-86ae-3d4c4cbade60', 'c203243d-e7d7-4a5c-b703-34028e5518b5', 'Obras', 'Resolvida', 'Lombada', '2022-04-19', 'pref negou a impantação da lombada
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('99323cc0-49eb-47c5-9341-ea3b05f7d8a8', '2c04e50c-78b7-4b81-9f1d-bf933b7ec761', 'Obras', 'Resolvida', 'Rebaixo de Guia', '2022-04-01', 'Protocolamos um pedido a Secretaria doi atendido
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('36424802-1374-43ec-83e1-788b614ed1eb', '78ee13b6-b4fa-4b57-b99b-e817c471fe4d', 'Obras', 'Resolvida', 'Poda de mato area verde', '2022-04-01', 'Fizemos indicação resposta de que sera inserida na O.S
Assessoria: Leandro/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c0f0e227-e120-42a0-bf1c-8ca657cdde7f', '886cc9e8-ac30-4c1d-9634-189137575f1c', 'Obras', 'Resolvida', 'Tapa buraco praça posto kleber Leite', '2022-03-20', 'Feita indicação
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('bf765cd7-978d-432f-a2c7-ceedbaf81f37', '23537085-a8fd-4def-9427-c0228ca8b118', 'Obras', 'Resolvida', 'Construção de bueiro', '2022-03-07', 'Ja foi feito um pedido e agora novamente outra indicação, veio nova resposta que será reavaliado, mas mesmo assim depende de disponibilidade orçamerntaria.
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('dedbeb1c-73cf-44d6-bc2a-fc128b2d7bcb', '47660295-3fad-4fd5-a12f-f1d1c075845f', 'Obras', 'Resolvida', 'Construção de calçada area verde', '2022-03-03', 'Indicação  - 19/19 Fiz 156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('042f9478-6112-4142-b948-ca5970b46b76', '76651536-b76d-442a-b824-387d5c90b788', 'Obras', 'Resolvida', 'Tapa buraco', '2023-01-01', 'buraco no alto dos laranjais - fez indicação  1598/23
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('882b3294-fa95-4cc7-888c-fcef3cbdfdec', '8cdb596a-6a87-405a-be60-2e6592b8bbf4', 'Obras', 'Resolvida', 'pedido de tapa buraco nova suiça', '2023-01-01', 'Assessoria: leandro / marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ae0e163d-fe56-404e-a2cf-66707b4d455b', '4849177d-6c9b-42a6-8f85-1946ded014ca', 'Outros', 'Resolvida', 'Filiação no partido', '2023-01-01', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3dce2b3a-3489-441e-9e01-33cf8ce3fdae', '21e5adb3-28dd-489b-b96d-153286f06067', 'Outros', 'Resolvida', 'Sobre casa de repousa parea uma cliente dela', '2023-08-18', 'Falou com  a Renata da Prefeitura sobre o procedmiento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3b8ecfc1-cfe8-4339-925b-c5c46eaac574', '6206672a-cc8e-4644-ad50-14ac03888453', 'Outros', 'Resolvida', 'Informações sobre a reforma no bairro Novo Horizonte', '2023-06-15', 'enviamos as fotos do projeto
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('d292d1d2-24d8-4241-bed9-84e1efea4876', '3456a654-1e49-4cbd-8daf-227db4c18074', 'Outros', 'Resolvida', 'Aposentadoria INSS', '2023-06-14', 'Marco passou para o Lima que avisou q tem processo judicial e agora tem q esperar
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ffd8218f-5bb4-4d8a-af86-03d2e5aefb66', '0c7b77f7-8718-4d35-b971-7dff87aad17b', 'Outros', 'Resolvida', 'Sobre a Casa do Pai', '2023-06-13', 'Leandro puxou td na prefeitura e passou para ele
Assessoria: Leandro/ Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('6775ef9e-1b8a-4a69-a868-f97731cfd132', '19200f17-a14d-4a73-9f24-99f9c4298f96', 'Outros', 'Resolvida', 'IPTU', '2023-06-13', 'veio no gaboinete e falou com Marco sobre o juros do IPTU atrasado
Assessoria: Marco / Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('43057039-c2dd-4be3-887f-ae59ac69852d', '08c51dd0-c12c-47b9-8706-fdb2f61c0a40', 'Outros', 'Resolvida', 'Consulta Neuro', '2023-04-06', 'agendada para 07/06/2023
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4104b05a-02ae-4fd2-926c-731604d0d8a7', 'e25f1e67-7404-497b-a740-2e20850b19f6', 'Outros', 'Resolvida', 'Limpeza de Viela - Novamente', '2023-03-10', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ef5b34c0-03f4-4d29-93b2-25bb968d8a6a', '696a327c-aef0-43ff-88bb-aa4325cb8ab2', 'Outros', 'Resolvida', 'agente de transito em lugar irregular', '2023-03-09', 'Fizemos requerimento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('374f5f17-abba-478d-9d03-7a6ce2c9ff7c', 'eb76fa55-1a5a-4df0-8ec5-0015079ab41a', 'Outros', 'Resolvida', 'Casa abandonada', '2023-03-09', 'fez requerimrento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('45a71afb-ad8e-4c62-9be0-4f757585d914', 'ddf1c295-70f6-498e-9777-bbed0d6b8f5a', 'Outros', 'Resolvida', 'Estudo de transito', '2023-03-07', 'pm VAI FAZER O ESTUDO AL NO LOCAL
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('65c62b6c-22cf-4545-a677-88c11bb024b7', 'ca2f009c-9a98-4765-9820-2a870599530e', 'Outros', 'Resolvida', 'Visitar casa / veio no gabinete', '2023-03-06', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('29ecada5-8e2b-445a-87a3-17b14ee5e01f', '5da67f48-4e91-4198-9af0-3374abe1e1f0', 'Outros', 'Resolvida', 'Limpeza de viela', '2023-02-09', 'fez indicação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ecde2d4e-95f2-480b-a85c-59d9ccab00ca', '6cb70c7e-05a0-4398-847b-a7a87c781769', 'Outros', 'Resolvida', 'Buracos PH', '2023-02-09', 'Marco  falou com ele e pediu para deixar quieto este pedido
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('30093552-6fd6-4b67-881c-08cb247218e7', 'edeba4fe-a676-4716-9383-f68bb74b5b80', 'Outros', 'Resolvida', 'Escreveu livro e quer fazer doação e moção', '2023-02-09', 'Marco visitou
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8f0a7c9f-a8a4-4c46-a204-707da8839b91', '7c4e2de0-97dc-471e-82cc-cc7b1be366d9', 'Outros', 'Resolvida', 'fluxo de mano na frente do vegas bar', '2023-02-07', 'policia fechou o fluxo
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5a24306d-5e11-49de-9d88-d03d1b689971', '5206c763-2d23-4d2c-a4ea-ec90ab98f24e', 'Outros', 'Resolvida', 'Visitar o gabinete', '2023-02-01', 'Veio no gab dia 03/02
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('507c8b91-c0aa-4942-9053-137b22a7cb49', '24cad82b-5e9a-4335-8a63-ee000ca5f8a1', 'Outros', 'Resolvida', 'avaliação de imovel', '2023-01-20', 'visitei o imovel e passamos valor
Assessoria: Leandro / Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b3580f75-80e4-4afa-a043-6bbae341fba9', 'a48c57a4-2c5a-4b61-952b-8e3c4c674415', 'Outros', 'Resolvida', 'Cama Hospitalar', '2022-09-25', 'Marco reservou no dispensario Santa Isabel
Assessoria: Sueli /Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b4236857-cf07-479b-aea5-47027cb7bde1', '0046190c-3bad-4c75-95f8-b63b3b183c62', 'Outros', 'Resolvida', 'Informações sobre onibus escolar para neto', '2022-09-08', 'Liguei na Educação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4a34d3bb-0247-477d-8576-da1d244bd079', '17bc7bdb-88a2-4dc8-9157-147706b81154', 'Outros', 'Resolvida', 'Cadeira de rodas', '2022-07-20', 'Avisei que tem no CARA e passei  procedimento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b7f2700f-c13a-4598-8fec-d74dfad860c4', '6876e5f7-8b89-45ff-8ef9-ce8987d22330', 'Outros', 'Resolvida', 'Multa projeto de casa - orientamos e passamos contato do Juliano, mas fez com o MAX', '2022-06-14', 'Marco Falou com Juliano e passamo o contato para ela
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('6a715dbb-a511-4143-ba42-986dd95342aa', '97f515a5-2033-4f2b-9648-f0df1354f7da', 'Outros', 'Resolvida', 'Alvara de funcionamento especial para  bar', '2022-06-03', 'enviou numero do pedido - Não foi autorizado - fechou o  bar
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f963cd58-9b86-44b7-b4f4-132f70adb1e4', 'c54a8e4a-413e-47f6-806a-3eafc281a1d0', 'Outros', 'Resolvida', 'Pediu informaçoes pra escriturar um imovel de inventario', '2022-05-23', 'passei o valor do marcelo do carotorio
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4f82aabe-1a93-4b02-a830-fadf9703226a', 'db4ec21c-a644-44c1-862d-5a3ffd624720', 'Outros', 'Resolvida', 'Compra de rifa 2 numeros', '2022-05-04', 'ja paguei
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9bd80471-6a9e-4d3b-8c66-e2d5740430d6', '06ac992c-cc44-4adf-8021-8accb4c18661', 'Outros', 'Resolvida', 'Carro abandonado', '2022-04-28', 'Rua Anita Pelegrini Roland, n 131, Jd Alvorada - placa ETO 5081 - protocolo 156 - resolvendo
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('d9d08a80-6219-4a29-8fbe-343fe9661e4b', '7e2fe625-111b-481a-9eb1-0ff782c863e1', 'Outros', 'Resolvida', 'Bar Hipica tomar contar do bar adm', '2022-04-28', 'Foi feito oficio protocolado na pref
Assessoria: Leandro/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('0e1861a5-5327-4a9c-bc80-16a1370bf7be', '8111678c-3726-4b39-b32f-134d9d1e1d72', 'Outros', 'Resolvida', 'Alvará de  funcionamento', '2022-04-14', 'Consultado na prefeitura pelo leandro - encaminhar para Debora - foi feito a vistoria
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8f33ab3c-b3ce-4841-a8b0-d806f6877451', '802890ce-29fd-43a8-83c8-f9854d728002', 'Outros', 'Resolvida', 'Colaboraçao R$ 80,00 viagem aparecida ok', '2022-04-13', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('95f21972-c91e-40a4-a37a-d520098010b4', '381b6830-5021-4752-9abe-3732e2d39d08', 'Outros', 'Resolvida', 'Concreto impedindo a passagem  para creche Lia Maura', '2022-04-08', 'Fiz indicação e enviei para ela - Resposta area particular
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('398f7cde-f60a-4aa3-a5b5-5ba5b8bba251', 'ea9ba26d-4fb5-4293-b686-354c12b8cf88', 'Outros', 'Resolvida', 'Solicitou ajuda para cadeira de rodas e andador', '2023-01-01', 'Conseguimos no Dispensário Jesus Cristo
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('1e7c0847-524f-42cd-bd21-2ce916a74cbf', 'fd7bda03-4302-4259-a254-aed79fcd600b', 'Outros', 'Resolvida', 'Marcar visita na casa', '2023-01-01', 'Marco ja visitou
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('0075c349-b9e4-444b-9824-20b51148729d', '8080cf0d-9ee2-4b2e-b96a-3cf6cf6a1f11', 'Outros', 'Resolvida', 'Carro abandonado', '2023-01-01', 'fizemos a denuncia no 156, com protocolo 1460893
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('032d5e7d-35cc-44a3-9156-25cfcc80a6bd', '861081db-8cff-4726-84e6-fc8204aef032', 'Outros', 'Resolvida', 'Indicação', '2023-01-01', 'Foi realizado
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f8eb84e7-f75d-4009-959c-a9041da0999d', '2b12bd34-c19e-401d-b8b3-fd3d2a15402d', 'Outros', 'Resolvida', 'barulho igreja', '2023-01-01', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('d3e5d97d-7a83-4a91-91d5-0b5e35914ddc', '292af9a5-a074-45d0-9530-9c5fc32d4d26', 'Planejamento Urbano', 'Resolvida', 'Mapa para usucapiao Sitio', '2022-05-11', 'instruimos ir na Sec Urbanismo
Assessoria: Leandro/Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3ce0c782-3115-49d4-a359-81cef639f3ae', '6ceb946b-5eb0-4a83-8223-084850ea9327', 'Planejamento Urbano', 'Resolvida', 'Construção irregular no Jd. Marajoara', '2022-04-04', 'Solicitei no 156 - Protocolo 286619
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('bc2e9e69-cfe8-490d-ac4e-5369d89f76da', 'c13e8519-3914-4aee-989a-08c917c9f876', 'Planejamento Urbano', 'Resolvida', 'Agilizar o processo', '2022-03-10', 'Juliano agilizou
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('6bcd2528-a9c8-40ef-8865-0d29bd1348f7', '6ceb946b-5eb0-4a83-8223-084850ea9327', 'Planejamento Urbano', 'Resolvida', 'Fiscalização de  reciclavel na rua', '2022-03-03', 'Passei para Silvio e para o Betinho ( Mauricio falou para Betinho que está regular)
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('144284b9-b161-4919-bb5e-b8d23e1f19b3', 'd7c4e216-4a82-4c57-bca6-1aacdd5b3c44', 'Saude', 'Resolvida', 'Pedido de cirurgia vasectomia', '2023-01-01', 'Solicitei na Secretaria, mais ainda não deu certo  - MARCOU E ELE VIAJOU NO DIA
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b9df79a5-2cf7-428a-b4d3-22449f225df2', 'ec68259a-d00d-413a-9aa1-f5cba0779270', 'Saude', 'Resolvida', 'remedio', '2023-12-05', 'pegamos remedios com a Deyse
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a0829cd9-8a40-42b3-bb2f-9af09898461d', '4d78437d-3baa-4638-9c54-5742a7481990', 'Saude', 'Resolvida', 'cartão do SUS', '2023-09-11', 'Leandro fez no São João
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e889ce3a-effb-4b24-b315-401324c19b2a', 'a8fd3b70-a163-45a1-8997-5f810c2df5fb', 'Saude', 'Resolvida', 'Exame Endoscopia', '2023-08-29', 'Marco ja resolveu
Assessoria: Sueli /Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('2c2e8dc9-b962-4aa7-8512-472ddb5983e9', '367e768f-8e84-4360-8c8f-22e61a277a9c', 'Saude', 'Resolvida', 'Remédio', '2023-08-24', 'Ver  no alto custo
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3a708ffd-c3d1-4f9f-a2c1-ba719a6d8427', 'ea31073b-90c1-4ec1-bc00-8a5a158e3ebd', 'Saude', 'Resolvida', 'Exames - Transcrever', '2023-08-10', 'Passou por consulta
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('714b2350-1ada-467b-bc6d-84bffecb45ad', '3a05acbc-0ae0-4b78-9eb5-f063f3041af6', 'Saude', 'Resolvida', 'Consulta COL', '2023-08-07', 'Antecipar consulta - Dona Neuza Moacir
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f3ffac91-87c8-47a0-9922-bb877b0f94d6', '7fd9c043-5789-43eb-9f42-12f2714471d9', 'Saude', 'Resolvida', 'Exame', '2023-08-07', 'Chico da Santa Eulalia
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('7afdac3b-540e-4abd-b6ef-4d8e1d090a2c', '0386e800-af3b-4c6f-b33a-a4cab139482e', 'Saude', 'Resolvida', 'Remédio', '2023-06-13', 'Marco consaeguiu
Assessoria: Marco/ Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('58c5350b-b266-4b51-b502-9be25cbd0e55', 'da42d192-310f-4b0d-8a4c-332ebcfdbcd9', 'Saude', 'Resolvida', 'Receita remedios', '2023-05-31', 'Dra Mayra fez
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('061e901b-bb03-4135-9068-157226f32879', '23203d8d-a996-4845-84d7-c4a8a52ba7e8', 'Saude', 'Resolvida', 'Biopsia', '2023-05-23', 'Marco ressolveu para ele
Assessoria: Sueli / Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('23b6f699-9b2c-4de9-a5ec-5237880ad3e0', '1efe029a-8d8c-4fb9-8a29-8686e6ea6404', 'Saude', 'Resolvida', 'Marco passou para Leandro - Daniela Bas', '2023-05-23', ',
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5e111c9c-2575-4298-85a4-a4e5e7421a81', 'af16f27f-1079-4ef4-9dd5-94aec02f93fb', 'Saude', 'Resolvida', 'Tranferencia Hospital', '2023-04-25', 'Marco conseguiu para ela na Humanitaria
Assessoria: Sueli / Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4be9fdd6-9d98-473c-9193-469f2b736330', '31b953be-0498-4f8c-ae4c-5ea99665bf2c', 'Saude', 'Resolvida', 'Demartologista', '2023-04-01', 'Mayra fez encaminhamento e ja´foi agendado para 19/04
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('447de4e8-21fd-4195-82e3-9f40c2ed7cdb', '6d400ef9-d308-4f39-8030-0930f7887170', 'Saude', 'Resolvida', 'Catarata', '2023-03-10', 'pegamos encaminhamento e agora aguardando agendamento com oftalmo
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('72e6d37e-a567-4d51-b4fb-075c3d63df1b', '99f693db-9633-452c-8981-4bf9f30aa0d3', 'Saude', 'Resolvida', 'Aparelho de ouvido', '2023-03-10', 'encaminhou para everton
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5938c229-1074-45b3-9f9f-30ff012eac5d', '6795d735-ab3e-4938-992e-cd646ab567b4', 'Saude', 'Resolvida', 'Exames', '2023-03-09', 'ja demos entrada
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ed928cdf-1ace-4869-b896-168c8505e99c', '22291bb5-8779-4157-9f76-49e95541b74b', 'Saude', 'Resolvida', 'Exame', '2023-02-09', 'Já esta cancelado este papel , pois não conseguiu contato na época  -  Xingou a gente
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5383bee7-f6fb-4d69-b4b5-910f0b48f686', 'cb5ae4a2-b600-4cc7-b3cf-28338c212a35', 'Saude', 'Resolvida', 'pedido exame medico', '2023-01-20', 'solicitei pra retirar do postinho pra dar entrada na secertaria nao me respondeu mais 15/06/2023
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('244073f5-692a-452a-aba0-1a229f431472', '68487658-d95d-4f1d-aff2-6f601352129e', 'Saude', 'Resolvida', 'Quer  ajuda sobre agendamento de consulta Dra cecilia', '2023-01-17', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('11a8ee35-ff85-4e18-910e-2e5a0b68e739', '9983984e-fc71-4fa7-b0f0-3006f866d801', 'Saude', 'Resolvida', 'Receita da DSra Mayra', '2023-01-09', 'Fez e  foi entregue para ela
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a0784cfe-7d04-4d4e-a9f6-2142f007252f', '374fc92f-2f5b-4316-bbf0-8fe940ba170d', 'Saude', 'Resolvida', 'Consulta Mastologia', '2022-11-10', 'Enviei par Leticia da Saúde
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('611653b2-d4c4-4a81-bbff-b69e98beae12', '8a7d9099-452c-48f2-905d-b1314cdb5004', 'Saude', 'Resolvida', 'Consulta com a Dra Mayra para filha Gabriela', '2022-09-02', 'Consultou no mesmo dia
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('907f804c-94b2-45b6-9c4f-389cefd1104b', '5e46df72-4a9e-492f-ba8c-3037724a9b35', 'Saude', 'Resolvida', 'Transcrever exame', '2022-08-31', 'Mandei para o gabinete da Dra Mayra pelo whasapp e fui pessoalmente falar com a funcionaria
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e8966d52-afac-49f7-90c5-3b9396d19fdd', 'daaebbda-9a60-4421-9868-032eb32db421', 'Saude', 'Resolvida', 'Quer consulta  dra Mayra', '2022-08-15', 'Deixei nome para encaixar
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ee46bca6-58d8-49c0-b586-877bf29d2983', '729655ee-23ed-4a2b-9973-1103a4cc12e4', 'Saude', 'Resolvida', 'Exame Ultravaginal', '2022-08-11', 'Levar para Leticia Saúde
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9f4728b1-a25f-4ba7-9091-bc3d8c7c5de4', 'daaebbda-9a60-4421-9868-032eb32db421', 'Saude', 'Resolvida', 'Consulta para dona Geralda e  seu Alcides', '2022-08-11', 'Vanessa ia ver no consultorio Dra Mayra
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8e4dda51-f563-4a52-91c9-a39c21794d8b', 'a4b57ef3-bb24-4cf4-a345-823141ef9288', 'Saude', 'Resolvida', 'receita medicamento', '2022-08-10', 'consegui com a maya
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e18ca6c9-de06-41ef-9002-46616eca3d0b', '27987a7f-ee47-4954-bed9-6ff0ce09aa2a', 'Saude', 'Resolvida', 'Judicialização de medicamento', '2022-06-09', 'cunhado do eduardo indicou o marco
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('78778205-c0ae-4770-8f55-848147c2f8e4', '83416e99-89b1-4a42-be85-5044301c9c9a', 'Saude', 'Resolvida', 'Judicialização de medicamento Dra Ana', '2022-06-09', 'indicamos a Dra Ana
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c2da2e7d-1eae-4e6c-b905-43134f0b72ec', '7487da2a-5b22-41c6-9257-741f34f28f1b', 'Saude', 'Resolvida', 'Ajuda para injeções novamente', '2022-05-22', 'Conseguimos no alto custo
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b9ea891b-2ad6-4063-99d3-f77a72ce3596', '2d71d984-6714-48c9-8226-0b7e1c5d6bb0', 'Saude', 'Resolvida', 'Cirurgia olho - Pálpebra', '2022-05-18', 'Ja envio os dados para agilizar, está om a palpebra caindo em cima do olho - necessita URGENTE - pedi para o Hugo - Ela fez o Pedido em Janeiro 2022, conversei com a Leticia que passou quedisse que esta cirurgia é muito demorada , pois eles dão priopreidade as que tem riscos, gprovavelmente vai demorar uns 2  anos no minimo , pois estão chamando as de 2020.
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4568815a-c50d-4175-a94a-be617087c288', '4a9e3d25-7d86-4835-8843-0cd4ccc15d0f', 'Saude', 'Resolvida', 'Consulta Neurologista', '2022-05-18', 'Encaixou a Dra Mayra dia 04/0 no Dispensario
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9eca6e4b-dbd4-49d6-864f-a4bbb24247f9', '7a6b6984-9c0f-45e8-9b23-58a4a9c821ba', 'Saude', 'Resolvida', 'Agilizou os pedidos', '2022-04-27', 'amigo Pe Danilo
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('aa36a4f2-1489-4241-a7bd-66ef42792cd7', '9ed1d378-3642-4469-83e7-ae1de1e6cad2', 'Saude', 'Resolvida', 'Consulta Nova Suiça Posto', '2022-04-08', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5084ede7-ae33-4a74-b42b-b057b3e31ca4', '9e44ec93-7194-48b4-9bda-a6728fcda0ce', 'Saude', 'Resolvida', 'Tomografia', '2022-04-04', 'Passei para Hugo - Aguardando
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c682743e-2d9b-44db-a3e4-1eeef8a27933', '24140706-2ceb-447a-b53d-f2613b640bd0', 'Saude', 'Resolvida', 'Pedido de Consulta Especialidade/Urologista e Cirurgiao e outros', '2022-04-04', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('da308388-e14d-43db-9a17-dc5816e33fac', '7d033047-b25a-4e04-852f-c771b3c005f7', 'Saude', 'Resolvida', 'Pedidos de Exames pela Doctor - Dani prima que solicitou', '2022-04-04', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('d6be26b6-d0a1-4e81-b6b5-1bb696012338', 'f568efa1-a507-47c6-ae85-f76684703eac', 'Saude', 'Resolvida', 'Injeçôes de 500,00 reais', '2022-03-29', 'Deyse nos arrumou
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e4312693-666d-44a3-9fb4-9f03f4d923ca', '45166f0f-a428-4b62-a06f-3795f8251bab', 'Saude', 'Resolvida', 'Pedido de consulta', '2022-03-24', 'Entregue para Leticia - Secretaria de Saúde
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('2fe0b31b-35c2-45ee-addb-ff48f7352755', '8489c33a-4b17-4329-a281-48f54d318af2', 'Saude', 'Resolvida', 'Consulta Oftalmologia / Cirurgia', '2022-03-13', 'Já  agendou a consulta
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('7cde7bf5-c006-4a12-a90e-24d0016be275', 'a1de1669-8e3b-4a43-a6a6-1d2322a83080', 'Saude', 'Resolvida', 'Cirurgia Visicula', '2022-03-08', 'Jenifer Marcelinho que pediu e ja foi agendado
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b288178f-8d75-4aa1-8a7f-78e8ffea20ec', '5e988396-cd04-4926-9232-c59a8d2017ac', 'Saude', 'Resolvida', 'Tratamento de saúde carissimo', '2022-03-08', 'Indicação de advogada de saúde - Conseguiu na Medical
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5bdb4f7d-3885-4c8f-ba21-d0c91229017e', '672b9db5-e74a-4ce0-b749-06d4d4a71516', 'Saude', 'Resolvida', 'Remedio Seretide', '2022-02-11', 'Ver Waguinho conseguiu o medicamento
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('50d70156-3e3a-46db-a6d1-ca5b80ebd001', '240012ee-9cc2-41bf-bafb-3e7b318d6abb', 'Saude', 'Resolvida', 'Vazsectomia', '2023-01-01', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c68485f4-4c8e-49e2-a686-361063b5709d', 'ea45d76f-5ed2-4980-aff1-ec68d097eab4', 'Saude', 'Resolvida', 'Aparelho de Insulina  para esposa', '2023-01-01', 'Marco ia falar com a moça da sectetaria de saúde
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('92a3503b-3aea-44a8-842e-a3f5b4a1d381', '2325a970-4ac0-4544-bc61-e8e866f30962', 'Saude', 'Resolvida', 'Exames', '2023-01-01', 'Passamos para  Secretaria de Saúde
Assessoria: Sueli / Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('595fdf7a-c0a7-46e1-b89a-771bc7ec665f', '25ed0f67-1774-468d-a584-22a3c5fc6247', 'Saude', 'Resolvida', 'pediu fisio conseguimos 2 favor', '2023-01-01', 'falou com o marco
Assessoria: marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8b8d7529-fa9b-4588-8578-64905a512811', '1ed8d6c2-92b3-49fa-abe1-d05643ec0e81', 'Saude', 'Resolvida', 'Consulta Oftalmo', '2023-01-01', 'Fazer encaminhamento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('31669974-7ad2-4053-a5ec-b1ee2dc900a3', '82e27c52-c9a3-4349-b328-c965d63eb507', 'Saude', 'Resolvida', 'Remedios judicial', '2023-01-01', 'orientação Dra ana Luiza - Amigo da Luzia da Flavia
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('db8321f1-c600-45c8-9fef-5ceb7846ae09', '8279116c-71b4-493a-94f0-d9decead2ab2', 'Saude', 'Resolvida', 'Construção de calçada', '2023-01-01', 'FIzemos 156 e indicação - Marco falou com Dagoberto
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('80e24b2a-0d5c-4d13-9061-5352067be754', '362e7af8-fd7b-4c5e-b1ba-8f3c77b6fbf2', 'Saude', 'Resolvida', 'Exames tomografia', '2023-01-01', 'Foi agendado
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b4b32e39-1421-4ca9-ba00-752a04b6258f', 'ba76436d-e7ed-4664-8ec2-3f6b7915e525', 'Saude', 'Resolvida', 'consulta vascular', '2023-01-01', 'agendou
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('d4717822-c99a-4007-8f6f-0e2b4b707a94', '3f8cb718-5094-45a1-9ddc-8050d94042b2', 'Saude', 'Resolvida', 'Biopsia', '2023-01-01', 'Marco resolveu
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('08af48c9-0a51-4ae5-9673-fcd3adb114de', '52bdd8e2-ba01-47ad-8835-789b0b0d7b28', 'Saude', 'Resolvida', 'Saude exames', '2023-01-01', 'Marco resolveu - já entreguei
Assessoria: Sueli/Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('6a10bd4d-3531-4ffe-9ea5-952f30c3b1b3', 'ae2d9866-55fe-4688-a049-b1ba5523adae', 'Saude', 'Resolvida', 'exames', '2023-01-01', 'Pediu para reescrever pelo SUS
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ec3c23e0-e020-4dce-a791-ca62e217fef2', 'a8531303-931a-4be6-9696-9e87f103b507', 'Saude', 'Resolvida', 'Consulta Dr Gustavo', '2023-01-01', 'Hugo agendou para 04/09
Assessoria: Sueli / Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('55c1b8e4-e0e1-4619-846b-f326475db9aa', '31451f46-3725-4ccc-bde2-b0cc9bed4185', 'Saude', 'Resolvida', 'Saude', '2023-01-01', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('cebdd897-a589-4b0e-87c8-ed00cdf53f49', '70046bf9-3850-4a7a-94c8-7ba6935fcc18', 'Saude', 'Resolvida', 'Biopsia do irmão  - João Guilherme da Silva', '2022-07-18', 'solicitou ajuda para agilizar
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('1c570d1c-7d56-4a00-98aa-4691996a5cc1', '78c0416b-8a30-4647-b443-28ed86df63c8', 'Social', 'Resolvida', 'Ajuda de doação de Cesta e Leite', '2023-08-17', 'Marco ajudou
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('44daf5c0-4bde-46d8-933f-ea8bf14e1cf2', 'd99ae909-f535-4fee-a519-ff8c211375e6', 'Social', 'Resolvida', 'doaçao de cesta basica', '2023-05-24', 'doamos cesta ganhamos do ceproson
Assessoria: leandro / marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('79797243-a3d3-4d59-841e-290fb685cf22', '35fea59d-386e-4bc2-9b80-2c7f120a8d93', 'Social', 'Resolvida', 'doacao de cesta basica', '2023-05-05', 'pegamos doacão do betinho
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3f017a4d-6e38-4d4f-a10b-4711f7645505', '49869003-7eea-4af7-8d12-a33fa20cc27d', 'Social', 'Resolvida', 'doação de cesta', '2022-08-09', 'consegui com betinho
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('dba030bd-03de-491a-ae69-1ac44e11798b', '9a53d600-dc93-445c-8ef0-6d4c3df5ffdb', 'Social', 'Resolvida', 'doaçao de cesta', '2022-08-09', 'consegui com betinho
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e58c481f-0428-4e6a-b14a-e223c296640b', 'c78b1a03-7b7e-47ed-bc65-176a35b7a7ff', 'Social', 'Resolvida', 'Vaga casa de idoso', '2022-03-30', 'Orientamos - ver na  Recanto do Idoso
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('67e4d1cc-7d45-4084-aee8-d0f64de51d70', 'f568efa1-a507-47c6-ae85-f76684703eac', 'Social', 'Resolvida', 'Cadeira de rodas', '2022-03-29', 'Liguei nos Romeiros e deu certo lá
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('64468a7b-342f-415c-bb85-2e37b8cd05fc', '01d19a98-8e10-45a3-bb6e-f88c6e05a7fc', 'Outro', 'Resolvida', 'Sobre Horária do bolsa creche', '2023-01-16', 'Falei na Educação e na Escolinha |Pequeno Urso coma  Silvana
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('443c98ad-8b3b-40cb-a666-9c801eba9b78', '8baa7470-089e-4085-91b1-be3c3a2fcc03', 'Educaçao', 'Em andamento', 'vaga de creche', '2023-01-01', 'Fizemos oficio
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3e3df3fc-82b7-4c38-a649-58e1e6d99e1e', 'effad7b7-9295-4b24-b95f-43fab9b5d16b', 'Educaçao', 'Em andamento', 'Vaga de creche', '2023-07-28', 'oficio e claudinho do Elias
Assessoria: SUELI', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9e401242-997e-4866-9052-4b07f035f931', 'aa5831c8-1544-4713-9ae6-33b1a283fb98', 'Educaçao', 'Em andamento', 'vaga de creche', '2023-07-05', 'estamos aguardndoo rubnes arrumar a vaga
Assessoria: leandro / marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('1c3390c2-4a35-4fba-ac98-52ff3bbba720', 'ee364188-4258-4ae7-b6e2-42d6b0fd8ba3', 'Educaçao', 'Em andamento', 'Vaga em creche', '2023-06-19', 'passamos na lista para o Rubens
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('34bd2794-7b78-4915-80aa-5425a01f89ac', 'a85f04c2-b569-462c-8f7f-56eaf54a4ec3', 'Educaçao', 'Em andamento', 'vaga na creche', '2023-06-15', 'passamos na lista para o Rubens
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('489296af-601a-48d2-a0c1-47c63450e872', 'c4eeb05a-67df-4362-9b09-7e3e10d51a94', 'Habitação', 'Em andamento', 'Casas do sindicato', '2023-02-09', 'Marcos pediu para aguardar
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a87d2832-2aa2-498a-a62a-e912f5f88048', '7cb2bd5b-9c0a-4929-b2aa-1c0f550319fd', 'Habitação', 'Em andamento', 'Regularização da planta da casa', '2022-06-17', 'Leandro foi na Habitação e puxou  a situação
Assessoria: Sueli e leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e933dd25-4686-4e2a-b96b-d88a99a2bc30', '20322a93-0630-41f8-bdb8-370a4129ab68', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Em andamento', 'Homenagem Professor', '2023-09-21', 'Foi indicada para ser homenageada
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('44a8f058-64db-46c1-badb-874a5e912d4e', 'd0a1b94d-1aa4-4755-914f-ce6b6e033b39', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Em andamento', 'José Americo', '2023-02-24', 'Vou visitar dona Antonia dia 28/02
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b4e64ca8-78f5-4458-9248-486605054361', 'cbde5149-a442-4383-9783-026dec80ea0e', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Em andamento', 'Nome de rua da dona Edna Inspetora de escola', '2022-05-20', 'Ja protocolado - tudo pronto para ser votado
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('7a52baae-8a3d-4028-83c0-330df29ed7d3', '6f7e9228-a1ee-4058-bfe6-2318c1ca6121', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Em andamento', 'Nome de Rua para filho da professora do Marco', '2022-04-04', 'Aguardando documentos e dar um Ano - Mandei para esposa dele enviar o histórico, enviou historico 07-05
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('304c7d55-343f-4ced-8f84-d87eb7cb1dba', '05407686-cf1b-49c0-a233-14712cc81392', 'Iluminação', 'Em andamento', 'pedido de iluminação publica', '2023-02-23', 'foi feito 156 e indicação
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8138cf4f-6add-4ab2-8a27-e7925ededd1c', '9c59043e-bca4-4367-be35-775e57f46840', 'Meio Ambiente', 'Em andamento', 'Drenagem de aguá - Jd Anavec', '2023-01-01', 'Vanessa  vai fazer indicação - Ja foi feito indicação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b554b322-0167-4fd1-8409-f240fe69a9df', '5861da69-9662-4f58-ab86-d3b380cfeb4e', 'Meio Ambiente', 'Em andamento', 'Poda De arvore', '2023-08-04', 'Indicação 2665/2023
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('2fc0c83d-c159-485c-9a76-527387146a80', '4846892a-2616-4b68-bb23-78a9fd643849', 'Meio Ambiente', 'Em andamento', 'pediu mudas de arvores', '2023-07-05', 'indiquei busca na hipica que estava fazendo doação
Assessoria: leandro marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c5ccac3f-8124-4f00-aea5-fe45b3dbfe84', '48fddba8-1baa-447f-a8bc-a2cdb13b8f75', 'Meio Ambiente', 'Em andamento', 'remocao de arvore centro comunotario', '2023-06-15', 'indicação marco mandou audio
Assessoria: leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9810f983-6531-4091-b20d-ecfefc6fc35a', '21c52f50-d510-4408-b451-6ba5d4d62bdf', 'Meio Ambiente', 'Em andamento', 'Remoção de àrvores', '2023-03-07', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('7b01a38d-58a0-4049-8ffe-88c34206d1b7', '4770212a-638e-4b84-8b6e-ba68ea2c5e75', 'Meio Ambiente', 'Em andamento', 'Buraco na estrada a frente do zé do pote - fez indicação', '2023-02-09', 'Passar tirar foto
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ba3d04c6-f546-4974-8613-4a94d7bb4fde', 'ac0ba7ba-036a-491e-9246-a110a6450447', 'Meio Ambiente', 'Em andamento', 'limpeza  area da união', '2023-02-06', 'Fez requerimento e enviamos para ela
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('3786ecd7-2354-4c6b-b05b-97422974a37b', '3d5b9068-434b-43dc-a97a-4bcda49850ed', 'Meio Ambiente', 'Em andamento', 'Limpeza e Melhoria na praça Morro Azul', '2022-04-10', 'Feito indicação - 139*4-2022
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('aca6437d-b652-4d96-9de1-11470cadbcec', '64a93388-5759-4f0a-8c13-2cac2f3964c0', 'Meio Ambiente', 'Em andamento', 'Monumento praça', '2022-02-25', 'Foi feito 2 oficios , um para o Meio ambiente que encaminhou para a Comunicação, agendou horario mas ate agora não deu certo - Não deu certo.
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5a5bdddf-cf03-49b3-83b7-5b02989172f7', '93380c73-98fc-437c-9ee7-d74fd1181691', 'Meio Ambiente', 'Em andamento', 'Remoção de aárvore', '2023-01-01', 'Leandro consultou e não tem dada de entrada
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('2372b14b-f78c-49fe-8013-3eb74b2c7680', '12c190f8-c0d4-4655-b976-77e4528616d5', 'Meio Ambiente', 'Em andamento', 'Praça em frente e Humanitaria', '2023-01-01', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('bfc3e34c-101e-4530-b516-214320ad5de9', '2fede21f-bf15-467a-8839-abe7d25d1dfb', 'Obras', 'Em andamento', 'Tapa buraco', '2023-08-02', 'Rua Ruy barbosa
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5703f4bb-25f5-495c-8f98-6666a198a911', '646b9b14-bbc4-489f-bc0b-4448f55c3577', 'Obras', 'Em andamento', 'tapa buraco', '2023-05-22', 'fizemos indicaçoes
Assessoria: lendro/marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('82743ba4-0f16-47ab-811a-87d074d05623', '47b24cfb-e1aa-4a6c-bcab-a6cdc19b8ccf', 'Obras', 'Em andamento', 'limpeza na rua novo horizonte / iluminação 156', '2023-03-20', 'indicação 892/2023
Assessoria: Leandro/Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('2dfd7791-16be-4e88-80ec-c32446ec11e4', '8409873c-636a-409f-bf78-e70d58e630d7', 'Obras', 'Em andamento', 'Buraco LIM 346', '2023-02-23', 'enviei Indicação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9a5107df-4f73-4411-a94d-c1d7735fb611', '2d6fdddc-02b6-40da-912f-593e5d0932ef', 'Obras', 'Em andamento', 'poste de madeira - Belinha Ometo', '2023-02-06', 'fez requerimento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('280b9d33-b438-4808-94ed-f6b2773d9ec6', 'a29f3aaa-80df-4c65-8063-05b7a4f87d09', 'Obras', 'Em andamento', 'Pintura de solo av sta barbara', '2022-05-30', 'fizemos indicacao indicação em 2021 e 2022 prefe nao fez ate 06 de 2023
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('fb9a191c-0eba-4cd5-b6ad-38875066e4b5', 'd8b7c3b2-b61c-4332-b17a-23520d51e3f3', 'Obras', 'Em andamento', 'Melhorias na praça em frente em sua residencia', '2022-05-18', 'Feito indicação
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('093cdb92-e1e2-4ea9-8134-605bcdb6fc89', '62bdb1b7-b37c-4e91-b1b3-39ff160c7f61', 'Obras', 'Em andamento', 'Rebaixo de Guia - Troca nome de rua', '2022-03-31', 'Esperando sindico mandar formulario preenchido
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4581cf07-a194-42c1-a55e-940e72453134', '1b5a9e49-9a6d-473e-9fb6-a24fd9445b79', 'Obras', 'Em andamento', 'Travessia elevada na Vl camargo', '2022-02-18', 'feito indicação -
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('90bf8b1f-2f7d-40b5-9942-a3bb8d6595d3', '7338f57d-92ca-41be-b9e4-83616f83580a', 'Obras', 'Em andamento', 'Faixa de Pedestre', '2023-01-01', 'solicitou faixa, pois tem nas duas vias , só na que ele mora que  não
Assessoria: sueli / Vanessa', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('858a90d1-84cd-4ada-b5a6-debde0da2af5', 'f526d4d3-bc1b-4219-9986-52068b891e06', 'Obras', 'Em andamento', 'pedido de academia no PH', '2023-01-01', 'fizemos indiaçao solicitando
Assessoria: leandro / marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e2783dd8-abaa-425f-b169-5257813839be', '1c36ccf0-11e5-43d5-9304-d62b343ec0c6', 'Obras', 'Em andamento', 'pedido de poda de arvore e mato', '2023-01-01', 'fizemos indiaçao solicitando
Assessoria: leandro marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('79511972-c751-49ff-b9e5-da40d27c9320', '993613cb-b9fd-4c62-977e-e1a3acf4fc3d', 'Obras', 'Em andamento', 'pediu melhorias na sinalização', '2023-01-01', 'fizemos indiaçao solicitando
Assessoria: leandro marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('0ab519b7-7e17-4f20-a1c8-84a7a9e26b25', '88d2bd74-7781-46ad-b744-a0dbd2d6d0eb', 'Outros', 'Em andamento', 'Sobre o requerimento de recapeamento', '2023-08-21', 'Assessoria: Vanessa/ Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8438e5f1-e4b1-4b4c-9a5d-01fe2c41ce1b', 'b90ed8f0-e569-4f1d-ba58-75427dd792d0', 'Outros', 'Em andamento', 'nome de rua pra mae', '2023-07-05', 'estamos aguarndando novas ruas sem denominação
Assessoria: leandro / marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b4c64675-968b-4916-83de-4aa4f0acdb9c', '3b752e62-8a1b-414f-b708-4097e70aa646', 'Outros', 'Em andamento', 'Ponto de onibus', '2023-03-10', 'fizemos indicação
Assessoria: Suelli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ffed968e-7421-4bfa-ba2e-0afaed5426ce', '63e4c6a4-c487-43dd-8028-bd8b5ced8180', 'Outros', 'Em andamento', 'Regularização da casa', '2023-02-18', 'Leandro passou para Robson da Prefeitura e esta ajudando
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b144833d-a503-438e-8cca-78dadf071b48', '55b9d033-94e6-4319-ad67-561324bcc939', 'Outros', 'Em andamento', 'Lombada', '2023-02-09', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('86998a08-4f1c-42ad-97d5-fe4b6db4a3a4', '4d6e2678-d086-48a3-b13f-d7df3a74aac8', 'Outros', 'Em andamento', 'Ponto de ônibus quebrado - Fez indicação', '2023-02-09', 'Leandro tirou foto para indicação / fez indicação
Assessoria: Leandro', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e763da29-10d5-48d9-bbf7-8715ca9480e3', '88f16ea0-3443-4509-9343-51074bc45ad2', 'Outros', 'Em andamento', 'Segurança no Cemitério', '2023-02-06', 'fez requerimento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('4b1f4179-0ff2-448c-ab1e-79de83337f97', '92879197-603b-4e1c-9f31-f4a7bde8cc29', 'Outros', 'Em andamento', 'REFIZ', '2023-02-06', 'Fez requerimento e enviamos para ele
Assessoria: Vanessa', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('10669d1d-fe14-461e-a242-1350fea3af46', 'd60084ef-46ca-426d-93cf-266821255247', 'Outros', 'Em andamento', 'Requerimento aumento  salario - Pec', '2022-05-13', 'Ja fiz requerimento
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('848787ad-1058-4baa-8141-1e00d352b190', '9f936824-3481-411b-89fb-84edb5c8ee28', 'Outros', 'Em andamento', 'tapa buraco - Jd Palnalto', '2023-01-01', 'foi feito indicação
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ffe4c250-e799-4eea-b881-3040bfc5eb6b', '7684d452-3359-4c2c-ab8c-f7d356836ad9', 'Outros', 'Em andamento', 'Segurança', '2023-01-01', 'Feito indicação 1665/23
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('767ebd67-65a9-49f8-8b0f-8e3454194374', '452e2a26-ee78-4228-8b6c-ca42581f0a9b', 'Saude', 'Em andamento', 'Oftalmologista', '2023-09-06', 'Dra Mayra fez o pedido
Assessoria: sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('669c9661-bd89-4249-a8a2-a2db99cefaa2', '2a046420-491e-4479-826b-fd2033d65075', 'Saude', 'Em andamento', 'Exames', '2023-08-31', 'Dei entrada na saúde dia 31/08
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a34cdcae-567d-4f6c-81d9-b1c0ad236f10', '934670e5-c1ee-482c-941b-31ac66788398', 'Saude', 'Em andamento', 'Ressonancia', '2023-08-31', 'Dra Mayra trancreveu
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a627dd0a-e007-43bc-9af6-92163d1617cc', 'd054c33b-158f-4735-947e-c2d40c262853', 'Saude', 'Em andamento', 'Quer uma consulta com Oftalmo', '2023-08-28', 'Pedi para Dra Mayra  o encaminhamento
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('81cecbdc-540d-4bda-95d7-748a6fe6f24a', '4f04fe1e-b6fd-45cf-a396-dd29ca5abd25', 'Saude', 'Em andamento', 'Cirurgia Pedra na vesicula', '2023-08-21', 'Passou para  Dr Ignacio
Assessoria: Sueli /Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('08c78479-f5be-460c-93be-4836eccfa7cd', 'fabc7a42-2ace-4387-93de-67b36fb28414', 'Saude', 'Em andamento', 'Consulta Reumatologista', '2023-08-21', 'Encaminhada  Dra Mayra / dar entrada
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('b8f060e5-e13a-43f5-9ae0-59db865921e7', '19725f37-3de5-4c67-955c-bb8c991f6c09', 'Saude', 'Em andamento', 'pedido de protese indicamoa adv ana luiza', '2023-07-05', 'ajuizar a ação
Assessoria: leandro / marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('7a4157cc-2a82-456b-8bb0-44704302a42d', '8c2a0e99-52da-4dbf-9442-12eedc46ec2d', 'Saude', 'Em andamento', 'Tomografia crânio', '2023-06-12', 'está com a Dra Mayra para reescrever - entregou para Dra dia 14/06
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('43176294-2f26-4642-8a4a-4bb149b4bed3', 'dfaf84c0-20e5-4dde-94e9-7a67924a8842', 'Saude', 'Em andamento', 'exames otorrino', '2023-06-05', 'Dei entrada na Secretaria de Saúde
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f9b94406-7c97-4783-a297-8a2375d4c459', 'db9b97b4-d35f-4857-8b90-6085940db665', 'Saude', 'Em andamento', 'Marco enviou o caso dele para Sueli da UAC', '2023-05-23', 'Assessoria: Sueli/Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('87cf6f56-7a4f-46d3-8ad3-86a74a1470ab', 'e465a5b2-ddec-4c4c-8900-382f11d8f1db', 'Saude', 'Em andamento', 'Consulta para seu Domingos leoncio dos Santos', '2023-05-20', 'passei para carla
Assessoria: Sueli / Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8349ca09-36d9-422d-9909-922b1431378d', '9b82998e-58af-46bb-ad7d-c03e759f6d24', 'Saude', 'Em andamento', 'Consultar cirurgia do marido', '2023-03-13', 'Rono Wilson Drago
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('40017f36-679b-4515-9de8-6ce0df96cddc', 'a7b0cfb6-9551-459a-a083-ef3ebfb17bb2', 'Saude', 'Em andamento', 'Exames', '2023-03-07', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e0d74736-c0c8-4bce-ade1-1a42641eec36', '035f195b-c4ba-49c4-b992-f9770038b35c', 'Saude', 'Em andamento', 'Ajuda comexames e consulta, mas fez particulara', '2023-03-07', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5278399b-e6b2-401c-9820-8b4af6d515e4', '45166f0f-a428-4b62-a06f-3795f8251bab', 'Saude', 'Em andamento', 'Exame  ultrassonografia', '2023-02-06', 'entrada na  secretaria de saúde  - Único exame dela que deu entrada em fevereiro foi um ultrassom doppler venoso de membros inferiores que já foi agendado para 10/05 e entregue em maio mesmo ao amigo de trabalho dela, José
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('04a428d0-8974-4a24-bedd-21a4206aad14', '80934194-a00c-45e7-ae27-246e8e599b2f', 'Saude', 'Em andamento', 'Dopper', '2023-01-01', 'Procurar exame - demos entrada no novo  pedido 15/02/2023 - Novo Pedido
Assessoria: Sueli e Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('96ba2204-1ad7-4f36-a89e-535c6fd0ebf8', '066bc18f-2e39-4f9a-9fbc-f7f67064c4fd', 'Saude', 'Em andamento', 'Consulta no AME', '2023-01-01', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('377392a8-7d55-446c-b852-9fc6f9d8c427', '1a234d3c-7166-4d55-85ec-cc087eb263ff', 'Saude', 'Em andamento', 'Rapagem no olho - AME', '2023-01-01', 'Levar para Leticia
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('876f072c-2e86-416e-8f25-cdc4cfc2fa9f', '082c4673-3026-491e-ac11-99284995e36f', 'Saude', 'Em andamento', 'Posto de saúde no Geada', '2023-01-01', 'Requerimento 266/23
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a5436874-b6b1-4dc1-a075-48b37530749f', '55d26c20-71ae-4e3c-ae7a-4c30a6cd6cf5', 'Saúde', 'Em andamento', 'Exames', '2023-09-20', 'consulta
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f0c56c85-e1c1-4ee7-9ad1-e511b5447c08', '915a5e8b-830b-46ad-ad6c-182aefef526e', 'Educaçao', 'Em andamento', 'CCI', '2023-01-01', 'Não deu certo
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('59eaa3cf-d94c-4126-855b-fc97d3529690', 'fc6bb8df-613b-4efb-82e1-64193e3bc4b1', 'Educaçao', 'Aberta', 'Vaga de Creche', '2022-04-01', 'Vai fazer inscrição e enviar o protocolo
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('459bf845-2acf-4796-8ae7-3fa3e2e8d431', '6828c042-14cf-4da3-b5b1-c0032dc7cb80', 'Educaçao', 'Aberta', 'Vaga em escola integral', '2022-03-23', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('7416e06f-ae39-4786-9191-262465f34991', '4b8ec846-bed8-4dee-b4b4-ec38537f5a3e', 'Iluminação', 'Aberta', 'Ilumniação na rua Joaquim Brugnaro', '2023-02-09', '156
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('116879c9-0df8-4d04-b315-2bb299b25ae9', '50b93563-6dc5-40cd-8e0b-3a0267510cff', 'Outros', 'Aberta', 'Visitar o gabinete', '2023-02-06', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('ba428b07-a2da-4335-ae4f-8995e7278d3c', '304c1f51-8359-4c50-bc5b-44b2e2a888bc', 'Outros', 'Aberta', 'Visitar o gabinete', '2023-02-01', 'Vai marcar  mês de março - agora não pode
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('9c783a32-18a8-4de0-9baa-7e48348d722f', '3e7ca127-616c-41c1-a642-1f76e45f7074', 'Saude', 'Aberta', 'Cateterismo', '2023-03-15', 'Não deu certo - Pm não aceitou pedido da Dra Mayra - ja avisei O Marco
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('24fe7fae-f40e-4e38-a95d-b39b3fc82410', 'bcce79f1-1209-4137-9d0e-11df3aa427f4', 'Saude', 'Aberta', 'Consulta / Cirurgia Ame - Lipoma', '2022-04-04', 'Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('6e618a78-4083-48f8-9336-85a5dea09628', '0ff9b65f-fded-4991-a561-e8057e91831a', 'Educaçao', 'Cancelada', 'Vaga na creche', '2023-08-27', 'Oficio na Educação  - ela nem respondeu mais  a  gente
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8df22bde-0125-4315-baa9-88078d297d04', '24e1f01f-35e6-445d-a3e7-1ffe832181ab', 'Iluminação', 'Cancelada', 'Poste atrapalhandoa  entrada', '2023-02-09', 'vai enviar as fotos
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5ae7fccc-f91f-4b0c-b75c-c0b322c5392c', '21be5ceb-e39b-4a25-8060-9875def346bf', 'Meio Ambiente', 'Cancelada', 'Remoçaõ de àrvore', '2023-04-01', 'entreguei o formulario
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8bb89d52-de4a-4348-bc2b-5cc56724fcf1', 'c6be8091-2253-4376-86cf-f76e55d273ed', 'Meio Ambiente', 'Cancelada', 'Remoição de árvore', '2023-02-09', 'pegar papel de volta
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('a2fe034b-478c-4d43-8f20-07160edc6226', '2e1f7ab1-75bb-46c1-a9ff-e749d426a8cf', 'Outros', 'Cancelada', 'CEMA', '2023-05-23', 'Assessoria: Marco / Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('31cb8ed5-8369-4d89-acd8-85741c6e4174', '69c3e237-318f-44b7-aa44-57c5dda354aa', 'Outros', 'Cancelada', 'vaga no CEMA', '2023-05-22', 'faz 6 meses que está esperando
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c00f988f-0728-456d-9a5a-475c23af95f7', '9df82d79-e53f-4562-86a3-80f1e6c3902f', 'Outros', 'Cancelada', 'Marcar visita na casa', '2023-02-09', 'Ficou de marcar - mas a Mabel está doente
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('e9f2c19b-e943-44a8-ae6d-b1cc69ca947b', '6f53729c-66d3-4824-ad2f-7c2ca8ea7b2f', 'Outros', 'Cancelada', 'buraco entrada do condominio  Ponderosa', '2023-01-01', 'Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c4f30868-a506-46b3-b289-57c6537420b7', '43e52fd1-8b75-4751-ad4b-4fd11e8d7d85', 'Saude', 'Cancelada', 'Consulta Oftalmologista', '2022-03-31', 'Pedido da Adriana do Delei
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('afed9ab9-bf40-4247-8d9e-3165b9b3b24a', 'd8569ec3-0861-442b-a5a5-ebce3a3689d0', 'Saude', 'Cancelada', 'Hidroginastica e Fisioterapia - fizemos td que foi possivel, ela não quer na prefeitura', '2022-03-18', 'Levei  na  faculddae Einstein  dia 24/03
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('5c0244e0-e06e-41cf-9454-e67cbfed8f13', 'a3757cf3-53e9-4cae-99c0-66788879946d', 'Saude', 'Cancelada', 'Cirurgia  na olho', '2021-10-20', 'Passado para o Hugo - vai consultar no SUS primeiro
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('fd4e1ad8-1e56-4f1a-8fd0-47aa1c87da0c', '6846ed25-5694-4bda-ac0f-f70779b1fe88', 'Saude', 'Cancelada', 'Ciruegia de veruga no  olho', '2023-01-01', 'Esta parado pois é muito demorado, ela vai retirar do posto.
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8109a66e-68d2-4dee-88f6-8ecd3b902b50', '37117ba6-d5af-41b0-8bc4-79adcc2a7d34', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Aberta', 'Imagem Aparecida', '2023-09-21', 'Veio rezar o terço
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('8df66f96-6d65-4b84-8979-f3d940056274', 'd957980d-98c5-4b4f-aa30-28d93b04df4e', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Aberta', 'Imagem de Aparecida', '2023-09-20', 'Veio conhecer a Câmara e abençoar  o gabinete', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('60a5ae92-c3e1-45ff-8586-6ebf28aef8d4', 'ee1849b1-bf6e-4685-924d-08dfc87226a3', 'Homenagens - Nome  de rua -  Titulo - Premios', 'Aberta', 'Imagem de Aparecida', '2023-09-12', 'Vieram rezar o terço - grupo do Apostolado da Oração
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('06b34dbe-cd3a-41a7-abeb-0bc0fbf7bcca', 'ed92a015-1aca-4a81-926f-719e2e3cc33c', 'Obras', 'Aberta', 'Sinalização', '2023-09-22', 'Vanessa fez indicação - 2799/2023
Assessoria: Sueli/ Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('96618d72-bb5b-48a8-afe7-375cf09b8938', '7761858e-5de0-4973-947c-142bcaf734e5', 'Outros', 'Aberta', 'Quer vender a casa', '2023-09-25', 'Passei para Leandro
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('643311a0-ed75-4400-a1d9-cc4445e680ea', '7bc2f50a-3829-4f02-9aeb-49e1978bbdf4', 'Outros', 'Aberta', 'Pombos', '2023-09-21', 'Reclamação de pombos e urubus no vizinho - 156- 1634287
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('f656e0de-ceb8-45e5-845f-8bf3a1a1e0fe', '42a65bdf-ceb8-47ce-8277-ae8264b857d0', 'Outros', 'Aberta', 'Natação', '2023-09-21', 'Passei as informações
Assessoria: Sueli', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;
INSERT INTO demandas (id, eleitor_id, tipo, status, descricao, data, notas, origem) VALUES ('c6f2bb34-f4bf-4672-b294-d406fcfee997', '42a65bdf-ceb8-47ce-8277-ae8264b857d0', 'Saude', 'Aberta', 'Dentista', '2023-09-26', 'Marco agendou para ela
Assessoria: Marco', 'Importação histórico (1A)') ON CONFLICT (id) DO NOTHING;

COMMIT;
