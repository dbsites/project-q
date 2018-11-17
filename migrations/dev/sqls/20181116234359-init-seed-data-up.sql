-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY companies (id, ticker, full_name, description, logo, short_name, url, year_founded, number_employees, green_buildings, targets_emissions, human_rights, policy_board_diversity, women_managers, nra_score, brady_rating, tsr, salary_gap, community_score, diversity_score, aila_score, fair_score, company_name, company_name_possessive, charity_amount, yes_manchin, no_manchin, yes_repeal, no_repeal, no_tax_cut, yes_tax_cut, taxes_paid) FROM stdin;
9363d8ec-908f-4510-80ac-4781ab257e3f	AGN.N	Allergan plc	Allergan plc is a multinational company in the pharmaceutical industry that produces branded drugs and performs pharmaceutical research and development. It was formed on February 18, 2015, when its predecessor, Actavis, acquired the pre-2015 Allergan, Inc. and assumed the Allergan name.	http://www.namethatplayer.com/mtg/ethiqcorpimages/CorpLogos00024.png	Allergan	allergan.com	2015	17800	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
55f37b62-a277-41de-b832-3669ed7b63ad	AEE.N	Ameren Corp	Ameren Corporation is an American power company created December 31, 1997 by the merger of St. Louis, Missouri's Union Electric Company and the neighboring Central Illinois Public Service Company of Springfield, Illinois. It is now a holding company for several power companies and energy companies. The company is based in St. Louis, serving 2.4 million electric, and 900,000 natural gas customers across 64,000 square miles	http://www.namethatplayer.com/mtg/ethiqcorpimages/CorpLogos00031.png	Ameren	www.ameren.com	1997	8629	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
bd132375-2c2b-4183-b0a9-4e4ea2281494	AAL.OQ	American Airlines Group Inc	American Airlines Group Inc. is an American publicly traded airline holding company headquartered in Fort Worth, Texas. It was formed December 9, 2013, in the merger of AMR Corporation, the parent company of American Airlines, and US Airways Group, the parent company of US Airways. The airline groups together form the largest airline in the world, with more than 6,700 daily flights to 350 locations in 56 countries worldwide, about $40 billion in operating revenue, and over 100,000 employees.	http://www.namethatplayer.com/mtg/ethiqcorpimages/CorpLogos00032.png	American Airlines	aa.com	2013	126600	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
bd8a5c69-63f0-4646-9f0b-767807b6753c	EQIX.OQ	Equinix Inc	Equinix, Inc. is an American multinational company headquartered in Redwood City, California, that specializes in internet connection and related services. It is a global colocation data center provider, leading by market share, operating 175+ data centers in 44 metropolitan areas in 22 countries on 5 continents.	http://www.namethatplayer.com/mtg/ethiqcorpimages/CorpLogos00175.png	Equinix	equinix.com	1998	6200	t	f	87	t	0	82	9	t	526	91	11	30	91	Equinix	Equinix's	$740,325	$6,005	$15,500	$65,000	$9,003	$8,008	$60,500	1.70%
d3d31a35-9394-4a2f-bc32-88e77716a9c4	AXP.N	American Express Co	The American Express Company, also known as Amex, is an American multinational financial services corporation headquartered in Three World Financial Center in New York City. The company was founded in 1850 and is one of the 30 components of the Dow Jones Industrial Average. The company is best known for its charge card, credit card, and traveler's cheque businesses.	http://www.namethatplayer.com/mtg/ethiqcorpimages/CorpLogos00034.png	American Express Co	AmericanExpress.com	1850	55000	t	t	84	t	0	65	25	f	200	90	20	47	67	American Express Co	American Express Co's	$37,000,000	$52,700	$69,476	$246,626	$133,017	$126,517	$234,126	4.20%
\.

-- Data for Name: company_chart; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY company_chart (id, company, date, csv) FROM stdin;
\.

-- Data for Name: company_issues; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY company_issues (id, company_id, issue_id, agree_score, disagree_score, issue, company, tsr) FROM stdin;
aeab8118-0db4-4ee2-a119-f34fdc349368	4cdc0b70-86b5-499e-8e27-7fcf6d1264f6	bc5536d2-45a4-4093-9dc6-529589c56e49	30	70	Taxes	Williams Companies Inc	\N
6172181a-847c-4ad9-8eef-2a08d70ff866	7c7302bc-0e2b-41e8-a6e3-58e4db2290d5	f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2	40	60	Drug Legalization	Zoetis Inc	\N
1635275c-01f4-4be4-8375-2a8cbd704763	2e265d15-022b-4a76-9882-5fc31da85396	39c3c304-4a0f-4daa-947a-85b4131b452b	28	72	Corporate Philanthropy	Zimmer Biomet Holdings Inc	\N
0df55a51-f642-4125-b530-c0f2da0f0e02	ba1a18ff-0d42-4fa5-988e-a590784bc2d4	fd054069-2079-4f99-bb1c-6973eef5f3bf	45	55	Immigration	Weyerhaeuser Co	\N
9f404327-2c36-4259-a2fd-16c65d6758c3	990a3267-8599-4b6b-aec2-3780829944a2	7d9dc278-a6dc-4701-8b23-448ae3000cbb	90	10	Presidential Support	Zions Bancorp	\N
\.

