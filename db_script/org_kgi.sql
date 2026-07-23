--
-- PostgreSQL database dump
--

\restrict xFitD7AcbyNSbdO7UlhtIONAe1uv1eDL7zkPqoBorqUvtuo2Y2tpfXCphbvLuqe

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-22 18:55:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16389)
-- Name: organization; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA organization;


ALTER SCHEMA organization OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16403)
-- Name: departments; Type: TABLE; Schema: organization; Owner: postgres
--

CREATE TABLE organization.departments (
    department_id integer NOT NULL,
    department_name character varying(100)
);


ALTER TABLE organization.departments OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16402)
-- Name: departments_department_id_seq; Type: SEQUENCE; Schema: organization; Owner: postgres
--

CREATE SEQUENCE organization.departments_department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE organization.departments_department_id_seq OWNER TO postgres;

--
-- TOC entry 5121 (class 0 OID 0)
-- Dependencies: 224
-- Name: departments_department_id_seq; Type: SEQUENCE OWNED BY; Schema: organization; Owner: postgres
--

ALTER SEQUENCE organization.departments_department_id_seq OWNED BY organization.departments.department_id;


--
-- TOC entry 227 (class 1259 OID 16409)
-- Name: employees; Type: TABLE; Schema: organization; Owner: postgres
--

CREATE TABLE organization.employees (
    employee_id integer NOT NULL,
    user_id integer,
    department_id integer,
    salary numeric(10,2),
    joining_date date
);


ALTER TABLE organization.employees OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16408)
-- Name: employees_employee_id_seq; Type: SEQUENCE; Schema: organization; Owner: postgres
--

CREATE SEQUENCE organization.employees_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE organization.employees_employee_id_seq OWNER TO postgres;

--
-- TOC entry 5122 (class 0 OID 0)
-- Dependencies: 226
-- Name: employees_employee_id_seq; Type: SEQUENCE OWNED BY; Schema: organization; Owner: postgres
--

ALTER SEQUENCE organization.employees_employee_id_seq OWNED BY organization.employees.employee_id;


--
-- TOC entry 221 (class 1259 OID 16391)
-- Name: roles; Type: TABLE; Schema: organization; Owner: postgres
--

CREATE TABLE organization.roles (
    role_id integer NOT NULL,
    role_name character varying(50)
);


ALTER TABLE organization.roles OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: organization; Owner: postgres
--

CREATE SEQUENCE organization.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE organization.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 5123 (class 0 OID 0)
-- Dependencies: 220
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: organization; Owner: postgres
--

ALTER SEQUENCE organization.roles_role_id_seq OWNED BY organization.roles.role_id;


--
-- TOC entry 223 (class 1259 OID 16397)
-- Name: users; Type: TABLE; Schema: organization; Owner: postgres
--

CREATE TABLE organization.users (
    user_id integer NOT NULL,
    username character varying(50),
    email character varying(100),
    role_id integer
);


ALTER TABLE organization.users OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16396)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: organization; Owner: postgres
--

CREATE SEQUENCE organization.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE organization.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5124 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: organization; Owner: postgres
--

ALTER SEQUENCE organization.users_user_id_seq OWNED BY organization.users.user_id;


--
-- TOC entry 229 (class 1259 OID 24589)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    department_id integer NOT NULL,
    department_name character varying(100) NOT NULL
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 24588)
-- Name: departments_department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_department_id_seq OWNER TO postgres;

--
-- TOC entry 5125 (class 0 OID 0)
-- Dependencies: 228
-- Name: departments_department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_department_id_seq OWNED BY public.departments.department_id;


--
-- TOC entry 236 (class 1259 OID 24650)
-- Name: employee_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_roles (
    employee_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.employee_roles OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24611)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    employee_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(15),
    hire_date date NOT NULL,
    salary numeric(10,2),
    department_id integer
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 24610)
-- Name: employees_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_employee_id_seq OWNER TO postgres;

--
-- TOC entry 5126 (class 0 OID 0)
-- Dependencies: 232
-- Name: employees_employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_employee_id_seq OWNED BY public.employees.employee_id;


--
-- TOC entry 231 (class 1259 OID 24600)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(100) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24599)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 5127 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 235 (class 1259 OID 24632)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    employee_id integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 24631)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5128 (class 0 OID 0)
-- Dependencies: 234
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4898 (class 2604 OID 16406)
-- Name: departments department_id; Type: DEFAULT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.departments ALTER COLUMN department_id SET DEFAULT nextval('organization.departments_department_id_seq'::regclass);


