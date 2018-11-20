export const MONEY = (companyName: string, score: number, issueName: string, aggregate: number, recip_1: string, recip_1_amount: number, recip_2: string, recip_2_amount: number, recip_3: string, recip_3_amount: string) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points that track corporate expenditures to federal-level candidates, incumbents and political parties. In the 2016 election cycle, ${companyName} contributed ${aggregate}. The top three recipients were ${recip_1} (${recip_1_amount}), ${recip_2} (${recip_2_amount}) and ${recip_3} (${recip_3_amount}).`

export const ENVIRONMENT = (companyName: string, score: number, issueName: string, greenBuildings: string, targetEmissions: string) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including whether ${companyName} has committed to green building practices (${greenBuildings}) and targeting emissions (${targetEmissions}). In addition, Ethiq factors in corporate expenditures to politicians who advocate for and against environment regulations.`

export const CIVIL = (companyName: string, score: number, issueName: string, humanRightsScore: number, policyBoardDiversity: string, womenManagers: number) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including ${companyName}’s Human Rights Rating (${humanRightsScore}), whether it has a policy on Board Diversity (${policyBoardDiversity}) and its percentage of women in managerial positions (${womenManagers}).`


export const SECOND = (companyName: string, score: number, issueName: string, nraScore: number, bradyRating: number, yesManchin: string, noManchin: string) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including ${companyName}’s hybrid NRA score of ${nraScore}, its hybrid Brady rating of ${bradyRating}, and aggregate money given by ${companyName} to those who voted YES on the S.715-Manchin-Toomey Amdt. (${yesManchin}) vs. those who voted NO (${noManchin}).`

export const SALARY = (companyName: string, score: number, issueName: string, TSR: string, salaryGap: number) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including whether ${companyName}’s CEO compensation is linked to total shareholder return (${TSR}), the salary gap ratio between executives and the average worker (${salaryGap}), employee satisfaction, strikes, etc.`

export const CORPORATE = (companyName: string, score: number, issueName: string, communityScore: number, charityAmount: string) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including ${companyName}’s community score of ${communityScore}, representing its charitable and volunteer work, the overall amount of money given to charity during the year (${charityAmount}), charitable contributions as a percentage of revenue, etc.`

export const DRUG = (companyName: string, score: number, issueName: string, normlScore: any) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including ${companyName}’s campaign donations to politicians in favor or opposition of drug reform, its hybrid NORML (National Organization for the Reform of Marijuana Laws) score of ${normlScore}, and additional metrics.`

export const HEALTH = (companyName: string, score: number, issueName: string, yesRepeal: string, noRepeal: string) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including ${companyName}’s aggregate expenditures to those who voted YES to repeal the Affordable Care Act (${yesRepeal}) vs. those who voted NO (${noRepeal}).`

export const IMMIGRATION = (companyName: string, score: number, issueName: string, diversityScore: number, ailaScore: number, fairScore: number) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including ${companyName}’s overall diversity score (${diversityScore}), hybrid scores based on American Immigration Lawyers Association rankings (${ailaScore}), the Federation for American Immigration Reform rankings (${fairScore}) and other metrics.`

export const TAXES = (companyName: string, score: number, issueName: string, yesTaxCut: string, noTaxCut: string) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including ${companyName}’s aggregate expenditures to those who voted YES on the 2017 Tax Cut and Jobs Act (${yesTaxCut}) vs. those who voted NO (${noTaxCut}). In addition, hybrid scores from the Club for Growth and the National Taxpayers Union were considered.`

export const PRESIDENTIAL = (companyName: string, score: number, issueName: string, trumpAlignment: string) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with various data points. Among them are ${companyName}’s expenditures to politicians who have voted in line with or in opposition of President Trump, expenditures to the Presidential campaign, etc. ${trumpAlignment} of the ${companyName}’s political financing goes to legislators who votes are aligned with the current administration. Legislation introduced by the president is tracked through the House and Senate, as is the money flowing to politicians who eventually vote on these issues.`

export const ECONOMY = (companyName: string, score: number, issueName: string, taxesPaid: string) => `${companyName} has received a score of ${score} on the issue of ${issueName}. Your unique input on Ethiq’s quiz has been cross-referenced with data points including ${companyName}’s value to overall GDP, historical net hiring vs. layoffs, taxes paid as a percentage of revenue (${taxesPaid}), etc.`

const IssueScripts: any = {
  "Money and Politics": MONEY,
  "Environment": ENVIRONMENT,
  "Civil/Women's Rights": CIVIL,
  "2nd Amendment": SECOND,
  "Executive Compensation": SALARY,
  "Corporate Philanthropy": CORPORATE,
  "Drug Legalization": DRUG,
  "Health Care": HEALTH,
  "Immigration": IMMIGRATION,
  "Taxes": TAXES,
  "Presidential Support": PRESIDENTIAL,
  "Economy and Jobs": ECONOMY,
}

export default IssueScripts;