-- Data for Name: company_stock; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY company_stock (id, company_id, "timestamp", open, high, low, close, volume) FROM stdin;
19c9ab49-d223-48a7-9a3f-26ac3e865518	9363d8ec-908f-4510-80ac-4781ab257e3f	2018-11-15	159	170	154	159	25005261
39212098-f6d3-45fb-9910-5672d9ebcee4	55f37b62-a277-41de-b832-3669ed7b63ad	2018-11-15	65	69	63	69	16008691
41cf448d-a02c-4243-9693-ce4b0f0318b9	bd132375-2c2b-4183-b0a9-4e4ea2281494	2018-11-15	35	39	35	38	101522294
254c607f-7f37-40f6-b63a-36ddc6a894ac	d3d31a35-9394-4a2f-bc32-88e77716a9c4	2018-11-15	103	110	103	110	38485256
7373fd87-59a2-4f1e-9a11-a0654456176e	a5ceb9fe-c9d1-46c9-814c-ecc0dd4fa06f	2018-11-15	193	198	186	192	29106269
\.

-- Data for Name: contributions; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY contributions (id, company, politician, amount) FROM stdin;
\.

-- Data for Name: issues; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

INSERT INTO issues (id, issue_name, description, abbrv) VALUES ('580600c8-c633-476b-98d2-9676c70c177d',	'Environment', 'Lorem ipsum dolor sit amet', 'ENVR');

COPY issues (id, issue_name, description, abbrv) FROM stdin;
580600c8-c633-476b-98d2-9676c70c177d	Environment	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	ENVR
0755baa6-1b5f-49c2-918a-457f1e16fe1c	Civil/Women's Rights	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	ENVR
58400255-75d9-41ad-b156-b073dbc03b0e	Money and Politics	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	POL$
fd054069-2079-4f99-bb1c-6973eef5f3bf	Immigration	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	IMGR
70df714e-8566-4265-abe5-266d5a2004a9	2nd Amendment	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	GUNS
9c82b608-f919-4f58-a23d-4e7a4528c146	Executive Compensation	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	WAGE
f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2	Drug Legalization	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	DRUG
39c3c304-4a0f-4daa-947a-85b4131b452b	Corporate Philanthropy	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	PHIL
30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f	Health Care	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	HEAL
bc5536d2-45a4-4093-9dc6-529589c56e49	Taxes	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	TAXS
7d9dc278-a6dc-4701-8b23-448ae3000cbb	Presidential Support	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	PRES
2383b711-794f-4829-a189-25ceb32753a2	Economy and Jobs	Lorem ipsum dolor sit amet, ea pri nonumy facete imperdiet, id pri debitis splendide definitiones. An tollit eripuit assueverit cum, verterem praesent eos at. Elit concludaturque eu mea. Ei omnium mandamus expetendis eam, ex purto prima mel, hinc qualisque dissentias vis cu. Nulla quaeque tibique ad mel.	ECON
\.

-- Data for Name: legislation; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY legislation (id, issue, politician, measure, vote) FROM stdin;
\.


-- Data for Name: politicians; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY politicians (id, company_id, recip_one, recip_1_amount, recip_1_img, recip_2, recip_3, recip_3_amount, recip_2_amount, recip_2_img, recip_3_img) FROM stdin;
\.


