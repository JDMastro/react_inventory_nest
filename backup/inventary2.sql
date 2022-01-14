--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

-- Started on 2022-01-14 14:45:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3539 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 85436)
-- Name: classification_kind_movement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classification_kind_movement (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.classification_kind_movement OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 85441)
-- Name: classification_kind_movement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classification_kind_movement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.classification_kind_movement_id_seq OWNER TO postgres;

--
-- TOC entry 3540 (class 0 OID 0)
-- Dependencies: 210
-- Name: classification_kind_movement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classification_kind_movement_id_seq OWNED BY public.classification_kind_movement.id;


--
-- TOC entry 211 (class 1259 OID 85442)
-- Name: consecutive; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consecutive (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    prefix character varying NOT NULL,
    last_inserted integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.consecutive OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 85448)
-- Name: consecutive_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consecutive_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consecutive_id_seq OWNER TO postgres;

--
-- TOC entry 3541 (class 0 OID 0)
-- Dependencies: 212
-- Name: consecutive_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consecutive_id_seq OWNED BY public.consecutive.id;


--
-- TOC entry 213 (class 1259 OID 85449)
-- Name: conversion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversion (
    id integer NOT NULL,
    conversion_from integer NOT NULL,
    conversion_to integer NOT NULL,
    conversion_quatity integer NOT NULL,
    signs_id integer NOT NULL
);


ALTER TABLE public.conversion OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 85452)
-- Name: conversion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.conversion_id_seq OWNER TO postgres;

--
-- TOC entry 3542 (class 0 OID 0)
-- Dependencies: 214
-- Name: conversion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversion_id_seq OWNED BY public.conversion.id;


--
-- TOC entry 215 (class 1259 OID 85453)
-- Name: header; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.header (
    id integer NOT NULL,
    person_id integer NOT NULL,
    number_order character varying NOT NULL,
    kind_movements_id integer NOT NULL,
    observation character varying NOT NULL,
    creation_at timestamp with time zone DEFAULT now() NOT NULL,
    "updateAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    delete_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.header OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 85461)
-- Name: header_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.header_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.header_id_seq OWNER TO postgres;

--
-- TOC entry 3543 (class 0 OID 0)
-- Dependencies: 216
-- Name: header_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.header_id_seq OWNED BY public.header.id;


--
-- TOC entry 217 (class 1259 OID 85462)
-- Name: kind_movements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kind_movements (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    user_id integer NOT NULL,
    roles_id integer NOT NULL,
    require_consecutive boolean DEFAULT false NOT NULL,
    creation_at timestamp with time zone DEFAULT now() NOT NULL,
    "updateAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    delete_at timestamp with time zone DEFAULT now() NOT NULL,
    status_id integer NOT NULL,
    classification_kindmovement_id integer NOT NULL,
    consecutive_id integer
);


ALTER TABLE public.kind_movements OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 85471)
-- Name: kind_movements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kind_movements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kind_movements_id_seq OWNER TO postgres;

--
-- TOC entry 3544 (class 0 OID 0)
-- Dependencies: 218
-- Name: kind_movements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kind_movements_id_seq OWNED BY public.kind_movements.id;


--
-- TOC entry 219 (class 1259 OID 85472)
-- Name: kindidentity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kindidentity (
    id integer NOT NULL,
    description character varying NOT NULL,
    code character varying NOT NULL
);


ALTER TABLE public.kindidentity OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 85477)
-- Name: kindidentity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kindidentity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kindidentity_id_seq OWNER TO postgres;

--
-- TOC entry 3545 (class 0 OID 0)
-- Dependencies: 220
-- Name: kindidentity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kindidentity_id_seq OWNED BY public.kindidentity.id;


--
-- TOC entry 221 (class 1259 OID 85478)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 85483)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3546 (class 0 OID 0)
-- Dependencies: 222
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 223 (class 1259 OID 85484)
-- Name: movements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movements (
    id integer NOT NULL,
    product_id integer NOT NULL,
    quantity double precision NOT NULL,
    "total_purchasePrice" double precision NOT NULL,
    unit_price double precision NOT NULL,
    header_id integer NOT NULL,
    quantity_returned double precision NOT NULL,
    status_id integer NOT NULL,
    suggest boolean DEFAULT false NOT NULL,
    suggest_units double precision DEFAULT '0'::double precision NOT NULL,
    suggest_generated double precision DEFAULT '0'::double precision NOT NULL,
    amount_used double precision DEFAULT '0'::double precision NOT NULL,
    waste_quantity double precision DEFAULT '0'::double precision NOT NULL,
    person_id integer,
    observation character varying,
    "updateAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone
);


