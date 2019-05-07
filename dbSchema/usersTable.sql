CREATE TABLE "users" (
	"id" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"issues" json,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"agreeTerms" BOOLEAN NOT NULL,
	"remember" BOOLEAN,
	CONSTRAINT Untitled_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