--
-- TOC entry 4899 (class 2604 OID 16412)
-- Name: employees employee_id; Type: DEFAULT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.employees ALTER COLUMN employee_id SET DEFAULT nextval('organization.employees_employee_id_seq'::regclass);


--
-- TOC entry 4896 (class 2604 OID 16394)
-- Name: roles role_id; Type: DEFAULT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.roles ALTER COLUMN role_id SET DEFAULT nextval('organization.roles_role_id_seq'::regclass);


--
-- TOC entry 4897 (class 2604 OID 16400)
-- Name: users user_id; Type: DEFAULT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.users ALTER COLUMN user_id SET DEFAULT nextval('organization.users_user_id_seq'::regclass);


--
-- TOC entry 4900 (class 2604 OID 24592)
-- Name: departments department_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN department_id SET DEFAULT nextval('public.departments_department_id_seq'::regclass);


--
-- TOC entry 4902 (class 2604 OID 24614)
-- Name: employees employee_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN employee_id SET DEFAULT nextval('public.employees_employee_id_seq'::regclass);


--
-- TOC entry 4901 (class 2604 OID 24603)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 4903 (class 2604 OID 24635)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 5104 (class 0 OID 16403)
-- Dependencies: 225
-- Data for Name: departments; Type: TABLE DATA; Schema: organization; Owner: postgres
--

COPY organization.departments (department_id, department_name) FROM stdin;
1	HR
2	IT
3	Finance
\.


--
-- TOC entry 5106 (class 0 OID 16409)
-- Dependencies: 227
-- Data for Name: employees; Type: TABLE DATA; Schema: organization; Owner: postgres
--

COPY organization.employees (employee_id, user_id, department_id, salary, joining_date) FROM stdin;
1	1	2	80000.00	2025-01-10
2	2	1	60000.00	2024-08-15
3	3	3	50000.00	2023-03-12
\.


--
-- TOC entry 5100 (class 0 OID 16391)
-- Dependencies: 221
-- Data for Name: roles; Type: TABLE DATA; Schema: organization; Owner: postgres
--

COPY organization.roles (role_id, role_name) FROM stdin;
1	Admin
2	Manager
3	Employee
\.


--
-- TOC entry 5102 (class 0 OID 16397)
-- Dependencies: 223
-- Data for Name: users; Type: TABLE DATA; Schema: organization; Owner: postgres
--

COPY organization.users (user_id, username, email, role_id) FROM stdin;
1	Alice	alice@gmail.com	1
2	Bob	bob@gmail.com	2
3	Charlie	charlie@gmail.com	3
\.


--
-- TOC entry 5108 (class 0 OID 24589)
-- Dependencies: 229
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (department_id, department_name) FROM stdin;
1	IT
2	HR
3	Finance
4	Sales
5	Support
\.


--
-- TOC entry 5115 (class 0 OID 24650)
-- Dependencies: 236
-- Data for Name: employee_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_roles (employee_id, role_id) FROM stdin;
1	3
2	4
3	2
4	2
5	5
6	3
7	2
8	4
9	2
10	5
11	1
12	2
13	5
14	4
15	2
16	3
17	2
18	4
19	5
20	3
\.


--
-- TOC entry 5112 (class 0 OID 24611)
-- Dependencies: 233
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (employee_id, first_name, last_name, email, phone_number, hire_date, salary, department_id) FROM stdin;
1	Arun	Kumar	arun.kumar@technova.com	9876543210	2023-01-15	65000.00	1
2	Priya	Sharma	priya.sharma@technova.com	9876543211	2023-02-10	55000.00	2
3	Rahul	Verma	rahul.verma@technova.com	9876543212	2023-03-05	70000.00	3
4	Sneha	Iyer	sneha.iyer@technova.com	9876543213	2023-01-20	60000.00	4
5	Karthik	Raj	karthik.raj@technova.com	9876543214	2023-04-12	50000.00	5
6	Aishwarya	Nair	aishwarya.nair@technova.com	9876543215	2023-02-18	68000.00	1
7	Vikram	Singh	vikram.singh@technova.com	9876543216	2023-05-01	72000.00	3
8	Neha	Gupta	neha.gupta@technova.com	9876543217	2023-03-25	56000.00	2
9	Rohan	Patel	rohan.patel@technova.com	9876543218	2023-06-08	59000.00	4
10	Meera	Krishnan	meera.krishnan@technova.com	9876543219	2023-04-15	52000.00	5
11	Sanjay	Reddy	sanjay.reddy@technova.com	9876543220	2023-07-01	75000.00	1
12	Divya	Menon	divya.menon@technova.com	9876543221	2023-05-18	71000.00	3
13	Ajay	Kumar	ajay.kumar@technova.com	9876543222	2023-08-10	51000.00	5
14	Pooja	Das	pooja.das@technova.com	9876543223	2023-06-20	57000.00	2
15	Harish	Babu	harish.babu@technova.com	9876543224	2023-09-05	61000.00	4
16	Nisha	Kapoor	nisha.kapoor@technova.com	9876543225	2023-07-22	69000.00	1
17	Manoj	Kumar	manoj.kumar@technova.com	9876543226	2023-10-01	73000.00	3
18	Keerthana	S	keerthana.s@technova.com	9876543227	2023-08-14	58000.00	2
19	Akash	Jain	akash.jain@technova.com	9876543228	2023-11-12	53000.00	5
20	Ananya	Rao	ananya.rao@technova.com	9876543229	2023-09-28	70000.00	1
\.