ALTER TABLE public.movements OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 85495)
-- Name: movements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movements_id_seq OWNER TO postgres;

--
-- TOC entry 3547 (class 0 OID 0)
-- Dependencies: 224
-- Name: movements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movements_id_seq OWNED BY public.movements.id;


--
-- TOC entry 225 (class 1259 OID 85496)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    id integer NOT NULL,
    kind_id integer NOT NULL,
    idnumber integer NOT NULL,
    name character varying NOT NULL,
    second_name character varying,
    first_surname character varying NOT NULL,
    second_surname character varying,
    fullname character varying NOT NULL,
    address character varying NOT NULL,
    phone numeric NOT NULL,
    contact character varying NOT NULL,
    status boolean DEFAULT true NOT NULL,
    user_id integer NOT NULL,
    creation_at timestamp with time zone DEFAULT now() NOT NULL,
    "updateAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    delete_at timestamp with time zone DEFAULT now() NOT NULL,
    roles_id integer NOT NULL
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 85505)
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO postgres;

--
-- TOC entry 3548 (class 0 OID 0)
-- Dependencies: 226
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- TOC entry 227 (class 1259 OID 85506)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    sku character varying NOT NULL,
    code_bar character varying,
    current_existence double precision NOT NULL,
    reserved_quantity double precision NOT NULL,
    purchase_unit_id integer NOT NULL,
    sale_unit_id integer NOT NULL,
    to_discount double precision,
    product_parent_id integer,
    waste_quantity integer DEFAULT 0 NOT NULL,
    isderivate boolean DEFAULT false NOT NULL,
    user_id integer NOT NULL,
    creation_at timestamp with time zone DEFAULT now() NOT NULL,
    "updateAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    delete_at timestamp with time zone DEFAULT now() NOT NULL,
    "movementsId" integer,
    sale_price integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 85517)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3549 (class 0 OID 0)
-- Dependencies: 228
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 229 (class 1259 OID 85518)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 85523)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 3550 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 231 (class 1259 OID 85524)
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    id integer NOT NULL,
    description character varying NOT NULL,
    key character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 85529)
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.settings_id_seq OWNER TO postgres;

--
-- TOC entry 3551 (class 0 OID 0)
-- Dependencies: 232
-- Name: settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;


--
-- TOC entry 233 (class 1259 OID 85530)
-- Name: signs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.signs (
    id integer NOT NULL,
    sign character varying NOT NULL
);


ALTER TABLE public.signs OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 85535)
-- Name: signs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.signs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.signs_id_seq OWNER TO postgres;

--
-- TOC entry 3552 (class 0 OID 0)
-- Dependencies: 234
-- Name: signs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.signs_id_seq OWNED BY public.signs.id;


--
-- TOC entry 235 (class 1259 OID 85536)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    code character varying NOT NULL,
    is_to_employee boolean DEFAULT false NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 85542)
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_id_seq OWNER TO postgres;

--
-- TOC entry 3553 (class 0 OID 0)
-- Dependencies: 236
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- TOC entry 237 (class 1259 OID 85543)
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 85548)
-- Name: units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.units (
    id integer NOT NULL,
    code character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.units OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 85553)
-- Name: units_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.units_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.units_id_seq OWNER TO postgres;

--
-- TOC entry 3554 (class 0 OID 0)
-- Dependencies: 239
-- Name: units_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.units_id_seq OWNED BY public.units.id;


--
-- TOC entry 240 (class 1259 OID 85554)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    code character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    creation_at timestamp with time zone DEFAULT now() NOT NULL,
    "updateAt" timestamp(3) without time zone DEFAULT ('now'::text)::timestamp(3) with time zone NOT NULL,
    delete_at timestamp with time zone DEFAULT now() NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 85562)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3555 (class 0 OID 0)
