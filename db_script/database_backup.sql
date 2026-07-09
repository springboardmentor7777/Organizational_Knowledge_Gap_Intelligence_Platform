--
-- PostgreSQL database dump
--

\restrict 5wavB1qoT59NjGZmW7QhVfvu3R9xfzCKxpZf87jvDqqeI2MQT4QdREWX9F4y6AQ

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-09 11:03:33

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 232 (class 1259 OID 24926)
-- Name: assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessments (
    assessment_id integer NOT NULL,
    employee_id integer,
    assessment_date date,
    score integer
);


ALTER TABLE public.assessments OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24925)
-- Name: assessments_assessment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessments_assessment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assessments_assessment_id_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 231
-- Name: assessments_assessment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessments_assessment_id_seq OWNED BY public.assessments.assessment_id;


--
-- TOC entry 230 (class 1259 OID 24913)
-- Name: competency_framework; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competency_framework (
    competency_id integer NOT NULL,
    role_name character varying(100),
    skill_id integer,
    required_level character varying(50)
);


ALTER TABLE public.competency_framework OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24912)
-- Name: competency_framework_competency_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.competency_framework_competency_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.competency_framework_competency_id_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 229
-- Name: competency_framework_competency_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.competency_framework_competency_id_seq OWNED BY public.competency_framework.competency_id;


--
-- TOC entry 222 (class 1259 OID 24866)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    department_id integer NOT NULL,
    department_name character varying(100)
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24865)
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
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 221
-- Name: departments_department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_department_id_seq OWNED BY public.departments.department_id;


--
-- TOC entry 228 (class 1259 OID 24895)
-- Name: employee_skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_skills (
    employee_skill_id integer NOT NULL,
    employee_id integer,
    skill_id integer,
    proficiency_level character varying(50)
);


ALTER TABLE public.employee_skills OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24894)
-- Name: employee_skills_employee_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_skills_employee_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_skills_employee_skill_id_seq OWNER TO postgres;

--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 227
-- Name: employee_skills_employee_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_skills_employee_skill_id_seq OWNED BY public.employee_skills.employee_skill_id;


--
-- TOC entry 224 (class 1259 OID 24874)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    employee_id integer NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    email character varying(150),
    department_id integer
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24873)
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
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 223
-- Name: employees_employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_employee_id_seq OWNED BY public.employees.employee_id;


--
-- TOC entry 226 (class 1259 OID 24887)
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    skill_id integer NOT NULL,
    skill_name character varying(100),
    category character varying(100)
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24886)
-- Name: skills_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skills_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skills_skill_id_seq OWNER TO postgres;

--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 225
-- Name: skills_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skills_skill_id_seq OWNED BY public.skills.skill_id;


--
-- TOC entry 220 (class 1259 OID 24856)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(100),
    email character varying(150),
    password character varying(255),
    role character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24855)
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
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4892 (class 2604 OID 24929)
-- Name: assessments assessment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments ALTER COLUMN assessment_id SET DEFAULT nextval('public.assessments_assessment_id_seq'::regclass);