-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY questions (id, issue_id, question_text, legislation, "position") FROM stdin;
a7140307-0a66-42d2-8274-907f6a85bf88	2383b711-794f-4829-a189-25ceb32753a2	Companies should be free to move operations offshore to lower their effective tax rate.	\N	pro
9b27856b-819d-4025-b803-9f80c45122d9	58400255-75d9-41ad-b156-b073dbc03b0e	Corporations should be free to make unlimited contributions to candidates.	\N	pro
2ab5ddd8-b05e-4999-b2c3-39ee670906c2	fd054069-2079-4f99-bb1c-6973eef5f3bf	The U.S. government should build a wall along the southern border with Mexico.	\N	con
31bbc376-2137-4ea7-9afd-5f8cc739fdfd	39c3c304-4a0f-4daa-947a-85b4131b452b	Giving back to the community through volunteer work and civic development should be a goal of all corporations.	\N	pro
25a2a1ab-d7f7-4022-9ccc-fa1fd52f38bc	9c82b608-f919-4f58-a23d-4e7a4528c146	Generally, salary gaps between executives and average workers are too high.	\N	pro
7f14bb9c-bf78-484c-a5a4-da58cc5bdf5a	70df714e-8566-4265-abe5-266d5a2004a9	Private gun sales and sales at gun shows should be subject to background checks.	\N	con
aec4ed4b-575e-40a7-8db3-ee383239e119	2383b711-794f-4829-a189-25ceb32753a2	The US government should raise the federal minimum wage, currently at $7.25 per hour.	\N	pro
6b2fcb11-9be1-4ac4-900d-8847ef72bfd2	f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2	The government should prioritize treatment over incarceration for non-violent drug offenders.	\N	pro
e4877ec9-87ea-4825-a73e-64bd87f2b253	580600c8-c633-476b-98d2-9676c70c177d	Stricter environment laws and regulations are worth the cost..	\N	pro
c433d6ee-ea30-4501-9867-6894d660c418	9c82b608-f919-4f58-a23d-4e7a4528c146	Executive Compensation should be tied to overall performance.	\N	pro
7d2144fc-225b-4e5c-9d56-a0ecd4bbf8a0	7d9dc278-a6dc-4701-8b23-448ae3000cbb	I view legislation enacted by our current administration favorably.	\N	pro
39abdfe7-d335-41c5-aacf-06753a2dafa9	30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f	The government should do more to ensure that American have access to healthcare.	\N	con
8effeea4-3ca6-4719-83d8-67ba6c584bd5	f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2	Welfare recipients should undergo mandatory drug testing.	\N	con
de193c9d-6494-4afd-b1bb-e6d314938f79	70df714e-8566-4265-abe5-266d5a2004a9	People on the "no-fly list" should still be allowed to purchase firearms and ammunition.	\N	pro
74741e16-3de6-4f2a-ab89-ca6160180485	30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f	The government should regulate the prices of life-saving drugs.	\N	con
97778f5e-063b-4c6a-948c-63907d403b8e	39c3c304-4a0f-4daa-947a-85b4131b452b	Profitable companies have no obligation to engage in charitable outreach.	\N	con
e13609f0-776d-4fb1-b443-6112ee674414	bc5536d2-45a4-4093-9dc6-529589c56e49	Lowering taxes on the wealthiest Americans promotes job creation and economic development.	\N	con
04bbd11f-4c21-4a1d-912c-e2bb6f94126c	70df714e-8566-4265-abe5-266d5a2004a9	Assault-style firearms should be NOT banned in the United States.	\N	pro
27c5e09b-2af2-45ce-bd68-f31dc266818f	580600c8-c633-476b-98d2-9676c70c177d	Our country should do whatever it takes to protect the environment.	\N	pro
ce218443-83b3-4720-9968-57f593ef449c	0755baa6-1b5f-49c2-918a-457f1e16fe1c	Our country has made the changes needed to give minority citizens equal rights with whites.	\N	con
a5bbfef7-071c-4d7a-aa33-44b9f387bb89	bc5536d2-45a4-4093-9dc6-529589c56e49	The US government should not make cuts to public spending in order to reduce the national debt.	\N	con
cc197ca0-ebd9-47a2-8dfc-d5d58c4e88dc	580600c8-c633-476b-98d2-9676c70c177d	The government should give subsidies and tax credits to wind and solar power companies.	\N	pro
c0d49297-1f7a-44d5-bd9b-8e98c1602fd0	2383b711-794f-4829-a189-25ceb32753a2	Companies should be discouraged from laying off workers strictly to increase their stock price.	\N	pro
2622d588-145a-42ed-b79a-4d2411bc9faa	f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2	Marijuana should be legalized at the federal level.	\N	pro
bd2afcb7-cf4e-4621-928e-57e20f914411	bc5536d2-45a4-4093-9dc6-529589c56e49	The government should decrease the tax rate on profits earned from the sale of stocks, bonds and real estate.	\N	con
d443d6af-e2f6-4561-9aa6-9dfec00ba432	0755baa6-1b5f-49c2-918a-457f1e16fe1c	Corporations should make both gender and ethnic diversity a priority in their hiring practices.	\N	pro
6560b1f6-a54d-4630-9542-5d322a6ee2bc	7d9dc278-a6dc-4701-8b23-448ae3000cbb	I have a positive view of corporations who have given money to our incumbent president.	\N	pro
13664e09-7061-47b1-b027-50508f02ebfc	58400255-75d9-41ad-b156-b073dbc03b0e	Corporate money has a corrosive influence on our political process.	\N	con
45f43738-1908-4591-acca-5cf4356d9847	fd054069-2079-4f99-bb1c-6973eef5f3bf	The growing number of newcomers from other countries threatens traditional American customs and values.	\N	con
0b12360d-a40a-43ec-84ca-fcf2d35dda75	30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f	Health care plans should not be required to cover preexisting conditions.	\N	pro
b928b9b7-28a0-4b35-bc61-65aedac2ae18	58400255-75d9-41ad-b156-b073dbc03b0e	I'm comfortable with money in politics, as long as the money goes to causes I support.	\N	pro
57f319c9-9cd0-4cb6-8bf3-4ec73588da4d	7d9dc278-a6dc-4701-8b23-448ae3000cbb	America First is a winning philosophy for our country.	\N	pro
40a90216-0ca8-4ea0-a94f-cd1cd77d2a3f	fd054069-2079-4f99-bb1c-6973eef5f3bf	Sanctuary cities should not receive federal funding.	\N	con
06d03f97-da70-4a4a-ade2-7f3860607de8	0755baa6-1b5f-49c2-918a-457f1e16fe1c	Gender identity should be added to existing anti-discrimination laws.	\N	pro
05217af0-88f3-49ae-8ff5-33c8b3a92710	39c3c304-4a0f-4daa-947a-85b4131b452b	I value corporations who make consistent contributions to charities I believe in.	\N	pro
32cc0834-ab43-43f5-9888-aa6b10cadbf2	9c82b608-f919-4f58-a23d-4e7a4528c146	Employee satisfaction is important to me when choosing companies to invest in.	\N	pro
\.