--
-- TOC entry 5110 (class 0 OID 24600)
-- Dependencies: 231
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, role_name) FROM stdin;
1	Admin
2	Manager
3	Developer
4	HR
5	Tester
6	System Administrator
7	Project Manager
8	Software Developer
9	HR Executive
10	QA Engineer
\.


--
-- TOC entry 5114 (class 0 OID 24632)
-- Dependencies: 235
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, employee_id) FROM stdin;
1	arun.kumar	Arun@123	1
2	priya.sharma	Priya@123	2
3	rahul.verma	Rahul@123	3
4	sneha.iyer	Sneha@123	4
5	karthik.raj	Karthik@123	5
6	aishwarya.nair	Aishwarya@123	6
7	vikram.singh	Vikram@123	7
8	neha.gupta	Neha@123	8
9	rohan.patel	Rohan@123	9
10	meera.krishnan	Meera@123	10
11	sanjay.reddy	Sanjay@123	11
12	divya.menon	Divya@123	12
13	ajay.kumar	Ajay@123	13
14	pooja.das	Pooja@123	14
15	harish.babu	Harish@123	15
16	nisha.kapoor	Nisha@123	16
17	manoj.kumar	Manoj@123	17
18	keerthana.s	Keerthana@123	18
19	akash.jain	Akash@123	19
20	ananya.rao	Ananya@123	20
\.


--
-- TOC entry 5129 (class 0 OID 0)
-- Dependencies: 224
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: organization; Owner: postgres
--

SELECT pg_catalog.setval('organization.departments_department_id_seq', 3, true);


--
-- TOC entry 5130 (class 0 OID 0)
-- Dependencies: 226
-- Name: employees_employee_id_seq; Type: SEQUENCE SET; Schema: organization; Owner: postgres
--

SELECT pg_catalog.setval('organization.employees_employee_id_seq', 3, true);


--
-- TOC entry 5131 (class 0 OID 0)
-- Dependencies: 220
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: organization; Owner: postgres
--

SELECT pg_catalog.setval('organization.roles_role_id_seq', 3, true);


--
-- TOC entry 5132 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: organization; Owner: postgres
--

SELECT pg_catalog.setval('organization.users_user_id_seq', 3, true);


--
-- TOC entry 5133 (class 0 OID 0)
-- Dependencies: 228
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_department_id_seq', 5, true);


--
-- TOC entry 5134 (class 0 OID 0)
-- Dependencies: 232
-- Name: employees_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_employee_id_seq', 20, true);


--
-- TOC entry 5135 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 10, true);


--
-- TOC entry 5136 (class 0 OID 0)
-- Dependencies: 234
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 20, true);


--
-- TOC entry 4915 (class 2606 OID 16420)
-- Name: departments pk_departments; Type: CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.departments
    ADD CONSTRAINT pk_departments PRIMARY KEY (department_id);


--
-- TOC entry 4920 (class 2606 OID 16422)
-- Name: employees pk_employees; Type: CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.employees
    ADD CONSTRAINT pk_employees PRIMARY KEY (employee_id);


--
-- TOC entry 4905 (class 2606 OID 16416)
-- Name: roles pk_roles; Type: CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.roles
    ADD CONSTRAINT pk_roles PRIMARY KEY (role_id);


--
-- TOC entry 4911 (class 2606 OID 16418)
-- Name: users pk_users; Type: CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.users
    ADD CONSTRAINT pk_users PRIMARY KEY (user_id);