-- Dependencies: 241
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3243 (class 2604 OID 85732)
-- Name: classification_kind_movement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classification_kind_movement ALTER COLUMN id SET DEFAULT nextval('public.classification_kind_movement_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 85733)
-- Name: consecutive id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consecutive ALTER COLUMN id SET DEFAULT nextval('public.consecutive_id_seq'::regclass);


--
-- TOC entry 3246 (class 2604 OID 85734)
-- Name: conversion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversion ALTER COLUMN id SET DEFAULT nextval('public.conversion_id_seq'::regclass);


--
-- TOC entry 3247 (class 2604 OID 85735)
-- Name: header id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.header ALTER COLUMN id SET DEFAULT nextval('public.header_id_seq'::regclass);


--
-- TOC entry 3251 (class 2604 OID 85736)
-- Name: kind_movements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kind_movements ALTER COLUMN id SET DEFAULT nextval('public.kind_movements_id_seq'::regclass);


--
-- TOC entry 3256 (class 2604 OID 85737)
-- Name: kindidentity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kindidentity ALTER COLUMN id SET DEFAULT nextval('public.kindidentity_id_seq'::regclass);


--
-- TOC entry 3257 (class 2604 OID 85738)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3258 (class 2604 OID 85739)
-- Name: movements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movements ALTER COLUMN id SET DEFAULT nextval('public.movements_id_seq'::regclass);


--
-- TOC entry 3265 (class 2604 OID 85740)
-- Name: person id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- TOC entry 3270 (class 2604 OID 85741)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3277 (class 2604 OID 85742)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3278 (class 2604 OID 85743)
-- Name: settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);


--
-- TOC entry 3279 (class 2604 OID 85744)
-- Name: signs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signs ALTER COLUMN id SET DEFAULT nextval('public.signs_id_seq'::regclass);


--
-- TOC entry 3280 (class 2604 OID 85745)
-- Name: status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- TOC entry 3282 (class 2604 OID 85746)
-- Name: units id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.units ALTER COLUMN id SET DEFAULT nextval('public.units_id_seq'::regclass);


--
-- TOC entry 3283 (class 2604 OID 85747)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3501 (class 0 OID 85436)
-- Dependencies: 209
-- Data for Name: classification_kind_movement; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.classification_kind_movement VALUES (1, 'ENTRADA');
INSERT INTO public.classification_kind_movement VALUES (2, 'SALIDA');
INSERT INTO public.classification_kind_movement VALUES (3, 'PRODUCCION');


--
-- TOC entry 3503 (class 0 OID 85442)
-- Dependencies: 211
-- Data for Name: consecutive; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.consecutive VALUES (1, 'COMPRA DE PRODUCTOS A PROVEEDORES', 'COMPRA DE PRODUCTOS A PROVEEDORES', 'CPP', 1);
INSERT INTO public.consecutive VALUES (2, 'DEVOLUCION A PROVEEDOR', 'DEVOLUCION A PROVEEDOR', 'DAP', 1);
INSERT INTO public.consecutive VALUES (3, 'DEVOLUCION DE PRODUCTO DE UN CLIENTE', 'DEVOLUCION DE PRODUCTO DE UN CLIENTE', 'DPC', 1);
INSERT INTO public.consecutive VALUES (4, 'PRODUCCION', 'PRODUCCION', 'PR', 1);
INSERT INTO public.consecutive VALUES (5, 'VENTA DE PRODUCTO A UN CLIENTE', 'VENTA DE PRODUCTO A UN CLIENTE', 'VPC', 1);


--
-- TOC entry 3505 (class 0 OID 85449)
-- Dependencies: 213
-- Data for Name: conversion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.conversion VALUES (1, 1, 2, 1000, 2);
INSERT INTO public.conversion VALUES (2, 2, 1, 1000, 1);