--
-- TOC entry 4891 (class 2604 OID 24916)
-- Name: competency_framework competency_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competency_framework ALTER COLUMN competency_id SET DEFAULT nextval('public.competency_framework_competency_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 24869)
-- Name: departments department_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN department_id SET DEFAULT nextval('public.departments_department_id_seq'::regclass);


--
-- TOC entry 4890 (class 2604 OID 24898)
-- Name: employee_skills employee_skill_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills ALTER COLUMN employee_skill_id SET DEFAULT nextval('public.employee_skills_employee_skill_id_seq'::regclass);


--
-- TOC entry 4888 (class 2604 OID 24877)
-- Name: employees employee_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN employee_id SET DEFAULT nextval('public.employees_employee_id_seq'::regclass);


--
-- TOC entry 4889 (class 2604 OID 24890)
-- Name: skills skill_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills ALTER COLUMN skill_id SET DEFAULT nextval('public.skills_skill_id_seq'::regclass);


--
-- TOC entry 4886 (class 2604 OID 24859)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 5072 (class 0 OID 24926)
-- Dependencies: 232
-- Data for Name: assessments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assessments (assessment_id, employee_id, assessment_date, score) FROM stdin;
1	1	2026-07-09	85
2	2	2026-07-09	78
3	3	2026-07-09	92
\.


--
-- TOC entry 5070 (class 0 OID 24913)
-- Dependencies: 230
-- Data for Name: competency_framework; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competency_framework (competency_id, role_name, skill_id, required_level) FROM stdin;
1	Java Developer	1	Advanced
2	Backend Developer	2	Intermediate
3	Frontend Developer	3	Advanced
\.


--
-- TOC entry 5062 (class 0 OID 24866)
-- Dependencies: 222
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (department_id, department_name) FROM stdin;
1	IT
2	HR
3	Finance
\.


--
-- TOC entry 5068 (class 0 OID 24895)
-- Dependencies: 228
-- Data for Name: employee_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_skills (employee_skill_id, employee_id, skill_id, proficiency_level) FROM stdin;
1	1	1	Intermediate
2	2	2	Beginner
3	3	3	Advanced
\.


--
-- TOC entry 5064 (class 0 OID 24874)
-- Dependencies: 224
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (employee_id, first_name, last_name, email, department_id) FROM stdin;
1	Sandhya	Oni	sandhya@example.com	1
2	Rahul	Kumar	rahul@example.com	2
3	Priya	Sharma	priya@example.com	3
\.


--
-- TOC entry 5066 (class 0 OID 24887)
-- Dependencies: 226
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skills (skill_id, skill_name, category) FROM stdin;
1	Java	Programming
2	Spring Boot	Backend
3	React	Frontend
\.


--
-- TOC entry 5060 (class 0 OID 24856)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password, role) FROM stdin;
1	sandhya	sandhya@example.com	password123	Employee
2	rahul	rahul@example.com	password123	Manager
3	admin	admin@example.com	admin123	Admin
\.


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 231
-- Name: assessments_assessment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assessments_assessment_id_seq', 3, true);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 229
-- Name: competency_framework_competency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competency_framework_competency_id_seq', 3, true);


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 221
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_department_id_seq', 3, true);


--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 227
-- Name: employee_skills_employee_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_skills_employee_skill_id_seq', 3, true);


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 223
-- Name: employees_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_employee_id_seq', 3, true);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 225
-- Name: skills_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skills_skill_id_seq', 3, true);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- TOC entry 4906 (class 2606 OID 24932)
-- Name: assessments assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (assessment_id);


--
-- TOC entry 4904 (class 2606 OID 24919)
-- Name: competency_framework competency_framework_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competency_framework
    ADD CONSTRAINT competency_framework_pkey PRIMARY KEY (competency_id);


--
-- TOC entry 4896 (class 2606 OID 24872)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (department_id);


--
-- TOC entry 4902 (class 2606 OID 24901)
-- Name: employee_skills employee_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills
    ADD CONSTRAINT employee_skills_pkey PRIMARY KEY (employee_skill_id);


--
-- TOC entry 4898 (class 2606 OID 24880)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (employee_id);


--
-- TOC entry 4900 (class 2606 OID 24893)
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skill_id);


--
-- TOC entry 4894 (class 2606 OID 24864)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4911 (class 2606 OID 24933)
-- Name: assessments assessments_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id);


--
-- TOC entry 4910 (class 2606 OID 24920)
-- Name: competency_framework competency_framework_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competency_framework
    ADD CONSTRAINT competency_framework_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(skill_id);


--
-- TOC entry 4908 (class 2606 OID 24902)
-- Name: employee_skills employee_skills_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills
    ADD CONSTRAINT employee_skills_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id);


--
-- TOC entry 4909 (class 2606 OID 24907)
-- Name: employee_skills employee_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills
    ADD CONSTRAINT employee_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(skill_id);


--
-- TOC entry 4907 (class 2606 OID 24881)
-- Name: employees employees_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


-- Completed on 2026-07-09 11:03:33

--
-- PostgreSQL database dump complete
--

\unrestrict 5wavB1qoT59NjGZmW7QhVfvu3R9xfzCKxpZf87jvDqqeI2MQT4QdREWX9F4y6AQ

