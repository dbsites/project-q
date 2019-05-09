CREATE TABLE "companyChart" (
	"id" TEXT NOT NULL,
	"company" TEXT,
	"date" TEXT,
	"csv" TEXT,
	CONSTRAINT companyChart_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "companyStock" (
	"id" TEXT NOT NULL,
	"company" TEXT NOT NULL,
	"timestamp" TEXT,
	"open" integer,
	"high" integer,
	"low" integer,
	"close" integer,
	"volume" integer,
	CONSTRAINT companyStock_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "politicians" (
	"id" TEXT NOT NULL,
	"firstname" TEXT,
	"lastname" TEXT,
	"party" TEXT,
	"photo" TEXT,
	CONSTRAINT politicians_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "contributions" (
	"id" TEXT NOT NULL,
	"company" TEXT,
	"politician" TEXT,
	"amount" integer,
	CONSTRAINT contributions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "legislation" (
	"id" TEXT NOT NULL,
	"issue" TEXT,
	"politician" TEXT,
	"measure" TEXT,
	"vote" TEXT,
	CONSTRAINT legislation_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "issues" (
	"id" TEXT NOT NULL,
	"issue" TEXT,
	"description" TEXT,
	CONSTRAINT issues_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "companies" (
	"id" TEXT NOT NULL,
	"ticker" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"logo" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT companies_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "companyIssues" (
	"id" TEXT NOT NULL,
	"company" TEXT NOT NULL,
	"issue" TEXT NOT NULL,
	"agreeScore" integer NOT NULL,
	"disagreeScore" integer NOT NULL,
	CONSTRAINT companyIssues_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" TEXT NOT NULL,
	"firstname" TEXT NOT NULL,
	"lastname" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"remember" BOOLEAN NOT NULL,
	"agreeTerms" BOOLEAN NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userIssues" (
	"id" TEXT NOT NULL,
	"user" TEXT NOT NULL,
	"issue" TEXT NOT NULL,
	"bias" BOOLEAN NOT NULL,
	CONSTRAINT userIssues_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" TEXT NOT NULL,
	"issue" TEXT NOT NULL,
	"question" TEXT NOT NULL,
	"legislation" TEXT,
	CONSTRAINT questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userAnswers" (
	"id" TEXT NOT NULL,
	"user" TEXT NOT NULL,
	"question" TEXT NOT NULL,
	"bias" BOOLEAN NOT NULL,
	CONSTRAINT userAnswers_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "companyChart" ADD CONSTRAINT "companyChart_fk0" FOREIGN KEY ("company") REFERENCES "companies"("id");

ALTER TABLE "companyStock" ADD CONSTRAINT "companyStock_fk0" FOREIGN KEY ("company") REFERENCES "companies"("id");


ALTER TABLE "contributions" ADD CONSTRAINT "contributions_fk0" FOREIGN KEY ("company") REFERENCES "companies"("id");
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_fk1" FOREIGN KEY ("politician") REFERENCES "politicians"("id");

ALTER TABLE "legislation" ADD CONSTRAINT "legislation_fk0" FOREIGN KEY ("issue") REFERENCES "issues"("id");
ALTER TABLE "legislation" ADD CONSTRAINT "legislation_fk1" FOREIGN KEY ("politician") REFERENCES "politicians"("id");



ALTER TABLE "companyIssues" ADD CONSTRAINT "companyIssues_fk0" FOREIGN KEY ("company") REFERENCES "companies"("id");
ALTER TABLE "companyIssues" ADD CONSTRAINT "companyIssues_fk1" FOREIGN KEY ("issue") REFERENCES "issues"("id");


ALTER TABLE "userIssues" ADD CONSTRAINT "userIssues_fk0" FOREIGN KEY ("user") REFERENCES "users"("id");
ALTER TABLE "userIssues" ADD CONSTRAINT "userIssues_fk1" FOREIGN KEY ("issue") REFERENCES "issues"("id");

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("issue") REFERENCES "issues"("id");
ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("legislation") REFERENCES "legislation"("id");

ALTER TABLE "userAnswers" ADD CONSTRAINT "userAnswers_fk0" FOREIGN KEY ("user") REFERENCES "users"("id");
ALTER TABLE "userAnswers" ADD CONSTRAINT "userAnswers_fk1" FOREIGN KEY ("question") REFERENCES "questions"("id");