--
-- TOC entry 3507 (class 0 OID 85453)
-- Dependencies: 215
-- Data for Name: header; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3509 (class 0 OID 85462)
-- Dependencies: 217
-- Data for Name: kind_movements; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.kind_movements VALUES (1, 'DEVOLUCION DE MERCACIA A CLIENTE CON CONSECUTIVO', 'DEVOLUCION DE MERCACIA A CLIENTE CON CONSECUTIVO', 0, 2, true, '2022-01-03 16:46:16.808439-05', '2022-01-03 16:46:16.808', '2022-01-03 16:46:16.808439-05', 2, 1, 3);
INSERT INTO public.kind_movements VALUES (2, 'DEVOLUCION DE MERCACIA A CLIENTE SIN CONSECUTIVO', 'DEVOLUCION DE MERCACIA A CLIENTE SIN CONSECUTIVO', 0, 2, false, '2022-01-03 16:47:12.319655-05', '2022-01-03 16:47:12.32', '2022-01-03 16:47:12.319655-05', 2, 1, NULL);
INSERT INTO public.kind_movements VALUES (3, 'DEVOLUCION DE MERCACIA A PROVEEDOR CON CONSECUTIVO', 'DEVOLUCION DE MERCACIA A PROVEEDOR CON CONSECUTIVO', 0, 1, true, '2022-01-03 16:48:53.375955-05', '2022-01-03 16:48:53.376', '2022-01-03 16:48:53.375955-05', 2, 2, 2);
INSERT INTO public.kind_movements VALUES (4, 'DEVOLUCION DE MERCANCIA A PROVEEDOR SIN CONCECUTIVO', 'DEVOLUCION DE MERCANCIA A PROVEEDOR SIN CONCECUTIVO', 0, 1, false, '2022-01-03 16:52:50.505304-05', '2022-01-03 16:52:50.505', '2022-01-03 16:52:50.505304-05', 2, 2, NULL);
INSERT INTO public.kind_movements VALUES (5, 'ENTRADA INVENTARIO POR PROVEEDOR CON CONSECUTIVO', 'ENTRADA INVENTARIO POR PROVEEDOR CON CONSECUTIVO', 0, 1, true, '2022-01-03 16:54:24.815019-05', '2022-01-03 16:54:24.815', '2022-01-03 16:54:24.815019-05', 2, 1, 1);
INSERT INTO public.kind_movements VALUES (6, 'ENTRADA INVENTARIO POR PROVEEDOR SIN CONSECUTIVO', 'ENTRADA INVENTARIO POR PROVEEDOR SIN CONSECUTIVO', 0, 1, false, '2022-01-03 16:55:39.402297-05', '2022-01-03 16:55:39.402', '2022-01-03 16:55:39.402297-05', 2, 1, NULL);
INSERT INTO public.kind_movements VALUES (7, 'GENERAR PRODUCCION', 'GENERAR PRODUCCION', 0, 3, true, '2022-01-03 17:01:41.876002-05', '2022-01-03 17:01:41.876', '2022-01-03 17:01:41.876002-05', 6, 3, 4);
INSERT INTO public.kind_movements VALUES (8, 'SALIDA DE INVENTARIO POR CLIENTE CON CONSECUTIVO', 'SALIDA DE INVENTARIO POR CLIENTE CON CONSECUTIVO', 0, 2, true, '2022-01-03 17:02:48.909097-05', '2022-01-03 17:02:48.909', '2022-01-03 17:02:48.909097-05', 3, 2, 5);
INSERT INTO public.kind_movements VALUES (9, 'SALIDA DE INVENTARIO POR CLIENTE SIN CONSECUTIVO', 'SALIDA DE INVENTARIO POR CLIENTE SIN CONSECUTIVO', 0, 2, false, '2022-01-03 17:03:35.546005-05', '2022-01-03 17:03:35.546', '2022-01-03 17:03:35.546005-05', 3, 2, NULL);


--
-- TOC entry 3511 (class 0 OID 85472)
-- Dependencies: 219
-- Data for Name: kindidentity; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.kindidentity VALUES (1, 'CEDULA', 'CC');
INSERT INTO public.kindidentity VALUES (2, 'NIT', 'NI');
INSERT INTO public.kindidentity VALUES (3, 'PASAPORTE', 'PA');


--
-- TOC entry 3513 (class 0 OID 85478)
-- Dependencies: 221
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.migrations VALUES (1, 1641241525963, 'init1641241525963');
INSERT INTO public.migrations VALUES (2, 1642171875716, 'changeProduct1642171875716');


--
-- TOC entry 3515 (class 0 OID 85484)
-- Dependencies: 223
-- Data for Name: movements; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3517 (class 0 OID 85496)
-- Dependencies: 225
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.person VALUES (1, 1, 123456789, 'test', NULL, 'test', NULL, 'test test', 'daniel lemaitre', 9999999999, 'test prima', true, 0, '2022-01-03 15:48:22.306721-05', '2022-01-03 15:48:22.307', '2022-01-03 15:48:22.306721-05', 3);
INSERT INTO public.person VALUES (2, 2, 123456778, 'SEDE', '', 'ZONA', 'NORTE', 'SEDE  ZONA ', 'ZONA NORTE', 9999999922, 'ADMINISTRADOR ZONA NORTE', true, 0, '2022-01-03 17:23:01.806099-05', '2022-01-03 17:23:01.806', '2022-01-03 17:23:01.806099-05', 2);
INSERT INTO public.person VALUES (3, 2, 555555, 'SEDE', '', 'ZONA', 'SUR', 'SEDE  ZONA ', 'ZONA SUR', 5555555555, 'ADMINISTRADOR ZONA SUR', true, 0, '2022-01-03 17:24:16.702951-05', '2022-01-03 17:24:16.703', '2022-01-03 17:24:16.702951-05', 2);
INSERT INTO public.person VALUES (4, 2, 123456788, 'TEST NAME', '', 'FIRST', 'SECOND', 'TEST NAME  FIRST ', 'TEST ADDRES', 6666666666, 'TEST ADMINISTRADOR', true, 0, '2022-01-03 17:25:26.902755-05', '2022-01-03 17:25:26.903', '2022-01-03 17:25:26.902755-05', 1);