--
-- TOC entry 4917 (class 2606 OID 16428)
-- Name: departments uq_department_name; Type: CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.departments
    ADD CONSTRAINT uq_department_name UNIQUE (department_name);


--
-- TOC entry 4907 (class 2606 OID 16424)
-- Name: roles uq_role_name; Type: CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.roles
    ADD CONSTRAINT uq_role_name UNIQUE (role_name);


--
-- TOC entry 4913 (class 2606 OID 16426)
-- Name: users uq_users_email; Type: CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.users
    ADD CONSTRAINT uq_users_email UNIQUE (email);


--
-- TOC entry 4922 (class 2606 OID 24598)
-- Name: departments departments_department_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_department_name_key UNIQUE (department_name);


--
-- TOC entry 4924 (class 2606 OID 24596)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (department_id);


--
-- TOC entry 4943 (class 2606 OID 24656)
-- Name: employee_roles employee_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_roles
    ADD CONSTRAINT employee_roles_pkey PRIMARY KEY (employee_id, role_id);


--
-- TOC entry 4930 (class 2606 OID 24623)
-- Name: employees employees_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);


--
-- TOC entry 4932 (class 2606 OID 24621)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (employee_id);


--
-- TOC entry 4926 (class 2606 OID 24607)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4928 (class 2606 OID 24609)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 4937 (class 2606 OID 24644)
-- Name: users users_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_employee_id_key UNIQUE (employee_id);


--
-- TOC entry 4939 (class 2606 OID 24640)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4941 (class 2606 OID 24642)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4918 (class 1259 OID 16446)
-- Name: idx_employees_department; Type: INDEX; Schema: organization; Owner: postgres
--

CREATE INDEX idx_employees_department ON organization.employees USING btree (department_id);


--
-- TOC entry 4908 (class 1259 OID 16445)
-- Name: idx_users_role; Type: INDEX; Schema: organization; Owner: postgres
--

CREATE INDEX idx_users_role ON organization.users USING btree (role_id);


--
-- TOC entry 4909 (class 1259 OID 16444)
-- Name: idx_users_username; Type: INDEX; Schema: organization; Owner: postgres
--

CREATE INDEX idx_users_username ON organization.users USING btree (username);


--
-- TOC entry 4933 (class 1259 OID 24668)
-- Name: idx_employee_department; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_employee_department ON public.employees USING btree (department_id);


--
-- TOC entry 4934 (class 1259 OID 24667)
-- Name: idx_employee_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_employee_email ON public.employees USING btree (email);


--
-- TOC entry 4944 (class 1259 OID 24670)
-- Name: idx_employee_roles_role; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_employee_roles_role ON public.employee_roles USING btree (role_id);


--
-- TOC entry 4935 (class 1259 OID 24669)
-- Name: idx_user_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_username ON public.users USING btree (username);


--
-- TOC entry 4946 (class 2606 OID 16439)
-- Name: employees fk_employee_department; Type: FK CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.employees
    ADD CONSTRAINT fk_employee_department FOREIGN KEY (department_id) REFERENCES organization.departments(department_id);


--
-- TOC entry 4947 (class 2606 OID 16434)
-- Name: employees fk_employee_user; Type: FK CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.employees
    ADD CONSTRAINT fk_employee_user FOREIGN KEY (user_id) REFERENCES organization.users(user_id);


--
-- TOC entry 4945 (class 2606 OID 16429)
-- Name: users fk_users_role; Type: FK CONSTRAINT; Schema: organization; Owner: postgres
--

ALTER TABLE ONLY organization.users
    ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES organization.roles(role_id);


--
-- TOC entry 4948 (class 2606 OID 24624)
-- Name: employees fk_department; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- TOC entry 4949 (class 2606 OID 24645)
-- Name: users fk_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id);


--
-- TOC entry 4950 (class 2606 OID 24657)
-- Name: employee_roles fk_employee_role_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_roles
    ADD CONSTRAINT fk_employee_role_employee FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id);


--
-- TOC entry 4951 (class 2606 OID 24662)
-- Name: employee_roles fk_employee_role_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_roles
    ADD CONSTRAINT fk_employee_role_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


-- Completed on 2026-07-22 18:55:30

--
-- PostgreSQL database dump complete
--

\unrestrict xFitD7AcbyNSbdO7UlhtIONAe1uv1eDL7zkPqoBorqUvtuo2Y2tpfXCphbvLuqe

