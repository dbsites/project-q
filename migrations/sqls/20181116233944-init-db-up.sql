SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

-- Name: companies; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE companies (
    id text NOT NULL,
    ticker text NOT NULL,
    full_name text NOT NULL,
    description text NOT NULL,
    logo text NOT NULL,
    short_name text,
    url text,
    year_founded integer,
    number_employees integer,
    green_buildings boolean,
    targets_emissions boolean,
    human_rights integer,
    policy_board_diversity boolean,
    women_managers integer,
    nra_score integer,
    brady_rating integer,
    tsr boolean,
    salary_gap integer,
    community_score integer,
    diversity_score integer,
    aila_score integer,
    fair_score integer,
    company_name text,
    company_name_possessive text,
    charity_amount text,
    yes_manchin text,
    no_manchin text,
    yes_repeal text,
    no_repeal text,
    no_tax_cut text,
    yes_tax_cut text,
    taxes_paid text
);

ALTER TABLE companies OWNER TO ethiqadmin;

-- Name: company_chart; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE company_chart (
    id text NOT NULL,
    company text,
    date text,
    csv text
);

ALTER TABLE company_chart OWNER TO ethiqadmin;

-- Name: company_issues; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE company_issues (
    id text NOT NULL,
    company_id text NOT NULL,
    issue_id text NOT NULL,
    agree_score integer NOT NULL,
    disagree_score integer NOT NULL,
    issue text,
    company text,
    tsr boolean
);

ALTER TABLE company_issues OWNER TO ethiqadmin;

-- Name: company_stock; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE company_stock (
    id text NOT NULL,
    company_id text NOT NULL,
    "timestamp" text,
    open integer,
    high integer,
    low integer,
    close integer,
    volume integer
);

ALTER TABLE company_stock OWNER TO ethiqadmin;

-- Name: contributions; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE contributions (
    id text NOT NULL,
    company text,
    politician text,
    amount integer
);

ALTER TABLE contributions OWNER TO ethiqadmin;

-- Name: issues; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE issues (
    id text NOT NULL,
    issue_name text,
    description text,
    abbrv text
);

ALTER TABLE issues OWNER TO ethiqadmin;

-- Name: legislation; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE legislation (
    id text NOT NULL,
    issue text,
    politician text,
    measure text,
    vote text
);

ALTER TABLE legislation OWNER TO ethiqadmin;

-- Name: politicians; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE politicians (
    id text NOT NULL,
    company_id text,
    recip_one text,
    recip_1_amount text,
    recip_1_img text,
    recip_2 text,
    recip_3 text,
    recip_3_amount text,
    recip_2_amount text,
    recip_2_img text,
    recip_3_img text
);

ALTER TABLE politicians OWNER TO ethiqadmin;

-- Name: questions; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE questions (
    id text NOT NULL,
    issue_id text NOT NULL,
    question_text text NOT NULL,
    legislation text,
    "position" text
);

ALTER TABLE questions OWNER TO ethiqadmin;

-- Name: user_answers; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE user_answers (
    id text NOT NULL,
    user_id text NOT NULL,
    question_id text NOT NULL,
    agree boolean
);

ALTER TABLE user_answers OWNER TO ethiqadmin;

-- Name: user_issues; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE user_issues (
    id text NOT NULL,
    user_id text NOT NULL,
    issue_id text NOT NULL,
    "position" text
);

ALTER TABLE user_issues OWNER TO ethiqadmin;

-- Name: users; Type: TABLE; Schema: public; Owner: ethiqadmin

CREATE TABLE users (
    id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    remember boolean NOT NULL,
    agree_terms boolean NOT NULL,
    issues_complete boolean,
    survey_complete boolean
);

ALTER TABLE users OWNER TO ethiqadmin;

-- Name: companies companies_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY companies
    ADD CONSTRAINT companies_pk PRIMARY KEY (id);

-- Name: company_chart companychart_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY company_chart
    ADD CONSTRAINT companychart_pk PRIMARY KEY (id);