--
-- TOC entry 3519 (class 0 OID 85506)
-- Dependencies: 227
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES (1, 'ARROZ', 'ARROZ', 'TT', 'RR', 0, 0, 1, 2, NULL, NULL, 0, false, 0, '2022-01-03 17:29:19.242118-05', '2022-01-03 17:29:19.242', '2022-01-03 17:29:19.242118-05', NULL, 0);
INSERT INTO public.products VALUES (2, 'CARNE', 'DE RES', 'SS', 'DD', 0, 0, 2, 1, NULL, NULL, 0, false, 0, '2022-01-03 17:29:59.331928-05', '2022-01-03 17:29:59.332', '2022-01-03 17:29:59.331928-05', NULL, 0);
INSERT INTO public.products VALUES (3, 'PESCADO', 'DE MAR', 'KK', 'JJ', 0, 0, 2, 2, NULL, NULL, 0, false, 0, '2022-01-03 17:31:04.554015-05', '2022-01-03 17:31:04.554', '2022-01-03 17:31:04.554015-05', NULL, 0);
INSERT INTO public.products VALUES (4, 'VERDURAS', 'VERDURAS', 'SSDASW', 'SSAS', 0, 0, 1, 2, NULL, NULL, 0, false, 0, '2022-01-03 17:31:56.606973-05', '2022-01-03 17:31:56.607', '2022-01-03 17:31:56.606973-05', NULL, 0);
INSERT INTO public.products VALUES (5, 'ALBONDIGA', 'ALBONDIGA', 'JJDHHS', 'HHGJJ', 0, 0, 2, 3, 100, 2, 0, true, 0, '2022-01-03 17:34:22.158552-05', '2022-01-03 17:34:22.159', '2022-01-03 17:34:22.158552-05', NULL, 0);
INSERT INTO public.products VALUES (6, 'CARNE ESMECHADA', 'CARNE ESMECHADA', 'FFDSAA', 'DSSAASS', 0, 0, 2, 3, 200, 2, 0, true, 0, '2022-01-03 17:35:08.947342-05', '2022-01-03 17:35:08.947', '2022-01-03 17:35:08.947342-05', NULL, 0);
INSERT INTO public.products VALUES (7, 'ROLLITOS DE CARNE', 'ROLLITOS DE CARNE', 'QQ', 'FF', 0, 0, 2, 1, 200, 2, 0, true, 0, '2022-01-03 17:35:49.73487-05', '2022-01-03 17:35:49.735', '2022-01-03 17:35:49.73487-05', NULL, 0);
INSERT INTO public.products VALUES (8, 'BARRITAS DE PESCADO', 'DE MAR', 'OO', 'PP', 0, 0, 2, 2, 1, 3, 0, true, 0, '2022-01-03 17:36:41.994795-05', '2022-01-03 17:36:41.995', '2022-01-03 17:36:41.994795-05', NULL, 0);


--
-- TOC entry 3521 (class 0 OID 85518)
-- Dependencies: 229
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'PROVEEDOR');
INSERT INTO public.roles VALUES (2, 'CLIENTE');
INSERT INTO public.roles VALUES (3, 'EMPLEADO');


--
-- TOC entry 3523 (class 0 OID 85524)
-- Dependencies: 231
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.settings VALUES (1, 'MOVIMIENTO DE ENTRADA DE PRODUCCION', 'MOVI_IN_PROD', '7');
INSERT INTO public.settings VALUES (2, 'ESTADO SUGERIDDO', 'ESTADO_SUGERIDO', '6');
INSERT INTO public.settings VALUES (3, 'PRODUCIDO ACEPTADO', 'ESTADO_PRODUCIDO_ACEPTADO', '4');
INSERT INTO public.settings VALUES (4, 'PRODUCCION RECHAZADA', 'PROD_RECHAZADA', '5');


--
-- TOC entry 3525 (class 0 OID 85530)
-- Dependencies: 233
-- Data for Name: signs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.signs VALUES (1, '*');
INSERT INTO public.signs VALUES (2, '/');