-- Data for Name: user_answers; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY user_answers (id, user_id, question_id, agree) FROM stdin;
e81d3b81-1964-47bf-925c-5ae1742ace5a	e68891d9-f197-4189-9a1a-6b9c269fa92b	ce218443-83b3-4720-9968-57f593ef449c	\N
993dc907-8cdc-4740-8e56-30845d2b8b92	e68891d9-f197-4189-9a1a-6b9c269fa92b	a7140307-0a66-42d2-8274-907f6a85bf88	t
e9cbfb89-091c-4521-a312-7e1cb64e8788	e68891d9-f197-4189-9a1a-6b9c269fa92b	aec4ed4b-575e-40a7-8db3-ee383239e119	f
6e2b4ad8-0df8-4396-af7d-3ce1639c3e86	e68891d9-f197-4189-9a1a-6b9c269fa92b	c0d49297-1f7a-44d5-bd9b-8e98c1602fd0	t
e4eb4a91-77f8-434a-a8c0-947e41265f0f	e68891d9-f197-4189-9a1a-6b9c269fa92b	7d2144fc-225b-4e5c-9d56-a0ecd4bbf8a0	t
\.

-- Data for Name: user_issues; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY user_issues (id, user_id, issue_id, "position") FROM stdin;
83d9575e-f527-4220-94ff-28f793440db7	8fb33516-6395-47e3-b695-89118ce6f211	7d9dc278-a6dc-4701-8b23-448ae3000cbb	strong con
c9734cdb-1415-4024-9c43-50b534fc4476	8fb33516-6395-47e3-b695-89118ce6f211	30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f	con
d6bd72e7-7dd3-4a5b-945e-a5a8f78c301d	8fb33516-6395-47e3-b695-89118ce6f211	f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2	strong pro
eed7eb60-afd6-49b0-ba08-9fe13586790c	8fb33516-6395-47e3-b695-89118ce6f211	70df714e-8566-4265-abe5-266d5a2004a9	strong pro
56190b77-01a5-4e6d-a2bb-fb4d43953f03	e490652c-37a9-427e-aa2f-3b8badf8de61	0755baa6-1b5f-49c2-918a-457f1e16fe1c	con
\.

-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ethiqadmin

COPY users (id, first_name, last_name, email, password, remember, agree_terms, issues_complete, survey_complete) FROM stdin;
e490652c-37a9-427e-aa2f-3b8badf8de61	Garron	Ma	G@m.com	$2b$10$1Q8HzVejEczQRPQiAZhbqOG6kI8K/V1rVvKUvNYJNzCI5Pmc..qNC	t	t	t	t
c1a749e2-f40f-4a45-8990-49e40cd5405c	Serge	Vartanov	vartanov.s@gmail.com	$2b$10$MQNeseYy3FLo/IN2hj7/deG5g9LMnvDEMu3QrOOnJpXG3RsNJotaa	t	t	t	f
\.