-- Name: company_issues companyissues_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY company_issues
    ADD CONSTRAINT companyissues_pk PRIMARY KEY (id);

-- Name: company_stock companystock_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY company_stock
    ADD CONSTRAINT companystock_pk PRIMARY KEY (id);

-- Name: contributions contributions_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY contributions
    ADD CONSTRAINT contributions_pk PRIMARY KEY (id);

-- Name: issues issues_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY issues
    ADD CONSTRAINT issues_pk PRIMARY KEY (id);

-- Name: legislation legislation_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY legislation
    ADD CONSTRAINT legislation_pk PRIMARY KEY (id);

-- Name: politicians politicians_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY politicians
    ADD CONSTRAINT politicians_pk PRIMARY KEY (id);

-- Name: questions questions_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pk PRIMARY KEY (id);

-- Name: user_answers useranswers_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY user_answers
    ADD CONSTRAINT useranswers_pk PRIMARY KEY (id);

-- Name: user_issues userissues_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY user_issues
    ADD CONSTRAINT userissues_pk PRIMARY KEY (id);

-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);

-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);

-- Name: company_chart companyChart_fk0; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY company_chart
    ADD CONSTRAINT "companyChart_fk0" FOREIGN KEY (company) REFERENCES companies(id);

-- Name: company_issues companyIssues_fk0; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY company_issues
    ADD CONSTRAINT "companyIssues_fk0" FOREIGN KEY (company_id) REFERENCES companies(id);

-- Name: company_issues companyIssues_fk1; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY company_issues
    ADD CONSTRAINT "companyIssues_fk1" FOREIGN KEY (issue_id) REFERENCES issues(id);

-- Name: company_stock companyStock_fk0; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY company_stock
    ADD CONSTRAINT "companyStock_fk0" FOREIGN KEY (company_id) REFERENCES companies(id);

-- Name: contributions contributions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY contributions
    ADD CONSTRAINT contributions_fk0 FOREIGN KEY (company) REFERENCES companies(id);

-- Name: contributions contributions_fk1; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY contributions
    ADD CONSTRAINT contributions_fk1 FOREIGN KEY (politician) REFERENCES politicians(id);

-- Name: legislation legislation_fk0; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY legislation
    ADD CONSTRAINT legislation_fk0 FOREIGN KEY (issue) REFERENCES issues(id);

-- Name: legislation legislation_fk1; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY legislation
    ADD CONSTRAINT legislation_fk1 FOREIGN KEY (politician) REFERENCES politicians(id);

-- Name: questions questions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_fk0 FOREIGN KEY (issue_id) REFERENCES issues(id);

-- Name: questions questions_fk1; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_fk1 FOREIGN KEY (legislation) REFERENCES legislation(id);

-- Name: user_answers userAnswers_fk0; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY user_answers
    ADD CONSTRAINT "userAnswers_fk0" FOREIGN KEY (user_id) REFERENCES users(id);

-- Name: user_answers userAnswers_fk1; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY user_answers
    ADD CONSTRAINT "userAnswers_fk1" FOREIGN KEY (question_id) REFERENCES questions(id);

-- Name: user_issues userIssues_fk0; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY user_issues
    ADD CONSTRAINT "userIssues_fk0" FOREIGN KEY (user_id) REFERENCES users(id);

-- Name: user_issues userIssues_fk1; Type: FK CONSTRAINT; Schema: public; Owner: ethiqadmin

ALTER TABLE ONLY user_issues
    ADD CONSTRAINT "userIssues_fk1" FOREIGN KEY (issue_id) REFERENCES issues(id);

-- Name: public; Type: ACL; Schema: -; Owner: ethiqadmin

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ethiqadmin;
GRANT ALL ON SCHEMA public TO PUBLIC;

-- Name: plpgsql; Type: ACL; Schema: -; Owner: postgres

GRANT ALL ON LANGUAGE plpgsql TO ethiqadmin;