--
-- TOC entry 3527 (class 0 OID 85536)
-- Dependencies: 235
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.status VALUES (1, 'POR DESCARGAR', 'POR DESCARGAR', 'PDC', true);
INSERT INTO public.status VALUES (2, 'ACEPTADO', 'ACEPTADO', 'ACP', false);
INSERT INTO public.status VALUES (3, 'PENDIENTE', 'PENDIENTE', 'PEN', false);
INSERT INTO public.status VALUES (4, 'PRODUCCION ACEPTADO', 'PRODUCCION ACEPTADO', 'PRODA', false);
INSERT INTO public.status VALUES (5, 'PRODUCCION RECHAZADO', 'PRODUCCION RECHAZADO', 'PRODR', false);
INSERT INTO public.status VALUES (6, 'SUGERENCIA', 'SUGERENCIA', 'SUG', false);
INSERT INTO public.status VALUES (7, 'SUGERENCIA CANCELADA', 'SUGERENCIA CANCELADA', 'SUGC', false);
INSERT INTO public.status VALUES (8, 'RECHAZADO', 'RECHAZADO', 'RCZ', true);
INSERT INTO public.status VALUES (9, 'DESCARGADO', 'DESCARGADO', 'DC', true);


--
-- TOC entry 3529 (class 0 OID 85543)
-- Dependencies: 237
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3530 (class 0 OID 85548)
-- Dependencies: 238
-- Data for Name: units; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.units VALUES (1, 'GR', 'GRAMOS');
INSERT INTO public.units VALUES (2, 'KL', 'KILOGRAMO');
INSERT INTO public.units VALUES (3, 'UN', 'UNIDAD');


--
-- TOC entry 3532 (class 0 OID 85554)
-- Dependencies: 240
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Testcode', 'test@email.com', '$2a$10$FO0gENOc082Tz5XVZk.gCuiYdn6faPy6JKHwXGyVJhDkmBujk9RfW', '2022-01-03 15:48:22.533733-05', '2022-01-03 15:48:22.534', '2022-01-03 15:48:22.533733-05', 1);


--
-- TOC entry 3556 (class 0 OID 0)
-- Dependencies: 210
-- Name: classification_kind_movement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classification_kind_movement_id_seq', 3, true);


--
-- TOC entry 3557 (class 0 OID 0)
-- Dependencies: 212
-- Name: consecutive_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consecutive_id_seq', 5, true);


--
-- TOC entry 3558 (class 0 OID 0)
-- Dependencies: 214
-- Name: conversion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversion_id_seq', 2, true);


--
-- TOC entry 3559 (class 0 OID 0)
-- Dependencies: 216
-- Name: header_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.header_id_seq', 1, false);


--
-- TOC entry 3560 (class 0 OID 0)
-- Dependencies: 218
-- Name: kind_movements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kind_movements_id_seq', 9, true);


--
-- TOC entry 3561 (class 0 OID 0)
-- Dependencies: 220
-- Name: kindidentity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kindidentity_id_seq', 3, true);


--
-- TOC entry 3562 (class 0 OID 0)
-- Dependencies: 222
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 2, true);


--
-- TOC entry 3563 (class 0 OID 0)
-- Dependencies: 224
-- Name: movements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movements_id_seq', 1, false);


--
-- TOC entry 3564 (class 0 OID 0)
-- Dependencies: 226
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_id_seq', 4, true);


--
-- TOC entry 3565 (class 0 OID 0)
-- Dependencies: 228
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 8, true);


--
-- TOC entry 3566 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3567 (class 0 OID 0)
-- Dependencies: 232
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.settings_id_seq', 4, true);


--
-- TOC entry 3568 (class 0 OID 0)
-- Dependencies: 234
-- Name: signs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.signs_id_seq', 2, true);


--
-- TOC entry 3569 (class 0 OID 0)
-- Dependencies: 236
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 9, true);


--
-- TOC entry 3570 (class 0 OID 0)
-- Dependencies: 239
-- Name: units_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.units_id_seq', 3, true);


--
-- TOC entry 3571 (class 0 OID 0)
-- Dependencies: 241
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 3298 (class 2606 OID 85580)
-- Name: header PK_007a885cf40484eb750d0355339; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.header
    ADD CONSTRAINT "PK_007a885cf40484eb750d0355339" PRIMARY KEY (id);


--
-- TOC entry 3288 (class 2606 OID 85582)
-- Name: classification_kind_movement PK_03c91c17e950a50625fb262a1c1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classification_kind_movement
    ADD CONSTRAINT "PK_03c91c17e950a50625fb262a1c1" PRIMARY KEY (id);


--
-- TOC entry 3320 (class 2606 OID 85584)
-- Name: settings PK_0669fe20e252eb692bf4d344975; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY (id);


--
-- TOC entry 3314 (class 2606 OID 85586)
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- TOC entry 3290 (class 2606 OID 85588)
-- Name: consecutive PK_1025693cb0041f2eda2ee913282; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consecutive
    ADD CONSTRAINT "PK_1025693cb0041f2eda2ee913282" PRIMARY KEY (id);


