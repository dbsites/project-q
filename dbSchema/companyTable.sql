CREATE TABLE "company" (
	"id" TEXT NOT NULL,
	"ticker" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"blurb" TEXT NOT NULL,
	"logo" TEXT NOT NULL,
	"issues" json NOT NULL,
	CONSTRAINT company_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