--
-- TOC entry 3294 (class 2606 OID 85590)
-- Name: conversion PK_47d350fae88ddb04db6de706bc8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversion
    ADD CONSTRAINT "PK_47d350fae88ddb04db6de706bc8" PRIMARY KEY (id);


--
-- TOC entry 3308 (class 2606 OID 85592)
-- Name: movements PK_5a8e3da15ab8f2ce353e7f58f67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movements
    ADD CONSTRAINT "PK_5a8e3da15ab8f2ce353e7f58f67" PRIMARY KEY (id);


--
-- TOC entry 3330 (class 2606 OID 85594)
-- Name: units PK_5a8f2f064919b587d93936cb223; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY (id);


--
-- TOC entry 3310 (class 2606 OID 85596)
-- Name: person PK_5fdaf670315c4b7e70cce85daa3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY (id);


--
-- TOC entry 3300 (class 2606 OID 85598)
-- Name: kind_movements PK_7690167c46ca89b0b5cb1ba6b52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kind_movements
    ADD CONSTRAINT "PK_7690167c46ca89b0b5cb1ba6b52" PRIMARY KEY (id);


--
-- TOC entry 3324 (class 2606 OID 85600)
-- Name: signs PK_79660c6bf130a669793b219aaec; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signs
    ADD CONSTRAINT "PK_79660c6bf130a669793b219aaec" PRIMARY KEY (id);


--
-- TOC entry 3306 (class 2606 OID 85602)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3302 (class 2606 OID 85604)
-- Name: kindidentity PK_9148ef5308241359ff9d1bfcc23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kindidentity
    ADD CONSTRAINT "PK_9148ef5308241359ff9d1bfcc23" PRIMARY KEY (id);


--
-- TOC entry 3334 (class 2606 OID 85606)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 3318 (class 2606 OID 85608)
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- TOC entry 3326 (class 2606 OID 85610)
-- Name: status PK_e12743a7086ec826733f54e1d95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY (id);


--
-- TOC entry 3336 (class 2606 OID 85612)
-- Name: users REL_5ed72dcd00d6e5a88c6a6ba3d1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "REL_5ed72dcd00d6e5a88c6a6ba3d1" UNIQUE (person_id);


--
-- TOC entry 3338 (class 2606 OID 85614)
-- Name: users UQ_1f7a2b11e29b1422a2622beab36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE (code);


--
-- TOC entry 3340 (class 2606 OID 85616)
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- TOC entry 3292 (class 2606 OID 85618)
-- Name: consecutive idx_consecutive; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consecutive
    ADD CONSTRAINT idx_consecutive UNIQUE (prefix);


--
-- TOC entry 3296 (class 2606 OID 85620)
-- Name: conversion idx_conversion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversion
    ADD CONSTRAINT idx_conversion UNIQUE (conversion_from, conversion_to);


--
-- TOC entry 3304 (class 2606 OID 85622)
-- Name: kindidentity idx_des_kind; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kindidentity
    ADD CONSTRAINT idx_des_kind UNIQUE (code);


--
-- TOC entry 3312 (class 2606 OID 85624)
-- Name: person idx_person; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT idx_person UNIQUE (phone, idnumber);


--
-- TOC entry 3316 (class 2606 OID 85626)
-- Name: products idx_products_; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT idx_products_ UNIQUE (sku, name);


--
-- TOC entry 3322 (class 2606 OID 85628)
-- Name: settings idx_settings; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT idx_settings UNIQUE (key);


--
-- TOC entry 3328 (class 2606 OID 85630)
-- Name: status idx_status; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT idx_status UNIQUE (code);


--
-- TOC entry 3332 (class 2606 OID 85632)
-- Name: units idx_units; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT idx_units UNIQUE (code);


--
-- TOC entry 3342 (class 2606 OID 85634)
-- Name: users idx_users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT idx_users UNIQUE (email, code);


--
-- TOC entry 3352 (class 2606 OID 85635)
-- Name: movements FK_0536efaa7e21b101f827a7c62f6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movements
    ADD CONSTRAINT "FK_0536efaa7e21b101f827a7c62f6" FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 3357 (class 2606 OID 85640)
-- Name: products FK_0681e70e1a9569a4220a4a9b556; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_0681e70e1a9569a4220a4a9b556" FOREIGN KEY ("movementsId") REFERENCES public.movements(id);


--
-- TOC entry 3355 (class 2606 OID 85645)
-- Name: person FK_09c3552ecb9879d9b2410a0f783; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "FK_09c3552ecb9879d9b2410a0f783" FOREIGN KEY (roles_id) REFERENCES public.roles(id);


--
-- TOC entry 3356 (class 2606 OID 85650)
-- Name: person FK_0e4c050597bca13d5c70a79ff6e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e" FOREIGN KEY (kind_id) REFERENCES public.kindidentity(id);


--
-- TOC entry 3358 (class 2606 OID 85655)
-- Name: products FK_0ea8e23207f42911bb85ef0a584; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_0ea8e23207f42911bb85ef0a584" FOREIGN KEY (sale_unit_id) REFERENCES public.units(id);


--
-- TOC entry 3346 (class 2606 OID 85660)
-- Name: header FK_113b522d4a9fb93c4979106b9f7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.header
    ADD CONSTRAINT "FK_113b522d4a9fb93c4979106b9f7" FOREIGN KEY (kind_movements_id) REFERENCES public.kind_movements(id);


--
-- TOC entry 3348 (class 2606 OID 85665)
-- Name: kind_movements FK_122ac21f64c42399181f23d7df5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kind_movements
    ADD CONSTRAINT "FK_122ac21f64c42399181f23d7df5" FOREIGN KEY (consecutive_id) REFERENCES public.consecutive(id);


--
-- TOC entry 3349 (class 2606 OID 85670)
-- Name: kind_movements FK_56f359f21dc13b1afec210e28b3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kind_movements
    ADD CONSTRAINT "FK_56f359f21dc13b1afec210e28b3" FOREIGN KEY (status_id) REFERENCES public.status(id);


--
-- TOC entry 3361 (class 2606 OID 85675)
-- Name: users FK_5ed72dcd00d6e5a88c6a6ba3d18; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18" FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- TOC entry 3359 (class 2606 OID 85680)
-- Name: products FK_774f5a086ca962dfe78c62aa10b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_774f5a086ca962dfe78c62aa10b" FOREIGN KEY (purchase_unit_id) REFERENCES public.units(id);


--
-- TOC entry 3343 (class 2606 OID 85685)
-- Name: conversion FK_8133a0e8f61583695ad55000cb2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversion
    ADD CONSTRAINT "FK_8133a0e8f61583695ad55000cb2" FOREIGN KEY (signs_id) REFERENCES public.signs(id);


--
-- TOC entry 3360 (class 2606 OID 85690)
-- Name: products FK_8852048b204485e00fe8a0ffdf7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_8852048b204485e00fe8a0ffdf7" FOREIGN KEY (product_parent_id) REFERENCES public.products(id);


--
-- TOC entry 3344 (class 2606 OID 85695)
-- Name: conversion FK_8d312d0f7c0ed9334588197d398; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversion
    ADD CONSTRAINT "FK_8d312d0f7c0ed9334588197d398" FOREIGN KEY (conversion_to) REFERENCES public.units(id);


--
-- TOC entry 3353 (class 2606 OID 85700)
-- Name: movements FK_952696d941a19bf0dd6c86306be; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movements
    ADD CONSTRAINT "FK_952696d941a19bf0dd6c86306be" FOREIGN KEY (status_id) REFERENCES public.status(id);


--
-- TOC entry 3354 (class 2606 OID 85705)
-- Name: movements FK_994e65eae8b497472663826feb0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movements
    ADD CONSTRAINT "FK_994e65eae8b497472663826feb0" FOREIGN KEY (header_id) REFERENCES public.header(id);


--
-- TOC entry 3347 (class 2606 OID 85710)
-- Name: header FK_a7ec5da323ac67b3f93588f1a3d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.header
    ADD CONSTRAINT "FK_a7ec5da323ac67b3f93588f1a3d" FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- TOC entry 3350 (class 2606 OID 85715)
-- Name: kind_movements FK_c37d0a0c38420f8b4c82cef731f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kind_movements
    ADD CONSTRAINT "FK_c37d0a0c38420f8b4c82cef731f" FOREIGN KEY (roles_id) REFERENCES public.roles(id);


--
-- TOC entry 3345 (class 2606 OID 85720)
-- Name: conversion FK_ddd91b6bf82f5c4c46e2413e7ca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversion
    ADD CONSTRAINT "FK_ddd91b6bf82f5c4c46e2413e7ca" FOREIGN KEY (conversion_from) REFERENCES public.units(id);


--
-- TOC entry 3351 (class 2606 OID 85725)
-- Name: kind_movements FK_f811588625365965d8b5a21fbd1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kind_movements
    ADD CONSTRAINT "FK_f811588625365965d8b5a21fbd1" FOREIGN KEY (classification_kindmovement_id) REFERENCES public.classification_kind_movement(id);


-- Completed on 2022-01-14 14:45:59

--
-- PostgreSQL database dump complete
--

